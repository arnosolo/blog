---
title: Vue project auto code formatting
lang: en-US
description: Automatically format code on save in vscode / vite / vue3 / ts project.
---

![](./assets/auto-code-format-vue-ts.gif)

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

## Create empty project

1. Create empty project, choose vue + ts
  
  ```bash
  npm create vite@latest
  ```
  
2. Install dependencies, start development mode, and ensure that the development page can be opened
  
  ```bash
  npm install && npm run dev
  ```

## Install ESlint

> [ESlint home page](https://eslint.org/)

1. Run the following command

   ```bash
   npm init @eslint/config
   ```

2. Select

   1. To check syntax, find problems, and enforce code style
   2. JavaScript modules (import/export)
   3. Vue.js
   4. Does your project use TypeScript? › Yes
   5. Browser
   6. Use a popular style guide
   7. Which style guide do you want to follow? Standard
   8. What format do you want your config file to be in? JavaScript

3. By default, eslint will report string with double quotes as an error.

    ```ts
    // src/App.vue
    const hi = "sdd"
    ```
   
   ![](../assets/Strings%20must%20use%20singlequote.png)

4. If you find that there is no error report, it is because you have not installed the eslint plugin. You will need to go to the plugin store to search and install `dbaeumer.vscode-eslint`


## Automatic formatting when saving
  
1. Create `.vscode/settings.json`
  
  ```json
  {
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true,
      "source.fixAll.stylelint": true
    },
    "editor.formatOnSave": false
  }
  ```
  
2. Now when you save, vscode will automatically organize the code

## ESlint documentation

ESlint rules details

[eslint-plugin-vue](https://eslint.vuejs.org/rules/multi-word-component-names.html)

[TypeScript ESLint](https://typescript-eslint.io/)
