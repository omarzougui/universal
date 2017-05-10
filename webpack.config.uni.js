const path = require('path');
const ProgressPlugin = require("webpack/lib/ProgressPlugin");
const ngtools = require('@ngtools/webpack');
const webpack = require('webpack');
module.exports = {
  devtool: 'source-map',
  entry: {
    main: ['./src/uni/app.server.ts', './src/uni/server-aot.ts']
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'src/dist'),
    filename: 'server.js'
  },
  plugins: [
    new ngtools.AotPlugin({
      tsConfigPath: './tsconfig-aot.json'
    }),
    new ProgressPlugin()
  ],
  module: {
    rules: [
      { test: /\.css$/, loader: 'raw-loader' },
      { test: /\.html$/, loader: 'raw-loader' },
      { test: /\.ts$/, loader: '@ngtools/webpack' }
    ]
  }
}
