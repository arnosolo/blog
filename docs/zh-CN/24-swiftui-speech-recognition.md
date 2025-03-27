---
title: SwiftUI 语音转文字
lang: zh-CN
description: 本文阐述了在 SwiftUI 应用中加入语音转文字功能
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

## 权限声明

1. NSSpeechRecognitionUsageDescription
   示例描述: We need speech recognition to convert your voice to text.
2. NSMicrophoneUsageDescription
   示例描述: We need microphone access to record your speech.

注意, 两个权限都要声明. 未声明权限运行应用, 应用会闪退.

## 定义 SpeechRecognizer

```swift
import Foundation
import Speech
import AVFoundation

class SpeechRecognizer: ObservableObject {
    enum RecognizerError: LocalizedError {
        case nilRecognizer
        case notAuthorizedToRecognize
        case notPermittedToRecord
        case recognizerIsUnavailable

        var errorDescription: String? {
            switch self {
            case .nilRecognizer:
                return "Can't initialize speech recognizer"
            case .notAuthorizedToRecognize:
                return "Not authorized to recognize speech"
            case .notPermittedToRecord:
                return "Not permitted to record audio"
            case .recognizerIsUnavailable:
                return "Recognizer is unavailable"
            }
        }
    }

    var onTranscriptUpdate: ((_ text: String, _ isFinal: Bool) -> Void)?
    private let recognizer: SFSpeechRecognizer?
    private var task: SFSpeechRecognitionTask?
    private var audioEngine: AVAudioEngine?

    init() {
        recognizer = SFSpeechRecognizer()
    }

    func startTranscribing() async throws {
        if SFSpeechRecognizer.authorizationStatus() != .authorized,
           await Self.requestAuthorizationToRecognize() != .authorized {
            throw RecognizerError.notAuthorizedToRecognize
        }

        guard let recognizer, recognizer.isAvailable else {
            throw RecognizerError.recognizerIsUnavailable
        }

        let (audioEngine, request) = try Self.prepareEngine()
        self.audioEngine = audioEngine

        task = recognizer.recognitionTask(with: request, resultHandler: { [weak self] result, error in
            guard let self = self else { return }
            if let result {
                let spokenText = result.bestTranscription.formattedString
                // print("isFinal: \(result.isFinal). spokenText: \(spokenText)")
                self.onTranscriptUpdate?(spokenText, result.isFinal)
            }
            if error != nil || (result?.isFinal ?? false) {
                self.stopTranscribing()
            }
        })
    }

    func stopTranscribing() {
        task?.cancel()
        audioEngine?.stop()
        audioEngine = nil
        task = nil
    }

    private static func prepareEngine() throws -> (AVAudioEngine, SFSpeechAudioBufferRecognitionRequest) {
        let audioEngine = AVAudioEngine()

        let request = SFSpeechAudioBufferRecognitionRequest()
         request.shouldReportPartialResults = true
//        request.shouldReportPartialResults = false

        let audioSession = AVAudioSession.sharedInstance()
        try audioSession.setCategory(.playAndRecord, mode: .measurement, options: .duckOthers)
        try audioSession.setActive(true, options: .notifyOthersOnDeactivation)
        let inputNode = audioEngine.inputNode

        let recordingFormat = inputNode.outputFormat(forBus: 0)
        inputNode.installTap(onBus: 0, bufferSize: 1024, format: recordingFormat) { (buffer: AVAudioPCMBuffer, when: AVAudioTime) in
            request.append(buffer)
        }
        audioEngine.prepare()
        try audioEngine.start()

        return (audioEngine, request)
    }

    static func requestAuthorizationToRecognize() async -> SFSpeechRecognizerAuthorizationStatus {
        return await withCheckedContinuation { continuation in
            SFSpeechRecognizer.requestAuthorization { status in
                continuation.resume(returning: status)
            }
        }
    }
}
```

## 使用 SpeechRecognizer

```swift
struct ContentView: View {
    @State private var textInput = ""
    @StateObject private var speechRecognizer = SpeechRecognizer()
    @State private var isTranscribing = false

    private func handleTranscriptUpdate(text: String, isFinal: Bool) {
        if text.isEmpty {
            return
        }
        DispatchQueue.main.async {
            self.textInput = text
        }
    }

    private func startTranscribing() {
        Task {
            await MainActor.run {
                withAnimation {
                    isTranscribing = true
                }
            }

            speechRecognizer.onTranscriptUpdate = handleTranscriptUpdate
            do {
                try await speechRecognizer.startTranscribing()
            } catch {
                print(error.localizedDescription)
                await MainActor.run {
                    stopTranscribing()
                }
            }
        }
    }

    private func stopTranscribing() {
        speechRecognizer.stopTranscribing()
        withAnimation {
            isTranscribing = false
        }
    }

    var body: some View {
      VStack {
          TextField("User Input", text: $textInput)
          if isTranscribing {
              Button {
                  stopTranscribing()
              } label: {
                  Text("Stop")
              }
          } else {
              Button {
                  startTranscribing()
              } label: {
                  Text("Start")
              }
          }
      }
    }
}
```