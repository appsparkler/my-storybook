const { resolve } = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
process.env.NODE_ENV = 'production'
// const dotenv = require('dotenv')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: './studio/index.js',
  output: {
    path: resolve('dist-studio'),
    filename: '[name].js',
  },
  module: require('./.webpack-config/module/dist-studio'),
  resolve: require('./.webpack-config/resolve/dist-studio'),
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
      // 'process.env': JSON.stringify(dotenv.config().parsed),
    }),
    new HTMLPlugin({
      template: resolve('studio/index.ejs'),
    }),
  ],
}
