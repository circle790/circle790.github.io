---
layout: post
#标题配置
title:  "关于vue的周边小知识"
#时间配置
date:   2018-03-11 17:20:00 +0800
categories: Tutorials
tag: Javascript
---

* content
{:toc}

引言
------------------------
今天我们来了解几个关于的周边小知识，虽然可能会说不太重要，但是一旦使用却会在体验方面增色不少。比如`vue-router`插件提供一些路由功能以及`vuejs`本身内置的`transition`过渡，这在[vue官方文档](https://cn.vuejs.org/v2/api/#transition)均有所提及，这里简要说明。

说明
------------------------
**transion**

Vue 在插入、更新或者移除 DOM 时，提供多种不同方式的添加过渡效果。

在下列情形中，可以给任何元素和组件添加entering/leaving 过渡：
- 条件渲染 (使用 `v-if`)
- 条件展示 (使用 `v-show`)
- 动态组件
- 组件根节点

添加方式：
- 在 CSS 过渡和动画中自动应用 class，可以配合使用第三方 CSS 动画库，如 `Animate.css`
- 在过渡钩子函数中使用 JavaScript 直接操作 DOM，可以配合使用第三方 JavaScript 动画库，如 `Velocity.js`

常用的一种用法就是应用class：

```html
/* 间单过渡 */
<div id="example1">
	<button @click="show = !show">Toggle render</button>
	<transition name="fade">
		<div class="content" v-show="show">hello vue transition simple</div>
	</transition>
</div>
<script>
new Vue({
  el: '#example1',
  data: {
    show: true
  }
})
</script>
<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

/* 复杂过渡 */
<div id="example2">
	<button @click="show = !show">Toggle render</button>
	<transition name="bounce">
		<div class="content" v-show="show">hello vue transition complicated</div>
	</transition>
</div>
<script>
new Vue({
  el: '#example2',
  data: {
    show: true
  }
})
</script>
<style>
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
 }
</style>
```
在进入/离开的过渡中，会有 6 个 class 切换。

![transition]({{ '/styles/images/transition.png' | prepend: site.baseurl  }})

这里结合图形方便理解动画执行的阶段，`vue`还提供了自定义过渡类名结合第三方的动画库使用，还有`duration`配置，可以精心设计动画的进入和移出的持续时间。

```html
<transition :duration="{ enter: 500, leave: 800 }">...</transition>
```
另外可以通过`appear`属性设置节点在初始渲染的过渡，`transitionend`或`animationend`设置相应的事件监听器来知道过渡的完成。

同时生效的进入和离开的过渡不能满足所有要求时，Vue 还提供了 *过渡模式*

- `in-out`：新元素先进行过渡，完成之后当前元素过渡离开。

- `out-in`：当前元素先进行过渡，完成之后新元素过渡进入。

JavaScript 钩子方式我一般在在列表过渡时使用，如设置列表项的交错过渡入场方式等。

- 不同于 `<transition>`，它会以一个真实元素呈现：默认为一个 `<span>`，可以通过 `tag` 特性更换为其他元素；
- 内部元素 总是需要 提供唯一的 `key` 属性值。

通过`data`属性与`JavaScript`通信 ，可以方便的实现列表的交错过渡。

```html
<div id="example3">
  <transition-group
    name="fade-in"
    tag="ul"
    v-bind:css="false"
    v-on:before-enter="beforeEnter"
    v-on:enter="enter"
    appear
  >
    <li
      v-for="(item, index) in list"
      v-bind:key="item.msg"
      v-bind:data-index="index"
    >{{ item.msg }}</li>
  </transition-group>
</div>
<script>
new Vue({
  el: '#example3',
  data: {
    list: [
      { msg: 'Bruce Lee' },
      { msg: 'Jackie Chan' },
      { msg: 'Chuck Norris' },
      { msg: 'Jet Li' },
      { msg: 'Kung Fury' }
    ]
  },
  methods: {
    beforeEnter: function (el) {
      el.style.cssText = 'opacity: 0; transform: translateX(30px);'
    },
    enter: function (el, done) {
      var delay = el.dataset.index * 150
      setTimeout(function () {
        el.style.cssText = 'opacity: 1; transform: translateX(0);'
      }, delay)
    }
  }
})
</script>
```
当然每次都写一遍过渡动效是比较耗时的，我们可以创建一个过渡组件实现复用。

**vue-router**

`vue`全家桶成员之一，`spa`项目使用广泛，`vue-cli`也在生成项目时提供预设。

这里简单介绍一下编程式导航，我们可能会有在js代码中切换路由的需求，`vue-router`提供以下方法：

![router]({{ '/styles/images/router.png' | prepend: site.baseurl  }})

在`Vue`实例内部，可以通过`$router`访问路由实例。如调用`this.$router.push`。

这里的`router.push`、`router.replace`和`router.go`跟`window.history.pushState`、`window.history.replaceState`和`window.history.go`很像，实际上它们效仿了`window.history`的API，进出栈表现类似。

值得提及的,`vue-router`的导航方法（push、replace、go）在各类路由模式（history、hash和abstract）下表现一致。

最后再介绍一下`vue-router`的导航守卫功能，我们可以通过全局／路由独享／组件内三种方式设置导航守卫在进入路由或者离开路由时进行一些逻辑处理，比如在导航完成前获取用户登陆信息决定是否跳转登陆页等。

![guard]({{ '/styles/images/guard.png' | prepend: site.baseurl  }})

需要注意的是，组件内守卫`beforeRouteEnter`不能访问`this`,因为守卫在导航确认前被调用,新组件还没被创建。不过，你可以通过传一个回调给 next来访问组件实例。

```javascript
beforeRouteEnter(to, from, next) {
  next((vm) => {
    // 通过 `vm` 访问组件实例
  })
}
```

 查看[在导航完成前获取数据](https://router.vuejs.org/zh-cn/advanced/data-fetching.html)

总结
---------
vuejs 博大精深～


参考
---------
[vue官方文档](https://cn.vuejs.org/v2/guide/transitions.html)

[vue-router官方文档](https://router.vuejs.org/zh-cn/essentials/navigation.html)

---------

