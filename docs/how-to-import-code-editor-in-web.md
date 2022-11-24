---
title: How to import code editor in web
lang: en-US
description: After reading this article, you will know how to introduce the same code editor as VS Code (Monaco Editor) in your web pages.
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

![](./assets/monaco-editor-sql.png)

Yesterday my boss took on an old and new project, it's new because the `vue` version used is `vue3`, it's old because `this` runs all over the street, and there are `js` everywhere .

Fortunately, I just need to add a SQL query interface, which is not difficult. Problem is the `sql` input should have code highlighted. I found some `vue` components, tried them and found that they didn't work. Finally, I found this [Monaco Editor](https://microsoft.github.io/monaco-editor/) and it works.

The following example is written in `ts`. If you're using `js`, remove the types

### Install

```bash
npm install monaco-editor
```

### Wrap into a component

```html
<!-- CodeEditor.vue -->
<script setup lang="ts">
import * as monaco from 'monaco-editor'
import { onMounted, ref, watch } from 'vue'

const emit = defineEmits(['updateContent'])

const monaco_editor_el = ref<HTMLDivElement>()

let monacoEditor: monaco.editor.IStandaloneCodeEditor

// DOM elements can only be obtained after the component is mounted
onMounted(() => {
  if (monaco_editor_el.value) {
    monacoEditor = monaco.editor.create(monaco_editor_el.value, {
      value: '',
      language: 'sql',
      automaticLayout: true,
    })

    monacoEditor?.setValue(props.content)
    monacoEditor.onDidChangeModelContent(() => {
      if (monacoEditor) {
        emit('updateContent', monacoEditor.getValue())
      }
    })
  }
})
</script>

<template>
  <div class="border-1 border-gray-200 py-4 pr-4">
    <div ref="monaco_editor_el" class="h-200px" />
  </div>
</template>
```

### Use the component

```html
<script setup lang="ts">
const sqlContent = ref('')
function handleContentUpdate(newVal: string) {
  sqlContent.value = newVal
}
</script>

<template>
    <code-editor @update-content="handleContentUpdate" />
</template>
```
