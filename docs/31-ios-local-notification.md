---
title: Implement iOS local notification
lang: en-US
description: This article introduces how to implement local notification in iOS. It includes the types of local notifications and the code for implementation.
author: HUANG SHAN
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

### Add Usage Description for Permissions

Add the key `NSUserNotificationsUsageDescription` to your `Info.plist` file.

* Note: The description must include a real example; otherwise, your app may be rejected during App Store review.

```xml
<dict>
    <key>NSUserNotificationsUsageDescription</key>
    <string>We use notifications to alert you when it's time to take a break or start a new focus session.</string>
</dict>
```

### Types of Notifications

There are two types of local notifications:

1. **Triggered by time interval**
   For example, if a notification is registered with a 60-second interval, the phone will display a notification after 60 seconds.
   If this notification is set to repeat, it will display every 60 seconds.

2. **Triggered by calendar date**
   For example, if a notification is registered with a trigger date of 05/30, the phone will display the notification on 05/30.
   If the notification is set to repeat, it will display on 05/30 every year.

### Implementation Workflow

1. Check the notification permission status
2. Request the user to grant notification permission
3. Register the local notification

### Define the Notification Manager Class

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

### Using the Notification Manager

```swift
// Show a notification after 15 seconds. Note: you need to leave the app to see the notification.
_ = try await NotificationManager.instance.notifyAfter(
    seconds: 15,
    repeats: false,
    title: "Hello",
    body: "This is body"
)
```
