module.exports = {
  webpackFinal: require('./webpackFinal'),
  stories: ['../stories/**/*.stories.(js|mdx)'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-a11y/register',
    require('./addons/storysource'),
  ],
}
