const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    devtool: "inline-source-map",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },
            {
                test: /\.s[c|a]ss$/i,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader", options: { sourceMap: true } },
                    { loader: "postcss-loader", options: { sourceMap: true } },
                    { loader: "sass-loader", options: { sourceMap: true } },
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({ title: "Webpack 5 Guide | Development" }),
    ],
};
