---
title: 自定义 iOS 通知提示音
lang: zh-CN
description: 本文介绍了如何实现 自定义 iOS 通知提示音.
email: shan_huang_apple_dev_2@outlook.com
author: HUANG SHAN
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

1. 添加音频文件到 Xcode 项目
   ![picture 0](assets/f94672555b0fa3fe54ca92c61cb1d6970dc8ac7f70843fd03233f4e8fa8c3995.png)
2. 设置通知提示音
   ```swift
    let content = UNMutableNotificationContent()
    content.title = title
    content.body = body
    content.sound = UNNotificationSound(named: UNNotificationSoundName(rawValue: "ra2-warning-zi-zi.wav"))
   ```