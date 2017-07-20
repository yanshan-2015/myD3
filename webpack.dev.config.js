/**
 * Created by yanshan on 2017/7/19.
 */
let webpack = require('webpack');
let OpenBrowserPlugin = require('open-browser-webpack-plugin');
let HtmlPlugin = require('html-webpack-plugin');
let FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

module.exports = {
    context: __dirname + "/src",
    entry: {
        index: './js/index.js',
        vendor: ['./js/lib/properScreen.js','./js/lib/properScreen_css.js']
    },
    output: {
        filename: "js/[name].bundle.js"
    },
    devServer: {
        contentBase: __dirname + '/src',
        port: 3000
    },
    module: {
        loaders: [
            {
                test: /\.html$/,
                loader: "html-loader?-minimize",
                options: {
                    attrs:'img:src img:data-src'
                }
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.css$/,
                loaders: ['style-loader','css-loader']
            },
            {
                test: /\.less$/,
                loaders:  ['style-loader','css-loader','less-loader']
            },
            {
                test: /\.scss$/,
                loaders: ['style-loader','css-loader','sass-loader']
            },
            {
                test:/\.(png|jpg)$/,
                loader: 'url-loader',
                options: { limit: 1048576 }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: { limit: 1048576 }
            }
        ]
    },
    resolve: {
        alias: {
            'jquery': __dirname +'/src/js/lib/jQuery1.11.3.min.js'
        }
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            filename: "js/commons.js",
            minChunks: 3,
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jquery: 'jquery'
        }),
        new OpenBrowserPlugin({
            url: 'http://localhost:3000/views/index.html'
        }),

        new HtmlPlugin({
            filename: 'views/index.html',
            template: 'views/index.html',
            chunks: ['index','vendor']
        }),
        new FriendlyErrorsPlugin()
    ]
};
