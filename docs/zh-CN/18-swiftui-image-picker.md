---
title: SwiftUI 从相册读取照片
lang: zh-CN
description: 本文描述了 SwiftUI 应用应该如何从相册中读取照片, 视频
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

## 前提条件

1. [SwiftUI 状态管理](17-SwiftUI-state-management)
2. [Swift async await](19-swift-async-await)

## iOS16+

PhotosUI 库提供了一个名为 `PhotosPicker` 的组件可以用来选择照片. 包括图片的数据, 文件拓展名, 媒体类型, 都是可以读取出来的.

```swift
import SwiftUI
import PhotosUI

struct AttachmentsPicker: View {
    @State private var photosPickerItems: [PhotosPickerItem] = []
    
    private func handlePickerItemsChange(items: [PhotosPickerItem]) {
        Task {
            for item in items {
                guard let data = try await item.loadTransferable(type: Data.self) else {
                    continue
                }
                do {
                    let attachmentId = UUID().uuidString
                    // File extension
                    let fileExtension = item.supportedContentTypes.first?.preferredFilenameExtension ?? ""
                    let filename = [attachmentId, fileExtension].joined(separator: ".")
                    // Mime type
                    let mimeType = item.supportedContentTypes.first?.preferredMIMEType ?? "application/octet-stream"
                    
                    // Your business logic here
                } catch {
                    print(error.localizedDescription)
                }
            }
            
            await MainActor.run {
                photosPickerItems = []
            }
        }
    }
    
    var body: some View {
        PhotosPicker(
            selection: $photosPickerItems,
            maxSelectionCount: nil,
            matching: .any(of: [.videos, .images])
        ) {
            Image(systemName: "photo")
                .foregroundStyle(Color.theme.text)
                .frame(width: 30)
                .accessibilityLabel("Attachments")
        }
        .onChange(of: photosPickerItems, { _oldValue, newValue in
            handlePickerItemsChange(items: newValue)
        })
    }
}
```

## (可选) 低于 iOS16

低于 iOS16 可通过创建一个符合 `UIViewControllerRepresentable` 协议的组件将 UIKit 控制器转化为 SwiftUI 组件.

1. 定义 `ImagePicker` 组件
```swift
import PhotosUI
import SwiftUI

struct ImagePickerV1: UIViewControllerRepresentable {
    let onSelected: ([UIImage]) -> Void
    
    enum PickerError: Error {
        case noData
    }

    func makeUIViewController(context: Context) -> PHPickerViewController {
        var config = PHPickerConfiguration()
        config.filter = .images
        config.selectionLimit = 1
        config.preferredAssetRepresentationMode = .current
        
        let controller = PHPickerViewController(configuration: config)
        controller.delegate = context.coordinator
        return controller
    }
    
    func updateUIViewController(_ uiViewController: PHPickerViewController, context: Context) {
    }
    
    func makeCoordinator() -> Coordinator {
        Coordinator(parent: self)
    }
    
    class Coordinator: PHPickerViewControllerDelegate {
        var parent: ImagePickerV1
        
        init(parent: ImagePickerV1) {
            self.parent = parent
        }
        
        func picker(_ picker: PHPickerViewController, didFinishPicking results: [PHPickerResult]) {
            Task {
                picker.dismiss(animated: true, completion: .none)
                
                var images: [UIImage] = []
                for result in results {
                    if let image = try? await readUIImage(item: result) {
                        images.append(image)
                    }
                }
                
                self.parent.onSelected(images)
            }
        }
        
        private func readUIImage(item: PHPickerResult) async throws -> UIImage? {
            return try await withCheckedThrowingContinuation { continuation in
                item.itemProvider.loadObject(ofClass: UIImage.self) { reading, error in
                    guard let image = reading as? UIImage, error == nil else {
                        return continuation.resume(throwing: PickerError.noData)
                    }
                    continuation.resume(returning: image)
                }
            }
        }
    }
}
```

2. 使用 `ImagePicker` 组件按
```swift
// 将 imagePickerIsOpen 设为 true 打开图片选择 sheet,
// 选择图片后, sheet 自动退出
@State private var imagePickerIsOpen = false

.sheet(isPresented: $imagePickerIsOpen, content: {
    ImagePickerV1(onSelected: handleCoverImageSelected)
        .ignoresSafeArea()
})

private func handleCoverImageSelected(images: [UIImage]) {
}
```