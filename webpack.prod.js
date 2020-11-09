const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const common = require("./webpack.common");

const localIdentName = "[name]__[local]--[hash:base64:5]";

module.exports = merge(common, {
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
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
                    MiniCssExtractPlugin.loader,
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
    plugins: [new MiniCssExtractPlugin({ filename: "[name].css" }), new CleanWebpackPlugin()],
});
