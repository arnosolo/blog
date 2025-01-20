//
//  DeveloperPreview.swift
//  app
//
//  Created by Arno Solo on 12/30/23.
//

import Foundation
import UIKit

class DeveloperPreview {
    static let instance = DeveloperPreview()
    
    let image: Data? = UIImage(systemName: "star")?.pngData()
    let contentViewModel: ContentViewModel = ContentViewModel()
    
    private init() {
        contentViewModel.images = ["star", "person"].compactMap({ UIImage(systemName: $0)?.pngData() })
    }
}
