//
//  Persistence.swift
//  demo5-todo-list
//
//  Created by arno_solo on 3/20/25.
//

import CoreData

struct PersistenceController {
    static let shared = PersistenceController(dbName: "demo5_todo_list", appGroupsId: nil)
    
    static let preview: PersistenceController = {
        let result = PersistenceController(dbName: "demo5_todo_list", appGroupsId: nil, inMemory: true)
        return result
    }()

    let container: NSPersistentContainer

    init(dbName: String, appGroupsId: String? = nil, inMemory: Bool = false) {
        container = NSPersistentContainer(name: dbName)

        if let appGroupsId,
           let appGroupsURL = FileManager.default.containerURL(forSecurityApplicationGroupIdentifier: appGroupsId) {
            // Specify the URL for the persistent store
            let storeURL = appGroupsURL.appendingPathComponent("\(dbName).sqlite")
            // Set up the persistent store with the shared URL
            container.persistentStoreDescriptions = [NSPersistentStoreDescription(url: storeURL)]
        }
        
        if inMemory {
            container.persistentStoreDescriptions.first!.url = URL(fileURLWithPath: "/dev/null")
        }
        
        container.loadPersistentStores(completionHandler: { (storeDescription, error) in
            if let error = error as NSError? {
                print(error.localizedDescription)
            }
        })
        container.viewContext.automaticallyMergesChangesFromParent = true
    }
}
