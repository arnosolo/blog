import Foundation

class TodoRepository {
    static let shared = TodoRepository(
        todoDAO: TodoDAO.shared,
        tagDAO: TagDAO.shared
    )
    
    private var todoDAO: TodoDAO
    private var tagDAO: TagDAO
    
    init(todoDAO: TodoDAO, tagDAO: TagDAO) {
        self.todoDAO = todoDAO
        self.tagDAO = tagDAO
    }
    
    func createTodo(todo: TodoModel) async throws {
        try await todoDAO.createOne(todo: todo)
        try await todoDAO.updateOne(todo: todo)
    }
    
    func updateTodo(todo: TodoModel) async throws {
        try await todoDAO.updateOne(todo: todo)
    }

    func deleteTodo(todo: TodoModel) async throws {
        try await todoDAO.deleteOne(todoId: todo.todoId)
    }
    
    func findTodos(searchText: String?, tagId: String?, page: Int?, pageSize: Int?) async throws -> [TodoModel] {
        return try await todoDAO.findMany(searchInput: searchText, tagId: tagId, page: page, pageSize: pageSize)
    }
}
