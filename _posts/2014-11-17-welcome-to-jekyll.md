---
layout: post
title:  "使用Jekyll与Github Pages快速搭建个人博客"
date:   2014-11-17 13:31:01 +0800
categories: tutorial
tag: jekyll
---

* content
{:toc}


First POST build by Jekyll.


引言
------------------------
无论是学习还是生活，总会有一些喜闻乐见的事情，羞于当面分享，却又难以忘怀，或许记录下来是一个不错的选择。原先是写日记，现今互联网时代到来，撰写文章发布到网上可能更好。之前尝试过QQ空间、新浪博客、印象笔记、简书等一些方式，简单的记录一些信息是足够了，但是对于一个有追求有想法有个性的人来说未必达到想要的效果。然而申请域名建立个人网站又有一定的技术要求且需要部分成本。那么下面将要介绍的方法就很合适了，在一定程度上可以满足各种需求。
借助 GitHub 和 Jekyll，我们可以打造自己的独立博客，并且拥有绝对的管理权限，可以自由地定制网站的风格，并且这一切都是免费的。对于自己没有服务器的同学来是说这是一个不错的选择。

介绍
------------------------
Jekyll是一个静态站点生成器，它会根据网页源码生成静态文件，并且提供模板、变量、插件等功能，只用 Markdown (或 Textile)、Liquid、HTML & CSS 就可以构建可部署的静态网站。

GitHub 提供了一种功能，叫GitHub Pages,允许站内生成网页，拥有300M免费空间，无线流量，享受git的版本管理功能，没有担心文章遗失的烦恼，这些对于一个乐于分享的人来说是一种福音。

环境
------------------------
在开始搭建blog之前确保本机的环境，git环境（用于远端部署），ruby环境（Jekyll 是基于 Ruby 开发），RubyGems（包管理器 ）。

实现
------------------------

-安装jekyll


```bash
$ gem install jekyll
$ jekyll new myblog
$ cd myblog
$ jekyll server
```

在浏览器输入：[http://localhost:4000],立即就能看到默认的博客效果了。

![默认界面]({{ '/styles/images/myblog.jpg' | prepend: site.baseurl  }})

是不是很简单，如果不想使用默认的界面，还可以自行搭建或者在[jekyll-theme](http://jekyllthemes.org/)网站上查找自己喜欢的theme进行更改。
此时博客搭建过程基本完成，博客已经具备分类归档，文章目录，代码高亮一些基本的功能。当然，如果还需要一些动态的交互功能，如列表分页，热门推荐，文章搜索，文章评论，访问统计等，我们可以借助第三方插件安装到_plugins文件夹进行设置，如借助[disqus](http://disqus.com/)、[duoshuo](http://dev.duoshuo.com/)之类的评论系统实现评论功能。

-文档目录


然后我们可以查看一下文档目录，一个基本的 Jekyll 网站的目录结构一般是像这样的：

```bash
.
├── _config.yml
├── _includes
|   ├── footer.html
|   └── header.html
├── _layouts
|   ├── default.html
|   ├── post.html
|   └── page.html
├── _posts
|   └── 2014-11-17-welcome-to-jekyll.markdown
├── _sass
|   ├── _base.scss
|   ├── _layout.scss
|   └── _syntax-highlighting.scss
├── about.md
├── css
|   └── main.scss
├── feed.xml
└── index.html
```

其实现原理其实是通过模板将使用Markdown或者一些标记语言编写的文章转化成静态的html页面，通过_config.yml文件可以实现基本的配置，文档目录结构中的文件具体作用请参考[官方文档](http://jekyll.com.cn/docs/structure/)。


-创建文章


_posts文件夹下的.markdown或者.md后缀文件为文章的源文件，其文件名必须为"年-月-日-文章标题.后缀名"格式，内容如下：

```html
---
layout: default
title: hello jekyll
---
<h2>{{ page.title }}</h2>
<p>我的第一篇文章</p>
<p>{{ page.date | date_to_string }}</p>
```

每篇文章的头部，必须有一个yaml文件头，用三根短划线"---"标记开始和结束,用来设置一些元数据。其中可以设置文章所属分类及标签信息。yaml文件头后面，就是文章的正式内容。

-发布文章

通过git版本管理工具我们可以实现myblog的远程同步。
首先我们将blog部署到 Github Page 。前提是拥有github账号，第一步创建一个跟你账户名一样的仓库，仓库名为 username.github.io，接着我们把刚才建立的 myblog 项目 push 到 username.github.io仓库里去（username指的是你的github用户名）。

```bash
$ git add .
$ git commit -m "first post"
$ git remote add origin git@github.com:username/username.github.io.git
$ git push -u origin master
```

现在检查你远端仓库已经跟你本地 myblog 同步了，然后你在浏览器里输入 username.github.io ，就可以访问博客了。

-补充一句


如果不想使用username.github.io这个域名访问blog，你也可以设置custom domain，只需要在根目录下面添加CNAME文件写入你要绑定的域名，比如myblog.com或者xxx.myblog.com。
如果绑定的是顶级域名，则DNS要新建一条A记录，指向204.232.175.78。如果绑定的是二级域名，则DNS要新建一条CNAME记录，指向username.github.com（请将username换成你的用户名），另外将_config.yml文件中的baseurl改成根目录"/"。

感谢
------------------------
至此博客的搭建工作全部完成，首先感谢在我摸索过程中给我提供帮助指导和解决疑问的同事，也感谢网络上无私贡献文档的大牛，再次希望看到文章的大家在此基础上更近一部搭建出自己想要的精美博客。如果你想让大家看到可以在下方评论中留言哟~

参考文献：

[jekyll](http://jekyll.com.cn/)

[jekyll-theme](http://jekyllthemes.org/)

[highlight.js](https://highlightjs.org/)

[搭建一个免费的，无限流量的Blog----github Pages和Jekyll入门](http://www.ruanyifeng.com/blog/2012/08/blogging_with_jekyll.html)

[Jekyll搭建个人博客](http://baixin.io/2016/10/jekyll_tutorials1/)

[Jekyll 代码高亮的几种选择](http://blog.csdn.net/qiujuer/article/details/50419279)


