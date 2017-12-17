
const path = require('path');
const webpack = require('webpack');

const config = {
    entry: 'src/ts/index.ts',
    output: {
        filename: 'build/js/bundle.js'
    },
    devtool: process.env.NODE_ENV === 'production'
        ? 'eval'
        : 'source-map',
    module: {
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
                test: /\.ts$/,
                exclude: /(node_modules|bower_components)/,
                loaders: [
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
