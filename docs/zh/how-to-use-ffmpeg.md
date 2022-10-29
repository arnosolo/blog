---
title: ffmpeg 使用方法
lang: zh-CN
description: ffmpeg是一款常被用于音视频转换的命令行工具. 比如说, 将视频转换为音频或者是gif.
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

## 安装

### Windows

1. 安装[chocolatey](https://chocolatey.org/install)(需要管理员 powershell)

    > chocolatey 是一款 Windows 下的包管理工具, 类似 ubuntu 中的 apt.

    ```powershell
    Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
    ```

2. 安装 ffmpeg
   
   ```powershell
   choco install ffmpeg
   ```


### macOS

1. 从[官网下载](https://evermeet.cx/ffmpeg/)压缩包, 类似ffmpeg-xxx.7z

2. 解压, 然后就可以**直接使用**了
   
   > 如果出现安全警告, 那么你将需要前往 Setting - Pricvacy & Security 中手动允许其运行
   
   ```shell
   ./ffmpeg -i avatar.png avatar.jpg
   ```

3. *(可选)* 将程序所在的文件夹添加到环境变量`PATH`中, 然后我们就可以在所有路径下运行`ffmpeg`
   
   ```shell
   ffmpeg -i avatar.png avatar.jpg
   ```
   
   - 将`ffmpeg`可执行文件移动到你偏好的文件夹下, 这里我选择了移动到了文件夹`$HOME/Documents/cmd-apps/ffmpeg`
   
   - 在`~/.zshrc`底部写入. 这个文件会在每次`zsh`终端启动时运行. 如果使用时说`bash`, 对应的文件时`~/.bash_profile`

     ```zsh
     sudo open -a TextEdit.app ~/.zshrc
     ```
     
     ```shell
     # ffmpeg
     FFMPEG_HOME=$HOME/Documents/cmd-apps/ffmpeg
     export FFMPEG_HOME
     export PATH=$PATH:$FFMPEG_HOME
     # ffmpeg end
     ```
   
   - 使得当前终端用上~/.zshrc
     
     ```shell
     source ~/.zshrc
     # 查看全部环境变量(如需)
     export
     ```

## 使用

### 视频格式转换

```shell
ffmpeg -i input.mov output.mp4
```

### 改变视频码率

```text
ffmpeg -i input.mov -b:v 1.5M  output.mov
```

- `-b:v 1.5M` 指定视频的码率为 1.5Mb/s

- `-b:a` 指定音频的码率

### 视频转音频

```shell
ffmpeg -i input.mov -vn output.m4a
```
- `-vn` 没有视频, 即只保留音频

- `-c:a copy` 直接提取音频而不转换格式. 如果您知道视频内置的音频是什么格式的话, 可以尝试直接复制音频来加快转换速度.


### 视频加速

```shell
ffmpeg -i "input.webm" -filter:v "setpts=0.8*PTS" -r 60 output.mp4
```
- `-filter:v "setpts=0.5*PTS"` 2倍速

- `-filter:v "setpts=0.8*PTS"` 1.25倍数

- `-r 60` 帧率固定为60,设置帧率可以防止掉帧

### 视频转gif

```shell
ffmpeg -i input.mp4 -vf "fps=50,scale=400:-1:flags=lanczos" output.gif
```
- `-vf "fps=50,scale=400:-1:flags=lanczos"` 每秒50帧,宽度控制为400
  
- `-ss` 起始时间(秒)
  
- `-t`  持续时间(秒)
