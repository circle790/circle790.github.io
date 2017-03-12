---
layout: post
#标题配置
title:  "了解location对象，用hash优化网站体验"
#时间配置
date:   2017-03-05 17:44:00 +0800
categories: Tutorials
tag: JavaScript
---

* content
{:toc}

引言
------------------------
最近朋友送一把乐器来，偶尔调节下心情，恩，哎哟~不错哦~
不过我都快要忘记写博客这事儿了（笑着哭，假装是这表情！）。

今天我们要了解一下`BOM`（浏览器对象模型）中比较有用的`location`对象。

介绍
------------------------
`location`对象是`window`对象的一个部分，包含当前`URl`的信息。大家一定使用过或者见到过下面这样一段类似的代码：

```
<input type="button" value="首页" onclick='window.location="/index.html"'>
```
点击按钮之后，浏览器地址切换到首页。


认识
------------------------
打开浏览器，打开开发者工具调试窗口，输入`location`打印,它一系列的属性就这样展示出来

![location对象]({{ '/styles/images/location.jpg' | prepend: site.baseurl  }})

那我们一一对应，毫不客气的了解一下吧

![location对象]({{ '/styles/images/location03.jpg' | prepend: site.baseurl  }})

![location对象]({{ '/styles/images/location02.jpg' | prepend: site.baseurl  }})

对于前端来说，`hash`属性运用比较广泛，尤其在SPA中，大量使用ajax查询表单返回结果列表的页面，`hash`可以起到很好的记录作用，它的每一次改变都会在浏览器的访问历史中增加一条记录，使用浏览器的"后退"按钮，就可以回到上一个位置。同时，`html5`中新增`window.onhashchange`(部分浏览器实现)也支持了事件监听，这意味着我们可以直接检测到地址中hash值的变化进行相应的操作了，这些都将在很大程度上改善了网站的使用体验。

运用
------------------------
使用`location.hash`可以方便的读取`hash`，当事件触发使`hash`值发生变化时，使用`window.onhashchange`就可以监听到`hash`的变化并执行相应的操作了。下面简单模拟一个页面内定位代码：

```javascript
//通过按钮data中记录的anchor信息使页面滑动到对应位置，此处关于scrollTop存在的兼容性问题大家可自行优化，这里不做详细讨论了。

btn.on("click",function(event){
    event.preventdefault();
    var anchor = $(this).data('id');
    location.hash = anchor;
})
window.onhashchange = function(){
    var ele = $(location.hash);
    var anchorT = ele.offset().top;
    $('html,body').anitmate({"scrollTop":anchorT},450);
}
```

---------
好啦，愉快的学习时间就到儿了，下回见~

---------

