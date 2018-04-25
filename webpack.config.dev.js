const webpack = require('webpack');

module.exports = [{
  name: 'react-app',
  mode: 'development',
  devtool: 'eval',
  cache: true,
  entry: {
    main: [
      'babel-polyfill',
      'webpack-hot-middleware/client',
      './react/index.jsx',
    ],
    vendors: [
      'react', 'react-redux', 'redux', 'react-dom',
    ],
  },
  output: {
    path: `${__dirname}/dist/__build__`,
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    publicPath: '/__build__/',
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: [/node_modules/],
    }],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        CLIENT: JSON.stringify(true),
      },
    }),
    new webpack.IgnorePlugin(/^vertx$/),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
}];
