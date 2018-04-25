const Koa = require('koa');
const helmet = require('koa-helmet');
const views = require('koa-views');
const compression = require('koa-compress');
const bodyParser = require('koa-bodyparser');
const serveStatic = require('koa-static');
const debug = require('debug')('api');
const koaUtils = require('./utils/koa');

const app = new Koa();

switch (process.env.NODE_ENV) {
  case 'development':
    koaUtils.serveWebpackForDev(app);
    break;
  default:
    throw new Error(`ERROR: ${process.env.NODE_ENV} is not a recognized environment state`);
}

// secure headers
app.use(helmet({
  hsts: false,
  noSniff: false,
}));

// templating views
app.use(views(`${__dirname}/../views`));

app.use(compression());

app.use(bodyParser());

app.use(serveStatic(`${__dirname}/public`));

app.use(async (ctx, next) => {
  // ctx.set('Access-Control-Allow-Origin', `https://${domain}`);
  ctx.set('Access-Control-Allow-Methods', '*');
  ctx.set('Access-Control-Allow-Headers', '*,content-type');
  ctx.set(
    'Content-Security-Policy',
    "default-src 'self'; ",
  );
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  ctx.set('Access-Control-Allow-Credentials', true);

  await next();
});

const serverPort = process.env.PORT || 8080;
app.listen(serverPort, () => {
  debug('Running server on port %s', serverPort);
});