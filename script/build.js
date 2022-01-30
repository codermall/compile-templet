const webpack = require('webpack')

const config = require('../config/webpack.prod')

const callback = (err, stats) => {
  if (err) {
    console.error(err)
    return
  }

  const infoStr = stats.toString({
    colors: true,
    chunks: true,
    modules: false
  })

  console.log(infoStr)

  const info = stats.toJson()

  if (stats.hasErrors()) {
    console.error(info.errors)
  }

  if (stats.hasWarnings()) {
    console.warn(info.warnings)
  }
}

webpack(config, callback)
