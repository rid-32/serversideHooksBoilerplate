const webpack = require('webpack')
const path = require('path')

const plugins = [new webpack.ProgressPlugin()]

const jsxLoader = {
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
  },
}

const alias = {
  images: path.join(__dirname, 'public/images'),
  fonts: path.join(__dirname, 'public/fonts'),
}

const extensions = ['.js', '.jsx', '.json', '.scss', '.css']

module.exports = {
  resolve: {
    modules: ['node_modules', path.join(__dirname, 'client')],
    alias,
    extensions,
  },
  module: {
    rules: [jsxLoader],
  },
  plugins,
}
