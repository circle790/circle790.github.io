---
layout: post
#标题配置
title:  "Git操作常规流程"
#时间配置
date:   2017-05-12 16:37:00 +0800
categories: Tutorials
tag: Git
---

* content
{:toc}


前言
------------------------
之前记笔记式的简单记录了一些GIt操作指令，因为自己也还在摸索阶段并没有做过多的细节介绍，经过一段时间的使用过程，了解了基本操作流程，这里做一个分享。以下操作的前提是电脑已经安装Git，安装方法和常规软件的安装方法一样，直接进入官网安装即可。

[安装git](https://git-scm.com/)

创建初始化仓库
------------------------
Git通过**仓库**（repository）的概念进行版本管理，正如其名，就好像实现中的商品仓库，链接着生产车间和销售商店，生产出来的商品统一经过仓库到上架，当然Git的版本管理并非就这么简单，理论上是多个生产车间可对一件商品进行生产集中到一个装配中心进行组装，再存放到仓库至运输上架。

首先创建项目并初始化版本库

```bash
$ mkdir myproject
$ cd myproject

$ git init
```
这样一个空的`myproject`版本库就初始化好了,这里也可以是已经开发好的项目。使用`ls -ah`指令会发现项目目录里面生成一个`.git`目录用来追踪你的每一步操纵，可能还有一个`.gitignore`文件用来记录上传版本库时忽略上传的文件信息（取决于创建时的设置操作）。

接下来就可以进行具体的操作了。

仓库文件操作
------------------------

-添加文件
```bash
$ git add <-file->
```
使用`git add .`添加所有文件

-比较差异

比较的是暂存区和工作区的差异
```bash
$ git diff
```
比较的是暂存区和历史区的差异
```bash
$ git diff --cached
```
比较的是历史区和工作区的差异（修改）
```bash
$ git diff master
```

-删除文件
```bash
$ git rm <-file->
```
使用`git rm <-dir-> -r -f`删除文件夹，`-r`递归删除指定文件夹下的所有文件，`-f`表示强制删除,`--cached`使用--cached 表示只删除缓存区中的内容。

-查看工作区文件状态
```bash
$ git status
```
使用`git status`查看文件的追踪情况。

比较文件差异（请在git add之前使用）：
```bash
$ git diff <-file->
```
查看仓库历史记录(详细)：
```bash
$ git log
```
查看仓库历史记录(单行)：
```bash
$ git log --pretty=online 或 git log --online
```
查看所有版本的commit ID：
```bash
$ git reflog
```

-将改变提交到版本库
```bash
$ git commit -m "commit msg"
```
引号内为提交信息，应尽量做到具体修改内容，方便其他人了解。如果需要修改过提交的注释信息：
```bash
$ git commit --amend
```
对上一次的提交信息做修改


创建并关联远程仓库
------------------------

创建远程仓库，以github为例，操作前提是已经取得`ssh key`，一种安全性的考虑，按照官网步骤设置就好。

[About SSH](https://help.github.com/articles/connecting-to-github-with-ssh/)

使用github账号登录github官网，有一个明显的绿色new repository按钮，点击进入创建页面

![创建远程仓库]({{ '/styles/images/newRepository.png' | prepend: site.baseurl  }})

设置好后创建一个public（公开项目），private（私有项目）为付费创建，进入如下界面

![创建远程仓库]({{ '/styles/images/myproject.png' | prepend: site.baseurl  }})

选择导入已存在的仓库

```bash
$ git remote add origin git@github.com:circle790/myproject.git
$ git push -u origin master
```
首次推入远程仓库使用`git push -u origin master`,后续使用`git push`即可。


分支操作
------------------------

-克隆远程仓库

```bash
$ git clone git@github.com:circle790/myproject.git
```

-创建并切换分支

```bash
$ git branch develop
$ git checkout develop
```
使用`git checkout -b develop`简化以上两步操作，创建`develop`分支

-查看所有分支

```bash
$ git branch
```
使用`git branch -r`查看远程分支

使用`git branch -a`查看所有分支

-合并分支到主分支

```bash
$ git checkout master
$ git merge develop
```
合并存在冲突时Git会智能提出，需要解决冲突后再进行合并。

使用`git log --graph`可以查看分支合并图。

-撤销操作

撤销工作区的修改：
```bash
$ git checkout -- <-file->
```
撤销暂存区的修改：
```bash
$ git reset HEAD <-file->
```
回退到历史版本：
```bash
$ git reset --hard <-versionId->
```
回退到上个版本：
```bash
$ git reset --hard HEAD^
```
上上版本是HEAD^^，也可用HEAD~2表示，以此类推

-删除分支

```bash
$ git branch -d develop
```
-拉取远程

```bash
$ git fetch origin master:tmp
$ git diff tmp 
$ git merge tmp
```
`git fetch`拉取master的更新，`git diff`查看差异，`git merge`合并分支

`git pull`为以上流程的合并

```bash
$ git pull
```

-拉取远程仓库

```bash
$ git pull git@github.com:circle790/myproject.git
```

补充
------------------------
-配置

配置用户名：
```bash
$ git config --global user.name "your name"
```
配置email：
```bash
$ git config --global user.email "your email address"
```
本地与远程建立关联是需要让远程知道用户名确认权限。

获取用户名及email
```bash
$ git config --global user.name
$ git config --global user.email
```
-远程仓库操作

查看远程服务器地址和仓库名称
```bash
$ git remote -v
```
查看远程服务器仓库状态
```bash
$ git remote show origin
```
添加远程仓库地址
```bash
$ git remote add origin git@github:robbin/robbin_site.git
```
设置远程仓库地址(用于修改远程仓库地址)
```bash
$ git remote set-url origin git@ github.com:robbin/robbin_site.git
```
删除远程仓库
```bash
$ git remote rm <-repository->
```

-SSH Key

生成SSH Key：
```bash
$ ssh-keygen –t rsa –C "你的邮箱@xx.com"
```
生成Key时弹出选项回车选择默认即可,Key保存位置：`/root/.ssh`登陆GitHub，创建new SSH key，其内容为`/root/.ssh/id_rsa.pub`文本

-标签

为当前版本打标签：
```bash
$ git tag <-tag name->
```
为历史版本打标签：
```bash
$ git tag <-tag name->  <-versionId->
```
指定标签说明：
```bash
$ git tag –a <-tag name-> –m "tag msg" [可选：<-versionId->]
```
查看所有标签：
```bash
$ git tag
```
查看某一标签：
```bash
$ git show <-tag name->
```
删除某一标签：
```bash
$ git tag -d <-tag name->
```

后话
------------------------
个人建议能够使用一款自带可视化Git操作的IDE是最好不过了，不仅简化操作流程而且在解决版本冲突或者对比版本差异时的代码高亮也是一目了然。当然，如果不喜欢在原本编辑代码的工具里附带额外的操作增加编辑器的重量和开销也是可以，使用命令行操作也似乎显现的更酷一点，^_^。

好了，就这样了~

---------

详细的git教程查看

[史上最浅显易懂的Git教程](http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/)

[常用 Git 命令清单](http://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html)

---------

