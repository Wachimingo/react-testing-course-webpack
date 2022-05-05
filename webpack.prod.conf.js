const path = require("path")

module.exports = {
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
        filename: 'main.bundle.js',
        path: path.resolve(__dirname, './dist/'),
        clean: true
    },
    mode: 'production',
    module: {

    },
    plugins: {

    }
}