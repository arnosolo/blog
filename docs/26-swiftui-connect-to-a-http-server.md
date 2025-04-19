---
title: Connecting iOS App to an HTTP Server  
lang: en-US
description: This article describes how an iOS app can send HTTP requests to a backend server.
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

## Defining a General HTTP Service - HttpService

This class is universal for every project.

```swift
// HttpService.swift
import Foundation

class HttpService {    
    enum HTTPMethod: String {
        case GET
        case POST
    }
    
    enum APIError: Error {
        case invalidURL
        case serverError
        case encodingError
        case decodingError
        
        var errorDescription: String? {
            switch self {
            case .invalidURL:
                return "Invalid URL"
            case .serverError:
                return "Server Error"
            case .encodingError:
                return "Encode JSON failed"
            case .decodingError:
                return "Decode JSON failed"
            }
        }
    }
    
    private let baseURL: String
    private let timeoutInterval: Double
    private let session: URLSession
    private var idToken: String?
    
    init(baseURL: String, timeoutInterval: Double = 60, session: URLSession = URLSession.shared) {
        self.baseURL = baseURL
        self.timeoutInterval = timeoutInterval
        self.session = session
        self.idToken = nil
    }
    
    func setIdToken(_ idToken: String) {
        self.idToken = idToken
    }
    
    func get(endpoint: String) async throws -> (Data, HTTPURLResponse) {
        guard let url = createURL(for: endpoint) else {
            throw APIError.invalidURL
        }
        
        var request = URLRequest(url: url)
        request.httpMethod = HTTPMethod.GET.rawValue
        request.timeoutInterval = timeoutInterval
        
        if let idToken {
            request.addValue("Bearer \(idToken)", forHTTPHeaderField: "Authorization")
        }
        
        let (data, response) = try await session.data(for: request)
        guard let httpResponse = response as? HTTPURLResponse else {
            throw APIError.serverError
        }
        
        return (data, httpResponse)
    }
    
    func post<T: Codable>(endpoint: String, body: T) async throws -> (Data, HTTPURLResponse) {
        guard let url = createURL(for: endpoint) else {
            throw APIError.invalidURL
        }
        
        var request = URLRequest(url: url)
        request.httpMethod = HTTPMethod.POST.rawValue
        request.timeoutInterval = timeoutInterval
        
        if let idToken {
            request.addValue("Bearer \(idToken)", forHTTPHeaderField: "Authorization")
        }

        request.addValue("application/json", forHTTPHeaderField: "Content-Type")
        do {
            let encoder = JSONEncoder()
            let jsonData = try encoder.encode(body)
            request.httpBody = jsonData
        } catch {
            throw APIError.encodingError
        }

        let (data, response) = try await session.data(for: request)
        guard let httpResponse = response as? HTTPURLResponse else {
            throw APIError.serverError
        }

        return (data, httpResponse)
    }
    
    // Combine baseURL with the endpoint path
    private func createURL(for endpoint: String) -> URL? {
        return URL(string: baseURL + endpoint)
    }
}
```

## Defining Specific Services

My personal preference is to define a class for each backend service because different backend services have different server addresses. Here is a concrete example.

```swift
// PortraitArtService.swift
import Foundation

class PortraitArtService {
    enum ServiceError: LocalizedError {
        case unexpectedStatusCode(Int, Data)
        case decodingError
        case dataToStringFailed
        
        var errorDescription: String? {
            switch self {
            case .unexpectedStatusCode(let statusCode, let data):
                let message = String(data: data, encoding: .utf8)
                return "Unexpected HTTP status code = \(statusCode), Response body = \(message ?? "")"
            case .decodingError:
                return "Decode JSON failed"
            case .dataToStringFailed:
                return "Failed to convert data to string."
            }
        }
    }
    
    struct GeneratePortraitPayload: Codable {
        let prompt: String
    }
    
    struct GeneratePortraitResult: Codable {
        let outputImageUrl: String
    }
    
    static let shared = PortraitArtService(
        httpService: HttpService(baseURL: Constants.portraitArtServiceBaseUrl)
    )
    
    private let httpService: HttpService

    init(httpService: HttpService) {
        self.httpService = httpService
    }
    
    func generatePortrait(payload: GeneratePortraitPayload) async throws -> GeneratePortraitResult {
        let (data, response) = try await httpService.post(
            endpoint: "/generatePortrait",
            body: payload
        )
        
        if response.statusCode < 200 || response.statusCode >= 300 {
            throw ServiceError.unexpectedStatusCode(response.statusCode, data)
        }

        return try JSONDecoder().decode(GeneratePortraitResult.self, from: data)
    }
}
```