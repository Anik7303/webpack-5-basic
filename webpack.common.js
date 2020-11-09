const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, "dist"),
        filename: "bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: { presets: ["@babel/preset-env"] },
                },
            },
            {
                test: /\.[png|jpg|jpeg|gif|ico]$/,
                use: { loader: "file-loader" },
            },
        ],
    },
    plugins: [new HtmlWebpackPlugin({ template: path.join(__dirname, "public", "index.html") })],
};
