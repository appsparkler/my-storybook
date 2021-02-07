const { resolve } = require('path')

module.exports = {
  alias: {
    '@appsparkler/react-hfn-components': resolve('src'),
    '@react-hfn-hooks': resolve('src/hooks'),
    '@react-hfn-utils': resolve('src/utils'),
    '@react-hfn-components': resolve('src/components'),
    '@react-hfn-hoc': resolve('src/hoc'),
    '@react-hfn-studio': resolve('studio'),
    '@react-hfn-stories': resolve('stories'),
  },
  extensions: ['.sass', '.js', '.jsx', '.json'],
  modules: [
    resolve('node_modules'),
    resolve('./'),
    resolve('studio'),
    resolve('src'),
  ],
}
