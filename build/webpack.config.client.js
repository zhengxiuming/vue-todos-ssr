const path = require('path');
const webpack = require('webpack');
const MiniCssPlugin = require('mini-css-extract-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

const isDev = process.env.NODE_ENV === 'development';

let config;
const devServer = {
    port: 8000,
    host: '0.0.0.0',
    overlay: {
        errors: true
    },
    hot:true,
    inline:true,
    stats:"errors-only"
}
let defaultPlugins = [new htmlWebpackPlugin()];

if (isDev) {
    config = merge(baseConfig,{
        mode:'development',
        devtool:'#cheap-module-eval-source-map',
        module:{
            rules:[
                {
                    test: /\.css$/,
                    use: [
                        'vue-style-loader',
                        'css-loader',
                        {
                            loader:'postcss-loader',
                            options:{
                                sourceMap:true
                            }
                        }
                    ]
                }
            ]
        },
        devServer,
        plugins:defaultPlugins.concat([
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin()
        ])
    });
}else{
    config = merge(baseConfig,{
        mode:'production',
        entry:{
            app:path.join(__dirname, '../client/index.js'),
            vendor:['vue']
        },
        output:{
            filename:'[name].[chunkhash:8].js'
        },
        module:{
            rules:[
                {
                    test: /\.css$/,
                    use: [
                        MiniCssPlugin.loader,
                        'css-loader'
                    ]
                }
            ]
        },
        plugins:defaultPlugins.concat([
            new MiniCssPlugin({filename:'[name].css'})
        ]),
        optimization:{
            splitChunks:{
                name: 'vendor'
            }
        }
    })
}

module.exports = config;