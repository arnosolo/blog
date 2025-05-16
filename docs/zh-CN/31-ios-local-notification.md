---
title: 实现 iOS 本地通知功能
lang: zh-CN
description: 本文介绍了如何实现 iOS 的本地通知功能. 包括本地通知有哪些类型, 实现的流程, 以及实现的代码
email: shan_huang_apple_dev_2@outlook.com
author: HUANG SHAN
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

### 添加权限使用说明

在 `Info.plist` 文件中, 增加键`NSUserNotificationsUsageDescription`.
- 注意, 描述中需要有实际的例子, 否则在应用提交 App Store 审核时, 可能会被审核人员拒绝
```xml
<dict>
    <key>NSUserNotificationsUsageDescription</key>
    <string>We use notifications to alert you when it's time to take a break or start a new focus session.</string>
</dict>
```

### 通知类型

本地通知一共有两种类型.
1. 一种根据时间间隔触发. 比如说现在注册一个通知, 设置时间间隔为 60s, 那么 60s 后手机就会显示一条通知. 如果进一步设置该通知为重复通知, 则每隔 60s 显示一条通知
2. 另一种根据日历触发. 比如说现在注册一个通知, 设置其触发日期为 05/30, 那么到了 05/30, 手机就会显示一条通知. 如果进一步设置该通知为重复通知, 那么每年 05/30 都会显示一条通知.

### 实现流程

1. 检查通知权限状态
2. 请求用户授予通知权限
3. 注册本地通知

### 定义通知管理类

```swift
// NotificationManager.swift
import UserNotifications

class NotificationManager {
    static let instance = NotificationManager()
    
    enum NotificationError: LocalizedError {
        case requestPermissionFailed
        case atLeast60SecondsIfRepeating
        
        var errorDescription: String? {
            switch self {
            case .requestPermissionFailed:
                return NSLocalizedString("Request notification permission failed", comment: "")
            case .atLeast60SecondsIfRepeating:
                return NSLocalizedString("Time interval must be at least 60 if repeating", comment: "")
            }
        }
    }

    private init() {}
    
    func getPermissionStatus() async -> UNAuthorizationStatus {
        return await withCheckedContinuation { continuation in
            UNUserNotificationCenter.current().getNotificationSettings { settings in
                continuation.resume(returning: settings.authorizationStatus)
            }
        }
    }

    func requestPermission() async throws {
        let options: UNAuthorizationOptions = [.alert, .sound, .badge]
        return try await withCheckedThrowingContinuation { continuation in
            UNUserNotificationCenter.current().requestAuthorization(options: options) { success, error in
                if let error = error {
                    continuation.resume(throwing: error)
                } else if success == false {
                    continuation.resume(throwing: NotificationError.requestPermissionFailed)
                } else {
                    continuation.resume()
                }
            }
        }
    }
    
    func listRegisteredNotifications() async -> [UNNotificationRequest] {
        return await withCheckedContinuation { continuation in
            UNUserNotificationCenter.current().getPendingNotificationRequests { requests in
                continuation.resume(returning: requests)
            }
        }
    }
    
    func removeNotification(id: String) {
        UNUserNotificationCenter.current().removePendingNotificationRequests(withIdentifiers: [id])
        
        // Optional: Also remove delivered notifications with the same identifier
        // UNUserNotificationCenter.current().removeDeliveredNotifications(withIdentifiers: [id])
    }

    func notifyAfter(
        seconds: TimeInterval,
        repeats: Bool,
        title: String,
        body: String,
        notificationId: String? = nil,
        userInfo: [AnyHashable : Any]? = nil
    ) async throws -> String {
        if repeats && seconds < 60 {
            throw NotificationError.atLeast60SecondsIfRepeating
        }
        
        if await getPermissionStatus() != .authorized {
            try await requestPermission()
        }

        let id = notificationId ?? UUID().uuidString

        let content = UNMutableNotificationContent()
        content.title = title
        content.body = body
        content.sound = .default
        content.badge = 1
        if let userInfo {
            content.userInfo = userInfo
        }

        let trigger = UNTimeIntervalNotificationTrigger(timeInterval: seconds, repeats: repeats)

        let request = UNNotificationRequest(identifier: id, content: content, trigger: trigger)
        try await UNUserNotificationCenter.current().add(request)
        
        return id
    }
    
    func notifyAt(
        date: Date,
        title: String,
        subtitle: String,
        notificationId: String? = nil,
        userInfo: [AnyHashable : Any]? = nil
    ) async throws -> String {
        if await getPermissionStatus() != .authorized {
            try await requestPermission()
        }
        
        let id = notificationId ?? UUID().uuidString

        let content = UNMutableNotificationContent()
        content.title = title
        content.subtitle = subtitle
        content.sound = .default
        content.badge = 1
        if let userInfo {
            content.userInfo = userInfo
        }
        
        let calendar = Calendar(identifier: .gregorian)
        let dateComponents = calendar.dateComponents([.year, .month, .day, .hour, .minute], from: date)

        let trigger = UNCalendarNotificationTrigger(dateMatching: dateComponents, repeats: false)

        let request = UNNotificationRequest(identifier: id, content: content, trigger: trigger)
        try await UNUserNotificationCenter.current().add(request)
        
        return id
    }
}
```

### 使用通知管理类

```swift
// 15s 后显示一条通知. 注意您将需要离开应用才能看到通知.
_ = try await NotificationManager.instance.notifyAfter(
    seconds: 15,
    repeats: false,
    title: "Hello",
    body: Constants.restDoneNotificationMessage
)
```