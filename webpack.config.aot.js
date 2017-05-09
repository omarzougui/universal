const path = require('path');
const ngtools = require('@ngtools/webpack');
const webpack = require('webpack');
module.exports = {
  devtool: 'source-map',
  entry: {
    main: './src/main-aot.ts'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'src/dist'),
    filename: 'build.js'
  },
  plugins: [
    new ngtools.AotPlugin({
      tsConfigPath: './tsconfig-aot.json'
    })//,
    //new webpack.optimize.UglifyJsPlugin({ sourceMap: false, comments: false })
  ],
  module: {
    rules: [
      { test: /\.css$/, loader: 'raw-loader' },
      { test: /\.html$/, loader: 'raw-loader' },
      { test: /\.ts$/, loader: '@ngtools/webpack' }
    ]
  }
}
