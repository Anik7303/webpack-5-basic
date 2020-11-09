const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");

const common = require("./webpack.common");

const localIdentName = "[name]__[local]--[hash:base64:5]";

module.exports = merge(common, {
    devtool: "eval-source-map",
    devServer: {
        contentBase: path.join(__dirname, "public"),
        watchContentBase: true,
        hot: true,
        liveReload: false,
        port: 3000,
        stats: "errors-only",
        open: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            modules: { localIdentName: localIdentName },
                        },
                    },
                ],
            },
            {
                test: /\.s[a|c]ss$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            modules: { localIdentName: localIdentName },
                        },
                    },
                    { loader: "postcss-loader", options: { sourceMap: true } },
                    { loader: "sass-loader", options: { sourceMap: true } },
                ],
            },
        ],
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
});
