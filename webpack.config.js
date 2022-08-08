const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
const inject = require("@rollup/plugin-inject");
const webpack = require('webpack');

module.exports = {
    resolve: {
        extensions: [ '.ts', '.js' ],
        fallback: {
            "stream": require.resolve("stream-browserify"),
            "buffer": require.resolve("buffer")
        }
    },
    build: {
        rollupOptions: {
            plugins: [inject({ Buffer: ['buffer', 'Buffer'] })],
        },
    },
    plugins: [
        new NodePolyfillPlugin(),
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
    ],
}