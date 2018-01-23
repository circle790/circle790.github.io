---
layout: post
#标题配置
title:  "vuejs如何渲染页面"
#时间配置
date:   2018-01-23 19:30:00 +0800
categories: Tutorials
tag: Javascript
---

* content
{:toc}


介绍
------------------------

一、伴随vue2.0的正式发布，其在体积优化（相比1.0减少了50%）、性能提升（相比1.0提升60%）、API优化等各方面更上一层楼，简单易上手的学习曲线，友好的官方文档，配套的构建工具，vuejs大放异彩，成为主流的MVVM框架。

二、本文主要通过对于Vue.js 2.0源码的分析，从代码层面解析Vue.js前端渲染的实现原理，深入地理解整个框架的思想。

Vue的初始化
------------------------

Vue.js最基本的使用，就是在HTML引入Vue.js的库文件，并写如下一段代码：

```javascript
var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!'
    }
})
```

`new Vue`，本质就是生成一个Vue的对象，我们来了解一下这个生成Vue对象的过程是怎样的：

首先，Vue的入口是`/src/entries/web-runtime-with-compiler.js`，这是由config.js配置文件决定的。

![config]({{ '/styles/images/config.jpg' | prepend: site.baseurl  }})

这个入口文件中`import`了很多文件，其中有一条主要的脉络：
`/src/entries/web-runtime-with-compiler.js`

引用了`/src/entries/web-runtime.js`

引用了`/src/core/index.js` 

引用了`/src/core/instance/index.js`

其中`/src/core/instance/index.js`是最核心的初始化代码，其中：

![core]({{ '/styles/images/core.jpg' | prepend: site.baseurl  }})

红框部分，就是整个Vue的类的核心方法。其含义给读者解读一下：

```javascript
//初始化的入口，各种初始化工作
initMixin(Vue) 
//数据绑定的核心方法，包括常用的$watch方法
stateMixin(Vue)
//事件的核心方法，包括常用的$on，$off，$emit方法
eventsMixin(Vue)
//生命周期的核心方法
lifecycleMixin(Vue)
//渲染的核心方法，用来生成render函数以及VNode
renderMixin(Vue)
```
其中`new Vue`就是执行下面的这个函数：

![newVue.js]({{ '/styles/images/newVue.jpg' | prepend: site.baseurl  }})

`_init`方法就是`initMixin`中的`_init`方法。

![_init]({{ '/styles/images/_init.jpg' | prepend: site.baseurl  }})

至此，程序沿着这个_init方法继续走下去。

Vue的渲染逻辑——Render函数
------------------------

在定义完成Vue对象的初始化工作之后，本文主要是讲渲染部分，那么我们接上面的逻辑，看Vue.js是如何渲染页面的。在上图中我们看到有一个`initRender`的方法：

![initRender]({{ '/styles/images/initRender.jpg' | prepend: site.baseurl  }})

在该方法中会执行红框部分的内容：

![$mountFun]({{ '/styles/images/$mountFun.jpg' | prepend: site.baseurl  }})

而$mount方法就是整个渲染过程的起始点。具体定义是在/src/entries/web-runtime-with-compiler.js中，根据代码整理成流程图：

![mountFlow]({{ '/styles/images/mountFlow.jpg' | prepend: site.baseurl  }})

由此图可以看到，在渲染过程中，提供了三种渲染模式，自定义`Render`函数、`template`、`el`均可以渲染页面，也就是对应我们使用Vue时，三种写法：

1、 自定义Render函数

```javascript
Vue.component('anchored-heading', {
    render: function (createElement) {
        return createElement(
            'h' + this.level,   // tag name 标签名称
            this.$slots.default // 子组件中的阵列
        )
    },
    props: {
        level: {
            type: Number,
            required: true
        }
    }
})
```

2、 template写法

```javascript
var vm = new Vue({
    data: {
        // 以一个空值声明 `msg`
        msg: ''
    },
    template: '<div>{{msg}}</div>'
})
```

3、el写法（这个就是入门时最基本的写法）

```javascript
var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!'
    }
})
```

这三种渲染模式最终都是要得到Render函数。只不过用户自定义的Render函数省去了程序分析的过程，等同于处理过的Render函数，而普通的template或者el只是字符串，需要解析成AST，再将AST转化为Render函数。

*记住一点，无论哪种方法，都要得到Render函数。*

我们在使用过程中具体要使用哪种调用方式，根据具体的需求来。

* 如果是比较简单的逻辑，使用template和el比较好，因为这两种都属于声明式渲染，对用户理解比较容易，但灵活性比较差，因为最终生成的Render函数是由程序通过AST解析优化得到的；

* 而使用自定义Render函数相当于人已经将逻辑翻译给程序，能够胜任复杂的逻辑，灵活性高，但对于用户的理解相对差点。

Vue的渲染逻辑——VNode对象&patch方法
------------------------

根据上面的结论，我们无论怎么渲染，最终会得到`Render`函数，而`Render`函数的作用是什么呢？我们看到在`/src/core/instance/lifecycle.js`中有这么一段代码：

```javascript
vm._watcher = new Watcher(vm, () => {
    vm._update(vm._render(), hydrating)
}, noop);
```

意思就是，通过`Watcher`的绑定，每当数据发生变化时，执行`_update`的方法，此时会先执行`vm._render()`，在这个`vm._render()`中，我们的`Render`函数会执行，而得到`VNode`对象。

![vnode]({{ '/styles/images/vnode.jpg' | prepend: site.baseurl  }})

`VNode`对象是什么？`VNode`就是Vue.js 2.0中的`Virtual DOM`，在Vue.js 2.0中，相较Vue.js 1.0引入了`Virtual DOM`的概念，这也是Vue.js 2.0性能提升的一大关键。`Virtual DOM`有多种实现方式，但基本思路都是一样的，分为两步：

1. Javascript模拟DOM模型树

在Vue.js 2.0中Javascript模拟DOM模型树就是`VNode`，`Render`函数执行后都会返回`VNode`对象，为下一步操作做准备。在`/src/core/vdom/vnode.js`中，我们可以看到`VNode`的具体数据结构：

![vnodeAttr]({{ '/styles/images/vnodeAttr.jpg' | prepend: site.baseurl  }})

VNode的数据结构中还有`VNodeData`、`VNodeDirective`、`VNodeComponentOptions`，这些数据结构都是对DOM节点的一些描述，本文不一一介绍。读者可以根据源码来理解这些数据结构。

（PS：Vue.js使用了flow，标识了参数的静态类型，对理解代码很有帮助^_^）

2. DOM模型树通过DOM Diff算法查找差异，将差异转为真正DOM节点

我们知道`Render`函数执行生成了`VNode`，而`VNode`只是`Virtual DOM`，我们还需要通过`DOM Diff`之后，来生成真正的DOM节点。在Vue.js 2.0中，是通过`/src/core/vdom/patch.js`中的`patch(oldVnode, vnode ,hydrating)`方法来完成的。

该方法有三个参数`oldVnode`表示旧`VNode`，`vnode`表示新`VNode`，`hydrating`表示是否直接使用服务端渲染的DOM元素，这个本文不作讨论，有机会再详细介绍。

其主要逻辑为当`VNode`为真实元素或旧的`VNode`和新的`VNode`完全相同时，直接调用`createElm`方法生成真实的DOM树，当`VNode`新旧存在差异时，则调用`patchVnode`方法，通过比较新旧`VNode`节点，根据不同的状态对DOM做合理的添加、删除、修改DOM（这里的Diff算法有兴趣的读者可以自行阅读`patchVnode`方法，鉴于篇幅不再赘述），再调用`createElm`生成真实的DOM树。

Vue的渲染小结
------------------------

回过头来看，这里的渲染逻辑并不是特别复杂，核心关键的几步流程非常清晰：

1. new Vue，执行初始化
2. 挂载$mount方法，通过自定义Render方法、template、el等生成Render函数
3. 通过Watcher监听数据的变化
4. 当数据发生变化时，Render函数执行生成VNode对象
5. 通过patch方法，对比新旧VNode对象，通过DOM Diff算法，添加、修改、删除真正的DOM元素

至此，整个new Vue的渲染过程完毕。

扩展阅读
------------------------

[Vue.js 源码学习笔记](http://blog.csdn.net/generon/article/details/72453156)

[vue源码分析：渲染篇](http://blog.csdn.net/generon/article/details/72482844)




