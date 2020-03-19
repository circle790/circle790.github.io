---
layout: post
#标题配置
title:  "在web页面中使用svg图标"
#时间配置
date:   2020-03-12 16:41:00 +0800
categories: Tutorials
tag: SVG
---

* content
{:toc}

引言
------------------------

在web页面中使用svg代替图片可以极大的提升页面的出现速度以及改善页面大小，而且svg是矢量图形，改变大小不会失贞，是一个页面渲染优化的方向。

SVG结构化、分组、重用
------------------------

SVG中有四个主要的元素用于在文档中定义、结构化和引用SVG代码：`<g>`, `<defs>`, `<symbol>`, `<use>`。
 
 1、`<g>`元素（“group”的简写），用于给逻辑上相联系的图形元素分组。
 
 ```html
<svg width="1144.12px" height="400px" viewbox="0 0 572.06 200">
   <title>Bird</title>
   <desc>An image of a cute little green bird with an orange beak.</desc>
   <style> svg{background-color:white;} #wing{fill:#81CCAA;} #body{fill:#B8E4C2;} #pupil{fill:#1F2600;} #beak{fill:#F69C0D;} .eye-ball{fill:#F6FDC4;} </style> 
   <g id="bird"> 
    <g id="body"> 
     <path d="M48.42,78.11c0-17.45,14.14-31.58,31.59-31.58s31.59,14.14,31.59,31.58c0,17.44-14.14,31.59-31.59,31.59 S48.42,95.56,48.42,78.11" /> 
     <path d="M109.19,69.88c0,0-8.5-27.33-42.51-18.53c-34.02,8.81-20.65,91.11,45.25,84.73 c40.39-3.65,48.59-24.6,48.59-24.6S124.68,106.02,109.19,69.88" /> 
     <path id="wing" d="M105.78,75.09c4.56,0,8.84,1.13,12.62,3.11c0,0,0.01-0.01,0.01-0.01l36.23,12.38c0,0-13.78,30.81-41.96,38.09 c-1.51,0.39-2.82,0.59-3.99,0.62c-0.96,0.1-1.92,0.16-2.9,0.16c-15.01,0-27.17-12.17-27.17-27.17 C78.61,87.26,90.78,75.09,105.78,75.09" /> 
    </g> 
    <g id="head"> 
     <path id="beak" d="M50.43,68.52c0,0-8.81,2.58-10.93,4.86l9.12,9.87C48.61,83.24,48.76,74.28,50.43,68.52" /> 
     <path class="eye-ball" d="M60.53,71.68c0-6.33,5.13-11.46,11.46-11.46c6.33,0,11.46,5.13,11.46,11.46c0,6.33-5.13,11.46-11.46,11.46 C65.66,83.14,60.53,78.01,60.53,71.68" /> 
     <path id="pupil" d="M64.45,71.68c0-4.16,3.38-7.53,7.54-7.53c4.16,0,7.53,3.37,7.53,7.53c0,4.16-3.37,7.53-7.53,7.53 C67.82,79.22,64.45,75.84,64.45,71.68" /> 
     <path class="eye-ball" d="M72.39,74.39c0-2.73,2.22-4.95,4.95-4.95c2.73,0,4.95,2.21,4.95,4.95c0,2.74-2.22,4.95-4.95,4.95 C74.6,79.34,72.39,77.13,72.39,74.39" /> 
    </g> 
   </g> 
</svg>
```
![svg_g]({{ '/styles/images/svg_g.png' | prepend: site.baseurl  }})

2、`<use>`引用文档中其它位置定义的元素，重用已有的元素。

```html
<!--副本中样式与初始元素样式一致-->
<svg class="bird">
	<!--引用上面的小鸟-->
  	<use x="100" y="100" xlink:href="#bird" />
  	<!--引用animals.svg文件中创建的小鸟-->
  	<use x="100" y="100" xlink:href="path/to/animals.svg#bird" />
</svg>
```

3、`<defs>`用来定义元件，但不直接渲染，可以是裁剪路径、蒙版或一个线性渐变。
```html
<!--<defs>元素包裹#tree组，树就不会在画布上渲染-->
<svg width="500.79px" height="200px" viewbox="0 0 500.79 200"> 
   <style type="text/css"> #leaves{fill:#8CC63F;} #bark{fill:#A27729;} </style> 
   <defs> 
    <g id="tree"> 
     <!-- ... --> 
    </g> 
   </defs> 
   <!--创建三个树的副本，<defs>元素中的内容不是渲染树的一部分-->
   <use xlink:href="#tree" x="50" y="100" />
   <use xlink:href="#tree" x="200" y="100" />
   <use xlink:href="#tree" x="350" y="100" />
</svg>
```

![svg_defs]({{ '/styles/images/svg_defs.png' | prepend: site.baseurl  }})

4、`<symbol>`定义模板元素组合在一起，以便之后在文档中的其他位置引用，它接受一个viewBox属性，可以让它在任何视窗中自适应大小缩放渲染，适用于定义可重复使用的元件（或符号）。
 
```html
<svg>
	<symbol id="check" viewBox="0 0 40 40">
	<!-- icon content / shapes here -->
	</symbol>
	
	<use xlink:href="#check" x="100" y="300" />
</svg>
```


SVG-<foreignObject>
------------------------

`<foreignObject>`SVG元素允许包含不同的XML命名空间。借助`<foreignObject>`标签，我们可以直接在SVG内部嵌入XHTML元素。

```html
<!--svg使用rem尺寸缩放-->
<svg viewBox="0,0,845,360" class="ani-flying">
  <foreignObject class="ani-flying-html">
    <div ref="aniFlying" class="ani-flying-pic"></div>
  </foreignObject>
</svg>
```

SVG样式
------------------------

1、使用CSS `inherit`关键字给`<use>`的内容添加样式，通过给`svg`图形元素设置`fill = inherit`图形元素得颜色会自动集成父级`fill`得颜色；
2、使用CSS的`currentColor`变量来给`<use>`内容添加样式，通过给`svg`图形元素设置`fill = currentColor`图形元素得颜色会自动集成父级`color`得颜色。


---------
扩展阅读

[SVG中的结构化、分组和引用元素](https://www.w3cplus.com/svg/structuring-grouping-referencing-in-svg.html)

---------
