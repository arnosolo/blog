---
title: uni-app 上传到 TestFlight
lang: zh-CN
description: 使用 HBuilderX 云打包构建 ipa 包并上传到 TestFlight
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

## 应用图标

注意：打包前必须在 `manifest.json` 中配置 App 图标（1024x1024），否则上传 TestFlight 时会报错。

## 更新版本号

打包前必须更新版本号, 否则上传 TestFlight 时会报错。

## 证书与描述文件

证书与描述文件获取方法

> [iOS证书(.p12)和描述文件(.mobileprovision)申请 | DCloud](https://ask.dcloud.net.cn/article/152)

证书与描述文件作用

| 文件类型 | 扩展名 | 作用 |
| :--- | :--- | :--- |
| 公钥 | `.cer` | 证明"我是谁", 配合私钥可以给 App 签名 |
| 私钥证书 | `.p12` | 公钥 + 私钥, 用来给 App 签名, 通常有密码保护. 一旦泄露, 别人可以用你的身份签 App. |
| 描述文件 | `.mobileprovision` | 不能给 App 签名, 只是记录了这个 App 是谁签的，用了哪些能力，可以装到哪些设备上 |

证书类型选择

| 证书类型 | 使用场景 | 能否装真机 | 能否上 TestFlight |
| :--- | :--- | :--- | :--- |
| iOS App Development | 开发调试 | ✅ (需注册设备) | ❌ |
| Apple Distribution | 提交 App Store | ❌ | ✅ |

## 生成 ipa 包(云打包)

这是最便捷的构建方式，在 HBuilderX 中点击 `发行` > `原生App-云打包`。

| HBuilderX 打包配置 | 证书文件信息 |
| :--- | :--- |
| 私钥证书 | `.p12` 文件 |
| 证书私钥密码 | `.p12` 文件的密码 |
| 证书 profile 文件 | `.mobileprovision` 文件 |

## 上传 ipa 包

1. 安装工具：在 Mac App Store 下载 **Transporter**。
2. 登录：使用苹果开发者账号（App Store Connect 账号）登录。
3. 交付：将生成的 Distribution 类型的 `.ipa` 包拖入 Transporter，点击“交付”。
4. 处理：上传完成后，需等待 App Store Connect 后台处理（约 10-30 分钟）。