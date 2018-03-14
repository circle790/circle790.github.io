---
layout: post
#标题配置
title:  "常规命令行操作指令"
#时间配置
date:   2017-04-23 21:57:00 +0800
categories: Tutorials
tag: Git
---

* content
{:toc}

介绍
------------------------
一名合格的程序员必定是要掌握一些不太好记的骚操作的，比如说今天要介绍的指令，哈哈~。

指令
------------------------

**常规命令行操作**

ipconfig 查看机器IP地址

ctrl+c 退出当前命令

mkdir 创建文件夹

cd 进入文件夹目录

cd .. 返回上级目录

cd ~ 返回根目录

vim使用

vim三种模式：命令模式、插入模式、编辑模式。使用ESC或i或：来切换模式。

命令模式下：

:q                      创建文件编辑过程中取消创建（不保存修改退出

:q!                     强制退出

:wq                     创建文件后退出编辑(保存修改并退出)

:set number             显示行号

:set nonumber           隐藏行号

/apache                 在文档中查找apache 按n跳到下一个，shift+n上一个

yyp                     复制光标所在行，并粘贴

h(左移一个字符←)、j(下一行↓)、k(上一行↑)、l(右移一个字符→)

ls -al 查看当前文件夹下文件目录

ls -ah 查看当前文件夹下文件目录（包括隐藏的文件）

vim <-file-> 查看文件内容

pwd: 显示当前工作目录

rm -rf 空格文件名 彻底删除文件

rm-rf 表示删除文件，而且可以删除非空目录。-rf参数表示递归强制删除。

mv表示移动文件（这个跟剪贴一样），而且可以重命名文件。

例如mva.txta.c意思是重命名a.txt为a.c

当前应用程序根目录~\

~\根路径

.\当前路径

..\上一层路径

文件通配符为星号 *


**列出文件**

ls 参数 目录名

例: 想看看跟目录下有什么，

ls /

参数 -w 显示中文，-l 详细信息， -a 包括隐藏文件


**复制文件**

cp 参数 源文件 目标文件

例：想把桌面的Natit.kext 拷贝到驱动目录中

cp -R /User/用户名/Desktop/Natit.kext /System/Library/Extensions

参数R表示对目录进行递归操作，kext在图形界面下看起来是个文件，实际上是个文件夹。

把驱动目录下的所有文件备份到桌面backup

cp -R /System/Library/Extensions/* /User/用户名/Desktop/backup


**删除文件**

rm 参数 文件

例：想删除驱动的缓存

rm -rf /System/Library/Extensions.kextcache

rm -rf /System/Library/Extensions.mkext

参数-rf 表示递归和强制，千万要小心使用，如果执行了 rm -rf / 你的系统就全没了


**移动文件**

mv 文件

例：想把AppleHDA.Kext 移到桌面

mv /System/Library/Extensions/AppleHDA.kext /User/用户名/Desktop

想把AppleHDA.Kext 移到备份目录中

mv /System/Library/Extensions/AppleHDA.kext     /System/Library/Extensions/backup


sudo命令用于针对单个命令授予临时权限。

使用方法是在原有命令之前加上sudo+空格。

命令别名通常是其他命令的缩写，用来减少键盘输入。

```html
alias file='ls -l | grep ^-'
alias ls='ls --color'
alias sub='ls -F -l | grep /$'
```


这是一些很多用户认为有用的别名，你可以把它们写入你的.profile文件中提高工作效。

如果想取消别名，可以使用下面的命令：

unalias <-alias name->

定义别名时，等号的两头不能有空格，否则 shell 不能决定你需要做什么。


查看命令的详细帮助

man 命令名

比如要看看 ls 命令的详细用法，执行 man ls


**npm使用淘宝镜像**

临时安装使用：
```bash
$ npm install --registry=https://registry.npm.taobao.org
```
持久安装使用：
```bash
$ npm config set registry https://registry.npm.taobao.org
```
配置后可通过下面方式来验证是否成功:
```bash
$ npm config get registry 或者 npm info express
```
通过cnpm安装：
```bash
$ npm install -g cnpm --registry=https://registry.npm.taobao.org 
$ cnpm install
```
查看全局安装npm包：
```bash
$ npm list -g
```
查看某个模块的版本：
```bash
$ npm list grunt（查看grunt版本号）
```
卸载模块：
```bash
$ npm uninstall express
```
更新模块：
```bash
$ npm update express
```
创建npm包(生成package.json文件)：
```bash
$ npm init
```

**查看端口进程及通过PID终止进程**

1、windows系统环境：

使用win+R打卡运行，输入cmd回车打开命令行工具，执行

```bash
C:\>netstat -aon|findstr 端口号 //netstat -ano 查看所有端口的使用情况，netstat -aon|findstr 8080 查看8080端口的使用情况
C:\>tasklist|findstr PID号 //根据PID号查看程序名
C:\>taskkill /f /t /pid PID号 //根据PID号强制终止进程
C:\>taskkill /f /t /im 程序名 //程序名强制终止进程
```
2、Linux系统环境

打开终端，输入sudo -i，切换到root权限

```bash
$ lsof -i tcp:端口号 //lsof(list open files)列出当前系统打开文件,lsof -i tcp:22列出22端口tcp相关项使用情况
$ netstat -tunlp|grep 端口号 //查看22端口的使用情况
$ kill -9 PID号 //通过PID号强制终止进程
```
![lsof]({{ '/styles/images/lsof.png' | prepend: site.baseurl  }})

![netstat]({{ '/styles/images/netstat.png' | prepend: site.baseurl  }})
```bash
$ netstat -tunlp|grep 端口号 //查看22端口的使用情况
$ kill -9 PID号 //通过PID号强制终止进程
```

**ssh远程登录**

常用格式ssh [-l login_name] [-p port] [user@]hostname
```bash
$ ssh -p 12333 root@192.168.0.0
```

免密码登录

1、生成密钥
```bash
$ cd ~/.ssh
$ ls -ah //检查是否存在ssh密钥
$ ssh-keygen -t rsa //若不存在，则执行生成密钥
```

2、放置公钥到Linux服务器
```bash
$ scp ~/.ssh/id_rsa.pub name@example.com:/home/example/.ssh/
```

3、将公钥内容加入到authorized_keys文件，没有则新建一个
```bash
#登录到远程服务器
$ cd ~/.ssh
$ cat -n /home/example/.ssh/id_rsa.pub >> authorized_keys
```

4、配置本地ssh config文件
```bash
$ vi ~/.ssh/config
#添加以下内容
Host example_server  #别名，域名缩写
HostName example.com  #完整的域名
User name  #登录该域名使用的账号名
PreferredAuthentications publickey  #有些情况或许需要加入此句，优先验证类型ssh
IdentityFile ~/.ssh/id_rsa #私钥文件的路径
```

**Chrome 跨域 disable-web-security 关闭安全策略**

现在前后端开发分离，本地开发联调前端项目访问后端接口，很容易报跨域问题，开发时，可临时设置解决跨域。

1、mac采用命令行设置
```bash
//chrome 浏览器
$ open -a "Google Chrome" --args --disable-web-security  --user-data-dir
//safari 浏览器 
$ open -a '/Applications/Safari.app' --args --disable-web-security --user-data-dir
```
2、windows手动修改配置

右击chrome浏览器图标打开属性-快捷方式标签在目标中添加

>这里的chrome.exe 地址根据自己安装路径来, 测试过 chrome45,48,53版本。
45版本 只需要 --disable-web-security
48,53版本需要 额外添加 --user-data-dir

```bash
//快捷方式后面  空一格，再加上
--disable-web-security --user-data-dir
```

![uncross]({{ '/styles/images/uncross.png' | prepend: site.baseurl  }})

**显示隐藏mac文件操作**

快捷键：
`Command+Shift+.`可以显示隐藏文件、文件夹，再按一次，恢复隐藏；
finder下使用`Command+Shift+G`可以前往任何文件夹，包括隐藏文件夹。

打开终端执行

```bash
$ defaults write com.apple.finder AppleShowAllFiles -bool true //显示
$ defaults write com.apple.finder AppleShowAllFiles -bool false //隐藏
```


---------

更多指令完善中(如：nginx相关配置)

---------

