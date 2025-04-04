---
title: SwiftUI 使用相机捕获图片
lang: zh-CN
description: 本文描述了在 SwiftUI 应用中如何使用相机捕获一张图片
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

## 前提条件

1. [SwiftUI 状态管理](17-SwiftUI-state-management)
2. [Swift async await](19-swift-async-await)

## 具体步骤

### 声明权限

在 `Info.plist` 文件中增加 `NSCameraUsageDescription` 键. 注意, 必须提供一个具体的使用例子, 不然可能会被 App Store 审核人员拒绝. Guideline 5.1.1 - Legal - Privacy - Data Collection and Storage
```xml
<key>NSCameraUsageDescription</key>
<string>The app needs camera permission to capture a photo. For instance, it could be used to generate an image in the style of Ghibli.</string>
```

### 定义 PhotoCapturer

```swift
import UIKit
import SwiftUI

struct PhotoCapturer: UIViewControllerRepresentable {
    @Binding var isOpen: Bool
    let onCaptured: (UIImage) -> Void
   
    func makeUIViewController(context: Context) -> some UIViewController {
        let imagePicker = UIImagePickerController()
        imagePicker.sourceType = .camera
        imagePicker.delegate = context.coordinator

        return imagePicker
    }
    
    func updateUIViewController(_ uiViewController: UIViewControllerType, context: Context) {
    }
    
    func makeCoordinator() -> Coordinator {
        return Coordinator(self)
    }
    
    class Coordinator: NSObject, UIImagePickerControllerDelegate, UINavigationControllerDelegate {
        
        var parent: PhotoCapturer
        
        init(_ picker: PhotoCapturer) {
            self.parent = picker
        }
        
        // When user has cancelled the image picker UI
        func imagePickerControllerDidCancel(_ picker: UIImagePickerController) {
            print("Photo capturer cancelled")
            parent.isOpen = false
        }
        
        // When user has picked an image
        func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [UIImagePickerController.InfoKey : Any]) {
            print("Photo captured")
            if let image = info[UIImagePickerController.InfoKey.originalImage] as? UIImage {
                DispatchQueue.main.async {
                    self.parent.onCaptured(image)
                }
            }
            parent.isOpen = false
        }
    }
}
```

### 使用 PhotoCapturer

注意: 您将需要在物理设备上运行应用才能拍照. 模拟器上无法拍照, 且样式与物理设备上不同

```swift
@State private var photoCapturerIsOpen = false

.sheet(isPresented: $photoCapturerIsOpen) {
    PhotoCapturer(isOpen: $photoCapturerIsOpen, onCaptured: onImageSelected)
        .ignoresSafeArea()
}
```
