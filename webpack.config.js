const path = require('path')
const BrotliGzipPlugin = require('brotli-gzip-webpack-plugin');
const webpack = require('webpack')
const process = require('process')


const env = process.env.NODE_ENV

const cfg = {
    mode: 'production',
    devtool: false,
    resolve: {
        extensions: ['.ts', '.js', '.json'],
        modules: [
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, 'src'),
        ]
    },
    entry: {
        game: './src/client/game/entry.ts'
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'public/scripts')
    },
    plugins: [
        new BrotliGzipPlugin({
            asset: '[path].br[query]',
            algorithm: 'brotli',
            test: /\.(js|css|html|svg)$/,
            threshold: 10240,
            minRatio: 0.8,
            quality: 11
        }),
        new BrotliGzipPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.(js|css|html|svg)$/,
            threshold: 10240,
            minRatio: 0.8
        }),
    ],
    optimization: {
        minimize: true,
        removeAvailableModules: true,
        concatenateModules: true,
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    }
}

if (cfg.mode == 'development') {
    //cfg.plugins.push(new webpack.EvalSourceMapDevToolPlugin({
    //    //filename: '[name].js.map',
    //    exclude: /vendors.*.*/
    //}))
}

module.exports = cfg
