---
title: Reading Photos from the Photo Library in SwiftUI
lang: en-US
description: This article describes how a SwiftUI app can read photos and videos from the photo library.
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

## Prerequisites

1. [SwiftUI State Management](17-SwiftUI-state-management)
2. [Swift Async Await](19-swift-async-await)

## iOS 16+

The PhotosUI framework provides a component called `PhotosPicker` that can be used to select photos. You can read data such as the image, file extension, and media type.

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

## (Optional) For iOS Versions Below 16

For iOS versions below 16, you can create a component that conforms to the `UIViewControllerRepresentable` protocol to convert a UIKit controller into a SwiftUI component.

1. Define the `ImagePicker` Component
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

2. Using the `ImagePicker` Component
```swift
// Set imagePickerIsOpen to true to open the image picker sheet,
// After selecting an image, the sheet automatically dismisses.
@State private var imagePickerIsOpen = false

.sheet(isPresented: $imagePickerIsOpen, content: {
    ImagePickerV1(onSelected: handleCoverImageSelected)
        .ignoresSafeArea()
})

private func handleCoverImageSelected(images: [UIImage]) {
}
```