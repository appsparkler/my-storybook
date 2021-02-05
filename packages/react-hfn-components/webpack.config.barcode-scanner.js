const { resolve } = require('path')
const { mainBuild } = require('./webpack.config.dist.js')

const barcodeWebpack = Object.assign({}, mainBuild, {
  entry: './src/components/BarCodeScanner/useBarCodeScanner.js',
  output: {
    path: resolve('dist/barcode-scanner'),
    filename: `index.js`,
    library: 'BarCodeScanner',
    libraryTarget: 'umd',
  },
})

module.exports = barcodeWebpack
