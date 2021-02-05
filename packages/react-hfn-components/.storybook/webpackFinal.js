module.exports = (config, { configType }) => {
  const customWebpackConfig = require('../webpack.config.storybook')
  return {
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        ...customWebpackConfig.resolve.alias,
      },
      modules: [
        ...config.resolve.modules,
        ...customWebpackConfig.resolve.modules,
      ],
    },
    mode: 'development',
    devtool: 'inline-source-map',
  }
}
