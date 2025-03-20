//
//  AppEntry.swift
//  demo5-todo-list
//
//  Created by arno_solo on 3/20/25.
//

import SwiftUI

@main
struct AppEntry: App {
    let persistenceController = PersistenceController.shared

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environment(\.managedObjectContext, persistenceController.container.viewContext)
        }
    }
}
