---
layout: post
#标题配置
title:  RegExp与字符串常规处理
#时间配置
date:   2017-02-24 22:58:00 +0800
categories: Tutorials
tag: JavaScript
---

* content
{:toc}

引言
------------------------
终于又到周末了，赶紧抓住宝贵的时间写一篇博客~

首先，在这里感谢志超大兄弟在上一篇文章[对象的枚举与遍历之for-in迭代语句](https://circle790.github.io/2017/02/06/For-in-iteration-statements-for-the-enumeration-and-traversal-of-objects/)中对于数据常识方面的纠正，具体内容已经更新，可点击查看。
今天的内容我们稍微了解一下正则表达式和字符串的常规处理，这些是我们解决问题过程中使用非常普遍的操作。


介绍
------------------------
>RegExp是JavaScript的一个内置对象，是对字符串执行模式匹配的强大工具。

-创建 RegExp 对象

```javascript
var regexp = new RegExp(pattern, attributes);
//pattern 是一个字符串，指定了正则表达式的模式或其他正则表达式。
//attributes 是一个可选的字符串，包含属性 "g"、"i" 和 "m"，分别用于指定全局匹配、区分大小写的匹配和多行匹配。ECMAScript 标准化之前，不支持 m 属性。如果 pattern 是正则表达式，而不是字符串，则必须省略该参数。
```

或者使用字面量的方式

```javascript
var regexp = /pattern/attributes;
```

-表达式、元字符、量词

表达式指定字符类型，元字符表示拥有特殊含义的字符，量词指定字符的数量，具体内容可参考[RegExp](http://www.w3school.com.cn/jsref/jsref_obj_regexp.asp)。
这里仅仅指出几点注意：

    -量词后添加`？`号可使默认的贪婪模式转化为非贪婪模式，匹配到就不再继续尝试匹配;

    -`|` 竖线表示`或者`前后任意一个与之匹配即可匹配;

    -使用分组(),$符号结合分组进行反向引用，使用(?:string)忽略分组;

    -正则表达式的前瞻后顾(后顾在JavaScript中不支持)即在正则表达式匹配到规则的时候向前向后检查是否符合断言。


-RegExp的方法

.test()用于检测字符串中是否存在匹配正则表达式模式的字符串,如果存在则返回true，否则返回false;

.exec()使用正则表达式模式对字符串执行搜索，并将更新全局RegExp对象的属性以反映匹配结果,如果没有匹配的文本则返回null，否则返回一个结果数组。

-index声明匹配文本的第一个字符的位置;
-input存放被检索的字符串string。

.test()很好理解，.exec()的功能则更加强大。

```javascript
var str = "Good good study,Day day up",
    patt = new RegExp("good","gi");
var result;

while((result = patt.exec(str)) != null)  {
  console.log(result);
  console.log(patt.lastIndex);
}

// ["Good", index: 0, input: "Good good study,Day day up"]
// 4        lastIndex表示下次匹配的起始位置
// ["good", index: 5, input: "Good good study,Day day up"]
// 9
```

-String 的方法

.search()方法用于检索字符串中指定的子字符串，或检索与正则表达式，该方法返回第一个匹配结果index，查找不到返回-1，search()方法不执行全局匹配，它将忽略标志g，并且总是从字符串的开始进行检索。

.match()方法将检索字符串，以找到一个或者多个与RegExp匹配的文本，RegExp是否具有标志g对该方法的结果影响很大。

-非全局调用

如果RegExp没有标志g，那么.match()方法就只能在字符串中执行一次匹配。
如果没有找到任何匹配的文本，将返回null，否则它将返回一个数组，其中存放了与它找到的匹配文本有关的信息。
返回数组的第一个元素存放的是匹配文本，其余的元素存放的是与正则表达式的子表达式匹配的文本，除了常规的数组元素之外，返回的数组还含有2个对象属性。

-index声明匹配文本的起始字符在字符串的位置;
-input声明对stringObject的引用。

-全局引用

如果RegExp具有标志g，则.match()方法将执行全局检索，找到字符串中的所有匹配子字符串

-没有找到任何匹配的子串，则返回null

-如果找到了一个或多个匹配子串，则返回一个数组

数组元素中存放的是字符串中所有的匹配子串，但是没有index属性或input属性。

.split(),我们经常使用split方法把字符串分割为字符数组（使用arr.join()方法可将数组转化为字符串）。同时可以使用正则表达式解决一些较复杂的分割情况：

```javascript
console.log('a,b,c,d'.split(',')); 
//["a","b","c","d"]

console.log('a1b2c3d4'.split(/\d/)); 
//["a","b","c","d"]

```

.replace()方法用于替换匹配的子字符串或正则。

.replace(str,replaceStr);

.replace(reg,replaceStr);

.replace(reg,function);

function 参数含义

1、匹配字符串;
2、正则表达式分组内容，没有分组则没有该参数;
3、匹配项在字符串中的index;
4、原字符串。

```javascript
'a1b2c3d4e5'.replace(/(\d)(\w)(\d)/g,function(match,group1,group2,group3,index,origin){
    console.log(match);
    return group1+group3;
});

// 1b2
// 3d4
// "a12c34e5"
```

介绍一个很实用的RegExp图形化在线网站[regexper](https://regexper.com/),妈妈再也不担心我学习正则匹配了，so easy~。

---------
好啦，今天就这里了，回见~

---------

