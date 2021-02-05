const { resolve } = require('path')

module.exports = {
  rules: [
    {
      test: /\.js$/,
      loader: 'babel-loader',
      include: [resolve('src'), resolve('studio')],
    },
    {
      test: /\.(scss|sass)$/,
      include: [resolve('src'), resolve('studio')],
      use: ['style-loader', 'css-loader', 'sass-loader'],
    },
    {
      test: /\.css$/,
      include: [resolve('src'), resolve('node_modules')],
      use: ['style-loader', 'css-loader'],
    },
  ],
}
