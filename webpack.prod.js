const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const common = require('./webpack.common')

const plugins = [
  new webpack.DefinePlugin({
    'process.env.BROWSER': true,
    DEVELOPMENT: false,
  }),
  new MiniCssExtractPlugin({
    filename: 'styles.css',
  }),
  new CopyPlugin([
    { from: 'public/index.mustache', to: '.' },
    { from: 'public/favicon.ico', to: '.' },
    { from: 'public/locales', to: '../locales' },
  ]),
]

const pluginsForServerside = [
  new webpack.DefinePlugin({
    'process.env.BROWSER': false,
    DEVELOPMENT: false,
  }),
]

const cssLoader = {
  test: /\.(s)?css$/,
  use: [MiniCssExtractPlugin.loader],
}

const fontLoader = {
  test: /\.(eot|otf|ttf|woff|woff2)(\?.*)?$/i,
  use: {
    loader: 'file-loader',
    options: {
      name: '[name].[ext]',
      outputPath: 'fonts',
      publicPath: '/assets/fonts',
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
      publicPath: '/assets/images',
    },
  },
}

const miscLoader = {
  exclude: [
    /\.html$/,
    /\.(js|jsx)$/,
    /\.s?css$/,
    /\.json$/,
    /\.svg$/,
    /\.png$/,
  ],
  use: {
    loader: 'null-loader',
  },
}

module.exports = [
  merge.smart(
    {
      mode: 'production',
      target: 'web',
      entry: ['babel-polyfill', path.join(__dirname, 'src/application.js')],
      output: {
        path: path.join(__dirname, 'dist/assets'),
        filename: 'application.js',
      },
      plugins,
      module: { rules: [cssLoader, fontLoader, imageLoader] },
    },
    common,
  ),
  merge.smart(
    {
      mode: 'production',
      target: 'node',
      entry: [
        'babel-polyfill',
        path.join(__dirname, 'src/serverside/index.js'),
      ],
      output: {
        path: path.join(__dirname, 'dist/assets'),
        filename: 'serverside.application.js',
        library: 'jsx',
        libraryTarget: 'umd',
      },
      plugins: pluginsForServerside,
      module: { rules: [imageLoader, miscLoader] },
    },
    common,
  ),
]
