//
//  ContentView.swift
//  demo4-global-state
//
//  Created by arno_solo on 4/8/24.
//

import SwiftUI

struct ContentView: View {
    @State var selectedTab: Int = 0
    
    var body: some View {
        TabView(selection: $selectedTab) {
            HomeView()
            .tabItem {
                Label("Home", systemImage: "house")
            }
            .tag(0)

            SettingsView()
            .tabItem {
                Label("Settings", systemImage: "gear")
            }
            .tag(1)
        }
    }
}

#Preview {
    ContentView()
}
