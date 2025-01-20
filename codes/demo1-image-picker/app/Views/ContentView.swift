//
//  ContentView.swift
//  app
//
//  Created by Arno Solo on 12/30/23.
//

import SwiftUI

struct ContentView: View {
    @StateObject var vm = ContentViewModel()
    
    var body: some View {
        VStack {
            ScrollView {
                ImagePicker(onChange: vm.handleSelectedImageChange) {
                    Text("Pick images")
                }
                VStack {
                    ForEach(vm.images, id: \.hashValue) { image in
                        ImageRow(image: image)
                    }
                }
            }
        }
        .padding()
    }
}

#Preview {
    ContentView()
}
