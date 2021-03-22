const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.pcss/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.css/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
      },
      { test: /\.(png|jpe?g|gif)$/i, loader: "file-loader" },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: ["react-hot-loader/babel"],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
  },
  entry: {
    app: ["react-hot-loader/patch", "./src"],
  },
  output: {
    path: path.resolve("build"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve("src", "index.html"),
    }),
    new CleanWebpackPlugin(),
  ],
};
