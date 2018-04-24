const webpack = require('webpack');
const config = require('../../webpack.config.dev');
const webpackDevMiddleware = require('koa-webpack-dev-middleware');
const webpackHotMiddleware = require('koa-webpack-hot-middleware');

module.exports = {
  serveWebpackForDev: (koaApp) => {
    const compiler = webpack(config[0]);
    koaApp.use(webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: config[0].output.publicPath,
    }));
    koaApp.use(webpackHotMiddleware(compiler));
  },
};