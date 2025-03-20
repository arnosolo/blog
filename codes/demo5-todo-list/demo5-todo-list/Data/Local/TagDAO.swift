import CoreData

class TagDAO {
    enum CustomError: Error, LocalizedError {
        case notFound
    }
    
    static let shared = TagDAO(container: PersistenceController.shared.container)

    private let container: NSPersistentContainer
    
    init(container: NSPersistentContainer) {
        self.container = container
    }
    
    func createOne(tag: TagModel) async throws {
        try await container.performBackgroundTask { ctx in
            let entity = Self.findEntity(tagId: tag.tagId, ctx: ctx) ?? TagEntity(context: ctx)
            Self.modifyEntity(entity: entity, tag: tag)

            try ctx.save()
        }
    }
    
    func updateOne(tag: TagModel) async throws {
        try await container.performBackgroundTask { ctx in
            guard let entity = Self.findEntity(tagId: tag.tagId, ctx: ctx) else {
                throw CustomError.notFound
            }
            Self.modifyEntity(entity: entity, tag: tag)
            
            try ctx.save()
        }
    }
    
    func deleteOne(tagId: String) async throws {
        return try await container.performBackgroundTask { ctx in
            guard let entity = Self.findEntity(tagId: tagId, ctx: ctx) else {
                throw CustomError.notFound
            }
            ctx.delete(entity)
            try ctx.save()
        }
    }
    
    func findOne(id: String) async -> TagModel? {
        return await container.performBackgroundTask { ctx in
            guard let entity = Self.findEntity(tagId: id, ctx: ctx) else { return nil }
            return Self.entityToModel(entity: entity, ctx: ctx)
        }
    }
    
    // page: Start from 0
    func findMany(searchInput: String?, page: Int?, pageSize: Int?) async throws -> [TagModel] {
        let req = TagEntity.fetchRequest()
        
        // Search
        if let searchInput, !searchInput.isEmpty {
            // c: Case insensitive
            // d: Diacritic insensitive
            req.predicate = NSPredicate(format: "title CONTAINS[cd] %@", searchInput)
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
    
    static func findEntity(tagId: String, ctx: NSManagedObjectContext) -> TagEntity? {
        do {
            let req = TagEntity.fetchRequest()
            req.predicate = NSPredicate(format: "tagId = %@", tagId)
            let entities = try ctx.fetch(req)
            return entities.isEmpty ? nil : entities[0]
        } catch {
            print(error.localizedDescription)
            return nil
        }
    }
    
    static func modifyEntity(entity: TagEntity, tag: TagModel) {
        entity.tagId = tag.tagId
        entity.createdAt = tag.createdAt
        entity.updatedAt = tag.updatedAt
        entity.title = tag.title
    }
    
    static func entityToModel(entity: TagEntity, ctx: NSManagedObjectContext) -> TagModel? {
        guard let tagId = entity.tagId,
              let createdAt = entity.createdAt,
              let updatedAt = entity.updatedAt,
              let title = entity.title
        else { return nil }
        
        return TagModel(
            tagId: tagId,
            createdAt: createdAt,
            updatedAt: updatedAt,
            title: title
        )
    }
}
