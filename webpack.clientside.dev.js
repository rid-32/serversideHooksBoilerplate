const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const config = require('config')

const common = require('./webpack.common')

const port = config.get('WEBPACK_DEVSERVER_PORT')

const plugins = [
  new webpack.DefinePlugin({
    'process.env.BROWSER': true,
    'process.env.DEVELOPMENT': true,
  }),
]

const cssLoader = {
  test: /\.(s)?css$/,
  use: [
    { loader: 'style-loader' },
    { loader: 'css-loader' },
    { loader: 'postcss-loader' },
    { loader: 'sass-loader' },
  ],
}

const fontLoader = {
  test: /\.(eot|otf|ttf|woff|woff2)(\?.*)?$/i,
  use: {
    loader: 'file-loader',
    options: {
      name: '[name].[ext]',
      outputPath: 'fonts',
    },
  },
}

const imageLoader = {
  test: /\.(ico|jpg|jpeg|png|gif|webp|svg)(\?.*)?$/,
  use: {
    loader: 'file-loader',
    options: {
      name: '[name].[ext]',
      outputPath: 'images',
    },
  },
}

module.exports = merge.smart(
  {
    mode: 'development',
    target: 'web',
    devtool: 'eval-source-map',
    entry: ['babel-polyfill', path.join(__dirname, 'client/clientside.js')],
    output: {
      publicPath: `http://localhost:${port}/assets/`,
      filename: 'application.js',
    },
    module: {
      rules: [cssLoader, fontLoader, imageLoader],
    },
    plugins,
    devServer: {
      host: '0.0.0.0',
      port,
      contentBase: path.join(__dirname, 'client'),
      headers: { 'Access-Control-Allow-Origin': '*' },
      disableHostCheck: true,
      hot: true,
      compress: true,
    },
  },
  common,
)
