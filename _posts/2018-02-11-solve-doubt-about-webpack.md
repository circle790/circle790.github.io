---
layout: post
#标题配置
title:  "解决对于webpack的疑点盲点"
#时间配置
date:   2018-02-11 23:28:00 +0800
categories: Tutorials
tag: webpack
---

* content
{:toc}


介绍
------------------------

>让一切变得简单

webpack 作为一个现代 JavaScript 应用程序的静态模块打包器(module bundler),将应用中的各类文件都视为模块来处理，的确让**一切变得简单**。
作为一个热衷者，我却没有充分的理解，不知何时搜到了[webpack中文文档](https://doc.webpack-china.org/concepts)就像是在深山洞穴中的发现了绝世秘籍一样，得好好钻研一番了。

记录
------------------------

- **output**中**path**与**publicPath**

`path`导出目录为真实绝对路径（必选项），`publicPath`为项目中的所有资源指定一个基础路径，不知道的情况下可以留空。

[了解更多Public Path(公共路径)](http://www.css88.com/doc/webpack2/guides/public-path/)

- **resolve**中**alias**

设置引用的文件别名，方便引用，vue-cli中定义`'@': resolve('src')`
例如：引用bootstrap地址简写

```javascript
resolve: {
	alias: {
		// 自定义引用模块名称：文件真实地址
		boot: path.resolve(__dirname, 'plugins/bootstrap/dist')
	}
}
```


- **externals**

配置提供「不从 bundle 中引用依赖」的方式，防止将某些 import 包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展包(external package)。

例如，从 CDN 引入jQuey，而不是把它打包：
```html
<script src="https://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"></script>
<script>
// webpack.config.js
externals: {
	jquery: 'jQuery'
}
</script>
```

- **plugins**

`Webpack`整个生命周期使用的插件。由于 `plugin` 可以携带参数/选项，必须在 `wepback` 配置中，向 `plugins` 属性传入 `new` 实例。

- new webpack.DefinePlugin(definitions)

创建一个在编译时可以配置的全局常量。比如，用一个全局的常量来决定开发模式和发布模式构建时不同的行为。

```javascript
plugins: {
	new webpack.DefinePlugin({
		'process.env': env
	})
}
```

- **new webpack.ProvidePlugin**

`new webpack.ProvidePlugin({identifier1: 'module1', /* ... */})`

自动加载模块。任何时候，当 identifier 被当作未赋值的变量时， module 就会自动被加载，并且 identifier 会被这个 module 输出的内容所赋值。

```javascript
new webpack.ProvidePlugin({
	$: 'jquery',
	jQuery: 'jquery'
})
// in a module
$('#item'); // <= 起作用
jQuery('#item'); // <= 起作用
// $ 自动被设置为 "jquery" 输出的内容
```

[了解更多ProvidePlugin](http://www.css88.com/doc/webpack2/plugins/provide-plugin/)

- **new ExtractTextPlugin**

提取单独css文件

- **new HtmlWebpackPlugin**

制定html模板动态插入js，css资源标签

- **new webpack.optimize.CommonsChunkPlugin**

提取不同的 bundle 中所有公共模块，并且将他们加入公共 bundle 。如果公共 bundle 不存在，那么将会创建一个。

```javascript
new webpack.optimize.CommonsChunkPlugin({
	name: 'manifest' // name是提取公共代码块后js文件的名字。
	chunks: ['vendor']  // 只有在vendor中配置的文件才会提取公共代码块至manifest的js文件中
	minChunks: 3	// 模块必须被至少3个入口chunk 共享
	minChunks: Infinity,
  	// 随着 入口chunk 越来越多，这个配置保证没其它的模块会打包进 公共chunk
})
```

[了解更多CommonsChunkPlugin](http://www.css88.com/doc/webpack2/plugins/commons-chunk-plugin/)

- **vendors及manifest文件**

`vendor` 的 `hash` 在每次构建中都会改变，浏览器就重新加载文件，使用`manifest`文件可以从浏览器缓存机制中受益。

[ 了解更多代码分割](http://www.css88.com/doc/webpack2/guides/code-splitting-libraries/)

ps：更多内容...尽情期待...

扩展阅读
------------------------

[webpack中文文档](https://doc.webpack-china.org/concepts/)





