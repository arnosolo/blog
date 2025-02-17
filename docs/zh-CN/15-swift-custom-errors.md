# Swift 自定义错误类型

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