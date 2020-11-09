const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const localIdentName = "[name]__[local]--[hash:base64:5]";

const getJSRule = (mode) => {
    const config = {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
            loader: "babel-loader",
            options: {
                presets: ["@babel/preset-env"],
            },
        },
    };
    return config;
};

const getCssStyleRule = (mode) => {
    const config = {
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
    };
    if (mode === "development") {
        config.use = [
            "style-loader",
            {
                loader: "css-loader",
                options: {
                    sourceMap: true,
                    modules: { localIdentName: localIdentName },
                },
            },
        ];
    }
    return config;
};

const getSassStyleRule = (mode) => {
    const config = {
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
    };
    if (mode === "development") {
        config.use = [
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
        ];
    }
    return config;
};

module.exports = (env, argv) => {
    const config = {
        entry: "./src/index.js",
        output: {
            path: path.join(__dirname, "dist"),
            filename: "bundle.js",
        },
        devtool: "source-map",
        module: {
            rules: [
                getJSRule(argv.mode),
                getCssStyleRule(argv.mode),
                getSassStyleRule(argv.mode),
                {
                    test: /\.[png|jpg|jpeg|gif|ico]$/,
                    use: { loader: "file-loader" },
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({ template: path.join(__dirname, "public", "index.html") }),
            new MiniCssExtractPlugin({ filename: "[name].css" }),
            new CleanWebpackPlugin(),
        ],
    };

    if (argv.mode === "development") {
        config.devtool = "eval-source-map";
        config.devServer = {
            contentBase: path.join(__dirname, "public"),
            watchContentBase: true,
            hot: true,
            liveReload: false,
            port: 3000,
            stats: "errors-only",
            open: true,
        };
        config.plugins = [
            new HtmlWebpackPlugin({ template: path.join(__dirname, "public", "index.html") }),
            new webpack.HotModuleReplacementPlugin(),
        ];
    }

    return config;
};
