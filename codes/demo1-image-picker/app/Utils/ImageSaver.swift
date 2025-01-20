//
//  ImageSaver.swift
//  app
//
//  Created by Arno Solo on 12/30/23.
//

import Photos

// Note: In order to save image to photo library, NSPhotoLibraryAddUsageDescription
// must be added to Info.plist first
struct ImageSaver {
    enum SaverError: Error {
        case unknown
    }

    static func saveImageToPhotosLibrary(imageData: Data) async throws {
        try await withCheckedThrowingContinuation { continuation in
            PHPhotoLibrary.shared().performChanges({
                // Create a PHAssetCreationRequest for the image
                let creationRequest = PHAssetCreationRequest.forAsset()
                // Add the image data to the request
                creationRequest.addResource(with: .photo, data: imageData, options: nil)

            }, completionHandler: { success, error in
                if success {
                    continuation.resume()
                } else if let error = error {
                    continuation.resume(throwing: error)
                } else {
                    continuation.resume(throwing: SaverError.unknown)
                }
            })
        }
        
    }
}
