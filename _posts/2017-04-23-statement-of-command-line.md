---
layout: post
#标题配置
title:  "关于git操作命令行指令"
#时间配置
date:   2017-04-23 21:57:00 +0800
categories: Tutorials
tag: Git
---

* content
{:toc}

介绍
------------------------
Git是一款免费、开源的分布式版本控制系统，用于敏捷高效地处理任何或小或大的项目，目前是世界上最先进的分布式版本控制系统（没有之一），区别于集中式的版本控制系统。

指令
------------------------

**常规命令行操作**

ipconfig 查看机器IP地址

ctrl+c 退出当前命令

mkdir 创建文件夹

cd 进入文件夹目录

cd .. 返回上级目录

vim 创建文件

:wq 创建文件后退出编辑(保存修改并退出)

:q 创建文件编辑过程中取消创建（不保存修改退出）

ls -al 查看当前文件夹下文件目录

ls -ah 查看当前文件夹下文件目录（包括隐藏的文件）

vim空格文件 查看文件内容

pwd: 显示当前工作目录


rm -rf空格文件名 彻底删除文件

rm-rf表示删除文件，而且可以删除非空目录。-rf参数表示递归强制删除。

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



**Git常规操作**

git init 初始化本地仓库

git push -u origin master 将本地主分支推到远程(如无远程主分支则创建，用于初始化远程仓库)

git status 查看本地版本状态

git add . 将变动或修改至工作区

git commit -m "信息" 将工作区版本提交至暂存区并附带说明信息

git push 将暂存区信息提交至远程仓库

git fetch origin  抓取远程仓库更新

git merge origin/master 将远程主分支合并到本地当前分支

git pull  抓取远程仓库所有分支更新并合并到本地（上面两步的和）

git log -p -2 查看最近两次详细修改内容的diff

**查看、添加、提交、删除、找回，重置修改文件**

git help <-command-> # 显示command的help

git show # 显示某次提交的内容 git show $id

git co -- <-file-> # 抛弃工作区修改

git co . # 抛弃工作区修改

git add <-file-> # 将工作文件修改提交到本地暂存区

git add . # 将所有修改过的工作文件提交暂存区

git rm <-file-> # 从版本库中删除文件

git rm <-file-> --cached # 从版本库中删除文件，但不删除文件

git reset <-file-> # 从暂存区恢复到工作文件

git reset -- . # 从暂存区恢复到工作文件

git reset --hard # 恢复最近一次提交过的状态，即放弃上次提交后的所有本次修改

git ci <-file-> git ci . git ci -a #将git add, git rm和git ci等操作都合并在一起做　
　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　
git ci -am "some comments"

git ci --amend # 修改最后一次提交记录

git revert <-$id-> # 恢复某次提交的状态，恢复动作本身也创建次提交对象

git revert HEAD # 恢复最后一次提交的状态

**查看文件diff**

git diff <-file-> # 比较当前文件和暂存区文件差异

git diff <-id1-><-id1-><-id2-> # 比较两次提交之间的差异

git diff <-branch1->..<-branch2-> # 在两个分支之间比较

git diff --staged # 比较暂存区和版本库差异

git diff --cached # 比较暂存区和版本库差异

git diff --stat # 仅仅比较统计信息

git diff HEAD 查看工作区和当前版本库之间的区别

**查看提交记录**

git log git log <-file-> # 查看该文件每次提交记录

git log -p <-file-> # 查看每次详细修改内容的diff

git log -p -2 # 查看最近两次详细修改内容的diff

git log --stat #查看提交统计信息

tig #Mac上可以使用tig代替diff和log，brew install tig

**Git 本地分支管理**

**查看、切换、创建和删除分支**

git br -r # 查看远程分支

git br <-new_branch-> # 创建新的分支

git br -v # 查看各个分支最后提交信息

git br --merged # 查看已经被合并到当前分支的分支

git br --no-merged # 查看尚未被合并到当前分支的分支

git co <-branch-> # 切换到某个分支

git co -b <-new_branch-> # 创建新的分支，并且切换过去

git co -b <-new_branch-><-branch-> # 基于branch创建新的new_branch

git co $id # 把某次历史提交记录checkout出来，但无分支信息，切换到其他分支会自动删除

git co $id -b <-new_branch-> # 把某次历史提交记录checkout出来，创建成一个分支

git br -d <-branch-> # 删除某个分支

git br -D <-branch-> # 强制删除某个分支 (未被合并的分支被删除的时候需要强制)

**分支合并和rebase**

git merge <-branch-> # 将branch分支合并到当前分支

git merge origin/master --no-ff # 不要Fast-Foward合并，这样可以生成merge提交

git rebase master <-branch-> # 将master rebase到branch，相当于： git co <-branch-> && git rebase master && git co master && git merge <-branch->

**Git补丁管理(方便在多台机器上开发同步时用)**

git diff -> ../sync.patch # 生成补丁

git apply ../sync.patch # 打补丁

git apply --check ../sync.patch #测试补丁能否成功

**Git暂存管理**

git stash # 暂存

git stash list # 列所有stash

git stash apply # 恢复暂存的内容

git stash drop # 删除暂存区

**Git远程分支管理**

git pull # 抓取远程仓库所有分支更新并合并到本地

git pull --no-ff # 抓取远程仓库所有分支更新并合并到本地，不要快进合并

git fetch origin # 抓取远程仓库更新

git merge origin/master # 将远程主分支合并到本地当前分支

git co --track origin/branch # 跟踪某个远程分支创建相应的本地分支

git co -b <-local_branch-> origin/<-remote_branch-> # 基于远程分支创建本地分支，功能同上

git push # push所有分支

git push origin master # 将本地主分支推到远程主分支

git push -u origin master # 将本地主分支推到远程(如无远程主分支则创建，用于初始化远程仓库)

git push origin <-local_branch-> # 创建远程分支， origin是远程仓库名

git push origin <-local_branch->:<-remote_branch-> # 创建远程分支

git push origin :<-remote_branch-> #先删除本地分支(git br -d <-branch->)，然后再push删除远程分支

**Git远程仓库管理**

**GitHub**

git remote -v # 查看远程服务器地址和仓库名称

git remote show origin # 查看远程服务器仓库状态

git remote add origin git@ github:robbin/robbin_site.git # 添加远程仓库地址

git remote set-url origin git@ github.com:robbin/robbin_site.git # 设置远程仓库地址(用于修改远程仓库地址) 

git remote rm <-repository-> # 删除远程仓库

**创建远程仓库**

git clone --bare robbin_site robbin_site.git # 用带版本的项目创建纯版本仓库

scp -r my_project.git git@ git.csdn.net:~ # 将纯仓库上传到服务器上

mkdir robbin_site.git && cd robbin_site.git && git --bare init # 在服务器创建纯仓库

git remote add origin git@ github.com:robbin/robbin_site.git # 设置远程仓库地址

git push -u origin master # 客户端首次提交

git push -u origin develop # 首次将本地develop分支提交到远程develop分支，并且track

git remote set-head origin master # 设置远程仓库的HEAD指向master分支

也可以命令设置跟踪远程库和本地库

git branch 查看分支

git branch --set-upstream master origin/master

git branch --set-upstream develop origin/develop



---------

详细的git教程查看
[史上最浅显易懂的Git教程](http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/)

---------

