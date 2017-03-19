---
layout: post
#标题配置
title:  "手机端弹窗阻止页面滚动解决方案"
#时间配置
date:   2017-03-19 15:22:00 +0800
categories: Solutions
tag: Responsive
---

* content
{:toc}

说明
------------------------
移动端的崛起，新媒体时代的风靡，响应式网站设计应运而生。"响应式架构(responsive architecture)"由Ethan Marcotte在*A List Apart*发表的文章"Responsive Web Design"中援引了响应式建筑设计的概念提出。网站能够在各类设备上完美运行逐渐成为人们不变的追求，如何通过一整套代码实现多设备的通用成为网站开发者新的挑战。

解决方案积少成多，近期做到移动端弹窗模块时遇到几个问题解决的过程中有一丝小小的感悟，这里简单记录一下。


演示
------------------------
通常情况下（PC端），页面弹窗时为了阻止页面继续滚动，我们为`html,body`设置`overflow:hidden`属性隐藏滚动即可。

```css
html,body{
   overflow: hidden;
}
```

但是在移动端此方式并不奏效，机灵的朋友很快想到可以给外层添加监听事件，在弹窗出现时，监听`touchmove`事件阻止默认事件避免滚动。

```javascript
olayer.on('touchmove', function (event) {
    event.preventDefault();
});
```

然而也会有一些特殊的需求出现，可能弹窗展示内容很多要求弹窗内容可以滑动，这样直接阻止页面默认滚动事件就不好使了。

这时我们需要做一些判断，通过`touch`事件的`target`属性区分点击的内容是属于弹窗内还是弹窗外，并且记录滚动内容的滚动距离，以此作为是否执行滚动事件的依据。[点击这里查看demo]({{ '/demos/p_03_19_demo.html' | prepend: site.baseurl  }})

当然，我也是拾人牙慧，[查看原文](http://www.zhangxinxu.com/wordpress/2016/12/web-mobile-scroll-prevent-window-js-css/)，仅仅是做了一点小小的处理，原作依赖`zepto`,对于`touch`事件可能有一个比较好的封装，个人觉得从PC端到移动端可能还是jquery的功能比较完善，兼容性好一点，所以修改到自己比较喜欢用的`jquery`也适用了，见仁见智吧。

```javascript
var events = event.originalEvent.targetTouches[0] || event;
```

---------

喜欢的朋友可以在demo中查看源码哟~

注：最近很少运动感觉身上开始长肉了，昨天抽空球场运动了一下，感觉整个身体都瘫了，完全不想动，准备的文章内容不是很满意，看到这里的朋友请原谅。这里新增响应式一栏主要是积累一些响应式网站的解决方案，相信内容会越来越丰富的，嗯！加油！

---------

