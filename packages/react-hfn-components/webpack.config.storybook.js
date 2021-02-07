const { DefinePlugin } = require('webpack')
const dotenv = require('dotenv')

module.exports = {
  devtool: 'inline-source-map',
  mode: 'development',
  plugins: [
    new DefinePlugin({
      ...dotenv.config().parse,
    }),
  ],
  resolve: require('./.webpack-config/resolve/storybook'),
}
