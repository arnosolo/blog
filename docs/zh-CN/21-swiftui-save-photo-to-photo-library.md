---
title: SwiftUI 保存图片到相册
lang: zh-CN
description: 本文描述了在 SwiftUI 应用中如何保存图片到相册
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

## 前提条件

1. [从相册读取照片](18-swiftui-image-picker)

## 实现步骤 iOS17+

### 声明权限

在 `Info.plist` 文件中增加
```xml
<key>NSPhotoLibraryAddUsageDescription</key>
<string>The App want save images to the Photo Library</string>
```

### 定义 MediaSaver

```swift
import Photos

struct MediaSaver {
    static func saveImageToPhotoLibrary(url: URL) async throws {
        try await PHPhotoLibrary.shared().performChanges {
            PHAssetCreationRequest.creationRequestForAssetFromImage(atFileURL: url)
        }
    }
    
    static func saveVideoToPhotoLibrary(url: URL) async throws {
        try await PHPhotoLibrary.shared().performChanges {
            PHAssetCreationRequest.creationRequestForAssetFromVideo(atFileURL: url)
        }
    }
}
```

### 使用 MediaSaver

```swift
Task {
    do {
        try await MediaSaver.saveVideoToPhotoLibrary(url: videoURL)
    } catch {
        print(error.localizedDescription)
    }
}
```

## 实现步骤 iOS15+

### 声明权限

在 `Info.plist` 文件中增加
```xml
<key>NSPhotoLibraryAddUsageDescription</key>
<string>The App want save images to the Photo Library</string>
```

### 定义 ImageSaver

```swift
// ImageSaver.swift
import UIKit

class ImageSaver: NSObject {
    var successHandler: (() -> Void)?
    var errorHandler: ((Error) -> Void)?

    func writeToPhotoAlbum(image: UIImage) {
        UIImageWriteToSavedPhotosAlbum(image, self, #selector(saveCompleted), nil)
    }

    @objc func saveCompleted(_ image: UIImage, didFinishSavingWithError error: Error?, contextInfo: UnsafeRawPointer) {
        if let error = error {
            errorHandler?(error)
        } else {
            successHandler?()
        }
    }
}
```

### 使用 ImageSaver

```swift
// ContentView.swift

func savePhoto() {
    guard let processedImage = processedImage else { return }

    let imageSaver = ImageSaver()

    imageSaver.successHandler = {
        print("Success!")
    }

    imageSaver.errorHandler = {
        print("Oops! \($0.localizedDescription)")
    }

    imageSaver.writeToPhotoAlbum(image: processedImage)
}
```