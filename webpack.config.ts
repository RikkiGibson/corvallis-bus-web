
import * as path from 'path';
import * as webpack from 'webpack';

const config: webpack.Configuration = {
    entry: 'src/ts/index.ts',
    output: {
        filename: 'build/js/bundle.js'
    },
    devtool: process.env.NODE_ENV === 'production'
        ? 'eval'
        : 'source-map',
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

module.exports = config;
