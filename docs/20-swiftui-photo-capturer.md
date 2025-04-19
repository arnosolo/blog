---
title: Using the Camera to Capture Images in SwiftUI  
lang: en-US
description: This article describes how to use the camera to capture an image in a SwiftUI app.
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

## Prerequisites

1. [SwiftUI State Management](17-SwiftUI-state-management)  
2. [Swift async await](19-swift-async-await)

## Steps

### Declare Permissions

Add the `NSCameraUsageDescription` key to the `Info.plist` file. Note that you must provide a specific use case, or your app may be rejected during App Store review. Guideline 5.1.1 - Legal - Privacy - Data Collection and Storage  
```xml
<key>NSCameraUsageDescription</key>
<string>The app needs camera permission to capture a photo. For instance, it could be used to generate an image in the style of Ghibli.</string>
```

### Define PhotoCapturer

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

### Use PhotoCapturer

Note: You will need to run the app on a physical device to capture photos. Photos cannot be taken on the simulator, and the style may differ from the physical device.

```swift
@State private var photoCapturerIsOpen = false

.sheet(isPresented: $photoCapturerIsOpen) {
    PhotoCapturer(isOpen: $photoCapturerIsOpen, onCaptured: onImageSelected)
        .ignoresSafeArea()
}
```