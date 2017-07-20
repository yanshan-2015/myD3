/**
 * Created by yanshan on 2017/7/19.
 */
let webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
    context: __dirname + "/src",
    entry: {
        index: './js/index.js',
        vendor: ['properScreen.js','./js/lib/properScreen_css.js']
    },
    output: {
        filename: "js/[name].bundle.js"
    },
    devServer: {
        contentBase: __dirname + '/src',
        port: 3000
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            filename: "js/commons.js",
            minChunks: 3,
        }),
        new OpenBrowserPlugin({
            url: 'http://localhost:3000/views/index.html'
        })
    ]
};