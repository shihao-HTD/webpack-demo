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
    // 解决ajax请求跨域问题
    proxy: {
      // 处理以/api开头路径的请求
      "/api": {
        target: "http://localhost:4000", // 转发的目标地址
        pathRewrite: {
          "^/api": "", // 转发请求时去除路径前面的/api
        },
        changeOrigin: true, // 支持跨域, 如果协议/主机也不相同, 必须加上
      },
    },
    // 解决返回页面404问题
    // historyApiFallback: true,
    historyApiFallback: {
      // 所有前台404的请求都返回index页面
      rewrites: [{ from: /.*/, to: "/index.html" }],
    },
  },
  devtool: "cheap-module-eval-source-map",
}

module.exports = merge(baseConfig, config)
