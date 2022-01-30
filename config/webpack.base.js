const { resolve } = require('path')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/dist/plugin').default
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const chalk = require('chalk')

module.exports = (mode) => {
  const baseConfig = {
    entry: resolve(__dirname, '../src/main.ts'),
    output: {
      filename: 'js/[name].[contenthash].js',
      path: resolve(__dirname, '../dist')
    },
    module: {
      // vue, js, ts, css, less, html, 图片, 字体
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                appendTsSuffixTo: [/\.vue$/]
              }
            }
          ]
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: mode == 'development' ? 'style-loader' : MiniCssExtractPlugin.loader
            },
            'css-loader',
            'postcss-loader'
          ]
        },
        {
          test: /\.less$/,
          use: [
            {
              loader: mode == 'development' ? 'style-loader' : MiniCssExtractPlugin.loader
            },
            'css-loader',
            'postcss-loader',
            'less-loader'
          ]
        },
        {
          test: /\.html/,
          loader: 'html-loader'
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
      ]
    },
    plugins: [
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        template: resolve(__dirname, '../public/index.html'),
        // 压缩html代码
        minify: {
          // 移除空格
          collapseWhitespace: true,
          // 移除注释
          removeComments: true
        },
        publicPath: './'
      }),
      new ProgressBarPlugin({
        format: `  :msg [:bar] ${chalk.green.bold(':percent')} (:elapsed s)`
      })
    ],
    resolve: {
      extensions: ['.js', '.ts', '.json', '.vue', '.css', '.less', '.tsx', '.jsx'],
      alias: {
        "@": resolve(__dirname, '../src')
      }
    },
    optimization: {
      splitChunks: {
        // 配置缓存组
        cacheGroups: {
          default: {
            name: 'common',
            chunks: 'initial',
            minChunks: 2,  // 模块被引用两次以上才进行抽离
            priority: -20
          },
          vue: {
            test: /[\\/]node_modules[\\/](@?vue)[\\/]/,
            name: 'vendor-vue',
            chunks: 'all',
            priority: -9
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: -10
          },
        }
      }
    },
  }

  // 压缩css
  if (mode == 'production') {
    baseConfig.plugins.push(
      new MiniCssExtractPlugin({
        filename: 'css/[name].css'
      })
    )
  }

  return baseConfig
}
