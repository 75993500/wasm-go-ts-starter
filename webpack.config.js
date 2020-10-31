const path = require('path');

const config = {
  mode: 'production',
  entry: {
    physGo: './src/index.ts'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'phys-go.js',
    globalObject: 'this',
    libraryTarget: 'umd',
    library: 'physGo'
  },
  module: {
    unknownContextCritical : false,
    exprContextCritical: false,
    rules: [
      {
        test: /\.go/,
        use: [
          {
            loader: 'golang-wasm-async-loader'
          }
        ]
      },
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
              configFile: path.resolve(__dirname, './tsconfig.json'),
            },
          },
        ],
        exclude: /node_modules/,
      },
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.go']
  },
  node: {
    fs: 'empty'
  }
};

module.exports = function (env) {
  console.log('~~~~~', env);
  if (env === 'dev') {
    config.mode = 'development';
    config.devtool = 'inline-source-map';
  }
  return config;
}
