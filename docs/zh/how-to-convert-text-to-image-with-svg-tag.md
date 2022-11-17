---
title: 如何使用svg标签将文字转换为图片
lang: zh-CN
description: 使用svg标签将文字转换为图片, 而且文字还能居中和自动换行.
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

![](../assets/text-image-demo.png)

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 125">
    <foreignObject width="200" height="125" x="0" y="0">
        <div class="h-full flex justify-center items-center">
            <p class="text-16px text-center">
                YOUR_TEXT_HERE
            </p>
        </div>
    </foreignObject>
</svg>
```

- `viewBox` 的意思是画布从(0,0)开始, 长宽为 200 和 125
  
- `foreignObject` 使得svg中可以放入html元素

- `div` 中使用了弹性布局使文件居中, 如果你对这种原子化的样式不熟悉的话, 可以看看[tailwind css](https://tailwindcss.com/). 当前实例使用的则是[unocss](https://uno.antfu.me/)
