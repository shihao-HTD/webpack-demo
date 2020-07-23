const { resolve } = require("./untils")
const baseConfig = require("./webpack.config.base")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin")
const { merge } = require("webpack-merge")
const UglifyjsWebpackPlugin = require("uglifyjs-webpack-plugin")
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer")

const config = {
  mode: "production",
  output: {
    filename: "js/[name].[contenthash:8].js",
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
    new CleanWebpackPlugin(["dist"], {
      root: resolve(""),
    }),
    // 抽取/单独打包CSS
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:8].css",
    }),
    // 压缩JS
    new UglifyjsWebpackPlugin({
      sourceMap: true,
    }),
  ],
  optimization: {
    // 压缩css文件
    minimizer: [new OptimizeCssAssetsWebpackPlugin()],
    // 拆分打包文件
    splitChunks: {
      // chunks: 'async' // 默认值, 只对异步加载的模块单独打包
      chunks: "all", // 将从node_modules引入的模块和异步加载的模块都拆分单独打包
    },
    // 将webpack的模块引导代码单独打包
    runtimeChunk: {
      name: "runtime",
    },
    concatenateModules: true, // 打开/关闭模块合并/作用域提升
  },
  devtool: "cheap-module-source-map",
}

// 如果指定了--report配置, 就添加打包文件分析的插件
if (process.env.npm_config_report) {
  config.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = merge(baseConfig, config)
