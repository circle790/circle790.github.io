---
layout: post
#标题配置
title:  JavaScript实现oo编程，面向对象之prototype
#时间配置
date:   2017-02-13 22:08:00 +0800
categories: tutorial
tag: JavaScript
---

* content
{:toc}

引言
------------------------
转眼间情人节马上就到了，四下都弥漫着灿烂的春光，哈哈哈~看到周围人们的开心笑容我的心情仿佛也活跃起来了。回到家中打开电脑，在甜蜜爱情音乐氛围的烘托下，加班晚回家的疲惫及不爽顷刻间就烟消云散了。同时，在这里我要祝愿一直对我不错的哥哥明天约会成功，嘿嘿嘿~希望看到的人一起为他祝福，早日带回嫂子。
好，闲话先说到这里，这不缓解一下紧张的氛围嘛~(做含羞状)。博客刚刚发布，也是先记录一些基本的东西夯实基础，但保证看完有所收获，后面会根据情况逐步调整。像类似各大网坛上已经翻写的如影视界《西游记》之流的文章这里不会重点叙述，仅仅记录经典哈，大神经过可做无视呐~

介绍
------------------------

>OO(Object-Oriented)面向对象的编程方法，是一种把面向对象的思想应用于软件开发过程中，指导开发活动的系统方法，是建立在“对象”概念基础上的方法学，区别于函数式编程。对象是由数据和容许的操作组成的封装体，与客观实体有直接对应关系，一个对象类定义了具有相似性质的一组对象。每继承性是对具有层次关系的类的属性和操作进行共享的一种方式。

JavaScript是一种弱类型的编程语言，也能以封装的形式类似实现面向对象编程，相比于java、asp.net(C#)这些比较严格的语言可能更容易上手学习。

那么什么是对象？

对象指的是类的实例，实现结构间信息传递及方法继承，作为程序的基本单元存在，程序和数据封装其中，提高软件的重用性、灵活性和扩展性。在面向对象编程过程中，曾经流传着**一切皆是对象**这样一句口头禅，可见其重量级别了。
虽然在JavaScript编程中有人对此有另一种说法，认为JavaScript中，并不是所有的值都是对象，指出JavaScript 中的值划分为两大类：原始值（primitive）和对象（object），划分在原始值中的字符串、数字（js中所有数字都是浮点数）、布尔值、null、undefined除外，其他值都是对象，但是这并不一样我们借助面向对象过程编程的思想进行程序设计。

对象的三大特征？
封装、继承和多态。

封装性：封装是一种信息隐蔽技术，它体现于类的说明，是对象的重要特性。封装使数据和加工该数据的方法（函数）封装为一个整体，以实现独立性很强的模块，使得用户只能见到对象的外特性（对象能接受哪些消息，具有那些处理能力），而对象的内特性（保存内部状态的私有数据和实现加工能力的算法）对用户是隐蔽的。封装的目的在于把对象的设计者和对象的使用者分开，使用者不必知晓行为实现的细节，只须用设计者提供的消息来访问该对象。

继承性：继承性是子类自动共享父类之间数据和方法的机制。它由类的派生功能体现。一个类直接继承其它类的全部描述，同时可修改和扩充。继承具有传递性。继承分为单继承（一个子类只有一父类）和多重继承（一个类有多个父类）。类的对象是各自封闭的，如果没继承性机制，则类对象中数据、方法就会出现大量重复。继承不仅支持系统的可重用性，而且还促进系统的可扩充性。

多态性：对象根据所接收的消息而做出动作。同一消息为不同的对象接受时可产生完全不同的行动，这种现象称为多态性。利用多态性用户可发送一个通用的信息，而将所有的实现细节都留给接受消息的对象自行决定，如是，同一消息即可调用不同的方法。例如：Print消息被发送给一图或表时调用的打印方法与将同样的Print消息发送给一正文文件而调用的打印方法会完全不同。多态性的实现受到继承性的支持，利用类继承的层次关系，把具有通用功能的协议存放在类层次中尽可能高的地方，而将实现这一功能的不同方法置于较低层次，这样，在这些低层次上生成的对象就能给通用消息以不同的响应。在OOPL中可通过在派生类中重定义基类函数（定义为重载函数或虚函数）来实现多态性。

我坦白，以上三段内容摘自百度百科，嘿嘿~，重在理解，实践的多了就自然明白其中的道理了，俗话说“千学不如一看，千看不如一练”。

实现
------------------------
下面就简单介绍一下JavaScript如何实现面向对象编程，基于个人理解，希望大家看到有错误或者说不恰当的地方能够在评论区留言告诉我哈~

JavaScript主要以prototype对象实现面向对象。每个函数都是一个对象，它们对应的类是
function，每个函数对象有一个子对象prototype。prototype 表示该函数的原型，
prototype表示了这个类的属性的集合。当通过new来生成一个类的对象时，prototype对象的属性就会成为实例化对象的属性。
举个栗子~

```javascript
//定义一个空类
function class(){

}
//对类的prototype对象进行修改，增加方法method
class.prototype.method = function(){
    alert("prototype测试");
}
var obj=new class(); //创建类class的实例
obj.method(); //调用obj的method方法
```

当用new创建一个对象时，prototype对象的属性将自动赋给所创建的对象,如：

```javascript
//定义有一个属性的类
function class(){
    this.name="actor";
}
//使用函数的prototype属性给类定义新属性
class.prototype.showName = function(){
    alert(this.name);
}
var obj=new class(); //创建class类的一个实例
//调用prototype原型对象定义的showName方法
obj.showName();
```

使用prototype实现继承

```javascript
function class(){
    //构造方法
}
function subClass(){
    //构造方法
}
subClass.prototype=class.prototype;
subClass.prototype.Propertys="name";
subClass.prototype.subMethods=function(){
    //方法实现代码
    alert("in Methods");
}
var obj=new subClass();
obj.subMethods();
```

代码中，subClass具有和class一样的prototype,不考虑构造方法，则两个类等价。随后，通过prototype给subClass赋予了额外的属性和方法,subClass在class的基础上增加了新的属性和方法，从而实现了类的继承。

JavaScript实现面向对象的基本的原理就是，当通过prototype编写类后，使用new关键字实例一个新的object，浏览器就自动把prototype中的内容替你附加在object上。这样也就通过prototype，实现了类似OO的Javascript。
其实在Javascript中，object就是个associative array，一个function就是个类。

好了，就到这里了，时间不早了，大家晚安~

---------
感谢阅读拙文~~~
PS：今天真的适合阅读这篇文章，希望没有找到对象的同学早日找到合适的对象呐~哈哈~

---------
