//
//  TagRepository.swift
//  demo5-todo-list
//
//  Created by arno_solo on 3/20/25.
//

import Foundation

class TagRepository {
    static let shared = TagRepository(
        tagDAO: TagDAO.shared
    )
    
    private var tagDAO: TagDAO
    
    init(tagDAO: TagDAO) {
        self.tagDAO = tagDAO
        self.tagDAO = tagDAO
    }
    
    func createTag(tag: TagModel) async throws {
        try await tagDAO.createOne(tag: tag)
        try await tagDAO.updateOne(tag: tag)
    }
    
    func updateTag(tag: TagModel) async throws {
        try await tagDAO.updateOne(tag: tag)
    }

    func deleteTag(tag: TagModel) async throws {
        try await tagDAO.deleteOne(tagId: tag.tagId)
    }
    
    func findTags(searchText: String?, tagId: String?, page: Int?, pageSize: Int?) async throws -> [TagModel] {
        return try await tagDAO.findMany(searchInput: searchText, page: page, pageSize: pageSize)
    }
}
