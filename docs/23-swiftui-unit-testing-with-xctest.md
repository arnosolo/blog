---
title: Unit Testing in SwiftUI Apps
lang: en-US
description: This article explains how to perform unit testing in SwiftUI apps. It covers creating tests, naming conventions, testing functions that throw errors, testing asynchronous functions, and running code before and after tests.
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

## Creating Tests

Create a new Target of type Unit Testing.

## Naming Conventions

```yml
Naming Structure:
    test_UnitOfWork_StateUnderTest_ExpectedBehavior
    test_[struct or class]_[var or func]_[expected result]
Testing Structure:
    Given, When, Then
```

Example
```swift
import XCTest
@testable import YourProjectName

final class DateUtils_Tests: XCTestCase {
    func test_DateUtils_formatNoteDate_shouldOnlyHaveTime() {
        // Given date within today
        ...

        // When
        ...

        // Then
        ...
    }
}
```

## Testing Functions That Throw Errors

```swift
func test_HomeViewModel_saveItem_shouldThrowError_noData() {
    // Given
    let vm = HomeViewModel(isPremium: Bool.random())

    // When
    let loopCount: Int = Int.random(in: 1..<100)
    for _ in 0..<loopCount {
        vm.addItem(item: UUID().uuidString)
    }

    // Then
    do {
        try vm.saveItem(item: "")
    } catch let error {
        let returnedError = error as? HomeViewModel.DataError
        XCTAssertEqual(returnedError, HomeViewModel.DataError.noData)
    }
}
```

## Testing Asynchronous Functions

```swift
func test_HomeViewModel_downloadWithEscaping_shouldReturnItems() {
    // Given
    let vm = HomeViewModel(isPremium: Bool.random())

    // When
    let expectation = XCTestExpectation(description: "Should return items after 3s")

    vm.$dataArray
        .dropFirst()
        .sink { _ in
            expectation.fulfill()
        }
        .store(in: &cancellables)
    vm.downloadWithEscaping()

    // Then
    wait(for: [expectation], timeout: 5)
    XCTAssertGreaterThan(vm.dataArray.count, 0)
}
```

## Running Code Before and After Tests

```swift
final class HomeViewModel_Test: XCTestCase {
    // 1. Declare optional variables
    var viewModel: HomeViewModel?

    override func setUpWithError() throws {
        // Put setup code here. This method is called before the invocation of each test method in the class.
        // 2. Initialize variables before each test
        viewModel = HomeViewModel(isPremium: Bool.random())
    }

    override func tearDownWithError() throws {
        // Put teardown code here. This method is called after the invocation of each test method in the class.
        // 3. Clean up variables after each test
        viewModel = nil
    }

    func test_HomeViewModel_dataArray_shouldAddItems() {
        // Given
        // 4. Use variables in the test
        guard let vm = viewModel else {
            return
        }

        // When
        let itemNumber = Int.random(in: 1..<10)
        for _ in 0..<itemNumber {
            vm.addItem(item: "hello")
        }
        // Then
        XCTAssertEqual(vm.dataArray.count, itemNumber)
    }
}
```

## References

[Unit Testing a SwiftUI application in Xcode | Advanced Learning #17 - YouTube](https://www.youtube.com/watch?v=eqdvIUKsM2A)