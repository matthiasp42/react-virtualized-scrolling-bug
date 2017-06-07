var webpack = require('webpack');
var path = require('path');

module.exports = {
    context: __dirname,
    devtool: "inline-sourcemap",
    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        "./entry.js"
    ],
    output: {
        path: __dirname,
        filename: "bundle.js",
        publicPath: "/"
    },
    module: {
        loaders: [
            { test: /\.json$/, loader: "json-loader" },
            {
                test: /\.css$/,
                loader: 'style-loader',
            },
            {
                test: /\.css$/,
                exclude: /(style.css|GLOBAL_CSS|node_modules)/,
                loader: 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
            },
            {
                test: /\.css$/,
                include: /(style.css|GLOBAL_CSS|node_modules)/,
                loader: ['css-loader']
            },
            {
                test: /\.jsx?$/,
                exclude: [
                    /(bower_components)/,
                    //This is a known issue in their github.
                    /node_modules\/(?!react-onclickoutside)/
                ],

                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-0'],
                    plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties'],
                }
            },
            { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ]
}