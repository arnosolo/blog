import CoreData

class TodoDAO {
    enum CustomError: Error, LocalizedError {
        case notFound
    }
    
    static let shared = TodoDAO(container: PersistenceController.shared.container)

    private let container: NSPersistentContainer
    
    init(container: NSPersistentContainer) {
        self.container = container
    }
    
    func createOne(todo: TodoModel) async throws {
        try await container.performBackgroundTask { ctx in
            let entity = Self.findEntity(todoId: todo.todoId, ctx: ctx) ?? TodoEntity(context: ctx)
            Self.modifyEntity(entity: entity, todo: todo)

            try ctx.save()
        }
    }
    
    func updateOne(todo: TodoModel) async throws {
        try await container.performBackgroundTask { ctx in
            guard let entity = Self.findEntity(todoId: todo.todoId, ctx: ctx) else {
                throw CustomError.notFound
            }
            Self.modifyEntity(entity: entity, todo: todo)
            
            entity.removeFromTags(entity.tags ?? [])
            for tag in todo.tags {
                if let tagEntity = TagDAO.findEntity(tagId: tag.tagId, ctx: ctx) {
                    entity.addToTags(tagEntity)
                }
            }
            
            try ctx.save()
        }
    }
    
    func deleteOne(todoId: String) async throws {
        return try await container.performBackgroundTask { ctx in
            guard let entity = Self.findEntity(todoId: todoId, ctx: ctx) else {
                throw CustomError.notFound
            }
            ctx.delete(entity)
            try ctx.save()
        }
    }
    
    func findOne(todoId: String) async -> TodoModel? {
        return await container.performBackgroundTask { ctx in
            guard let entity = Self.findEntity(todoId: todoId, ctx: ctx) else { return nil }
            return Self.entityToModel(entity: entity, ctx: ctx)
        }
    }
    
    // page: Start from 0
    func findMany(searchInput: String?, tagId: String?, page: Int?, pageSize: Int?) async throws -> [TodoModel] {
        let req = TodoEntity.fetchRequest()
        
        // Search
        var predicates: [NSPredicate] = []
        
        if let searchInput, !searchInput.isEmpty {
            // c: Case insensitive
            // d: Diacritic insensitive
            let predicate = NSPredicate(format: "title CONTAINS[cd] %@", searchInput)
            predicates.append(predicate)
        }
        
        if let tagId {
            let predicate = NSPredicate(format: "ANY tags.tagId == %@", tagId)
            predicates.append(predicate)
        }

        // Pagination
        if let page, let pageSize {
            req.fetchLimit = pageSize
            req.fetchOffset = page * pageSize
        }
        
        // Sort
        req.sortDescriptors = [NSSortDescriptor(key: "updatedAt", ascending: false)]

        return try await container.performBackgroundTask { ctx in
            let entities = try ctx.fetch(req)
            return entities.compactMap { Self.entityToModel(entity: $0, ctx: ctx) }
        }
    }
    
    static func findEntity(todoId: String, ctx: NSManagedObjectContext) -> TodoEntity? {
        do {
            let req = TodoEntity.fetchRequest()
            req.predicate = NSPredicate(format: "todoId = %@", todoId)
            let entities = try ctx.fetch(req)
            return entities.isEmpty ? nil : entities[0]
        } catch {
            print(error.localizedDescription)
            return nil
        }
    }
    
    static func modifyEntity(entity: TodoEntity, todo: TodoModel) {
        entity.todoId = todo.todoId
        entity.createdAt = todo.createdAt
        entity.updatedAt = todo.updatedAt
        entity.title = todo.title
        entity.completedAt = todo.completedAt
    }
    
    static func entityToModel(entity: TodoEntity, ctx: NSManagedObjectContext) -> TodoModel? {
        guard let todoId = entity.todoId,
              let createdAt = entity.createdAt,
              let updatedAt = entity.updatedAt,
              let title = entity.title
        else { return nil }
        
        let tagEntities = entity.tags?.allObjects as? [TagEntity]
        let tags: [TagModel] = (tagEntities ?? []).compactMap { entity in
            TagDAO.entityToModel(entity: entity, ctx: ctx)
        }
        
        return TodoModel(
            todoId: todoId,
            createdAt: createdAt,
            updatedAt: updatedAt,
            title: title,
            completedAt: entity.completedAt,
            tags: tags
        )
    }
}
