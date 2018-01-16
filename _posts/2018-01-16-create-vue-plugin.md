---
layout: post
#标题配置
title:  "vuejs插件开发基本讲解"
#时间配置
date:   2018-01-16 20:22:00 +0800
categories: Tutorials
tag: Javascript
---

* content
{:toc}


介绍
------------------------

随着vuejs的火热，越来越多的人学习和使用它，那么检验自己是否“熟练”的标准是什么呢，回想起面试环节的一幕幕，嘿~明白了，那些日常开发不怎么用上的知识点了解的多少就是技术人员的深度，使用量上的积累是跨度。还记得使用jQuery+template模板渲染的那段时光，jQuery插件的编写能力不正是检验jQuery熟练程度的标准么。那么别在推诿明天了，就是现在从代码使用者转变成真真正正的开发者吧。

了解插件
------------------------

插件通常会为 Vue 添加全局功能。
Vue.js 的插件应当有一个公开方法 install 。这个方法的第一个参数是 Vue 构造器 , 第二个参数是一个可选的选项对象:
```javascript
MyPlugin.install = function (Vue, options) {
  Vue.myGlobalMethod = function () {  // 1. 添加全局方法或属性，如: vue-custom-element
    // 逻辑...
  }
  Vue.directive('my-directive', {  // 2. 添加全局资源：指令/过滤器/过渡等，如 vue-touch
    bind (el, binding, vnode, oldVnode) {
      // 逻辑...
    }
    ...
  })
  Vue.mixin({
    created: function () {  // 3. 通过全局 mixin方法添加一些组件选项，如: vuex
      // 逻辑...
    }
    ...
  })
  Vue.prototype.$myMethod = function (options) {  // 4. 添加实例方法，通过把它们添加到 Vue.prototype 上实现
    // 逻辑...
  }
}
```

通过全局方法 Vue.use() 使用插件：
```javascript
// 调用 `MyPlugin.install(Vue)`
Vue.use(MyPlugin)
// 还传入一个选项对象：
Vue.use(MyPlugin, { someOption: true })
```

`Vue.use` 会自动阻止多次注册相同插件，届时只会注册一次该插件。

区分插件与组件
------------------------

组件：可以复用的代码块，在页面中引入并且需要在components注册。

插件：为Vue添加全局功能，通过全局方法 Vue.use() 即可使用插件。

使用率高的组件一般我们希望全局注册后直接就可以在相应页面使用，因此我们也可以将他们封装成插件。比如[vux](https://vux.li/#/)这养的组件库在频繁使用的UI组件上就提供引入组件的方式又提供插件全局注册的方式，比较灵活。

[awesome-vue](https://github.com/vuejs/awesome-vue#components--libraries)这里集合了来自社区贡献的形形色色的vuejs插件，可以很好的了解和学习vue插件的开发。

开发示例
------------------------

下面通过一个vue-toast插件简单介绍最广泛的添加实例方法的开发方式：

```javascript
// toast.js
const Toast = {
    install (Vue, options) {
        Vue.prototype.$msg = 'Hello~';
        Vue.prototype.greet = value => {
            console.log(value);
        };
    }
}
export default Toast;
```

接着在 main.js 中导入 toast.js 并且通过全局方法 Vue.use() 来使用插件：
```javascript
// main.js
import Vue from 'vue';
import Toast from './toast.js';
Vue.use(Toast);
```

然后就可以在页面中使用插件定义的方法和属性：
```javascript
// App.vue
export default {
    mounted(){
        this.greet();       // Hello~
    }
}
```

可以看到成功的打印出‘hello~’，说明已经在Vue实例上添加了属性和方法。下面具体开发：

需求：在组件中通过调用 this.$toast('网络请求失败') 来弹出提示，默认在底部显示。可以通过调用 this.$toast.top() 或 this.$toast.center() 等方法来实现在不同位置显示。

整理一下思路，弹出提示的时候，我可以在 body 中添加一个 div 用来显示提示信息，不同的位置我通过添加不同的类名来定位。

```javascript
// toast.js
const Toast = {
    install (Vue, options) {
        Vue.prototype.$toast = (tips) => {
            let toastTpl = Vue.extend({     // 1、创建构造器，定义好提示信息的模板
                template: '<div class="vue-toast">' + tips + '</div>'
            });
            let tpl = new toastTpl().$mount().$el;  // 2、创建实例，挂载到文档以后的地方
            document.body.appendChild(tpl);     // 3、把创建的实例添加到body中
            setTimeout(function () {        // 4、延迟2.5秒后移除该提示
                document.body.removeChild(tpl);
            }, 2500)
        }
    }
}
export default Toast;
```
好像很容易，初步实现了 this.$toast() ，接下来显示不同位置。

这里需求通过'.'连字符的方式即定义不同方位的实例方法，通过type参数指定显示位置。

```javascript
// toast.js
const Toast = {
    install (Vue, options) {
        Vue.prototype.$toast = (tips,type) => {     //添加 type 参数
            let toastTpl = Vue.extend({             // 模板添加位置类
                template: '<div class="vue-toast toast-'+type+'">' + tips + '</div>'
            });
            let tpl = new toastTpl().$mount().$el;
            document.body.appendChild(tpl);
            setTimeout(function () {
                document.body.removeChild(tpl);
            }, 2500)
        }
        ['bottom', 'center', 'top'].forEach(type => {
            Vue.prototype.$toast[type] = (tips) => {
                return Vue.prototype.$toast(tips,type)
            }
        })
    }
}
export default Toast;
```

这里大致满足需求了，但是如果想默认在顶部显示，每次都要调用 this.$toast.top() 好像就有点多余了，我能不能 this.$toast() 就直接在我想要的地方？还有我不想要 2.5s 后才消失呢？这时候注意到 Toast.install(Vue,options) 里 options 参数，我们可以在 Vue.use() 通过 options 传进想要的参数，进行默认设置。最终：

```javascript
// toast.js
const Toast = {
    install (Vue, options) {
        let opt = {
            defaultType:'top',      // 默认显示位置
            duration:'2500'         // 持续时间
        }
        opt = Object.assign({}, opt, options);            // 使用 options 的配置
        Vue.prototype.$toast = (tips,type) => {
            if(document.getElementsByClassName('vue-toast').length){
                // 如果toast还在，则不再执行
                return;
            }
            let toastTpl = Vue.extend({
                template: '<div class="vue-toast toast-'+opt.defaultType+'">' + tips + '</div>'
            });
            let tpl = new toastTpl().$mount().$el;
            document.body.appendChild(tpl);
            setTimeout(function () {
                document.body.removeChild(tpl);
            }, opt.duration)
        }
        ['bottom', 'center', 'top'].forEach(type => {
            Vue.prototype.$toast[type] = (tips) => {
                return Vue.prototype.$toast(tips,type)
            }
        })
    }
}
export default Toast;
```

这样一个基本的vue-toast插件就实现了，并且可以通过 npm 打包发布，下次就可以使用 npm install 来安装了。

代码解读
------------------------

如果对vuejs的文档不太熟悉，这里有稍微叙述：

```javascript
let tpl = new toastTpl().$mount().$el;
document.body.appendChild(tpl);
```

这里我们实例Vue时没有收到`el`选项，处于“未挂载”状态，没有关联的 DOM 元素，需要使用 vm.$mount() 手动地挂载，然后通过`$el`访问实例上的 `HTMLElement` 实例手动插入DOM文档节点。

![$mounted]({{ '/styles/images/$mounted.png' | prepend: site.baseurl  }})

扩展阅读
------------------------

[vue开发文档](https://cn.vuejs.org/v2/guide/plugins.html#ad)

[Vue.js 插件开发详解](https://segmentfault.com/a/1190000008869576)




