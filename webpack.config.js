let path = require('path')
let webpack = require('webpack')
let ExtractTextPlugin = require('extract-text-webpack-plugin')
let BrowserSyncPlugin = require('browser-sync-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, './src/app.js'),
  output: {
    filename: './dist/js/bundle.js'
  },
  resolve: {
    alias: {
        $: "jquery/src/jquery"
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3001
    })
  ],
  module: {
    rules: [
      {
        test: /\.(sass|scss)$/,
        use: [
          'style-loader',
          'raw-loader',
          'sass-loader',
        ]
      }
    ]
  }
}