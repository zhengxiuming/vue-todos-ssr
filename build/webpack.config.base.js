const path = require('path');
const newVueLoader = require('vue-loader/lib/plugin');

const config = {
    entry: path.join(__dirname, '../client/index.js'),
    output: {
        path: path.join(__dirname, '../dist'),
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
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_module/
            },
            {
                test: /\.(png|jpg|jpeg|svg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            name: 'resources/[path][name]-[hash:8].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new newVueLoader()
    ]
};

module.exports = config;