//
//  TodoEditModal.swift
//  demo5-todo-list
//
//  Created by arno_solo on 3/21/25.
//

import SwiftUI

struct TodoEditModal: View {
    enum FormType {
        case create
        case update
    }

    @Binding var isOpen: Bool
    let formType: FormType
    @Binding var todo: TodoModel?
    let onTodoCreated: (TodoModel) -> Void
    let onTodoUpdated: (TodoModel) -> Void

    @State private var submitState: AsyncReqState = .idle
    @State private var titleInput = ""
    @State private var titleInputError: String? = nil
    @FocusState private var isTitleInputFocused: Bool
    @State private var selectedTags: [TagModel] = []
    @State private var tagsPickerIsOpen = false
    
    private func resetStates() {
        submitState = .idle
        titleInput = ""
        titleInputError = nil
        selectedTags = []
    }
    
    private func fillFormWithInitialVal() {
        guard let todo else {
            return
        }
        titleInput = todo.title
        selectedTags = todo.tags
    }
    
    private func inputsAreValid() -> Bool {
        if titleInput.isEmpty {
            titleInputError = NSLocalizedString("Title is required", comment: "")
            return false
        }

        return true
    }

    private func submitForm() {
        if(!inputsAreValid()) {
            return
        }
        
        Task {
            if formType == .create {
                do {
                    let todo = TodoModel(
                        todoId: UUID().uuidString,
                        createdAt: Date(),
                        updatedAt: Date(),
                        title: titleInput,
                        completedAt: nil,
                        tags: selectedTags
                    )
                    try await TodoRepository.shared.createTodo(todo: todo)
                    
                    await MainActor.run {
                        onTodoCreated(todo)
                        isOpen = false
                        resetStates()
                    }
                } catch {
                    print(error.localizedDescription)
                }
                return
            }
            
            if formType == .update, let todo {
                do {
                    let newTodo = TodoModel(
                        todoId: todo.todoId,
                        createdAt: todo.createdAt,
                        updatedAt: todo.updatedAt,
                        title: titleInput,
                        completedAt: nil,
                        tags: selectedTags
                    )
                    try await TodoRepository.shared.updateTodo(todo: newTodo)
                    
                    await MainActor.run {
                        onTodoUpdated(newTodo)
                        isOpen = false
                        resetStates()
                    }
                } catch {
                    print(error.localizedDescription)
                }
                return
            }
        }
    }
    
    var body: some View {
        VStack(spacing: 0) {
            // Header
            HStack {
                Button {
                    isOpen = false
                } label: {
                    Image(systemName: "chevron.left")
                        .font(.system(size: 18))
                        .foregroundStyle(Color.theme.text)
                        .fontWeight(.medium)
                        .padding(.horizontal, 8)
                }

                Spacer()
                
                Button {
                    submitForm()
                } label: {
                    Text(formType == .create ? "Create" : "Update")
                        .font(.system(size: 16))
                        .fontWeight(.semibold)
                        .foregroundStyle(Color.theme.primary)
                }
                .disabled(submitState == .loading)
            }
            .padding(.horizontal)
            .padding(.top)
            .padding(.bottom, 8)
            
            // Body
            ScrollView {
                VStack(spacing: 12) {

                    // Content
                    VStack(spacing: 8) {
                        VStack(alignment: .leading, spacing: 2) {
                            Text("Title")
                            TextField("Title", text: $titleInput)
                                .focused($isTitleInputFocused)
                            if let text = titleInputError {
                                HStack(spacing: 2) {
                                    Image(systemName: "exclamationmark.circle")
                                        .font(.system(size: 16))
                                    Text(text)
                                        .font(.system(size: 16))
                                    Spacer()
                                }
                                .foregroundStyle(Color.theme.failed)
                            }
                        }
                    }
                    
                    // Tags
                    VStack(alignment: .leading, spacing: 8) {
                        HStack {
                            Text("Tags")
                            Spacer()
                        }
                        Button {
                            tagsPickerIsOpen = true
                        } label: {
                            Image(systemName: "rectangle.stack")
                                .foregroundStyle(Color.theme.text)
                                .frame(width: 30)
                                .accessibilityLabel("Tags")
                        }
                        if !selectedTags.isEmpty {
                            HStack {
                                Text(selectedTags.map({ "#\($0.title)" }).joined(separator: " "))
                                    .font(.system(size: 16))
                                    .foregroundStyle(Color.theme.text)
                                    .multilineTextAlignment(.leading)
                                Spacer()
                            }
                        }
                    }
                }
                .padding(.top, 8)
                .padding(.horizontal)
                .padding(.bottom, 64)
            }
            
            // Footer
            VStack(spacing: 0) {
                Rectangle().fill(Color.theme.divider).frame(height: 0.8)
                HStack(spacing: 16) {
                    Spacer()
                    if isTitleInputFocused {
                        Button {
                            isTitleInputFocused = false
                        } label: {
                            Text("Done")
                                .padding(.horizontal, 8)
                        }
                    }
                }
                .padding(.horizontal)
                .padding(.vertical, 12)
            }
            .background(Color.theme.surface)
        }
        .sheet(isPresented: $tagsPickerIsOpen) {
            TagsPicker(
                isOpen: $tagsPickerIsOpen,
                selected: $selectedTags,
                tagRepository: TagRepository.shared
            )
        }
        .onAppear {
            fillFormWithInitialVal()
            isTitleInputFocused = true
        }
    }
}

#Preview {
    TodoEditModal(
        isOpen: .constant(true),
        formType: .create,
        todo: .constant(nil),
        onTodoCreated: { _ in },
        onTodoUpdated: { _ in }
    )
}
