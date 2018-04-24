import Koa from 'koa';
import helmet from 'koa-helmet';
import views from 'koa-views';
import compression from 'koa-compress';
import bodyParser from 'koa-bodyparser';
import serveStatic from 'koa-static';
import koaUtils from './utils/koa';

const debug = require('debug')('api');

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
  // ctx.response.setHeader('Access-Control-Allow-Origin', `https://${domain}`);
  ctx.response.setHeader('Access-Control-Allow-Methods', '*');
  ctx.response.setHeader('Access-Control-Allow-Headers', '*,content-type');
  ctx.response.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; ",
  );
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  ctx.response.setHeader('Access-Control-Allow-Credentials', true);

  await next();
});

const serverPort = process.env.PORT || 8080;
app.listen(serverPort, () => {
  debug('Running server on http://%s:%s', serverPort);
});