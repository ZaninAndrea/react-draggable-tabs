var path = require('path');
module.exports = {
  entry: './example/index.js',
  output: {
    path: path.resolve(__dirname, 'example'),
    filename: 'index.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components|build)/,
        use: {
          loader: 'babel-loader'
        }
    },
    {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  }
};
