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
    rules: [
      // es6==>es5
      {
        test: /\.js$/,
        include: [resolve("src")],
        loader: "babel-loader",
      },
      // 打包图片
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 1024 * 5, //把小于 5kb 的文件转成 Base64 的格式
              name: "img/[name].[ext]", // 内变化hash变化
            },
          },
        ],
      },
      // 打包字体
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/, // 字体
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10240,
              name: "fonts/[name].[hash:8].[ext]",
            },
          },
        ],
      },
      // 打包音视频
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10240,
              name: "static/media/[name].[hash:8].[ext]",
            },
          },
        ],
      },
    ],
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
