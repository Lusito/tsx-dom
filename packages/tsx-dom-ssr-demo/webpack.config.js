// eslint-disable-next-line import/no-extraneous-dependencies
const { merge } = require("webpack-merge");

module.exports = (config) =>
    merge(config, {
        module: {
            rules: [
                {
                    test: /\.module\.s?css$/,
                    use: [
                        { loader: "isomorphic-style-loader" },
                        {
                            loader: "css-loader",
                            options: {
                                esModule: false,
                                modules: {
                                    localIdentName: "[local]--[hash:base64]",
                                    exportLocalsConvention: "camelCaseOnly",
                                },
                                sourceMap: false,
                                importLoaders: 1,
                            },
                        },
                        "sass-loader",
                    ],
                },
            ],
        },
    });
