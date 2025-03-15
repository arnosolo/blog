---
title: Swift async await
lang: zh-CN
description: 本文描述了使用 Swift 编写应用时, 如何定义异步函数, 如何调用异步函数, 如何将回调函数
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

## 基础用法

`await` 只能在 `async` 函数中或者 `Task` 中被调用.

1. 定义异步函数
```swift
func fetchImage() async {
  await loader.downloadImage()
}
```
2. 使用异步函数
```swift
Button("Download with Async") {
  Task {
      await vm.fetchImage()
  }
}
```

## 取消异步函数

```swift
var body: some View {
    VStack {
        if let image = vm.image {
            Image(uiImage: image)
        }
    }
    .onAppear{
        fetchImageTask = Task {
            await vm.fetchImage()
        }
    }
    .onDisappear {
        fetchImageTask?.cancel()
    }
}
```

## 将回调函数转化为异步函数

可以使用 `withCheckedContinuation` 函数将回调函数(Completion handler)封装成异步函数(Async function)

```swift
// 会抛出错误的调用 withCheckedThrowingContinuation
// 不会抛出错误的调用 withCheckedContinuation
private func readImageData(item: PhotosPickerItem) async throws -> Data {
    return try await withCheckedThrowingContinuation { continuation in
        item.loadTransferable(type: Data.self) { result in
            switch result {
            case .success(let imageData):
                if let imageData {
                    continuation.resume(returning: imageData)
                } else {
                    continuation.resume(throwing: PickerError.noData)
                }
            case .failure(let error):
                continuation.resume(throwing: error)
            }
        }
    }
}
```
