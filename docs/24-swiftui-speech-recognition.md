---
title: Speech-to-Text in SwiftUI  
lang: en-US
description: This article explains how to add speech-to-text functionality in a SwiftUI app.
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

## Permission Declarations

1. NSSpeechRecognitionUsageDescription  
   Example description: We need speech recognition to convert your voice to text.
2. NSMicrophoneUsageDescription  
   Example description: We need microphone access to record your speech.

Note: Both permissions must be declared. The app will crash if they are not declared.

## Define SpeechRecognizer

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

## Using SpeechRecognizer

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