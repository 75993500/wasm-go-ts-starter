const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: './src/demo.ts',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'demo.js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'tslint-loader',
            options: {
              configFile: path.resolve(__dirname, './tslint.json'),
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              // 指定特定的ts编译配置，为了区分脚本的ts配置
              configFile: path.resolve(__dirname, './tsconfig.json'),
            },
          },
        ],
        exclude: /node_modules/,
      },
    ]
  },
  plugins: [
    new CopyWebpackPlugin({patterns:[
        { from: 'src', flatten: true, globOptions: {ignore: ['**.ts']}}, // copy index.html and jquery3.2.1.min.js
        { from: '../dist/*.wasm'}, // copy tool.wasm
      ]})
  ],
  devServer: {
    port: 3000,
    host: '0.0.0.0',
    publicPath: '/',
    inline: true,
    hot: true,
  },
};

module.exports = function (env) {
  return config;
}
