module.exports = {
  plugins: [
    // require("autoprefixer")(),
    require("autoprefixer")({
      browsers: ["Android >= 4.0", "iOS >= 7"],
    }),
    // require("postcss-px2rem")({
    //   unitRem: 37.5,
    // }),
  ],
}
