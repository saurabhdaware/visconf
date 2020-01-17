const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.(pdf|md)$/,
                loader: 'file-loader',
                options: {
                    name: 'presentation/[name].[ext]',
                }
            },
            {
                test: /\.(html)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                }
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 5000
    },

};