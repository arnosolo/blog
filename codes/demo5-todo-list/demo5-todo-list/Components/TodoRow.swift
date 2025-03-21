//
//  TodoRow.swift
//  demo5-todo-list
//
//  Created by arno_solo on 3/21/25.
//

import SwiftUI

struct TodoRow: View {
    let todo: TodoModel
    
    private var tagText: String {
        todo.tags.map({ "#\($0.title)" }).joined(separator: ", ")
    }
    
    var body: some View {
        VStack(alignment: .leading) {
            HStack {
                Text(todo.title)
            }
            Text(tagText)
        }
    }
}

//#Preview {
//    TodoRow()
//}
