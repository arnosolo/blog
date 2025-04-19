---
title: SwiftUI State Management
lang: en-US
description: This article describes how to manage state when building graphical user interfaces using SwiftUI.
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

## Prerequisites

1. Familiarity with basic SwiftUI components such as `Text` and `VStack`.

## Declaring State with `@State`

### Basic Usage

`@State` is a property wrapper in SwiftUI used to store and manage mutable state within a view. When the state changes, SwiftUI automatically recomputes the parts of the view that depend on it and updates the UI. For example, in the code below, setting `detailIsShown` to `false` will hide the "Detail" text.

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

### Listening to State Changes

You can use the `.onChange` view modifier to respond to state changes. If you need to debounce the input, use `Timer.scheduledTimer`.

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

## Passing State to Child Views with `@Binding`

### Basic Usage

To pass a `@State` property to a child view, use `@Binding` in the child to receive it.

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

### Equivalent Alternative

Sometimes the child view’s binding needs to be derived from a different or more complex source. You can use `Binding(get:set:)` for custom logic.

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

## Declaring State Objects with `@StateObject`

### Basic Usage

When managing a reference type (an object), use `@StateObject` instead of `@State`. The object must conform to the `ObservableObject` protocol, and its properties should be marked with `@Published` instead of `@State`.

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

### Listening to State Changes

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
                self?.search(searchText: newVal)
            }
            .store(in: &cancellables)
    }
}
```

### Passing Initial Values from Outside

```swift
struct HomeView: View {
    @StateObject var vm: HomeViewModel

    init(audioManager: AudioManager) {
        _vm = StateObject(wrappedValue: HomeViewModel(audioManager: audioManager))
    }
    ...
}
```

## Global State with `@EnvironmentObject`

1. Define the data model:

```swift
// Models/CreatureModel.swift
import Foundation

struct CreatureModel: Identifiable {
  var name: String
  var emoji: String
  var id = UUID()
}
```

2. Define the store:

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

3. Create the store in `AppEntry` and pass it using `environmentObject`:

```swift
// AppEntry.swift
import SwiftUI

@main
struct AppEntry: App {
    @StateObject var creatureStore = CreatureStore() // Step #1

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(creatureStore) // Step #2
        }
    }
}
```

4. Use the store in child components:

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

// For previewing, remember to provide a mock environmentObject to avoid crashes.
#Preview {
    ContentView()
        .environmentObject(DeveloperPreview.instance.creatureStore)
}
```
