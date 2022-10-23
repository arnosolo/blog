---
title: Auto code formatting in vscode / vite / vue3 / ts project
lang: en-US
description: Automatically format code on save in vscode / vite / vue3 / ts project.
---

![](./assets/auto-code-format-vue-ts.gif)

# {{ $frontmatter.title }}

{{ $frontmatter.description }} [code link](https://github.com/arnosolo/auto-code-format-vue-ts) 

1. Create project, choose vue + ts
  
  ```bash
  npm create vite@latest
  ```
  
2. Install dependencies, start project
  
  ```bash
  npm install
  npm run dev
  ```
  
3. Make sure project in running, then add some libs in `package.json`
  
  ```json
  "devDependencies": {
      "eslint": "^8.23.0",
      "@antfu/eslint-config": "^0.26.3",
      "lint-staged": "^13.0.3",
      "stylelint": "^14.11.0",
      "stylelint-config-recommended-vue": "^1.4.0",
      "stylelint-order": "^5.0.0"
    }
  ```
  
4. Install dependencies
  
  ```bash
  npm i
  ```
  
5. add four config files
  
  .editorconfig
  
  ```
  root = true
  
  [*]
  charset = utf-8
  indent_style = space
  indent_size = 4
  end_of_line = lf
  insert_final_newline = true
  trim_trailing_whitespace = true
  
  [*.{yml,yaml,json}]
  indent_style = space
  indent_size = 2
  ```
  
  .eslintignore
  
  ```
  *.sh
  node_modules
  *.md
  *.woff
  *.ttf
  .vscode
  .idea
  dist
  /public
  /docs
  .husky
  .local
  /bin
  Dockerfile
  ```
  
  .eslintrc
  
  ```
  {
      "extends": [
          "@antfu"
      ],
      "overrides": [
          {
              "files": ["*.vue"],
              "rules": {
                  "indent": "off",
                  "curly": ["error", "all"],
                  "quotes": ["error", "single", { "allowTemplateLiterals": true }],
                  "@typescript-eslint/indent": "off",
                  "@typescript-eslint/semi": ["error", "always"],
                  "@typescript-eslint/brace-style": ["error", "1tbs"],
                  "vue/html-indent": ["error", 4],
                  "vue/component-name-in-template-casing": ["error", "kebab-case", {
                      "registeredComponentsOnly": false,
                      "ignores": []
                  }],
                  "vue/component-tags-order": ["error", {
                      "order": [ [ "template", "script" ], "style" ]
                  }],
                  "vue/script-indent": ["error", 4, { "baseIndent": 1 }],
                  "@typescript-eslint/member-delimiter-style": ["error", {
                      "multiline": {
                          "delimiter": "semi",
                          "requireLast": true
                      },
                      "singleline": {
                          "delimiter": "semi",
                          "requireLast": false
                      },
                      "multilineDetection": "brackets"
                  }]
              }
          },
          {
              "files": ["*.ts"],
              "rules": {
                  "curly": ["error", "all"],
                  "no-console": "off",
                  "@typescript-eslint/brace-style": ["error", "1tbs"],
                  "@typescript-eslint/indent": ["error", 4],
                  "@typescript-eslint/semi": ["error", "always"],
                  "@typescript-eslint/member-delimiter-style": ["error", {
                      "multiline": {
                          "delimiter": "semi",
                          "requireLast": true
                      },
                      "singleline": {
                          "delimiter": "semi",
                          "requireLast": false
                      },
                      "multilineDetection": "brackets"
                  }],
                  "@typescript-eslint/quotes": ["error", "single", { "allowTemplateLiterals": true }]
              }
          }
      ]
  }
  ```
  
  .stylelintrc
  
  ```
  {
      "extends": [
          "stylelint-config-standard-scss",
          "stylelint-config-recommended-vue"
      ],
      "plugins": [
          "stylelint-order"
      ],
      "overrides": [{
              "files": ["**/*.(scss|css|html|vue)"],
              "customSyntax": "postcss-scss"
          },
          {
              "files": ["**/*.(html|vue)"],
              "customSyntax": "postcss-html"
          }
      ],
      "rules": {
          "function-no-unknown": null,
          "selector-class-pattern": null,
          "selector-pseudo-class-no-unknown": [
              true,
              {
                  "ignorePseudoClasses": [
                      "global"
                  ]
              }
          ],
          "selector-pseudo-element-no-unknown": [
              true,
              {
                  "ignorePseudoElements": [
                      "v-deep"
                  ]
              }
          ],
          "at-rule-no-unknown": [
              true,
              {
                  "ignoreAtRules": [
                      "tailwind",
                      "apply",
                      "variants",
                      "responsive",
                      "screen",
                      "function",
                      "if",
                      "each",
                      "include",
                      "mixin"
                  ]
              }
          ],
          "no-empty-source": null,
          "string-quotes": null,
          "named-grid-areas-no-invalid": null,
          "unicode-bom": "never",
          "no-descending-specificity": null,
          "font-family-no-missing-generic-family-keyword": null,
          "declaration-colon-space-after": "always-single-line",
          "declaration-colon-space-before": "never",
          "rule-empty-line-before": [
              "always",
              {
                  "ignore": [
                      "after-comment",
                      "first-nested"
                  ]
              }
          ],
          "order/order": [
              [
                  "dollar-variables",
                  "custom-properties",
                  "at-rules",
                  "declarations",
                  {
                      "type": "at-rule",
                      "name": "supports"
                  },
                  {
                      "type": "at-rule",
                      "name": "media"
                  },
                  "rules"
              ],
              {
                  "severity": "warning"
              }
          ],
          "indentation": 4,
          "alpha-value-notation": "number",
          "color-function-notation": "legacy"
      },
      "ignoreFiles": [
          "**/*.js",
          "**/*.ts"
      ]
  }
  ```
  
6. Add recommended vscode plugins in `.vscode\extensions.json`
  
  ```json
  {
    "recommendations": [
      "dbaeumer.vscode-eslint",
      "vue.volar",
      "streetsidesoftware.code-spell-checker",
      "stylelint.vscode-stylelint"
    ]
  }
  ```
  
7. Add some settings in `.vscode\settings.json`
  
  ```json
  {
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true,
      "source.fixAll.stylelint": true
    },
    "editor.formatOnSave": false
  }
  ```
  
8. Format on save should works now.
