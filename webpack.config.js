/**
 * Created by Mr.Yuan on 2017/7/19 0019.
 */
let webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    OpenBrowserPlugin = require('open-browser-webpack-plugin'),
    FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
module.exports = {
    context: __dirname + "/src",
    entry: {
        index: "./js/index.js",
        vendor: ['./js/lib/properScreen.js','./js/lib/properScreen_css.js'],
    },
    output: {
        filename: "js/[name].bundle.js",
    },
    devServer: {
        contentBase: __dirname +'/src',
        port: 3000,
    },
    resolve: {
        alias: {
            'jquery': __dirname +'/src/js/lib/jQuery1.11.3.min.js'
        }
    },
    module: {
        loaders:[
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
                loader: ['style-loader','css-loader']
            },
            {
                test: /\.less$/,
                loader:  ['style-loader','css-loader','less-loader']
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
    plugins: [
        new webpack.DefinePlugin({
            "process.env":{
                NODE_ENV:JSON.stringify('development')
            }
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            filename: "js/commons.js",
            minChunks: 3,
        }),
        new HtmlWebpackPlugin({
            filename: 'views/index.html',
            template: 'views/index.html',
            chunks: ['index','vendor'],
        }),
        new OpenBrowserPlugin({
            url: 'http://localhost:3000/views/index.html'
        }),
        new FriendlyErrorsPlugin()
    ]
};
