const paths = require('path');

module.exports = {
  entry: require.resolve('./index.js'),
  output: {
    filename: './dist/hirnfick.js',
    path: paths.resolve(__dirname, ''),
    library: 'hirnfick',
    libraryTarget: 'umd',
  },
  target: 'web',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        options: {
          presets: ['@babel/preset-env'],
        },
      },
    ],
  },
};
