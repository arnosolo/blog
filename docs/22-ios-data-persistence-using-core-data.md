---
title: Using Core Data to Save Data in an iOS Application  
lang: en-US
description: This article explains how to separate the data layer from the view layer in an iOS application, how to use Core Data to save data, and how to save relationships between two data structures, using the process of building a to-do list app as an example.
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

## Prerequisites

1. [Swift Async Await](19-swift-async-await)

## Example Code

[demo5-todo-list](https://github.com/arnosolo/blog/tree/main/codes/demo5-todo-list)

## Core Data Saving Data

### Defining Data Types

My personal preference is to name the data structure used in the app `TagModel`, and the corresponding data structure in Core Data is `TagEntity`. The structure of `TagModel` is provided below. For `TagEntity`, create an `.xcdatamodeld` file in Xcode and add a new Entity named `TagEntity`.
::: code-group
<<< ../codes/demo5-todo-list/demo5-todo-list/Models/TagModel.swift
:::

### Defining DAO

Even though the following example code is long, all DAOs are similar. The DAO contains several parts:
1. A shared instance
2. Methods for CRUD operations
3. Methods to convert between the Model and Entity
::: code-group
<<< ../codes/demo5-todo-list/demo5-todo-list/Data/Local/TagDAO.swift
:::

### Many-to-Many Relationship

#### Modify the .xcdatamodeld File
A common feature is that a to-do can reference multiple tags, and a tag can be assigned to multiple to-dos. The relationship between to-dos and tags is many-to-many. If we were to use SQL statements to operate the database, we would need to create an association table to describe the relationship. However, when using Core Data, this can be done using the graphical interface.
1. In the `TodoEntity > Relationships` interface, add a `tags` field and set its destination to `TagEntity`. Open the right panel, set the relationship type to `To Many`.
2. In the `TagEntity > Relationships` interface, add a `todos` field and set its destination to `TodoEntity`. Open the right panel, set the relationship type to `To Many`.
3. Select `TagEntity > Relationships > Inverse` and set it to `todos`.

![picture 0](assets/d52df4c377eb531a9274c58f7870ca41ae2b52106b42bf04f7d558a647f84b45.png)

#### Including Tags in Todo

1. First, add the `tags` field to `TodoModel`.
2. In the `TodoDAO.updateOne` method, add a method to link `TodoEntity` to `TagEntity`.
3. In the `TodoDAO.entityToModel` method, add a method to convert `TagEntity` to `TagModel`.
4. When creating a new `Todo`, first call `TodoDAO.createOne` to create a `TodoEntity`, then call `TodoDAO.updateOne` to link the `TodoEntity` to `TagEntity`.
::: code-group
<<< ../codes/demo5-todo-list/demo5-todo-list/Models/TodoModel.swift
<<< ../codes/demo5-todo-list/demo5-todo-list/Data/Local/TodoDAO.swift
:::

#### Finding Todos Associated with Tags

I encountered a strange issue: if I included `todos` as a field in `TagEntity`, like how `tags` is included in `Todo`, creating the association in the app works fine. However, during data import and export, the app often crashes, and I couldn’t understand why. So, my solution is to not fetch `todos` from `TagDAO` but instead add a `tagId` parameter in the `TodoDAO.findMany` method to filter todos.

### One-to-Many Relationship

#### Defining `LocationModel`

::: code-group
<<< ../codes/demo5-todo-list/demo5-todo-list/Models/LocationModel.swift
:::

#### Modify the .xcdatamodeld File
1. In the `TodoEntity > Relationships` interface, add a `location` field and set its destination to `LocationEntity`.
2. In the `LocationEntity > Relationships` interface, add a `todos` field and set its destination to `TodoEntity`. Open the right panel, set the relationship type to `To Many`.

#### Including Location in Todo

Writing to the database:
```swift
class TodoDAO {
    ...
    func updateOne(todo: TodoModel) async throws {
        ...
        Self.modifyEntity(entity: entity, todo: todo)
        ...
        if let id = todo.location?.id {
            entity.location = LocationDAO.findEntity(id: id, ctx: ctx)
        } else {
            entity.location = nil
        }
        
        try ctx.save()
    }
}
```

Reading from the database:
```swift
class TodoDAO {
    static func entityToModel(entity: TodoEntity, ctx: NSManagedObjectContext) -> TodoModel? {
        ...
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

## Separating the Data Layer from the View Layer

My personal preference is:
- Define a `DAO` (Data Access Object) for each data type. The `DAO` is responsible for reading and writing to the local SQLite database.
- Define a `Service` for each backend service. The `Service` is responsible for communication with remote databases.
- Define a `Repository` for each data type. The `Repository` is responsible for coordinating whether the data comes from the local database or a remote database.
- In the view, try to read and write data through the `Repository`, rather than directly through the `DAO` or `Service`.

Below is an example file structure:
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

Here is the code for `TodoRepository`, which currently only handles reading and writing to the local database. If there is server request code in the future, it can also be written in this class.
::: code-group
<<< ../codes/demo5-todo-list/demo5-todo-list/Data/TodoRepository.swift
:::

References:
- [Building a Data Layer](https://developer.android.com/codelabs/building-a-data-layer#0)