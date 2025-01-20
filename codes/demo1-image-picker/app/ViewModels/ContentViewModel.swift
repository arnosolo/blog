//
//  ContentViewModel.swift
//  app
//
//  Created by Arno Solo on 12/30/23.
//

import Foundation

class ContentViewModel: ObservableObject {
    // You can also UIImage, but be careful UIImage will not keep metadata(F number, IOS...) of image
    @Published var images: [Data] = []
    
    func handleSelectedImageChange(newVal: [Data]) {
        images = newVal
    }
}
