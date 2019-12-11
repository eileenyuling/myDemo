const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

const baseDir = path.resolve(__dirname, './examples/')
module.exports = {
  mode: 'development',
  entry: fs.readdirSync(baseDir).reduce((entries, dir) => {
    const fullDir = path.join(baseDir, dir)
    const entry = path.join(fullDir, 'app.ts')
    if (fs.statSync(fullDir).isDirectory()) {
      entries[dir] = ['webpack-hot-middleware/client?reload=true', entry]
    }
    return entries
  }, {}),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
    publicPath: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        use: [
          {
            loader: 'tslint-loader'
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.tsx?$/,
        use: [{
          loader: 'ts-loader',
          options: {
            transpileOnly: true
          },
        }],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}