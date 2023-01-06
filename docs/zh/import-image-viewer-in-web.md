---
title: 如何在vue项目中引入图片浏览插件
lang: zh-CN
description: viewerjs是一款优秀的图片浏览插件, 今天我们将会将它封装为一个vue组件
---

# {{ $frontmatter.title }}

[viewerjs](https://github.com/fengyuanchen/viewerjs)是一款优秀的图片浏览插件, 今天我们将会将它封装为一个vue组件

<img src="../assets/image-viewer-demo.jpg" alt="image-viewer-demo" width="300">

### 安装依赖
```bash
npm i viewerjs
```

### 封装组件
```vue
<!-- ImageViewer.vue -->
<script setup lang="ts">
// https://github.com/fengyuanchen/viewerjs
import { onMounted, ref, watch } from 'vue'
import Viewer from 'viewerjs'
import 'viewerjs/dist/viewer.css'

interface Props {
  src: string
  alt?: string
}

const props = withDefaults(defineProps<Props>(), {
  alt: '',
})

const image_viewer_el = ref<HTMLImageElement | null>(null)
const viewer = ref<Viewer | undefined>(undefined)

onMounted(() => {
  createViewer()
})

watch(props, (_newVal) => {
  viewer.value = createViewer()
})

function createViewer() {
  if (image_viewer_el.value === null) {
    return undefined
  }
  return new Viewer(image_viewer_el.value, {
    navbar: false,
    title: true,
    toolbar: {
    },
  })
}
</script>

<template>
  <img ref="image_viewer_el" :src="src" :alt="alt">
</template>
```

### 使用组件
```vue
<script setup lang="ts">
import ImageViewer from '@src/components/ImageViewer.vue'

const imgUrl = 'http://127.0.0.1:5173/src/assets/kangaroo.png'
const imgAlt = 'Kangaroo'
</script>

<template>
  <image-viewer :src="imgUrl" :alt="imgAlt"/>
</template>
```