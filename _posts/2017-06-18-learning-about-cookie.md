---
layout: post
#标题配置
title:  "Cookie是什么"
#时间配置
date:   2017-06-18 13:42:00 +0800
categories: Tutorials
tag: Javascript
---

* content
{:toc}


介绍
------------------------

>Cookies invented by Netscape to give 'memory' to web servers and browsers which maintain session information among different pages.
A cookie is nothing but a no more than 4KB in size text file stored in your browser.
Each time the browser sends a request to the server, the message in it will be attached automatically so that the server gets and maintains the status information of the page you visited early.

Cookie是网站辨别用户身份、进行 Session 跟踪的重要途径，通过 Cookie 技术可以方便的记录访问者的一些基本信息。

最典型的应用是判定注册用户是否已经登录网站，提示用户是否在下一次进入此网站时保留用户信息以便简化登录手续；另一个重要应用场合是“购物车”之类处理，用户在一段时间内在同一家网站的不同页面中选择不同的商品，这些信息都会写入Cookies，最后付款时提取信息。

Cookie本身并不有害，只是存在信息泄漏的风险。

![查看cookie]({{ '/styles/images/cookie.png' | prepend: site.baseurl  }})

注：1、Cookie遵循浏览器的同源策略，不支持跨域。2、每个域名下设置Cookie的数量有限制。

属性
------------------------

```
    Set-Cookie: value[; expires=date][; domain=domain][; path=path][; secure]
```

-1- **value**

`value`属性是必需的，它是一个键值对，用于指定Cookie的值。

-2- **expires**

`expires`属性用于指定Cookie过期时间,格式采用`UTC`或`GMT`时间格式(`Wdy, DD-Mon-YYYY HH:MM:SS GMT`)。

如果不设置该属性，或者设为null，Cookie只在当前会话（Session）有效，浏览器窗口一旦关闭，当前Session结束，该Cookie就会被删除。

浏览器根据本地时间，决定Cookie是否过期，由于本地时间是不精确的，所以没有办法保证Cookie一定会在服务器指定的时间过期。

通常登录一个Web应用时经常会看到一个复选框，询问你是否记住登录信息：如果勾选了复选框，那么一个`expires`属性会被附加到登录 Cookie 中，这样在`expires`指定的过期时间之内登录，web应用就可以直接获取Cookie中存储的用户信息了。

-3- **domain**

`domain`属性用于指定Cookie所在的域名。默认情况下，`domain` 会被设置为创建该 Cookie 的页面所在的域名，所以当给相同域名发送请求时该 Cookie 会被发送至服务器。

-4- **path**

`path`属性指定了请求的资源 URL 中必须存在的路径,即请求的资源 URL 中必须存在指定的路径时，才会发送Cookie消息头。

-5- **secure**

`secure`属性不同与其它属性，该属性只是一个标记而没有值。只有当一个请求通过 SSL 或 HTTPS 创建时，包含 secure 属性的 cookie 才能被发送至服务器。
这样可以避免一些敏感信息以纯文本形式传递很有可能被篡改的风险。当然在Cookie中传输重要机密信息本省就是不安全的做法，这和Cookie 的机制有关。

-6- **max-age**

`max-age`属性用来指定Cookie有效期,即从设定开始计时经过多长时间Cookie失效，单位为秒，一年即60 * 60 * 24 * 365。（IE浏览器不支持`max-age`）

-7- **HttpOnly**

`HttpOnly`属性用于设置该Cookie不能被JavaScript读取。这意味着，此cookie必须用于http或https传输，浏览器脚本不允许访问操作此cookie。

操作
------------------------
服务端与客户端都能操作Cookie，服务端通过`Set-Cookie`创建或更新对应的Cookie发送到客户端（浏览器），客户端（浏览器）可以通过编写的javascipt脚本实现对`document.cookie`的操作。

操作Cookie时需要使用相同的`Set-Cookie`命令，确保`Cookie`的`key`、`domain`、`path`和`secure`都匹配,只要有一个属性不同，就会生成一个全新的Cookie，而不是替换掉原来那个Cookie。

--获取Cookie

通过浏览器对象`document.cookie`可以获取当前页面的Cookie字符串，通过一些字符串操作即可获取到key对应的value值。

--修改 Cookie

修改Cookie，只需要重新赋值就行，旧的值会被新的值覆盖。

--删除 Cookie

删除Cookie，也是重新赋值，只要将这个新cookie的`expires`选项设置为一个过去的时间点或者负值。


编码
------------------------
Cookie是一个字符串，在传输的过程中逗号、分号、空格被当作特殊符号，因此当Cookie的key 或者value 中包含特殊字符时需要进行编码。
ECMAScript v3 之前使用`escape`进行编码，读取时用`unescape`进行解码，现在使用`encodeURI()`和`decodeURI()`进行编码和解码。

[浏览器Cookie操作JS代码获取](https://github.com/js-cookie/js-cookie)。

扩展阅读
------------------------
[HTTP cookies 详解](http://bubkoo.com/2014/04/21/http-cookies-explained/)

[阮一峰 javascript标准参考教程-Cookie](http://javascript.ruanyifeng.com/bom/cookie.html)




