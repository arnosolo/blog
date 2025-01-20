//
//  ImagePicker.swift
//  app
//
//  Created by Arno Solo on 12/30/23.
//

import SwiftUI
import PhotosUI

struct ImagePicker<Content: View>: View {
    enum PickerError: Error, LocalizedError {
        case noImageData
        
        var errorDescription: String? {
            switch self {
            case .noImageData:
                return "The image was loaded successfully, but there was no image data."
            }
        }
    }
    
    let onChange: (_ images: [Data]) -> Void
    let maxSelectionCount: Int? = nil
    @ViewBuilder let label: Content
    
    @State private var selectedItems: [PhotosPickerItem] = []
    
    var body: some View {
        PhotosPicker(
            selection: $selectedItems,
            maxSelectionCount: maxSelectionCount,
            matching: .images,
            photoLibrary: .shared() // This param is optional, but if we leave this param as nil, then the itemIdentifier of PhotosPickerItem object will be nil
        ) {
            label
        }
        .onChange(of: selectedItems) { selectedItems in
            Task {
                do {
                    // Why task group?
                    // In this way, all image data be returned at once
                    let results = try await withThrowingTaskGroup(of: Data.self) { group in
                        for item in selectedItems {
                            group.addTask {
                                return try await readImageData(item: item)
                            }
                        }
                        var resultArr: [Data] = []
                        for try await result in group {
                            resultArr.append(result)
                        }
                        return resultArr
                    }
                    
                    DispatchQueue.main.async {
                        onChange(results)
                    }
                } catch {
                    print(error.localizedDescription)
                }
            }
        }
    }
    
    // Convert completion handler to async function
    private func readImageData(item: PhotosPickerItem) async throws -> Data {
        // You must resume the continuation exactly once
        return try await withCheckedThrowingContinuation { continuation in
            item.loadTransferable(type: Data.self) { result in
                switch result {
                case .success(let imageData):
                    if let imageData {
                        continuation.resume(returning: imageData)
                    } else {
                        continuation.resume(throwing: PickerError.noImageData)
                    }
                case .failure(let error):
                    continuation.resume(throwing: error)
                }
            }
        }
    }
}
