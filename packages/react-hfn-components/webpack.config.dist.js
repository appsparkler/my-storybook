const { resolve } = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
process.env.NODE_ENV = 'production'

const mainBuild = {
  entry: './src/index',
  mode: 'production',
  output: {
    path: resolve('dist/react-hfn-components/'),
    filename: `index.js`,
    library: 'ReactHFNComponents',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('studio')],
      },
      {
        test: /\.(scss|sass)$/,
        include: [resolve('src'), resolve('studio')],
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        include: [resolve('src'), resolve('node_modules')],
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  resolve: {
    alias: {
      '@appsparkler/react-hfn-components': resolve('src'),
      '@react-hfn-components': resolve('src/components'),
      '@react-hfn-hooks': resolve('src/hooks'),
      '@react-hfn-utils': resolve('src/utils'),
      '@app': resolve('src'),
    },
    extensions: ['.sass', '.js', '.jsx', '.json'],
    modules: [resolve('node_modules'), resolve('./')],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
  ],
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
    },
    croppie: {
      root: 'Croppie',
      commonjs2: 'croppie',
      commonjs: 'croppie',
      amd: 'croppie',
    },
    '@zxing/library/esm': '@zxing/library/esm',
  },
}

exports.mainBuild = mainBuild

module.exports = [mainBuild, require('./webpack.config.barcode-scanner')]
