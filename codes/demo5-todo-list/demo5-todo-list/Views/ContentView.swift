//
//  ContentView.swift
//  demo5-todo-list
//
//  Created by arno_solo on 3/20/25.
//

import SwiftUI

struct ContentView: View {
    @State private var todos: [TodoModel] = []
    @State private var todoEditModalIsOpen = false
    @State private var currentTodo: TodoModel? = nil

    var body: some View {
        NavigationView {
            List {
                ForEach(todos, id: \.todoId) { todo in
                    TodoRow(todo: todo)
                        .swipeActions {
                            Button("Delete") {
                                deleteTodo(todo: todo)
                            }
                            .tint(.red)
                        }
                        .swipeActions {
                            Button("Edit") {
                                currentTodo = todo
                                todoEditModalIsOpen = true
                            }
                            .tint(.green)
                        }
                }
            }
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    EditButton()
                }
                ToolbarItem {
                    Button(action: addTodo) {
                        Label("Add Todo", systemImage: "plus")
                    }
                }
            }
            .sheet(isPresented: $todoEditModalIsOpen) {
                TodoEditModal(
                    isOpen: $todoEditModalIsOpen,
                    formType: .update,
                    todo: $currentTodo,
                    onTodoCreated: { _ in },
                    onTodoUpdated: handleTodoUpdated
                )
            }
            .onAppear {
                loadTodos()
            }
        }
    }
    
    private func loadTodos() {
        Task {
            do {
                let result = try await TodoRepository.shared.findTodos(searchText: nil, tagId: nil, page: nil, pageSize: nil)
                
                await MainActor.run {
                    todos = result
                }
            } catch {
                print(error.localizedDescription)
            }
        }
    }
    
    private func handleTodoUpdated(todo: TodoModel) {
        if let i = todos.firstIndex(where: { $0.todoId == todo.todoId }) {
            todos[i] = todo
        }
    }

    private func addTodo() {
        Task {
            let todo = TodoModel(
                todoId: UUID().uuidString,
                createdAt: Date(),
                updatedAt: Date(),
                title: Date().description,
                completedAt: nil,
                tags: [],
                location: nil
            )
            
            do {
                try await TodoRepository.shared.createTodo(todo: todo)
                
                await MainActor.run {
                    withAnimation {
                        todos.append(todo)
                    }
                }
            } catch {
                print(error.localizedDescription)
            }
        }
    }

    private func deleteTodo(todo: TodoModel) {
        Task {
            do {
                try await TodoRepository.shared.deleteTodo(todo: todo)
                
                await MainActor.run {
                    withAnimation {
                        if let i = todos.firstIndex(where: { $0.todoId == todo.todoId }) {
                            todos.remove(at: i)
                        }
                    }
                }
            } catch {
                print(error.localizedDescription)
            }
        }
    }
}

#Preview {
    ContentView()
}
