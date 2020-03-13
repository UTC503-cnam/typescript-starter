const { resolve } = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const cssLoaders =
  [
    {
      loader: 'css-loader',
      options: { importLoaders: 1 }
    }
  ]

let config = {
  entry: resolve('./src/App.ts'),
  mode: 'development',
  watch: true,
  output: {
    path: resolve('./dist'),
    filename: 'bundle.min.js'
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    modules: [
      resolve('./node_modules'),
      resolve('./src'),
      resolve('./src/assets/javascripts')
    ]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: ['awesome-typescript-loader?module=es6'],
        exclude: [/node_modules/]
      },
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        enforce: 'pre'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: cssLoaders
        })
      },
      {
        test: /\.(woff2?|eot|ttf|otf|wav)(\?.*)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.(png|svg|jpe?g|gif)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 8192 }
          },
          {
            loader: 'img-loader',
            options: { enabled: true }
          }
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'stylesheets/application.min.css',
      disable: true
    }),
  ],
  devServer: {
    contentBase: resolve('./'),
    compress: true,
    historyApiFallback: true,
    port: 3210
  }
}

module.exports = config