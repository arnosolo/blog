//
//  demo4_global_stateApp.swift
//  demo4-global-state
//
//  Created by arno_solo on 4/8/24.
//

import SwiftUI

@main
struct AppEntry: App {
    @StateObject var settingStore = SettingStore()

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(settingStore)
        }
    }
}
