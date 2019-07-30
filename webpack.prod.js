const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const common = require('./webpack.common')

const pluginsForClientside = [
  new webpack.DefinePlugin({
    'process.env.BROWSER': true,
    'process.env.DEVELOPMENT': false,
  }),
  new MiniCssExtractPlugin({
    filename: 'styles.css',
  }),
  new CopyPlugin([
    { from: 'public/application.mustache', to: '.' },
    { from: 'robots.txt', to: '..' },
  ]),
]

const pluginsForServerside = [
  new webpack.DefinePlugin({
    'process.env.BROWSER': false,
    'process.env.DEVELOPMENT': false,
  }),
]

const cssLoader = {
  test: /\.(s)?css$/,
  use: [
    { loader: MiniCssExtractPlugin.loader },
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
      publicPath: '/assets/fonts',
    },
  },
}

const imageLoaderForClientside = {
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

const imageLoaderForServerside = {
  test: /\.(ico|jpg|jpeg|png|gif|webp|svg)(\?.*)?$/,
  use: {
    loader: 'file-loader',
    options: {
      name: '[name].[ext]',
      publicPath: '/assets/images',
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

const optimization = {
  minimizer: [new UglifyJsPlugin(), new OptimizeCSSAssetsPlugin({})],
}

module.exports = [
  merge.smart(
    {
      mode: 'production',
      target: 'web',
      entry: ['babel-polyfill', path.join(__dirname, 'client/clientside.js')],
      output: {
        path: path.join(__dirname, 'build/assets'),
        filename: 'application.js',
      },
      plugins: pluginsForClientside,
      optimization,
      module: { rules: [cssLoader, fontLoader, imageLoaderForClientside] },
    },
    common,
  ),
  merge.smart(
    {
      mode: 'production',
      target: 'node',
      entry: ['babel-polyfill', path.join(__dirname, 'client/serverside.js')],
      output: {
        path: path.join(__dirname, 'build/assets'),
        filename: 'serverside.application.js',
        library: 'jsx',
        libraryTarget: 'umd',
      },
      plugins: pluginsForServerside,
      optimization,
      module: { rules: [imageLoaderForServerside, nullLoader] },
    },
    common,
  ),
]
