//
//  ImageRow.swift
//  app
//
//  Created by Arno Solo on 12/30/23.
//

import SwiftUI

struct ImageRow: View {
    let image: Data
    
    @State private var saveImageState: AsyncReqState = .beforeReq
    
    private func saveImage() {
        Task {
            do {
                saveImageState = .fetching
                try await ImageSaver.saveImageToPhotosLibrary(imageData: image)
                saveImageState = .successed
            } catch {
                print(error)
                saveImageState = .failed
            }
        }
    }
    
    var body: some View {
        HStack {
            if let uiImage = UIImage(data: image) {
                Image(uiImage: uiImage)
                    .resizable()
                    .scaledToFit()
                    .frame(height: 40)
            }
            Spacer()
            if saveImageState == .failed {
                Text("Save failed")
            } else if saveImageState == .successed {
                Text("Successfully saved")
            } else if saveImageState == .fetching {
                ProgressView()
            } else {
                Button(action: saveImage) {
                    Text("Save")
                }
            }
        }
        .padding()
        .background(.gray.opacity(0.1))
        .clipShape(RoundedRectangle(cornerRadius: 8))
    }
}

#Preview {
    VStack {
        if let image = DeveloperPreview.instance.image {
            ImageRow(image: image)
        }
    }
}
