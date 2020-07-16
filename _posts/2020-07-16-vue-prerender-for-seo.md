---
layout: post
#标题配置
title:  "VUE项目预渲染做SEO"
#时间配置
date:   2020-07-16 14:25:00 +0800
categories: Tutorials
tag: VUE
---

* content
{:toc}

seo是spa项目的痛点
------------------------

网络爬虫在爬取网页内容的时候，需要分析页面内容，主要有以下几点：

1、从 meta 标签中读取 keywords 、 description 的内容。

2、根据语义化的 html 的标签爬取和分析内容。一个整体都是用 div 标签的网站和正确使用了 html5 标签的效果是不一样的。

3、读取 a 标签里的链接，通过 a 标签的链接可以跳转到别的网站。（爬虫是先跳转，还是继续爬内容再跳转，就看算法是广度优先还是深度优先了）

4、像 h1 - h6 标签是具有不同程度的强调意义的。 一般将 h1 视为重要内容。同样有强调内容还有 strong 、 em 标签。
爬虫在爬取的过程中，不会去执行js，所以隐藏在js中的跳转也不会获取到。

**爬虫在爬取的过程中，不会去执行js**，所以隐藏在js中的跳转也不会获取到。

spa正好就踩到了痛点，只有一个主要的页面（index.html），而且页面里的内容还很少，通常只有 router-view 或者带有 id 的 div 标签。其跳转和业务逻辑的行为都是靠执行js才行的。

> 据说google已经支持爬取spa。

prerender-spa-plugin预渲染
------------------------

使用 npm 或 yarn 安装 prerender-spa-plugin 和 vue-meta-info。

在webpack中配置 prerender-spa-plugin。

配置只需要在 build 的时候可以生成预渲染好的html，所以应该配置在 build/webpack.prod.conf.js 这个文件。

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.conf')

const PrerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer
 
const webpackConfig = merge(baseWebpackConfig, {
    plugins: [
        // vue-cli生成的配置中就已有这个了，不要动
        new HtmlWebpackPlugin({
            filename: config.build.index,
            template: 'index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            chunksSortMode: 'dependency'
        }),
        
        // 在vue-cli生成的文件的基础上，只有下面这个才是我们要配置的
        new PrerenderSPAPlugin({
            // 生成文件的路径，也可以与webpack打包的一致。
            // 下面这句话非常重要！！！
            // 这个目录只能有一级，如果目录层次大于一级，在生成的时候不会有任何错误提示，在预渲染的时候只会卡着不动。
            staticDir: path.join(__dirname, '../dist'),
                
            // 对应自己的路由文件，比如index有参数，就需要写成 /index/param1。
            routes: ['/', '/index', '/skin', '/slimming', '/exercise', '/alPay', '/wxPay'],
            
            // 这个很重要，如果没有配置这段，也不会进行预编译
            renderer: new Renderer({
                inject: {
                  foo: 'bar'
                },
                headless: false,
                // 在 main.js 中 document.dispatchEvent(new Event('render-event'))，两者的事件名称要对应上。
                renderAfterDocumentEvent: 'render-event'
            })
        })
    ]
})
```
在 webpack.prod.conf.js 配置完成之后，然后再 main.js 里改成如下所示：
```js
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
    
    /* 这句非常重要，否则预渲染将不会启动 */
    mounted () {
        document.dispatchEvent(new Event('render-event'))
    }
})

```
运行一下`npm run build`,看生成的`dist`的目录里是不是有每个路由名称对应的文件夹。
然后找个目录里的`index.html`用IDE打开，看文件内容里是否有该文件应该有的内容。有的话，这步就成功了。



使用 vue-meta-info
------------------------

vue-meta-info就是vue的一个组件而已。 在 main.js 中写上

```js
import MetaInfo from 'vue-meta-info'

Vue.use(MetaInfo)
```
在 xxx.vue 文件里写上以下代码。这些代码会转换成网页的 meta 标签里的内容。

```js
export default {
    metaInfo: {
        title: '我是一个title',
        meta: [
            {
                name: 'keywords',
                content: '关键字1,关键字2,关键字3'
            },
            {
                name: 'description',
                content: '这是一段网页的描述'
            }
        ]
    }
}
```

注意
------------------------

预渲染方式下的`route`采用`history`模式，否则每个index.html文件的内容都会是一样的。`history`模式下的`route`，将不会以`hash`的形式展示，也就是说，URL里没有 # 了。

---------
扩展阅读


---------
