//
//  LocationRepository.swift
//  demo5-todo-list
//
//  Created by arno_solo on 4/8/25.
//

import Foundation

class LocationRepository {
    static let shared = LocationRepository(locationDAO: LocationDAO.shared)

    private var locationDAO: LocationDAO
    
    init(locationDAO: LocationDAO) {
        self.locationDAO = locationDAO
    }
    
    func createLocation(location: LocationModel) async throws {
        try await locationDAO.createOne(location: location)
    }
    
    func updateLocation(location: LocationModel) async throws {
        try await locationDAO.updateOne(location: location)
    }
    
    func importLocation(location: LocationModel) async throws {
        try await locationDAO.createOne(location: location)
    }
    
    func findLocations(searchText: String?, page: Int?, pageSize: Int?) async throws -> [LocationModel] {
        return try await locationDAO.findMany(searchText: searchText, page: page, pageSize: pageSize)
    }
}
