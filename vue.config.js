// const Config = require('webpack-chain')
const path = require('path')

const debug = process.env.NODE_ENV !== 'production'

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  assetsDir:           undefined,
  productionSourceMap: false,

  css: {
    sourceMap: debug,

    // Always false in dev, make false for production
    extract: false
  },

  pwa: {
    name: 'Vue D3 Workshop'
  },

  baseUrl:   undefined,
  outputDir: undefined,
  parallel:  undefined,

  /**
   * @param {Config} config
   */
  configureWebpack: config => {
    // if (process.env.NODE_ENV === 'production') {
    const CopyWebpackPlugin = require('copy-webpack-plugin')
    config.plugins.push(
      new CopyWebpackPlugin([{
        from:   resolve('static'),
        ignore: ['.*'],
        to:     'static'
      }])
    )

    config.module.rules.push({
      test: /\.md$/,
      use:  [{
        loader: 'html-loader'
      },
      {
        loader:  'markdown-loader',
        options: {
          /* your options here */
        }
      }
      ]
    })
  },

  runtimeCompiler: true,
  lintOnSave:      undefined
}