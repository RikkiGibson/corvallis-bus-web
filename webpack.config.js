var path = require('path');

module.exports = {
    entry: './src/js/entry.tsx',
    output: {
        filename: 'build/js/bundle.js'
    },
    devtool: 'eval',
    module: {
        preLoaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'source-map'
            }
        ],
        loaders: [
            {
                test: /\.scss$/,
                include: /src/,
                loaders: [
                    'style',
                    'css',
                    'autoprefixer?browsers=last 3 versions',
                    'sass?outputStyle=expanded'
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'url?limit=8192',
                    'img'
                ]
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loaders: [
                    'react-hot',
                    'babel?stage=0'
                ]
            },
            {
              test: /\.tsx?$/,
              exclude: /(node_modules|bower_components)/,
              loaders: [
                'react-hot',
                'babel?stage=0',
                'ts-loader'
              ]
            }
        ]
    },
    resolve: {
      root: path.resolve('.'), 
      extensions: ["", ".js", ".jsx", ".ts", ".tsx"]
    }
};
