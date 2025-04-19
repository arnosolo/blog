---
title: Custom Error Types in Swift
lang: en-US
description: This article describes how to create custom error types when building apps with Swift.
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

## Defining Error Types

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
            return NSLocalizedString("Unknown error occurred", comment: "")
        case .badHttpStatus(let status, let message):
            return NSLocalizedString("status = \(status), message = \(message)", comment: "")
        }
    }
}
```

## Using the Error Type

```swift
func createItem() throws {
  guard let ... else {
    throw CustomError.decodeJsonFailed
  }
  ...
}
```
