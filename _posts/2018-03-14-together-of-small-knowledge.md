---
layout: post
#标题配置
title:  "常用知识点积累"
#时间配置
date:   2018-03-14 20:58:00 +0800
categories: Tutorials
tag: Html
---

* content
{:toc}

引言
------------------------
经常有一些知识点虽然已经掌握，然而却不容易记住，在使用的过程中百度一下具体的写法，不仅相当麻烦而且显得不是很专业，这里加深记忆，并进行一个积累。

说明
------------------------
**文本溢出省略符**

```css
.text-ellipsis{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
```

**禁止文本选中**

IE6-9不支持该属性，但支持使用标签属性`onselectstart="return false;"`来达到`user-select:none`的效果；

```css
.noselect {
    -webkit-user-select: none;  /* Chrome all / Safari all /opera15+*/  
    -moz-user-select: none;     /* Firefox all */  
    -ms-user-select: none;      /* IE 10+ */  
    user-select: none;  
}
```

**点击目标区域以外区域影藏元素**

下面有一个例子，实现点击`.main`以外区域时，影藏`.dialog`：

```html
<div class="dialog">
    <div class="main">
        ...
    </div>
</div>
<script>
$(document).mouseup(function(e){
    // 设置目标区域
    var _con = $(".dialog .main");   
    //target不是目标元素，并且不是目标元素的子元素
    if( !_con.is(e.target) && _con.has(e.target).length === 0){
        $(".dialog").fadeOut('fast')
    }
});
</script>
```

**checkbox选中**

需要注意的是`attr("checked",true)`方法只有第一次会生效，请使用`prop()`方法代替`attr()`方法，下面的例子实现了全选与全不选效果：

```javascript
$("checkbox#checkAll").change(function(){
    if(this.checked){
         $("table input[type='checkbox']").prop("checked",true);
    }else{
         $("table input[type='checkbox']").removeAttr("checked");
    }
});
```

**返回顶部**

```javascript
function returnTop(){
    $('body,html').animate({ scrollTop: 0 }, 300);
}
```

**获取元素的尺寸**

```javascript
$(window).height(); //浏览器当前窗口可视区域高度
$(window).width(); //浏览器当前窗口可视区域宽度

$(document).height(); //浏览器当前窗口文档的高度
$(document).width();//浏览器当前窗口文档对象宽度

$(document.body).height();//浏览器当前窗口文档body的高度
$(document.body).width();//浏览器当前窗口文档body的宽度

$(document.body).outerHeight(true));//浏览器当前窗口文档body的总高度 包括border padding margin
$(document.body).outerWidth(true));//浏览器当前窗口文档body的总宽度 包括border padding
```

**获取元素在文档中的位置**

- 获取元素在页面中的相对对位置

这是一个相对距离，包括滚动条的偏移量

```javascript
$('#tar').offset().left;
$('#tar').offset().top;
```

- 获取元素在页面中的绝对位置

当我们需要获取元素在浏览器窗口的绝对距离时，首先获取相对距离，然后减去窗口的偏移量就可以了

```javascript
$('#tar').offset().left-$("body").scrollLeft();
$('#tar').offset().top-$("body").scrollTop();
```

**获取鼠标的位置**

```javascript
$(document).mousemove(function(e){
    //鼠标相对于浏览器窗口（不包括浏览器的工具栏）的坐标,不包括滚动条的偏移量
    console.log(e.clientX+","+e.clientY);
    //鼠标相对于屏幕的坐标,这时加上了滚动条的偏移量
    if(e.pageX == null) {
        console.log(e.x+","+e.y);
    }else{
        console.log(e.pageX+","+e.pageY);
    }
    //鼠标相对于屏幕的坐标
    console.log(e.screenX+","+e.screenY);
})
```

**css设置cursor图片改变区域内光标图**

```css
#div{
     cursor: url(../img/btn_02.png), auto;
}
```

**input标签设置样式**

```css
.searchtx::-webkit-input-placeholder {
            color:#9bc5ec;
         }
input:-moz-placeholder {
      color:#9bc5ec;
}
input:-ms-input-placeholder {
      color:#9bc5ec;
}
-webkit-appearance: none;
appearance: none;

-webkit-user-select: none; //页面元素不能选取
-webkit-text-size-adjust: none; //页面字体不回随页面字体调整
-webkit-tap-highlight-color: rgba(255,255,255,0);//点击高亮
```

**font与background样式简写**

- 字体简写

顺序：`font-style | font-variant | font-weight | font-size | line-height | font-family`
（注：简写时，`font-size`和`line-height`只能通过斜杠/组成一个值，不能分开写。）
例如：`font:italic small-caps bold 12px/1.5em arial,verdana;`

- 背景简写

顺序： `['background-color'> ||<'background-image'> || <'background-repeat'>|| <'background-attachment'> ||<'background-position'>] | inherit/width height`
例如：`background:#f00 url(bg.gif) no-repeat fixed center/100px 100px;`

**设备及类型检测**
```javascript
const browser = (function() {
    var ua = navigator.userAgent
    // 判断是否是PC端
    function isPC() {  
        var Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']
        var flag = true    
        for(let v = 0; v < Agents.length; v++) {    
            if(ua.indexOf(Agents[v]) > 0) { 
                flag = false
                break
            }
        }    
        return flag
    }
    return { // 移动终端浏览器版本信息
        trident: ua.indexOf('Trident') > -1, // IE内核
        presto: ua.indexOf('Presto') > -1, // opera内核
        webKit: ua.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
        gecko: ua.indexOf('Gecko') > -1 && ua.indexOf('KHTML') === -1, // 火狐内核
        mobile: !!ua.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
        ios: !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
        android: ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1, // android终端或者uc浏览器
        iPhone: ua.indexOf('iPhone') > -1 || ua.indexOf('Mac') > -1, // 是否为iPhone或者QQHD浏览器
        iPad: ua.indexOf('iPad') > -1, // 是否iPad
        webApp: ua.indexOf('Safari') === -1, // 是否web应该程序，没有头部与底部
        wexin: !!ua.match(/MicroMessenger/i), // 是否是微信
        weibo: !!ua.match(/WeiBo/i), // 是否是微博
        qq: !!ua.match(/QQ/i), // 是否是QQ
        pc: isPC()
    }
})()
```

**常用正则表达式**
```javascript
const validator = {
    isNum: /^\d+$/,
    telephone: /^((13[0-9]{9})|(14[0-9]{9})|(15[0-35-9][0-9]{8})|(17[0-9]{9})|(18[0-9]{9}))$/,
    password: /^[a-zA-Z\d_]{6,}$/,
    email: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
    cardId: /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|x|X)$/,
    name: /^[\u4e00-\u9fa5·]+$/
}
```

---------
持续更新...

查看[前端常用属性、方法备忘](http://justyeh.com/post/28)

---------


