//
//  TagRow.swift
//  demo5-todo-list
//
//  Created by arno_solo on 3/21/25.
//

import SwiftUI

struct TagRow: View {
    let tag: TagModel
    
    var body: some View {
        HStack {
            Text(tag.title)
            Spacer()
        }
    }
}

//#Preview {
//    TagRow()
//}
