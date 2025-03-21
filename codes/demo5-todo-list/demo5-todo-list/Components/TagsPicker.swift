//
//  TagsPicker.swift
//  demo5-todo-list
//
//  Created by arno_solo on 3/21/25.
//

import SwiftUI

struct TagsPicker: View {
    @Binding var isOpen: Bool
    @Binding var selected: [TagModel]
    let tagRepository: TagRepository

    @State private var searchInput = ""
    @State private var searchResult: [TagModel] = []
    @State private var findTagsState: AsyncReqState = .idle
    @State private var debounceTimer: Timer? = nil
    private let debounceInterval: TimeInterval = 0.5
    @State private var historicalSelections: [TagModel] = []
    
    private func addToHistoricalSelections(tag: TagModel) {
        if !historicalSelections.contains(where: { $0.tagId == tag.tagId}) {
            historicalSelections.append(tag)
        }
    }
    
    private func toggleTagSelection(tag: TagModel) {
        if let i = selected.firstIndex(where: { $0.tagId == tag.tagId }) {
            selected.remove(at: i)
        } else {
            selected.append(tag)
        }
    }
    
    private func createTag() {
        Task {
            do {
                let tag = TagModel(
                    tagId: UUID().uuidString,
                    createdAt: Date(),
                    updatedAt: Date(),
                    title: searchInput
                )
                try await tagRepository.createTag(tag: tag)
                
                await MainActor.run {
                    searchInput = ""
                    selected.append(tag)
                    addToHistoricalSelections(tag: tag)
                }
            } catch {
                print(error.localizedDescription)
            }
        }
    }
    
    private func findTags(keyword: String) {
        Task {
            do {
                await MainActor.run {
                    findTagsState = .loading
                }
                
                let res = try await tagRepository.findTags(searchText: keyword, page: 0, pageSize: 100)

                await MainActor.run {
                    findTagsState = .success
                    searchResult = res
                }
            } catch {
                findTagsState = .failed
                print(error.localizedDescription)
            }
        }
    }

    var body: some View {
        VStack(spacing: 0) {
            HStack {
                Button {
                    isOpen = false
                } label: {
                    Image(systemName: "chevron.left")
                        .foregroundStyle(Color.theme.text)
                        .fontWeight(.medium)
                }
                .frame(width: 40, height: 36)
                Spacer()
                Text("Select Tags")
                    .fontWeight(.medium)
                Spacer()
                VStack {
                }.frame(width: 40, height: 36)
            }
            .padding(.horizontal, 8)
            .frame(height: 46)

            ScrollView {
                LazyVGrid(columns: [GridItem(.adaptive(minimum: 150, maximum: 200), spacing: 8, alignment: .topLeading)], alignment: .leading, spacing: 8) {
                    ForEach(historicalSelections, id: \.tagId) { tag in
                        Button {
                            toggleTagSelection(tag: tag)
                        } label: {
                            tagCell(
                                title: tag.title,
                                isSelected: selected.contains(where: { $0.tagId == tag.tagId })
                            )
                        }
                    }
                }
                .padding(.horizontal)
                .padding(.top, 8)
                
                TextField("Search", text: $searchInput)
                .padding(.horizontal)
                
                VStack(spacing: 0) {
                    if findTagsState == .success && searchResult.isEmpty && !searchInput.isEmpty {
                        VStack(spacing: 16) {
                            Text("No results were found for \"\(searchInput)\"")
                                .foregroundStyle(Color.theme.secondaryText)
                                .font(.system(size: 16, weight: .regular))
                            Button {
                                createTag()
                            } label: {
                                HStack {
                                    Spacer()
                                    Text("Create")
                                        .font(.system(size: 18, weight: .semibold))
                                        .foregroundStyle(Color.theme.onPrimary)
                                    Spacer()
                                }
                                .frame(height: 46)
                                .background(RoundedRectangle(cornerRadius: 8).fill(Color.theme.primary))
                            }
                        }
                        .padding()
                    }
                    LazyVStack(alignment: .leading, spacing: 0) {
                        ForEach(searchResult, id: \.tagId) { tag in
                            Button {
                                toggleTagSelection(tag: tag)
                                addToHistoricalSelections(tag: tag)
                            } label: {
                                tagOptionRow(tag: tag, isSelected: selected.contains(where: { $0.tagId == tag.tagId }))
                            }
                        }
                    }
                }
            }
        }
        .onChange(of: searchInput, initial: true) { _oldValue, newValue in
            debounceTimer?.invalidate()
            debounceTimer = Timer.scheduledTimer(withTimeInterval: debounceInterval, repeats: false) { _ in
                findTags(keyword: newValue)
            }
        }
        .onAppear {
            historicalSelections = selected
        }
    }
    
    private func tagOptionRow(tag: TagModel, isSelected: Bool) -> some View {
        VStack(spacing: 0) {
            HStack {
                if isSelected {
                    Circle()
                        .fill(Color.theme.success)
                        .frame(width: 24, height: 24)
                        .overlay {
                            Image(systemName: "checkmark")
                                .font(.system(size: 14))
                                .fontWeight(.medium)
                                .foregroundStyle(Color.theme.onSuccess)
                        }
                } else {
                    Circle()
                        .stroke(Color.theme.secondaryText, lineWidth: 1)
                        .frame(width: 24, height: 24)
                }
                TagRow(tag: tag)
            }
            .padding()
            Rectangle().fill(Color.theme.divider).frame(height: 1)
        }
    }
    
    private func tagCell(title: String, isSelected: Bool) -> some View {
        HStack(spacing: 0) {
            Spacer()
            Text("#\(title)")
            Spacer()
        }
        .padding(8)
        .background(isSelected ? Color.theme.primary : Color.theme.surface)
        .foregroundColor(isSelected ? Color.theme.onPrimary :  Color.theme.onSurface)
        .cornerRadius(8)
    }
}

private struct TagsPicker_Preview: View {
    @State private var selectedTags: [TagModel] = []
    
    var body: some View {
        TagsPicker(
            isOpen: .constant(true),
            selected: $selectedTags,
            tagRepository: DeveloperPreview.instance.tagRepository
        )
    }
}

#Preview {
    TagsPicker_Preview()
}
