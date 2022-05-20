const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
    entry: path.join(__dirname, 'src', 'index.jsx'),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist/'),
        clean: true,
    },
    mode: 'development',
    devServer: {
        port: 3000,
        static: {
            directory: path.resolve(__dirname, './dist/'),
        },
        devMiddleware: {
            index: 'index.html',
            writeToDisk: true
        }
    },
    module: {
        rules: [
            {
                test: /\.?jsx$/,
                exclude: /node_modules/,
                use: {
                    // Use `.swcrc` to configure swc
                    loader: "swc-loader",
                    options: {

                    }
                }
            },
            {
                test: /\.css/,
                use: [
                    'style-loader', 'css-loader'
                ]
            }
        ]
    },
    plugins: [
        // new HtmlWebpackPlugin(),
        // new CleanWebpackPlugin(),
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
    },
}