# Arno's Blog Project

This project is a personal blog and tutorial repository managed using VitePress. It contains technical articles and corresponding code examples for web development, iOS development, and embedded systems (specifically 51 MCU).

## Project Overview

- **Main Framework:** [VitePress](https://vitepress.dev/)
- **Documentation:** Located in the `docs/` directory.
  - Root `docs/`: English documentation.
  - `docs/zh-CN/`: Simplified Chinese documentation.
  - `docs/zh-TW/`: Traditional Chinese documentation.
- **Code Examples:** Located in the `codes/` directory.
  - iOS Demos: SwiftUI projects (e.g., `demo1-image-picker`, `demo4-global-state-swiftui`).
  - Embedded Demos: 51 MCU projects, some using PlatformIO (e.g., `demo201-51-platformio-led`).

## Building and Running

### Documentation (VitePress)

Key commands as defined in `package.json`:

- **Start Development Server:**
  ```bash
  npm run docs:dev
  ```
- **Build for Production:**
  ```bash
  npm run docs:build
  ```
- **Preview Production Build:**
  ```bash
  npm run docs:preview
  ```

### Code Examples

- **iOS Projects:** Open the `.xcodeproj` files in Xcode within their respective directories in `codes/`.
- **51 MCU Projects (PlatformIO):**
  - Use [PlatformIO Core](https://docs.platformio.org/en/latest/core/index.html) or the VS Code extension.
  - Command line build:
    ```bash
    cd codes/demo201-51-platformio-led
    pio run
    ```

## Development Conventions

- **Multi-language Support:** When adding new articles, provide an English version in `docs/` and a Chinese version in `docs/zh-CN/`.
- **Naming Convention:** Documentation files are typically prefixed with a number (e.g., `38-build-uni-app-upload-to-testflight.md`).
- **Assets:** Images and other assets should be placed in `docs/assets/` or `docs/zh-CN/assets/`.
- **Git Hooks:** The project uses Husky for pre-commit hooks.
