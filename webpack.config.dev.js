const webpack = require('webpack');

module.exports = [{
  name: 'react-app',
  devtool: 'eval',
  cache: true,
  entry: {
    main: [
      'babel-polyfill',
      'webpack-hot-middleware/client',
      './react/index.jsx',
    ],
    vendor: [
      'react', 'react-redux', 'redux', 'react-dom', 'moment',
    ],
  },
  output: {
    // eslint-disable-next-line no-undef
    path: `${__dirname}/dist/__build__`,
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    publicPath: '/__build__/',
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: [/node_modules/, /.+\.config.js/],
    }],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        CLIENT: JSON.stringify(true),
      },
    }),
    new webpack.IgnorePlugin(/^vertx$/),
  ],
}];
