//
//  LocationDAO.swift
//  demo5-todo-list
//
//  Created by arno_solo on 4/8/25.
//

import CoreData

class LocationDAO {
    enum CustomError: Error, LocalizedError {
        case notFound
    }
    
    static let shared = LocationDAO(container: PersistenceController.shared.container)

    private let container: NSPersistentContainer
    
    init(container: NSPersistentContainer) {
        self.container = container
    }
    
    func createOne(location: LocationModel) async throws {
        try await container.performBackgroundTask { ctx in
            let entity = Self.findEntity(id: location.id, ctx: ctx) ?? LocationEntity(context: ctx)
            Self.modifyEntity(entity: entity, location: location)

            try ctx.save()
        }
    }
    
    func updateOne(location: LocationModel) async throws {
        try await container.performBackgroundTask { ctx in
            guard let entity = Self.findEntity(id: location.id, ctx: ctx) else {
                throw CustomError.notFound
            }
            Self.modifyEntity(entity: entity, location: location)
            
            try ctx.save()
        }
    }
    
    func findOne(id: String) async -> LocationModel? {
        return await container.performBackgroundTask { ctx in
            guard let entity = Self.findEntity(id: id, ctx: ctx) else { return nil }
            return Self.entityToModel(entity: entity, ctx: ctx)
        }
    }
    
    // page: Start from 0
    func findMany(searchText: String?, page: Int?, pageSize: Int?) async throws -> [LocationModel] {
        let req = LocationEntity.fetchRequest()
        
        // Search
        if let searchText, !searchText.isEmpty {
            let keywords = searchText.split(separator: " ").map({ String($0) })
            // The expected records must be relevant to all keywords
            let predicate = NSCompoundPredicate(andPredicateWithSubpredicates: keywords.map { keyword in
                // For single keyword, met any following conditions will be considered as relevant
                return NSCompoundPredicate(orPredicateWithSubpredicates: [
                    NSPredicate(format: "placeName CONTAINS[cd] %@", keyword)
                ])
            })
            
             req.predicate = predicate
        }

        // Pagination
        if let page, let pageSize {
            req.fetchLimit = pageSize
            req.fetchOffset = page * pageSize
        }
        
        // Sort
        // req.sortDescriptors = [NSSortDescriptor(key: "updatedAt", ascending: false)]

        return try await container.performBackgroundTask { ctx in
            let entities = try ctx.fetch(req)
            return entities.compactMap { Self.entityToModel(entity: $0, ctx: ctx) }
        }
    }
    
    static func modifyEntity(entity: LocationEntity, location: LocationModel) {
        entity.id = location.id
        entity.latitude = location.latitude
        entity.longitude = location.longitude
        entity.placeName = location.placeName
    }
    
    static func findEntity(id: String, ctx: NSManagedObjectContext) -> LocationEntity? {
        do {
            let req = LocationEntity.fetchRequest()
            req.predicate = NSPredicate(format: "id = %@", id)
            let entities = try ctx.fetch(req)
            return entities.isEmpty ? nil : entities[0]
        } catch {
            print(error.localizedDescription)
            return nil
        }
    }
    
    static func entityToModel(entity: LocationEntity, ctx: NSManagedObjectContext) -> LocationModel? {
        guard let id = entity.id
        else { return nil }
        
        return LocationModel(
            id: id,
            latitude: entity.latitude,
            longitude: entity.longitude,
            altitude: entity.altitude,
            placeName: entity.placeName
        )
    }
}
