'use strict';

const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const {merge} = require('webpack-merge');

const webpackCommon = {
    entry: {
        app: ['./app/initialize'],
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env', {
                                        modules: false,
                                    },
                                ],
                            ],
                            cacheDirectory: true,
                        },
                    },
                ],
            },
            {
                test: /\.jst$/,
                use: {
                    loader: 'underscore-template-loader',
                },
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
        ],
    },
    output: {
        filename: 'app.js',
        path: path.join(__dirname, './public'),
        publicPath: '/',
    },
    plugins: [
        new MiniCssExtractPlugin({filename: 'app.css'}),
        new CopyWebpackPlugin({
            patterns: [{
                from: './app/assets/index.html',
                to: './index.html',
            }],
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            _: 'underscore',
        }),
    ],
    resolve: {
        modules: [
            path.join(__dirname, './node_modules'),
            path.join(__dirname, './app'),
        ],
    },
    resolveLoader: {
        modules: [
            path.join(__dirname, './node_modules'),
        ],
    },
};

switch (process.env.npm_lifecycle_event) {
case 'start':
case 'dev':
    module.exports = merge(webpackCommon, {
        devtool: 'inline-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            compress: true,
            port: 9000,
        },
    });
    break;
default:
    module.exports = merge(webpackCommon, {
        devtool: 'source-map',
    });
    break;
}
