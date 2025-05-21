---
title: "Git Operation Guide"
date: 2025-05-21
type: page
tags:
  - git
  - github
---

检查版本：
```
git --version
```

# 配置
## git 层级
- system: 包含系统内所有用户和所有仓库的配置信息
	存放在 C:\Program Files\Git\etc\gitconfig
- global: 包含当前用户的所有git仓库配置
	存放在 C:\Users\[用户名]\\.gitconfig
- local: 仅适用于某个git仓库
	存放在 项目根目录/.git/config
优先级：system < global < local

## 查看配置信息
- 查看当前git配置的所有信息
	```
	git config --list
	```
	```
	git config -l
	```
- 查看系统全局配置
	```
	git config --system --list
	```
- 查看当前用户全局配置
	```
	git config --global --list
	```
- 查看当前仓库配置信息
	```
	git config --local --list
	```

## 配置用户信息
```
git config --global user.name "your_name"
git config --global user.email "your_email@example.com"
```
如想为特定项目设置不同参数，将 global 改为 local 即可

# 基本操作
## 初始化本地仓库
三种方式：
- 在项目文件夹中 _shift + 右键_，打开git bash
- 使用命令行，pushd 命令直接导航到相应文件夹下
- 使用命令行，先 E:\ 命令进入E盘，再 cd 到相应文件夹下
输入
```
git init
```
git会初始化该目录，在其中创建一个隐藏的 .git 文件夹，用于存储所有版本控制信息
## 追踪项目文件
- 查看当前状态：（显示哪些文件未追踪，哪些文件已经修改但未提交）
	```
	git status
	```
- 添加文件到暂存区：
	添加所有文件：
	```
	git add .
	```
	添加特定文件：
	```
	git add filename
	```
## 提交至本地仓库
### 提交
```
git commit
```
git 会为每个提交创建一个独立的版本历史记录，包含
1. id
	根据摘要算法计算出不重复的40位字符，本地命令中可以只用前六位
	可通过 id 找到曾经的任何内容和变动
2. 描述
	针对本次提交的描述说明，应准确填写，和代码中的注释同等重要
3. 快照内容
	完整的版本文件，以对象树的结构存在仓库下 .git\objects 目录中

commit参数
- 提交，描述本次修改内容：
	```
	git commit -m "description"
	```
- 从工作区直接提交到版本库，略过 git add 步骤，不包括新增的文件
	```
	git commit -a
	```
- 提交暂存区的指定文件到仓库区
	```
	git commit filename
	```
- 提交指定文件，附带描述
	```
	git commit filename -m "description"
	```
- 使用一次新的 commit 代替上一次提交，此举会修改 commit 的hash 值 (id)
	```
	git commit --amend -m "description"
	```

### 查看提交历史
（id，作者，时间，提交信息描述）
```
git log
```
log参数
- 查看最近n条日志 (20)
	```
	git log -n20
	```
- 使日志输出以一行输出，更简洁
	```
	git log -n20 --oneline
	```
- 可视化显示分支关系
	```
	git log -n20 --graph
	```
- 显示特定文件的版本历史
	```
	git log --follow [file]
	```
如显示 log 时分页：
- q：退出，回到命令行
- 上下箭头或 j/k：上下移动
- 空格：向下翻页
- b：向上翻页
- / + 搜索词：搜索日志内容
### 可视化图表
![Git Flow Diagram](/images/git_Fig.1.png)
## 查看文件变更
- 显示工作目录和暂存区之间的差异 ：
	找到哪些文件已经修改，但未提交
	删除的行用 - 标记，新增的行用 + 标记
	```
	git diff
	```
- 查看当前 git 仓库的状态
	```
	git status
	```
# 进阶操作
## 连接远程仓库
与 github 上的注册信息一一对应
```
git config --global user.name "your_name"
git config --global user.email "your_email@example.com"
```
### 远程仓库创建
在 github 上创建仓库，找到
两种协议：
- HTTPS （安全性较低）
	每次操作时，均需要提供 github 用户名和密码进行身份验证
- SSH （安全性较高）
	使用 __SSH 密钥对__ 认证用户身份
	私钥存储在本地，公钥存储在远程仓库中

### SSH 配置
1. 生成基于 ed25519 算法的密钥对：
```
ssh-keygen -t ed25519 -C "your_email@example.com"
```
成功创建后，会保存在 C:\Users\用户名\\.ssh 目录下
id_ed25519 表示私钥，id_ed25519.pub 表示公钥

2. 将创建的公钥添加到远程仓库
复制 id_ed25519.pub 中的内容，在 github 设置 - SSH and GPG keys 中添加 SSH keys
使用以下命令测试是否连接成功 （输入yes）
```
ssh -T git@github.com
```
得到 Hi "your_name"! You've successfully authenticated, but GitHub does not provide shell access.
## 拉取和推送
### 将远程仓库克隆到本地
将远程仓库的完整副本（包括代码和历史记录）复制到本地
本地新建文件夹，导航至该文件夹
从 github 远程仓库上复制 HTTPS 或 SSH 链接，进行克隆
```
git clone "link"
```
### 将已有的本地仓库和远程仓库进行关联
添加 origin 远程仓库
```
git remote add origin "link"
```
删除 origin 远程仓库
```
git remote remove origin
```
查看是否关联成功：
```
git remote -v
```
### 推送至远程仓库
本地仓库修改完成 (commit) 后，将更改同步到远程仓库
远程仓库名：默认为 origin
本地分支名：要推送的本地分支名称
远程分支名：希望将更改推送到的远程分支名
```
git push <远程仓库名> <本地分支名>:<远程分支名>
```
-u 代表 --set-upstream，-u 告诉 Git 在推送代码到远程仓库的同时，将本地分支与远程分支关联起来，设置远程分支为本地分支的“上游分支”
关联后，后续只需运行 git push 或 git pull，Git 会自动知道要推送或拉取的远程分支，无需每次指定远程仓库和分支名
```
git push -u origin "master"
```
在 github 新建 branch 分支，推送到 branch 分支
```
git push origin "master":"branch"
```
省略参数时，会默认将当前分支推送到对应的远程仓库分支
```
git push
```

### 从远程仓库获取最新内容，自动合并到本地仓库
远程仓库名默认为 origin，远程分支名默认为 master 或 main
```
git pull <远程仓库名> <远程分支名>
```
省略远程仓库名和远程分支名，则默认从当前分支所关联的远程仓库和分支中拉取更新
```
git pull
```
## 分支与分支合并
- master：在创建仓库时就存在，作为主分支，存放稳定的代码，不能随便修改或合并
- 开发分支：用于开发使用，不影响主分支的稳定
- 临时开发分支：开发分支的分支，完成后合并到开发分支，并删除自身
### 创建分支
创建本地 new_branch 分支，创建完后仍处于 master 下
```
git branch new_branch
```
查看当前仓库所有分支，绿色代表当前位置
```
git branch
```
切换本地分支至 new_branch 分支 (两种写法)
```
git checkout new_branch
```
```
git switch new_branch
```
### 合并分支
切换到 master 分支
```
git merge new_branch
```
如果发生冲突：
1. 查看冲突文件
	```
	git status
	```
2. 打开冲突文件
	<<<<<<< HEAD
	主分支的内容 (master)
	=======
	要合并进来的分支的内容
	\>\>\>\>\>\>\> new_branch
3. 手动选择合适的内容保留，删除冲突标记 （<, =, \> 共三行）
4. 添加到暂存区，提交

### 删除分支
使用 -d 删除分支时，必须确保该分支已合并回主分支，否则 git 会阻止删除
```
git branch -d new_branch
```
如想强制删除，使用 -D
```
git branch -D new_branch
```
# 标签
Git Tag 就是仓库中某个重要提交的书签，用于标记重要版本，或关键节点 (v1.0, v2.0)
## 创建标签
标签的创建默认指向当前最新的 commit
1. 轻量标签 （信息简洁）
	```
	git tag <标签名>
	```
2. 附注标签 （带有额外说明信息）
	```
	git tag -a <标签名> -m "description"
	```
对过去的提交记录打标签，commit id 可使用 _git log_ 查看（使用前六位）
```
git tag -a <标签名> <commit id> -m "description"
```
## 查看标签
标签按照字母，数字顺序排列
```
git tag
```
查看带有详细信息的标签：
```
git show <标签名>
```
## 推送标签至远程仓库
推送单个标签
```
git push origin <标签名>
```
推送所有标签
```
git push origin --tags
```
在 github 上可以点击 Tag, 查看所有标签信息

## 删除标签
删除本地标签，但远程标签仍存在
```
git tag -d <标签名>
```
删除远程标签
```
git push origin --delete <标签名>
```
# 撤销和恢复
## 未添加到暂存区？
修改文件时，恢复该文件至最后一次 commit 后的状态，撤销所有未提交的修改
```
git checkout -- file_name
```
## 已添加到暂存区？

先将文件从暂存区移除
```
git reset file_name
```
再使用 checkout 撤销工作区的修改
```
git checkout --file_name
```
## 已经提交了？
### reset
回退或撤销本地提交，将分支的提交历史往回移动
```
git reset
```
reset 有三种模式，默认为 mixed （HEAD表示当前所处的位置）

| 模式    | 命令                | 效果             | 工作目录 | 暂存区   | HEAD |
| ----- | ----------------- | -------------- | ---- | ----- | ---- |
| soft  | git reset --soft  | 仅撤销提交，代码保留在暂存区 | 保留修改 | 保留暂存区 | 移动   |
| mixed | git reset --mixed | 撤销提交及暂存        | 保留修改 | 清空暂存区 | 移动   |
| hard  | git reset --hard  | 撤销提交及所有修改      | 丢弃修改 | 清空    | 移动   |
HEAD 往前移动一个提交位置（即上一次）：
```
git reset --soft HEAD~1
```
撤回到标签名所在的提交：
```
git reset <标签名>
```
撤回到某次提交：
```
git reset --hard <commit id>
```

### revert
另一种撤销方式，创建一次新的提交，撤销某个历史提交的所有更改
不会改变提交历史，团队协作更安全
```
git revert <要撤销的id>
```
情景：A -> B -> C
但是 B 有 bug ，使用 _git revert id_of_B_ 撤销 B 后
新的队列： A -> B -> C -> D
B 仍然保留， 新增 D（内容为撤销 B 的所有改动）

| 区别点    | git reset                 | git revert          |
| ------ | ------------------------- | ------------------- |
| 提交历史   | 会改变提交历史                   | 保留提交历史记录，不改变已有的提交历史 |
| 远程仓库协作 | 不推荐用于已推送的远程仓库             | 推荐使用于远程仓库           |
| 安全性    | 使用不当可能丢弃代码                | 更安全，不丢失代码           |
| 撤销方式   | 回退到指定提交，直接修该<br>HEAD 指针位置 | 新创建一次提交，以抵消原提交的更改   |
# Git Flow 工作流

| 分支类型           | 作用与职责                                | 是否长期存在 |
| -------------- | ------------------------------------ | ------ |
| 主分支 (mater)    | 只包含发布到生产环境的正式版本                      | 是      |
| 热修复分支 (hotfix) | 从主分支派生，快速修复线上紧急问题，<br>修复后合并回主分支和开发分支 | 否      |
| 发布分支 (release) | 从开发分支派生，准备发布的临时分支，<br>用于测试和 Bug 修复   | 否      |
| 开发分支 (develop) | 用于日常开发，集成新功能，始终保持最新开发状态              | 是      |
| 功能分支 (feature) | 从开发分支派生，开发具体新功能                      | 否      |
