---
layout: post
#标题配置
title:  对象的枚举与遍历之for-in迭代语句
#时间配置
date:   2017-02-06 22:08:00 +0800
categories: Tutorials
tag: JavaScript
---

* content
{:toc}


使用`jquery`的同学可能已经知道`jquery`内部为我们分装好了众多遍历对象的方法`each()`,`map()`等，这个没有问题，下面介绍一种使用迭代语句实现遍历的方法。

>迭代语句又叫循环语句，声明一组要反复执行的命令，直到满足某些条件为止。循环通常用于迭代数组的值（因此而得名），或者执行重复的算术任务。

`while` 语句，`do-while` 语句，`for` 语句，`for-in` 语句都是迭代语句，我们重点介绍使用for-in语句。

**for-in语句与for语句大致相同，是严格的迭代语句，用于枚举对象的属性。**

```javascript
var man = [{name:"张三"},{name:"李四"},{name:"王二"}];
for(var i in man) {
  console.log(man[i].name); 
}
// 张三
// 李四
// 王二
```

以上代码类似于

```javascript
var man = [{name:"张三"},{name:"李四"},{name:"王二"}];
for(var i = 0;i<man.length;i++){
    console.log(man[i].name)
}
//张三
//李四
//王二
```

与之不同的是`for-in`语句可以直接对`json`对象进行枚举，不仅仅局限于`Array`对象，因为它不需要知道类似于长度或者之类的数据（`json`对象没有`length`属性）。或许这样解释更容易接受，`for-in`语句与`for`语句之间与`jquery`中的`each()`方法与`.map`方法之间有着千丝万缕的联系。

举个栗子:

```javascript
var person = {name:"actor",sex:"male",age:"28",job:"teacher"}
console.log( person instanceof Array ); //false
//这样的数据形式使用for-in就更加方便一点了
for(var prop in person){
    console.log("My "+prop+" is "+person[prop]);
}
```

如果说我这个人很较真，非要舍近求远呢！？这一点其实还是有解决办法的，其实`jquery`类库已经为我们封装好了将`类数组对象`转化`数组`的方法`$.makeArray(obj)`,但是仅仅是`类数组对象`(如：`arguments`{ 0 : "a", 1 : "b", 2 : "c"})，对于上面的`person`数组貌似无力，有兴趣的可以研究下。那么是不是真的要 **完** ，经过多方查找了解，终于得到破解之法，一种结合`map`方法转化的思路供大家参考（与`for-in`循环异曲同工）：

```javascript
var person = {name:"actor",sex:"male",age:"28",job:"teacher"};
prop = Object.keys(person);
person = prop.map(function(i){return person[i]});
$.isArray(person); //true
console.log(person) //["actor", "male", "28", "teacher"]
for(var i = 0;i < person.length;i++){
    console.log("My "+prop[i]+" is "+person[i]);
}
```

所以这里值得注意的是，如果我们和使用不同类型语言的后端工程师配合很有可能获取得到的数据格式有所不同，这就需要相互之间做一些调整了。当然通常情况下我们能取到的类型是下面这样一种情况。

```javascript
var obj = {
            store:[{
                aurl: 'A站',
                alt: 'desc1',
                pid: 1,
                src: 'aaa',
            },
            {
                aurl: 'B站',
                alt: 'desc2',
                pid: 2,
                src: 'bbb',
            }]
        };

console.log(obj);
console.log(obj instanceof Array)
//false
```

这里我们使用`for-in`可以方便的将其转化为数组。

```javascript
var arr = new Array();
for(var i in obj.store) {
    arr.push([obj.store[i].aurl, obj.store[i].alt, obj.store[i].pid, obj.store[i].src]);
}

console.log(arr)
console.log(arr instanceof Array)
//true
```

使用`eval("("+jsonString+")")`;可将json形式的字符串转化为json对象，使用`JSON.stringify(ojson)`可将josn对象转化为字符串。

到这里基本结束，如上文如有不当之处还恭请斧正，便以营造共同进步的机会~~

---------
最后感谢阅读拙文~~~
注：以上部分代码须在`jQuery`环境执行。

---------

