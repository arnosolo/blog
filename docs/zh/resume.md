---
title: 黄山
lang: zh-CN
description: 你好, 我是黄山, 来自中国. 我是一名前端工程师. 我会使用 Vue / TS / Firebase 来开发网站.
---

# {{ $frontmatter.title }}
> 前端工程师

- 熟练使用 `Vue` / `React` + `TS` 编写网站

- 熟练使用 `Firebase` 或者 `Mongodb` + `Express` + `Docker` 编写服务端

- 熟练使用 `Git` 进行版本管理与代码提交

- 重视文档的编写

- 可使用英语进行交流

## 教育经历

*2011.09 ~ 2015.06*  宁波工程学院

机械设计制造及其自动化 本科

## 工作经历

### 项目管理
 
*2015.02 ~ 2018.01*  宁波福尔达智能科技有限公司

推进奥迪出风口项目的开发. 保证工装/模具/检具能按时交付, 同时拿到大众的材料以及产品认证.

### 待业

*2018.01 ~ 2022.06*  一间城市边缘的出租屋

每天上来先看个抖音, 看累了写一会儿网页休息一下, 写累了便开始奶茶时间, 而后跳到句首开始循环. 你可能会问那你为什么不搬走呢? 因为我不知道我能去哪里.

### 前端工程师

*2022.06 ~ 至今*  WING SPREAD GROUP LIMITED

开发网站, 编写自动部署脚本, 以远程工作的形式.

## 项目经历

### AiPassportPhoto

[AiPassportPhoto](http://aipassportphoto.com/)被用于去除照片背景获得白底照片. 我做的是前端的部分. 而这个项目的前端部分主要特点有:

- 它使用了原子化的css框架[Unocss](https://uno.antfu.me/), 作为一个结果我们修改样式的时候不再会因为忘记一个类是什么样子而烦躁, 因为从此我们不再需要为类起名.

- 它使用了[vue-i18n](https://vue-i18n.intlify.dev/)实现多语言, 而且翻译脚本支持增量翻译

- 它使用[eslint](https://eslint.org/)自动矫正语法错误和代码风格, 从此我们再也不需要手动调整代码的缩进, 按下 cmd / ctrl + s 就可以. 同时在 git commit 时也会自动进行语法检查, 强制保证我们发起的 PR 的质量.

- 它使用了[Typescript](https://www.typescriptlang.org/)来做类型检查, 而且没有any. 事实上, 我觉得使用js开发比使用ts开发难度要高, 你得有非常好的记忆力和耐心才行.

### Unblur Image

[Unblur Image](https://unblur-image.com/)使用人工智能技术将你的老照片变得清晰.

- 前端继承了[AiPassportPhoto](#AiPassportPhoto)的各个特性

- 后端我使用 [express](http://expressjs.com/) + [Typescript](https://www.typescriptlang.org/) 构建, 部署在 AWS app runner 上.

## 联系

- 邮箱 <a href=mailto:arno756@outlook.com>arno756@outlook.com</a>

- Github [Arno Solo](https://github.com/arnosolo)

## 趣味

> 完全只是有趣而已.

### Simple 3D printer

一个简单的3D打印机固件, 我花了两周的时间使用 `c/c++` 编写的. 编写的目原因是对[3D打印机的工作原理](https://arnosolo.github.io/simple-3d-printer/)有一点点好奇. 没有持续改进的原因是, 虽然有趣, 但是感觉靠嵌入式找不到工作. 而如[上文所述](#待业), 我正在为生存而挣扎, 自是没有什么心情去兴趣中陶醉. 说起来, 我当年在学校的时候学的就是这个, 但是毕业以后也是因为没有找打相关工作, 不了了之了.

<img src="../assets/a-lot-xyz-cubes.png" alt="a-lot-xyz-cubes" />

### Simple Gravity Simulator

如果你点开[这个项目](https://arnosolo.github.io/oversimplified_gravity_simulator), 你会发现它生成图形界面的方式极其的丑陋, 这让我很难受. 但是也正是因为这种难受, 让我开始学习像 vue ts 这样的技术, 所以它是我的起点. 而且它生成的动画看上去也很有趣啊. 也正是因为这种有趣, 让我开始接触js, 了解如何创建一个类, 如何使用canvas. 所以它还是我的初心.

<img src="../assets/2021_6_9下午9_15_45.new.gif" alt="2021_6_9下午9_15_45.new" width="400">
