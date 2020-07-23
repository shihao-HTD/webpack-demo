//直接引入polyfill 导致打包的JS文件增大了几百K 所以需要实现polyfill的按需打包
// 不需要手动引入polyfill
// import "@babel/polyfill"

// webpack能自身打包es6模块化和commonJs模块化
import { add1 } from "./js/math1"
const { add2 } = require("./js/math2")

import $ from "jquery"
// 引入图片
import logo from "./assets/image/logo.png"

// 引入css文件
import "./assets/css/test1.css"
import "./assets/css/test2.less"
import "./assets/css/test3.scss"
import "./assets/css/test4.styl"

console.log(add1(4, 6))
console.log(add2(5, 10))

// @babel/preset-env 只能编译ES6新增的语法部分 然而并不能编译ES6 新增的API 所以需要引入polyfill
const fn = () => {
  console.log("arrow()")
}
fn()
new Promise(() => {})
Array.from(new Set([1, 4]))

class A {}

console.log("image", logo)
const $img1 = $("<img>").attr("src", logo).addClass("avatar1")
const $img2 = $("<img>").attr("src", logo).addClass("avatar2")
const $img3 = $("<img>").attr("src", logo).addClass("avatar3")
$("body").append($img1).append($img2).append($img3)

console.log("yyyy")
// 代码分割
$img2.click(() => {
  import(/* webpackChunkName: "xxx" */ "./js/asynModule1").then(
    (asyncModule) => {
      asyncModule.study()
    }
  )
})
$img3.click(() => {
  import(/* webpackChunkName: "yyy" */ "./js/asyncModule2").then(
    (asyncModule) => {
      asyncModule.study2()
    }
  )
})
