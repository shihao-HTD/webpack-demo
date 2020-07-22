const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CleanWebpackPlugin = require("clean-webpack-plugin")

function resolve(dir) {
  return path.resolve(__dirname, dir)
}

module.exports = {
  entry: {
    app: resolve("src/index.js"),
  },
  output: {
    path: resolve("dist"),
    filename: "js/bundle.js",
  },
  module: {
    rules: [],
  },
  plugins: [
    // 打包html页面 并引入打包的js
    new HtmlWebpackPlugin({
      template: "public/index.html",
      filename: "index.html",
    }),
    // 每次执行打包命令 自动清除上次dist文件
    new CleanWebpackPlugin(["dist"]),
  ],

  devServer: {
    open: true,
  },
}
