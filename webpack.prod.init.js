const webpack = require('webpack')
const merge = require('webpack-merge')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const common = require('./webpack.common')

const plugins = [
  new CleanWebpackPlugin(),
  new MiniCssExtractPlugin({
    filename: '[name].[hash].css',
  }),
  new webpack.DefinePlugin({
    'process.env.DEVELOPMENT': false,
  }),
]

const cssLoader = {
  test: /\.(s)?css$/,
  use: [MiniCssExtractPlugin.loader],
}

module.exports = merge.smart(
  {
    mode: 'production',
    module: {
      rules: [cssLoader],
    },
    plugins,
    optimization: {
      minimizer: [new UglifyJsPlugin(), new OptimizeCSSAssetsPlugin({})],
    },
  },
  common,
)
