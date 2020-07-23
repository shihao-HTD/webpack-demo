const baseConfig = require("./webpack.config.base")
const webpack = require("webpack")
const { merge } = require("webpack-merge")

const config = {
  mode: "development",
  output: {
    filename: "[name].js",
  },
  module: {
    rules: [
      // 处理css
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      // 处理less
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "postcss-loader", "less-loader"],
      },
      // 处理sass
      {
        test: /\.(scss|sass)$/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      },
      // 处理 stylus
      {
        test: /\.(styl|stylus)$/,
        use: ["style-loader", "css-loader", "postcss-loader", "stylus-loader"],
      },
    ],
  },
  plugins: [
    // 热模替换
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    open: true,
    hot: true,
  },
}

module.exports = merge(baseConfig, config)
