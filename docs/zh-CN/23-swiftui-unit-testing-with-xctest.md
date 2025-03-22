---
title: SwiftUI 应用单元测试
lang: zh-CN
description: 本文阐述了在 SwiftUI 应用中如何进行单元测试. 包括创建测试, 命名规则, 测试会抛出错误的函数, 测试异步函数, 在测试开始前和结束后运行一段程序.
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

## 创建测试

创建一个新的 Target, 类型是 Unit Testing

## 命名规则

```yml
Naming Structure:
    test_UnitOfWork_StateUnderTest_ExpectedBehavior
    test_[struct or class]_[var or func]_[expected result]
Testing Structure:
    Given, When, Then
```

示例
```swift
import XCTest
@testable import YourProjectName

final class DateUtils_Tests: XCTestCase {
    func test_DateUtils_formateNoteDate_shouldOnlyHaveTime() {
        // Given date within today
        ...

        // When
        ...

        // Then
        ...
    }
}
```

## 测试会抛出错误的函数

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

## 测试异步函数

```swift
func test_HomeViewModel_downloadWithEscaping_shouldReturnItems() {
    // Given
    let vm = HomeViewModel(isPremium: Bool.random())

    // When
    let expection = XCTestExpectation(description: "Should return items after 3s")

    vm.$dataArray
        .dropFirst()
        .sink { _ in
            expection.fulfill()
        }
        .store(in: &cancellables)
    vm.downloadWithEscaping()

    // Then
    wait(for: [expection], timeout: 5)
    XCTAssertGreaterThan(vm.dataArray.count, 0)
}
```

## 在测试开始前和结束后运行一段程序

```swift
final class HomeViewModel_Test: XCTestCase {
    // 1. 声明可选变量
    var viewModel: HomeViewModel?

    override func setUpWithError() throws {
        // Put setup code here. This method is called before the invocation of each test method in the class.
        // 2. 在每次测试开始前, 初始化变量
        viewModel = HomeViewModel(isPremium: Bool.random())
    }

    override func tearDownWithError() throws {
        // Put teardown code here. This method is called after the invocation of each test method in the class.
        // 3. 在每次测试结束后, 清除变量
        viewModel = nil
    }

    func test_HomeViewModel_dataArray_shouldAddItems() {
        // Given
        // 4. 在测试中使用变量
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

## 参考材料

[Unit Testing a SwiftUI application in Xcode | Advanced Learning #17 - YouTube](https://www.youtube.com/watch?v=eqdvIUKsM2A)