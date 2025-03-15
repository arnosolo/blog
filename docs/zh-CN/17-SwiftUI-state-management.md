---
title: SwiftUI 状态管理
lang: zh-CN
description: 本文描述了使用 SwiftUI 编写图形界面的应用应该如何进行状态管理
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

## 前提条件

1. 了解 SwiftUI 基础组件的用法, 如 `Text`, `VStack`.

## @State 声明状态

### 基础用法

`@State` 是 SwiftUI 一个属性包装器(Property Wrapper), 用于在视图内部存储和管理可变状态. 当状态发生变化时, SwiftUI 会自动重新计算依赖该状态的视图, 并更新界面. 比如在下面这个例子中, 修改 `detailIsShown` 变量的值为 `false`, 将会导致 "Detail" 文字不再显示.
```swift
struct ContentView: View {
    @State var detailIsShown = false

    var body: some View {
        VStack(spacing: 16) {
            Button("Toggle") {
                detailIsShown.toggle()
            }
            if detailIsShown {
                Text("Detail")
            }
        }
    }
}
```

### 监听状态变化

可以使用 `View` 组件的装饰器 `.onChange` 来监听状态变化. 如果需要去抖动, 可以使用 `Timer.scheduledTimer` 方法.
```swift
struct ContentView: View {
    @State private var searchInput = ""
    @State private var searchResult: [CampusModel] = []
    @State private var debounceTimer: Timer? = nil
    private let debounceInterval: TimeInterval = 0.5

    var body: some View {
        VStack(spacing: 16) {
            TextField("Search", text: $searchInput)
        }
        .onChange(of: searchInput, initial: true) { _oldValue, newValue in
            debounceTimer?.invalidate()
            debounceTimer = Timer.scheduledTimer(withTimeInterval: debounceInterval, repeats: false) { _ in
                search(searchInput: newValue)
            }
        }
    }
}
```

## @Binding 传递状态到子组件

### 基础用法

如果需要将 `@State` 包装的状态传递到子组件, 则需要在子组件中声明一个使用 `@Binding` 装饰器包装的变量来接收.
```swift
struct ParentView: View {
    @State private var isOn = false

    var body: some View {
        ToggleView(isOn: $isOn)
    }
}

struct ToggleView: View {
    @Binding var isOn: Bool

    var body: some View {
        Toggle("Switch", isOn: $isOn)
    }
}
```

### 等价写法

有时候, 子组件的 `Binding` 值和父组件的 `State` 值不完全相同, 那么我们可以使用 `Binding(get: @escaping () -> Value, set: @escaping (Value) -> Void)` 来进行转换
```swift
struct ParentView: View {
    @State private var isOn = false

    var body: some View {
        ToggleView(isOn: Binding<Bool>(
          get: { isOn },
          set: { isOn = $0 }
        ))
    }
}
```

## @StateObject 声明状态对象

### 基础用法

如果状态不是一个值而是一个对象, 那么创建这个状态的时候, 使用的属性包装器将不再是 `@State` 而是 `@StateObject`. 使用 `@StateObject` 包装的变量, 其类型需要符合 `ObservableObject` 协议. 在该类型中声明状态变量采用 `@Published` 属性包装器而不是 `@State`
```swift
import Combine

struct FruitModel: Identifiable {
    let id: String = UUID().uuidString
    var label: String
}

class FruitViewModel: ObservableObject {
    @Published var fruits: [FruitModel] = []

    init() {
        self.getFruits()
    }

    func getFruits() {
        self.fruits = [
            Fruit(label: "Apple"),
            Fruit(label: "Orange")
        ]
    }
}

struct FruitsView: View {
    @StateObject var vm = FruitViewModel()

    var body: some View {
        List {
            ForEach($vm.fruits) { fruit in
                Text(fruit.label)
            }
        }
    }
}
```

### 监听状态变化
```swift
import Combine

class FruitViewModel: ObservableObject {
    @Published var fruits: [FruitModel] = []
    @Published var searchText = ""
    @Published var searchResults: [FruitModel] = []
    private var cancellables = Set<AnyCancellable>()

    init() {
      self.getFruits()

      addSubscribers()
    }

    func getFruits() {
        self.fruits = [
            Fruit(label: "Apple"),
            Fruit(label: "Orange")
        ]
    }

    func search(searchText: String) {
      searchResults = fruits.filter({ $0.label.contains(searchText) })
    }

    private func addSubscribers() {
        $searchText
            // Debounce 0.5s
            .debounce(for: .seconds(0.5), scheduler: DispatchQueue.main)
            .sink { [weak self] newVal in
                guard let self = self else { return }
                self.search(searchText: newVal)
            }
            .store(in: &cancellables)
    }
}
```

### 从外部传入初始值

```swift
struct HomeView: View {
    @StateObject var vm: HomeViewModel

    init(audioManager: AudioManager) {
        _vm = StateObject(wrappedValue: HomeViewModel(audioManager: audioManager))
    }
    ...
}
```

## @EnvironmentObject 全局状态

1. 定义数据类型
```swift
// Models/CreatureModel.swift
import Foundation

struct CreatureModel: Identifiable {
  var name: String
  var emoji: String
  var id = UUID()
}
```
2. 定义Store
```swift
// ViewModels/CreatureStore.swift
import Foundation

class CreatureStore: ObservableObject {
  @Published var creatures: [CreatureModel] = []

  init() {
    self.getData()
  }

  func getData() {
    self.creatures = [
        Creature(name: "Gorilla", emoji: "🦍"),
        Creature(name: "Peacock", emoji: "🦚"),
        Creature(name: "Squid", emoji: "🦑"),
    ]
  }
}
```
3. 在 AppEntry 创建 Store, 然后作为 environmentObject 传入应用
```swift
// AppEntry.swift
import SwiftUI

@main
struct AppEntry: App {
    @StateObject var creatureStore = CreatureStore() // Step#1

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(creatureStore) // Step#2
        }
    }
}
```
4. 在子组件中使用 Store
```swift
struct ContentView: View {
  @EnvironmentObject var creatureStore : CreatureStore

  var body: some View {
      List {
          ForEach(creatureStore.creatures) { creature in 
              CreatureRow(creature: creature)
          }
      }
  }
}

// 如需预览, 记得使用 environmentObject 装饰器传入一个实例, 不然预览会崩溃.
#Preview {
    ContentView()
        .environmentObject(DeveloperPreview.instance.creatureStore)
}
```
