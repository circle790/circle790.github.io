---
layout: post
#标题配置
title:  "事件流介绍及自定义事件"
#时间配置
date:   2017-03-25 22:25:00 +0800
categories: Tutorials
tag: JavaScript
---

* content
{:toc}

介绍
------------------------
前端作为与用户最接近的程序员，通过产品界面上一系列的交互动作带给使用者互动体验，了解事件是一门基础课程。
鼠标的单击，双击，悬停，移动，滚轮滚动，键盘的按键，输入，移动端触控及重力感应等动作都可视为事件。一个标准的事件或动作具备以下术语：

事件
------------------------

事件类型(event type)：表示事件的类型。如：MouseEvent(鼠标事件)、KeyboardEvent(键盘事件)等。

事件名称(event name)：表示事件的名称。如：click(单击)、dblclick(双击)等。

事件目标(event target)：表示与发生事件相关的目标对象。

事件处理程序(event handler)：指处理事件的函数，即发生事件时，需调用的函数。

事件对象(event object)：事件发生时，表事件的状态，比如事件发生的目标、键盘按键的状态、鼠标的位置、鼠标按钮的状态等等。事件触发时，通过参数传递给事件处理程序。

![事件]({{ '/styles/images/event.png' | prepend: site.baseurl  }})

事件流
------------------------

事件流(event flow)：简单的说就是嵌套关系的HTML元素同一事件的触发顺序。很早的时候，两大浏览器厂商网景和微软都有各自的触发顺序，网景的浏览器采用由外层向内层捕获方式，而微软的浏览器则采用有内层向外层冒泡方式。任何事件流都可划分为**捕获阶段、目标阶段和冒泡阶段**。

-捕获阶段(Capture Phase)：事件从最外层的window对象到目标节点的父节点依次触发的阶段。(从外到内)

-目标阶段(Target Phase)：事件在目标节点上触发时的阶段。

-冒泡阶段(Bubbing Phase)：事件从目标节点的父节点到最外层的window对象依次触发的阶段。(从内到外)

![事件流]({{ '/styles/images/eventFlow.png' | prepend: site.baseurl  }})

这里需要注意的是`currentTarget` 与 `target` 属性的区别,前者表示正在处理事件的对象，后者表示触发事件的对象。在冒泡阶段，假设`body`和`Button`元素都注册了click事件，当点击`Button`元素时，`body`的click事件也会触发，此时在`body`的click事件内，`currentTarget`指向`body`元素，`target`指向`Button`元素。

我们也可以调用Event 事件对象的stopPropagation()、stopImmediatePropagation()方法阻止事件流的后续传播。

*注：stopImmediatePropagation()方法除了阻止事件流传播还会阻止当前事件在此元素的后续事件处理程序；preventDefault()方法阻止元素默认事件。*

事件注册与注销
------------------------
那么如何注册事件呢？

事件注册分为属性注册和方法注册两种方式。属性注册以"on"开头，后面跟着事件名称，具有唯一性，同一个事件，最后注册的处理程序将会覆盖前面注册的处理程序；方法注册不需要像注册事件属性那样前缀加上"on"，如注册鼠标点击事件，写为click，可以指定地第三个参数useCapture{boolean}是否处于捕获阶段，默认为false，且支持同一事件注册多次，处理程序将按照注册先后顺序执行。

不同的浏览器版本定义注册和注销事件的方式有所不同，为了代码的健壮性，最好对事件注册有一个包容性的封装，比如`jQuery`的`on`与`off`方法，对于有心得同学，个人建议查看源码详细了解如何实现包容不同浏览器的差异性。下面简单介绍一种能力检测的门面模式封装的事件处理：

```javascript
var eventUtil = {
    addHandler: function(element, type, handler){
        if(element.addEventListener){       //FF
            element.addEventListener(type, handler, false);
        } else if(element.attachEvent){     //IE
            element.attachEvent("on"+type, handler);
        }
    },
    removeHandlar: function(element, type, handler){
        if(element.addEventListener){       //FF
            element.removeEventListener(type, handler, false);
        } else if(element.detachEvent){     //IE
            element.detachEvent("on"+type, handler);
        }
    }
}
//绑定事件
//eventUtil.addHandler(element, type, handler);
//注销事件
//eventUtil.removeHandler(element, type, handler);

```

事件委托
------------------------
项目中我们经常会遇到类似的`ul-li`场景，`li`元素通过滚动分页加载，数量频繁的增减，这样将事件处理程序直接注册到`li`元素上性能的影响就比较大了，是不太明智的做法。这时候通过事件委托机制在父元素注册事件监听器，等待`li`事件触发后的冒泡阶段使父元素监听子元素的冒泡事件就比较合适了。*`jQuery`定义的`on`方法可作为事件委托使用。*

```javascript
$('元素').on( events [, selector ] [, data ], handler )
```

自定义事件
------------------------
有时候动作发生的条件可能比较特殊，这时候就需要自定义模拟事件了，具体比较经典的使用场景暂时还没有想到，有想到或总结过的同学大神一定告知一下，我会表示感激的。

自定义事件的监听和之前一样，注册和触发略有不同。我们先看一下这样一张图

![自定义事件]({{ '/styles/images/creatEvent.jpg' | prepend: site.baseurl  }})

首先根据事件类型创建一个对应的事件对象

```javascript
var event = new CustomEvent(typeArg, customEventInit);
```

>`typeArg` is a DOMString representing the name of the event.
`customEventInit` is a CustomEventInit dictionary, having the following fields:
"detail", optional and defaulting to null, of type any, that is an event-dependent value associated with the event.

不拉不拉不拉...通俗点解释`typeArg`指模拟事件名称，`customEventInit`指模拟事件的事件对象。

然后执行监听，调用元素对象的dispatchEvent(event对象)方法在条件满足时进行派发。

```javascript
ele.addEventListener(typeArg, handler);
btn.onclick = fucntion(){
    ele.dispatchEvent(event);
}

```

下面是完整的自定义事件代码

```javascript
// add an appropriate event listener
obj.addEventListener("myevent", function(e) { 
    console.log(e.detail);
});

// create and dispatch the event
var event = new CustomEvent("myevent", {
  detail: {
    hazcheeseburger: true
  }
});

// fireEvent
obj.dispatchEvent(event);

```


---------
事件涉及的点很多，全面的介绍能出一本书，这里仅仅抛砖引玉，希望有兴趣的同学可以留言探讨。这周原计划是写一些实用的demo的，突然想到事件的基础在Tutorials里还没有介绍过，临时决定还是把必要的基础知识过一遍，*磨刀不误砍柴工*。

[事件的详细介绍](http://www.cnblogs.com/polk6/p/5154470.html)

下回见~

---------

