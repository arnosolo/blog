---
title: Swift async await
lang: en-US
description: This article explains how to define async functions, how to call them, and how to convert callback functions into async functions when writing apps in Swift.
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

## Basic Usage

`await` can only be called inside an `async` function or within a `Task`.

1. Define an async function:
```swift
func fetchImage() async {
  await loader.downloadImage()
}
```

2. Use the async function:
```swift
Button("Download with Async") {
  Task {
      await vm.fetchImage()
  }
}
```

## Cancelling an Async Function

```swift
var body: some View {
    VStack {
        if let image = vm.image {
            Image(uiImage: image)
        }
    }
    .onAppear {
        fetchImageTask = Task {
            await vm.fetchImage()
        }
    }
    .onDisappear {
        fetchImageTask?.cancel()
    }
}
```

## Converting Callback Functions to Async Functions

You can use the `withCheckedContinuation` function to wrap a callback function (completion handler) into an async function.

```swift
// Use withCheckedThrowingContinuation for throwing operations
// Use withCheckedContinuation for non-throwing operations
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
