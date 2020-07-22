//直接引入polyfill 导致打包的JS文件增大了几百K 所以需要实现polyfill的按需打包
// 不需要手动引入polyfill
// import "@babel/polyfill"

// webpack能自身打包es6模块化和commonJs模块化
import { add1 } from "./js/math1"
const { add2 } = require("./js/math2")

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
