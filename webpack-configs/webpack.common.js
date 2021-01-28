const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.pcss/,
        use: ["style-loader", "css-loader", "postcss-loader"]
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      }
    ]
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx"]
  },
  entry: {
    app: path.resolve( "src", "index.tsx")
  },
  output: {
    path: path.resolve( "build")
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve( "src", "index.html")
    }),
    new CleanWebpackPlugin()
  ],
};
