---
layout: post
#标题配置
title:  "vue组件间通信"
#时间配置
date:   2018-03-18 14:17:00 +0800
categories: Tutorials
tag: Javascript
---

* content
{:toc}

引言
------------------------
不定期总结知识点，这样使用到的时候就能得心应手的选择最优的方式呐。vue组件的模块化思想很好的解决了作用域变量之间的污染问题，其数据传递也形成了特定的方式，初步接触也许会有一些疑惑，下面简单归纳总结。

说明
------------------------
**一、父组件向子组件传递数据**

- `props`属性向子组件传递数据

```html
// 父组件
<template>
	<div class="parent">
	    <child :child-msg="msg"></child>  // 必须使用 - 代替驼峰
	</div>
</template>
<script>
import Child from './Child.vue'
export default {
  data() {
    return {
      msg: ['hello vue', 'commutation', 'in components']
    }
  },
  components: {Child}
}
</script>

// 子组件
<template>
	<div class="child">
		<ul>
			<li v-for="(item, index) in childMsg" :key="index">{{item}}</li> 
		</ul>
	</div>
</template>
<script>
export default {
  data() {
    return {
      // 方式1
      props: ['childMsg'],
      // 方式2
      props: {
          childMsg: Array // 指定传入的类型，如果类型不对，会警告
      },
      // 方式3
      props: {
          childMsg: {
              type: Array, // 可指定的类型包含`String`,`Number`,`Boolean`,`Function`,`Object`,`Array`,`Symbol`
              required: true, // 指定为必需属性，不传则报错
              default: ['hello vue', 'commutation', 'in components'], // 指定默认的值，可以由一个工厂函数返回
              validator: function (value) {	// 还可以自定义验证函数
                      return typeof value === 'string'
                    }
          }
      }
    }
  }
}
</script>
```

**二、子组件向父组件传递数据**

- 自定义事件实现向父组件传递数据

每个 Vue 实例都实现了事件接口，即：

使用`$on(eventName)`监听事件

使用`$emit(eventName, optionalPayload)`触发事件

```html
// 子组件
<template>
  <div class="child">
    <h1>子组件</h1>
    <button @click="childToParent">向父组件传值</button>
  </div>
</template>
<script>
  export default{
    data() {
      return {}
    },
    methods: {
      childToParent(){
        this.$emit("childToParentMsg", "子组件向父组件传值");
      }
    }
  }
</script>

// 父组件
<template>
  <div class="parent">
    <h1>父组件</h1>
    <div>父组件显示信息: {{msg}}</div>
    <Child @childToParentMsg="showChildToParentMsg"></Child>
  </div>
</template>
<script>
  import Child from './Child.vue'
  export default{
    data(){
      return {
        msg: '...'
      }
    },
    methods: {
      showChildToParentMsg(data) {
        this.msg = data
        console.log('父组件显示信息：' + data)
      }
    },
    components: {Child}
  }
</script>
```

**三、兄弟组件间传递数据**

兄弟组件间的传递也是使用事件`eventBus`来传递，但是往往由于模块复杂后不利于阅读理解，通常创建一个事件中心`eventHub`，充当中转站用来传递事件和接收事件。

事件中转站文件

```javascript
// eventHub.js
import Vue from 'Vue'
export default new Vue()
```

```html
// App.vue
<template>
  <div id="app">
    <secondChild></secondChild>
    <firstChild></firstChild>
  </div>
</template>
<script>
import FirstChild from './components/FirstChild'
import SecondChild from './components/SecondChild'

export default {
  components: {
    FirstChild,
    SecondChild
  }
}
</script>

// FirstChild.vue
<template>
  <div class="first-child">
    <input type="text" placeholder="请输入文字" v-model="message">
    <button @click="showMessage">向组件传值</button>
    <br>
    <span>{{message}}</span>
  </div>
</template>
<script>
  import hub from '../assets/eventHub'
  export default{
    name: 'firstChild',
    data() {
      return {
        message: ''
      }
    },
    methods: {
      showMessage() {
       	alert(this.message)
        hub.$emit('userDefinedEvent', this.message)	//传值
      }
    }
  }
</script>

// SecondChild.vue
<template>
    <div class="second-child">
        <h1>{{message}}</h1>
    </div>
</template>
<script>
import hub from '../assets/eventHub'
export default{
	data() {
	    return {
	        message: ''
	    }
	},
	mounted() {
	    var self = this
	    hub.$on('userDefinedEvent', function(message) {
	        self.message = message	// 接值
	    })
	}
}
</script>
```

对于更加复杂数据传递场景`Vue`官方推荐使用一个状态管理工具`Vuex`，可以很方便实现`多个组件共享状态`时组件之间的参数传递。

查看[vuex状态管理模式](https://vuex.vuejs.org/zh-cn/intro.html)，可根据项目业务的复杂程度决定是否使用`vuex`。

除此之外，还有一些比较通用的方法进行数据传递：

- 路由传值

在切换路由时`vue-router`提供编程式导航，我们再切换路由时可以使用参数进行适当的传值

```javascript
// 带查询参数，变成 /register?plan=private
this.$router.push({ path: 'register', query: { plan: 'private' }})

// 在计算属性获取路由参数
computed: {
	plan() {
	  return this.$route.query.plan
	}
}
```

-  `localStorage`, `sessionStorage`或者`cookie`临时存储

存储

```javascript
Cookies.set('name', 'value', { path: '/' }) // 兼容性更好，但需要自行封装读取操作方法
localStorage.setItem('name', 'value')
sessionStorage.setItem('name', 'value') 
```

读取

```javascript
let name = Cookies.get('name') 
let name = localStorage.getItem('name')
let name = sessionStorage.getItem('name') 
```

清除

```javascript
Cookies.remove('name', { path: '/' })
localStorage.removeItem('name')
sessionStorage.removeItem('name') 
```

总结
------------------------
最后提供的这两种方式就更不便于数据的维护了，可阅读性上基本不可读，一般情况不推荐使用，这里提及仅仅作为一种解决问题的思路，不作过多评论。

对于常规业务使用前三种方式基本可以解决，再者数据状态多处共享的情况就直接使用`vuex`，还是很方便的。



