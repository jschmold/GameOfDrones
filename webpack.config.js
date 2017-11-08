let UglifyJSPlugin = require("uglifyjs-webpack-plugin")

module.exports = {
    entry: "./src/index.ts",
    output: {
        filename: "build.js",
        path: __dirname 
    },

    resolve: {
        extensions: [".ts", ".js", ".json"]
    },

    module: {
        rules: [
            { test: /\.ts?$/, loader: "awesome-typescript-loader" }
        ]
    },
    plugins: [
        new UglifyJSPlugin()
    ]
};