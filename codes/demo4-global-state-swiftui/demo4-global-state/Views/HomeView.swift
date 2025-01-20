//
//  HomeView.swift
//  demo4-global-state
//
//  Created by arno_solo on 4/20/24.
//

import SwiftUI

struct HomeView: View {
    @EnvironmentObject var settingStore: SettingStore

    var body: some View {
        VStack {
            Text("Home")
            Text("Count = \(settingStore.count)")
            Button("Add") {
                settingStore.count += 1
            }
        }
    }
}

#Preview {
    HomeView()
        .environmentObject(SettingStore())
}
