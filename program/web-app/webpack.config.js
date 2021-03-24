const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const ErrorOverlayPlugin = require("error-overlay-webpack-plugin");

/**
 * @type import('webpack').Configuration
 */
module.exports = {
  mode: "development",
  entry: path.join(__dirname, "src", "index"),
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
    chunkFilename: "[name].js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
    }),
    new Dotenv(),
    new ErrorOverlayPlugin(),
  ],

  module: {
    rules: [
      {
        test: /\.s?[ac]ss/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },

      {
        test: /.(t|j)sx?$/,
        include: [path.resolve(__dirname, "src")],
        exclude: [path.resolve(__dirname, "..", "..", "..", "node_modules")],
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-typescript",
            "@babel/preset-react",
            [
              "@babel/env",
              {
                targets: {
                  browsers: "last 2 chrome versions",
                },
              },
            ],
          ],
        },
      },
    ],
  },
  resolve: {
    extensions: [".json", ".js", ".ts", ".tsx"],
    alias: { "react-dom": "@hot-loader/react-dom" },
  },
  devtool: "source-map",
  devServer: {
    // inline: true,
    port: 3001,
    historyApiFallback: true,
  },
};
