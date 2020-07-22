## 1. 基本使用

0). 相关依赖包
webpack
webpack-cli
webpack-dev-server
html-webpack-plugin
clean-webpack-plugin@1.0.1
1). 能打包多个遵循 ESM 或 CommonJS 的 JS 文件
2). 将打包生成的 JS/CSS 在页面中自动引入
3). 能启动服务器运行访问项目, 并实现 live-reload
4). 自动清除打包文件夹

## 2. 打包 JS

0). 相关依赖包
babel-loader
@babel/core
@babel/preset-env
@babel/polyfill
core-js2
regenerator-runtime
@babel/plugin-transform-runtime & @babel/runtime
1). 编译 ES6 代码兼容低版本浏览器
问题 1: webpack 本身不能编译 ES6 语法 ==> 借助 babel 来处理
问题 2: babel 本身也是不能编译 ES6 语法 ==> babel 有很多用于编译 ES6 语法的插件包, 可以都下载并配置上
问题 3: 如果直接通过 babel 插件来处理太麻烦了 ==> 使用 babel 封装的包含常用插件包的大包: preset-env
问题 4: preset-env 只能编译 ES6 的语法部分, 一些新的 API(Promise/Set/Map 等)都没有处理 ==> 引入 polyfill
2). 减小 JS 打包文件
问题 5: 直接引入 polyfill 会导致应用打包文件会变大很多(几百 k) ==> 配置 useBuiltIns:'entry'只打包浏览器未实现的部分
问题 6: 当前还是打包了一些没有使用的 API 定义代码 ==> 配置 useBuiltIns:'usage'只打包使用的新 API 部分
问题 7: 默认新 API 的引入辅助函数有重复定义的问题 ===> 配置 plugin-transform-runtime 引入专门的辅助函数, 避免重复定义
3). 单独打包第三方模块 JS & 压缩 JS

## 3. 打包样式

0). 相关依赖包
css-loader
style-loader
less-loader
less
stylus-loader
stylus
sass-loader
node-sass
postcss-loader
autoprefixer
postcss-px2rem
1). 打包 css
2). 打包 css 预编译器: less/stylus/sass
3). 利用 postcss 处理 css
给 c3 样式自动添加浏览器厂商前缀
移动端适配: 将 px 自动转换为 rem
4). 抽取 css 单独打包 & 压缩 css

## webpack-dev-server 深入使用

    1). 基本功能: live-reload
    2). hot-reald / HMR
    3). proxy server
    4). history路由/Browser路由刷新404问题
    5). mock API

## devtool 配置深入理解

    1). sourceMap的理解
    2). 各组成单元理解
        source-map
        inline
        eval
        cheap
        module
    3). 最佳实践
        开发环境------devtool: 'cheap-module-eval-source-map'
        测试环境-----devtool: 'cheap-module-source-map'
        生产环境-----devtool: 'none'

## 打包文件优化

    1). 拆分打包
        单独打包第三方模块JS & 压缩JS
        抽取css单独打包 & 压缩css
    2). 异步/懒加载
        import()动态引入模块
        在特定条件下才执行import()
    3). 预加载
        针对异步模块包: 魔法注释
            /* webpackChunkName: "xxx" */
            /* webpackPreload: true */
            /* webpackPrefetch: true */
        针对所有包进行预加载处理:
            使用: preload-webpack-plugin@next
            对异步模块包使用: prefetch
            对同步模块包使用: preload
    4). 缓存
        打包文件hash化
        用于生成hash值的标识名称
            hash
            chunkhash
            contenthash
        module,chunk与bundle的关系

    5). tree-shaking(摇树)
        删除模块中向外暴露但未被使用的代码
        条件1: ES6的export暴露
        条件2: 生产环境打包压缩
    6). Scope Hoisting(作用域提升)
        针对目标: ES6模块
        以前: 每个模块都包在一个独立的函数定义中
        现在: 所有模块包在同个函数定义中
        好处: 代码少了, 函数减少很多, 运行更快
    7). 打包文件分析

## 打包优化

    加快打包速度
        1). loader增加include匹配特定条件
        2). 合理配置extensions扩展名
        3). 设置resolve.alias字段
        4). dll预打包
        5). 加快loader处理
    提升开发调试体验
        1). eslint代码规范检查
        2). eslint代码规范检查
        3). sourcemap 源码映射
        4). live-reload / hot-reload
        5). proxy解决ajax跨域
        6). mock后台接口
        7). postcss
