# git常用命令
- 生成ssh key:
> `ssh-keygen -t rsa -C "email@example.com"`

- 设置用户名邮箱:
> `git config --global user.name <username>`
> `git config --global user.email <url>`

- 初始化版本库:
> `git init`

- 关联远程库:
> `git remote add origin <url>`

- 克隆
> `git clone <url>`

- 关联多个远程库:
> `git remote set-url --add origin <url>` #关联
> `git remote set-url --delete origin <url>` #取消

- 查看远程库
> `git remote -v` #查看全部源及信息
> `git remote show origin` #查看指定源全部信息
> `git remote get-url origin` #查看远程库地址
> `git remote get-url --all origin` #查看所有关联的远程库地址

- 删除、重命名远程库
> `git remote rename origin neworigin` #重命名
> `git remote rm origin` #删除
> `git remote set-url --delete origin <url>` #删除其中一个远程地址

- 添加文件到暂存区:
> `git add <filename>` #添加单个文件
> `git add .`        #新增和修改的文件
> `git add -A`       #新增修改和删除文件

- 提交暂存区文件到版本库:
> `git commit -m '说明信息'` &nbsp; #提交说明
> `git commit -a '说明信息'` &nbsp; #跳过添加到暂存区并提交

- 查看工作区状态:
> `git status`

- 推送
> `git push origin <branchname>` #提交本地分支到远程分支
> `git push origin localbranch:remotebranch` #将本地指定分支提交到远程指定分支

- 拉取
> `git fetch` #拉取所有分支
> `git fetch origin <branchname>` #拉取指定分支
> `git fetch origin remotebranch:lacalbranch` #从远程拉取分支到本地指定分支
> `git pull origin <branchname>`
> `git pull origin remotebranch:lacalbranch` #拉取到本地指定分支并合并

- 拉取并删除本地远程已删除分支
> `git pull -p`
> `git fetch -p`

- 查看分支
> `git branch` #查看本地分支
> `git branch -r` #查看远程分支
> `git branch -a` #查看本地和远程所有分支

- 新建切换分支
> `git branch <branchname>` #新建分支
> `git checkout <branchname>` #切换分支
> `git checkout -b <branchname>` #新建并切换到分支

- 重命名分支
> `git branch -m <oldname> <newname>`

- 合并分支
> `git merge <branchname>` #合并branchname分支到当前分支
> `git merge origin/branch` #在当前分支合并远程指定分支
> 或者
> `git rebase origin/branch`

- 删除分支
> `git branch -d <branchname>` #删除本地分支
> `git branch -D <branchname>` #强制删除本地分支
> `git push origin :remotebranch` #删除远程指定分支
> `git push origin --delete <branchname>` #删除远程指定分支

- 链接远程分支
> `git branch --set-upstream <lacalbranch> origin/remotebranch`

- diff
> `git diff <filename>` #查看指定文件差异
> `git diff <HEAD>` #比较工作区和HEAD差异
> `git diff <branchname>` #比较工作区和指定分支差异
> `git diff <branch1> <branch2>` #比较指定分支差异

- stash
> `git stash` #保留工作区现场
> `git stash list` #查看保存的工作现场
> `git stash apply stash@{0}` #恢复指定的工作现场
> `git stash drop` #删除工作现场

- 标签tag
> `git tag` #查看所有标签
> `git show <tagname>` #查看标签信息
> `git tag <tagname>` #新标签
> `git tag <tagname> <commitid>` #对指定commit打标签
> `git tag -a <tagname> -m '说明' [commitid]` #带有描述信息的标签

- 删除标签
> `mv .git/refs/tags/<oldname> .git/refs/tags/<newname>` #重命名tag
> `git tag -d <tagname>` #删除标签
> `git push origin :refs/tags/<tagname>` #删除远程标签

- 推送tag
> `git push [origin] --tags` #推送所有tag
> `git push origin <tagname>` #推送指定tag

- 日志
> `git log` #查看日志
> `git log --pretty=oneline` #单行显示日志
> `git log --graph --pretty=oneline --abbrev-commit` #显示图形表示的分支合并历史
> `git reflog` #查看所有分支的所有操作记录

- 撤销修改
> `git checkout -- <file>` #撤销指定文件的修改
> `git checkout .` #撤销所有文件的修改
> `git reset HEAD <file>` #赊销指定文件暂存区修改
> `git reset HEAD *` #赊销所有暂存区修改

- 回退
> `git reset --hard <HEAD>` #HEAD^上一个版本 HEAD-n到第n个版本
> `git reset --hard <commitid>` #回到指定commit版本

- 回滚
> `git revert HEAD` #撤回前一次操作
> `git revert <commitid>` #撤回指定commit

- 中文乱码处理
> `git config --global core.quotepath false`
