//
//  DeveloperPreview.swift
//  demo5-todo-list
//
//  Created by arno_solo on 3/21/25.
//


import Foundation

class DeveloperPreview {
    static let instance = DeveloperPreview()
    
    let tagRepository = TagRepository(tagDAO: TagDAO(container: PersistenceController.preview.container))
    
    private init() {
    }
}
