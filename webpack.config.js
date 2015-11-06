var path = require('path');

APP_PATH = path.join(__dirname, 'app');
BUILD_PATH = path.join(__dirname, 'build');

module.exports = {
  context: APP_PATH,
  entry: {
    javascript: './index.js',
    html: './index.html'
  },
  output: {
    path: BUILD_PATH,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel?presets=react']
      },
      {
        test: /\.html$/,
        loader: "file?name=[name].[ext]",
      }
    ]
  }
};
