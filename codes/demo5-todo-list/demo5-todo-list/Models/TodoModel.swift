import Foundation

struct TodoModel {
    let todoId: String
    let createdAt: Date
    let updatedAt: Date
    let title: String
    let completedAt: Date?
    let tags: [TagModel]
}
