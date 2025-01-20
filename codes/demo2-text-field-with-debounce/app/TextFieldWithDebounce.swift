//
//  TextFieldWithDebounce.swift
//  addframe
//
//  Created by Arno Solo on 1/2/24.
//

import SwiftUI

/*
 * Every time text field changes, a new delay task will be created which will
 * call onChange func after 250ms.
 * But if text field changes again within this 250ms, then previous delay task
 * will be cancelled. So only the last input will be emitted.
 */
struct TextFieldWithDebounce: View {
    let title: LocalizedStringKey
    let text : String
    let onChange: (String) -> Void
    let debounceTimeoutMs: Int

    @State private var userInput = ""
    @State private var delayedTask: DispatchWorkItem? = nil
    
    init(title: LocalizedStringKey, text: String, onChange: @escaping (String) -> Void, debounceTimeoutMs: Int = 250) {
        self.title = title
        self.text = text
        self.onChange = onChange
        self.debounceTimeoutMs = debounceTimeoutMs
    }
    
    var body: some View {
        TextField(title, text: Binding<String>(
            get: { userInput },
            set: { newVal in
                userInput = newVal
                delayedTask?.cancel()
                let task = DispatchWorkItem {
                    onChange(newVal)
                }
                delayedTask = task
                let deadline = DispatchTime.now() + .milliseconds(debounceTimeoutMs)
                DispatchQueue.main.asyncAfter(deadline: deadline, execute: task)
            }
        ))
        .onAppear {
            userInput = text
        }
        .onChange(of: text) { newVal in
            delayedTask?.cancel()
            userInput = newVal
        }
    }
}

private struct Preview: View {
    @State var userInput: String = "123"
    
    var body: some View {
        VStack {
            TextFieldWithDebounce(
                title: "Input#1",
                text: userInput,
                onChange: { userInput = $0 },
                debounceTimeoutMs: 500
            )
                .submitLabel(.done)
                .font(.system(size: 14))
                .padding(.leading, 4)
            
            TextFieldWithDebounce(
                title: "Input#2",
                text: userInput,
                onChange: { userInput = $0 }
            )
            Text("userInput = \(userInput)")
        }
    }
}

#Preview {
    Preview()
}
