---
title: 在 iOS 应用中使用 Core Data 保存数据
lang: zh-CN
description: 本文通过描述编写一个待办清单应用的过程, 阐述在 iOS 应用中, 如何分离数据层与视图层. 如何使用 Core Data 保存数据. 如何保存两个数据结构之间的关系.
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

## 前提条件

1. [Swift async await](19-swift-async-await)

## 示例代码

[demo5-todo-list](https://github.com/arnosolo/blog/tree/main/codes/demo5-todo-list)

## 创建 xcdatamodeld 文件

在 Model 文件夹下创建一个新的文件, 类型是 "Data Model".

## 创建 Persistence.swift

在 Data/Local 文件夹下创建 Persistence.swift 文件, 里面定义访问 Core Data 的逻辑.

::: code-group
<<< ../../codes/demo5-todo-list/demo5-todo-list/Data/Local/Persistence.swift
:::

## 定义数据类型

在 Model 文件夹定义 `TodoModel`, 然后在 xcdatamodeld 文件中定义一个对应的 `TodoEntity`.
::: code-group
<<< ../../codes/demo5-todo-list/demo5-todo-list/Models/TodoModel.swift
:::

## 定义 DAO

定义一个 `TodoDAO` 负责持久化 `TodoModel`.
::: code-group
<<< ../../codes/demo5-todo-list/demo5-todo-list/Data/Local/TodoDAO.swift
:::

## 关系

### 修改 .xcdatamodeld 文件

多对多
1. 在 TodoEntity > Relationships 界面中增加 `tags` 字段, Destination 选择 `TagEntity`. 打开右侧栏 > Relationship, 选择 Type 为 `To Many`
2. 在 TagEntity > Relationships 界面中增加 `todos` 字段, Destination 选择 `TodoEntity`. 打开右侧栏 > Relationship, 选择 Type 为 `To Many`
3. 选择 TagEntity > Relationships > Inverse 为 `todos`
![picture 0](../assets/d52df4c377eb531a9274c58f7870ca41ae2b52106b42bf04f7d558a647f84b45.png)

一对多
1. 在 TodoEntity > Relationships 界面中增加 `location` 字段, Destination 选择 `LocationEntity`
2. 在 LocationEntity > Relationships 界面中增加 `todos` 字段, Destination 选择 `TodoEntity`. 打开右侧栏 > Relationship, 选择 Type 为 `To Many`

### 写入

```swift
// Models/TodoModel.swift
class TodoDAO {
    func updateOne(todo: TodoModel) async throws {
        try await container.performBackgroundTask { ctx in
            guard let entity = Self.findEntity(todoId: todo.todoId, ctx: ctx) else {
                throw CustomError.notFound
            }
            Self.modifyEntity(entity: entity, todo: todo)

            // 多对多
            entity.removeFromTags(entity.tags ?? [])
            for tag in todo.tags {
                if let tagEntity = TagDAO.findEntity(tagId: tag.tagId, ctx: ctx) {
                    entity.addToTags(tagEntity)
                }
            }

            // 一对多
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

### 读取

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

## 分离数据层与视图层

我个人的偏好是,
- 一种数据类型定义一个 `DAO` (Data access object). `DAO` 负责读写本地的 sqlite 数据库.
- 一项后端服务定义一个 `Service`. `Service` 负责与远程数据库进行通讯.
- 一种数据类型定义一个 `Repository`. `Repository` 负责协调数据从本地数据库还是远程数据库获取.
- 在视图中尽量通过调用 `Repository` 而不是 `DAO` 或 `Service` 来读写数据.

下面是一个文件结构的示例:
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

下面是 `TodoRepository` 的代码, 目前只有读写本地数据库的代码, 如果以后有服务器请求的代码, 也可以往这个类里写.
::: code-group
<<< ../../codes/demo5-todo-list/demo5-todo-list/Data/TodoRepository.swift
:::

参考资料
- [Building a Data Layer](https://developer.android.com/codelabs/building-a-data-layer#0)