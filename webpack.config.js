const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development';

const newVueLoader = require('vue-loader/lib/plugin');

const config = {
    mode: isDev ? 'development' : 'production',
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "bundle.[hash:8].js"
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader"
            },
            {
                test: /\.jsx$/,
                loader: "babel-loader"
            },
            {
                test: /\.(png|jpg|jpeg|svg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            name: '[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin(),
        new newVueLoader()
    ]
};
if (isDev) {
    config.module.rules.push({
        test: /\.css$/,
        use: [
            'style-loader',
            'css-loader',
            {
                loader:'postcss-loader',
                options:{
                    sourceMap:true
                }
            }
        ]
    });
    config.devtool = '#cheap-module-eval-source-map';
    config.devServer = {
        port: 8000,
        host: '0.0.0.0',
        overlay: {
            errors: true
        },
        hot:true,
        inline:true,
        stats:"errors-only"
    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
}else{
    config.entry = {
        app:path.join(__dirname, 'src/index.js'),
        vendor:['vue']
    };
    config.output.filename = '[name].[chunkhash:8].js'
    config.module.rules.push({
        test: /\.css$/,
        use: [
            MiniCssPlugin.loader,
            'css-loader'
        ]
    })
    config.plugins.push(
        new MiniCssPlugin({filename:'[name].css'})
    )
    config.optimization = { splitChunks: {name: 'vendor'}}
}

module.exports = config;