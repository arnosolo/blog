---
title: Using Core Data to Save Data in an iOS App
lang: en-US
description: This article describes the process of writing a to-do list application, and explains how to separate the data layer and the view layer in an iOS application, how to use Core Data to save data, and how to save the relationship between two data structures.
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

## Prerequisites

1. [Swift async await](19-swift-async-await)

## Sample Code

[demo5-todo-list](https://github.com/arnosolo/blog/tree/main/codes/demo5-todo-list)

## Create an xcdatamodeld file

Create a new file of type "Data Model" in the Model folder.

## Create Persistence.swift

Create a Persistence.swift file in the Data/Local folder, which defines the logic for accessing Core Data.

::: code-group
<<< ../codes/demo5-todo-list/demo5-todo-list/Data/Local/Persistence.swift
:::

## Define Data Types

Define `TodoModel` in the Model folder, and then define a corresponding `TodoEntity` in the xcdatamodeld file.
::: code-group
<<< ../codes/demo5-todo-list/demo5-todo-list/Models/TodoModel.swift
:::

## Define DAO

Define a `TodoDAO` responsible for persisting `TodoModel`.
::: code-group
<<< ../codes/demo5-todo-list/demo5-todo-list/Data/Local/TodoDAO.swift
:::

## Relationships

### Modify the .xcdatamodeld file

Many-to-many
1. In the TodoEntity > Relationships interface, add a `tags` field, and select `TagEntity` as the Destination. Open the right sidebar > Relationship, and select `To Many` as the Type.
2. In the TagEntity > Relationships interface, add a `todos` field, and select `TodoEntity` as the Destination. Open the right sidebar > Relationship, and select `To Many` as the Type.
3. Select TagEntity > Relationships > Inverse as `todos`.
![picture 0](./assets/d52df4c377eb531a9274c58f7870ca41ae2b52106b42bf04f7d558a647f84b45.png)

One-to-many
1. In the TodoEntity > Relationships interface, add a `location` field, and select `LocationEntity` as the Destination.
2. In the LocationEntity > Relationships interface, add a `todos` field, and select `TodoEntity` as the Destination. Open the right sidebar > Relationship, and select `To Many` as the Type.

### Writing

```swift
// Models/TodoModel.swift
class TodoDAO {
    func updateOne(todo: TodoModel) async throws {
        try await container.performBackgroundTask { ctx in
            guard let entity = Self.findEntity(todoId: todo.todoId, ctx: ctx) else {
                throw CustomError.notFound
            }
            Self.modifyEntity(entity: entity, todo: todo)

            // Many-to-many
            entity.removeFromTags(entity.tags ?? [])
            for tag in todo.tags {
                if let tagEntity = TagDAO.findEntity(tagId: tag.tagId, ctx: ctx) {
                    entity.addToTags(tagEntity)
                }
            }

            // One-to-many
            if let id = todo.location?.id {
                entity.location = LocationDAO.findEntity(id: id, ctx: ctx)
            } else {
                entity.location = nil
            }

            try ctx.save()
        }
    }
}
```

### Reading

```swift
// Models/TodoModel.swift
class TodoDAO {
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
        
        var location: LocationModel? = nil
        if let locationEntity = entity.location {
            location = LocationDAO.entityToModel(entity: locationEntity, ctx: ctx)
        }
        
        return TodoModel(
            todoId: todoId,
            createdAt: createdAt,
            updatedAt: updatedAt,
            title: title,
            completedAt: entity.completedAt,
            tags: tags,
            location: location
        )
    }
}
```

## Separating the Data Layer and the View Layer

My personal preference is:
- Define a `DAO` (Data access object) for each data type. The `DAO` is responsible for reading and writing to the local sqlite database.
- Define a `Service` for each backend service. The `Service` is responsible for communicating with the remote database.
- Define a `Repository` for each data type. The `Repository` is responsible for coordinating whether data is obtained from the local database or the remote database.
- In the view, try to read and write data by calling the `Repository` instead of the `DAO` or `Service`.

Here is an example of a file structure:
```yml
Data/
    Local/
        TodoDAO.swift
        TagDAO.swift
    Network/
        FirestoreService.swift
    TodoRepository.swift
    TagRepository.swift
```

The following is the code for `TodoRepository`. Currently, it only has code for reading and writing to the local database. If there is server request code in the future, it can also be written in this class.
::: code-group
<<< ../codes/demo5-todo-list/demo5-todo-list/Data/TodoRepository.swift
:::

References
- [Building a Data Layer](https://developer.android.com/codelabs/building-a-data-layer#0)