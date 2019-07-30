const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const config = require('config')

const common = require('./webpack.common')

const WEBPACK_PORT = config.get('WEBPACK_DEVSERVER_PORT')

const plugins = [
  new webpack.DefinePlugin({
    'process.env.BROWSER': false,
    'process.env.DEVELOPMENT': true,
  }),
]

const imageLoader = {
  test: /\.(ico|jpg|jpeg|png|gif|webp|svg)$/,
  use: {
    loader: 'file-loader',
    options: {
      name: '[name].[ext]',
      publicPath: `http://localhost:${WEBPACK_PORT}/assets/images`,
      emitFile: false,
    },
  },
}

const nullLoader = {
  test: /\.(s?css)$/,
  use: {
    loader: 'null-loader',
  },
}

module.exports = merge.smart(
  {
    mode: 'development',
    target: 'node',
    entry: path.join(__dirname, 'client/serverside.js'),
    output: {
      library: 'jsx',
      libraryTarget: 'umd',
    },
    plugins,
    module: { rules: [imageLoader, nullLoader] },
  },
  common,
)
