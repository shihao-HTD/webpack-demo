const { resolve } = require("./untils")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const PreloadWebpackPlugin = require("preload-webpack-plugin")

module.exports = {
  entry: {
    app: resolve("src/index.js"),
  },
  output: {
    path: resolve("dist"),
    publicPath: "/",
  },
  module: {
    rules: [
      // eslint 语法规范检查
      {
        enforce: "pre", // 前置loader, 最先执行
        test: /\.js$/,
        // exclude: /node_modules/,
        include: resolve("src"),
        loader: "eslint-loader",
        options: {
          formatter: require("eslint-friendly-formatter"),
        },
      },
      //  es6==>es5
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
      minify: {
        // 压缩 HTML 文件
        removeComments: true, // 移除 HTML 中的注释
        collapseWhitespace: true, // 删除空白符与换行符
        minifyCSS: true, // 压缩内联 css
      },
      template: "public/index.html",
      filename: "index.html",
    }),

    // 拷贝静态文件
    new CopyWebpackPlugin({
      patterns: [
        {
          from: resolve("public/css"),
          to: "css",
        },
      ],
    }),

    // 针对异步加载的包用prefetch
    new PreloadWebpackPlugin({
      rel: "prefetch",
      include: "asyncChunks",
      as(entry) {
        if (/\.css$/.test(entry)) return "style"
        if (/\.woff$/.test(entry)) return "font"
        if (/\.png$/.test(entry)) return "image"
        return "script"
      },
    }),
    // 针对同步的包使用preload
    new PreloadWebpackPlugin({
      rel: "preload",
      include: ["app", "vendors~app", "runtime"],
      as(entry) {
        if (/\.css$/.test(entry)) return "style"
        if (/\.woff$/.test(entry)) return "font"
        if (/\.png$/.test(entry)) return "image"
        return "script"
      },
    }),
  ],
}
