const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.js')

const devConfig = {
  devServer: {
    compress: true,
    port: 3000,
    hot: true,
    // host: 'localhost',
    open: true
  },
  cache: true,
  mode: 'development'
}

module.exports = merge(baseConfig('development'), devConfig)
