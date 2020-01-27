const path = require('path');

module.exports = {
    entry: {
        main: './src/index.js',
        editor: './src/editor/editor.js',
        create: './src/create/create.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.(pdf|md)$/,
                loader: 'file-loader',
                options: {
                    name: 'example/[name].[ext]',
                }
            },
            {
                test: /(_redirects)$/,
                loader: 'file-loader',
                options: {
                    name: '_redirects',
                }
            },
            {
                test: /\.(html)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                }
            },
            {
                test: /\.(css)$/,
                use: ['style-loader', 'css-loader'],
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 5000,
        historyApiFallback: {
            rewrites:[                
                {from: /^\/$/, to:'dist/index.html'}
            ]
        }
    },

};