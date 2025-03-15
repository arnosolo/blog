---
title: Swift 自定义错误类型
lang: zh-CN
description: 本文描述了使用 Swift 编写应用时, 如何创建自定义错误类型
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

## 定义错误类型
```swift
enum CustomError: LocalizedError {
    case decodeJsonFailed
    case unknown
    case badHttpStatus(status: Int, message: String)
    
    var errorDescription: String? {
        switch self {
        case .decodeJsonFailed:
            return NSLocalizedString("Decode json failed", comment: "")
        case .unknown:
            return NSLocalizedString("unknown error occurred", comment: "")
        case .badHttpStatus(let status, let message):
            return NSLocalizedString("status = \(status), message = \(message)", comment: "")
        }
    }
}
```

## 使用错误类型
```swift
func createItem() throws {
  guard let ... else {
    throw CustomError.decodeJsonFailed
  }
  ...
}
```