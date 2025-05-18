---
title: Custom iOS notification sound
lang: en-US
description: This article explains how to implement custom iOS notification sounds.
author: HUANG SHAN
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

1. Add audio files to the Xcode project
   ![picture 0](assets/f94672555b0fa3fe54ca92c61cb1d6970dc8ac7f70843fd03233f4e8fa8c3995.png)
2. Set notification sound
   ```swift
    let content = UNMutableNotificationContent()
    content.title = title
    content.body = body
    content.sound = UNNotificationSound(named: UNNotificationSoundName(rawValue: "ra2-warning-zi-zi.wav"))
   ```