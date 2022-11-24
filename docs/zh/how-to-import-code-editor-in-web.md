---
title: 如何在网页中引入代码编辑器
lang: zh-CN
description: 读完本文, 您将掌握如何在您的网页中引入 vs code 同款代码编辑器 monaco editor
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

![](../assets/monaco-editor-sql.png)

前几天老板接了一个古老又新颖的项目, 新颖是因为用的`vue`版本是`vue3`, 古老是因为`this`满街跑, 处处`js`. 尤其是这个js, 没有类型检查代码提示写得真的是很难受. 

好在只是需要加上一个sql查询的功能, 这个倒是不难. 关键是`sql`语句要有代码高亮, 这让我一时间不知道改怎么操作. 找了几个`vue`组件, 试了下发现都不好用. 最后就在我陷入崩溃的时候我发现这个[Monaco Editor](https://microsoft.github.io/monaco-editor/)好像能用, 而且只需要简单的封装一下, 而且还是 `vs code` 同款.

下面展示的是`ts`的写法, 如果你使用的是`js`把类型去掉即可

### 安装

```bash
npm install monaco-editor
```

### 封装成组件

```html
<!-- CodeEditor.vue -->
<script setup lang="ts">
import * as monaco from 'monaco-editor'
import { onMounted, ref, watch } from 'vue'

const emit = defineEmits(['updateContent'])

const monaco_editor_el = ref<HTMLDivElement>()

let monacoEditor: monaco.editor.IStandaloneCodeEditor

// 只有组件挂载了以后才能获取到DOM元素
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

### 使用组件
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