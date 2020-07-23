const { resolve } = require("./untils")
const baseConfig = require("./webpack.config.base")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin")
const {merge} = require("webpack-merge")

const config = {
  mode: "production",
  output: {
    filename: "js/[name].js",
  },
  module: {
    rules: [
      // 处理css
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      // 处理less
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "less-loader",
        ],
      },
      // 处理sass
      {
        test: /\.(scss|sass)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      // 处理 stylus
      {
        test: /\.(styl|stylus)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "stylus-loader",
        ],
      },
    ],
  },
  plugins: [
    // 每次执行打包命令 自动清除上次dist文件
    new CleanWebpackPlugin(["dist"]),
    // 抽取/单独打包CSS
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),
  ],
  optimization: {
    // 压缩css文件
    minimizer: [new OptimizeCssAssetsWebpackPlugin()],
  },
}
module.exports = merge(baseConfig, config)
