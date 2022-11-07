---
title: 更优秀的函数传参方式
lang: zh-CN
description: 如果一个函数需要4个参数, 那么我们就需要传入4个参数, 即使中间的参数在一些情况下不需要. 那么能不能做到需要几个参数就传入几个参数呢? 可以, 读了本文你就知道了.
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

```ts
// 👎 普通的传参方式
printTodo('Learn Swift', undefined, undefined, ['learning']);
// 👍 更佳的传参方式
printTodo({title: 'Learn Swift', tags: ['learning']});
```

### 普通方式

```ts
function printTodo(
    title = 'Untitled',
    content = '',
    isDone = false,
    tags: string[] = [],
) {
    console.log(`Title: ${title}`);
    console.log(`Content: ${content}`);
    console.log(`Tags: ${tags.map(tag => `#${tag} `).join()} \n`);
}

printTodo('Learn Swift', undefined, undefined, ['learning']);
```

### 按需传入
```ts
interface Todo {
    title?: string;
    content?: string;
    isDone?: boolean;
    tags?: string[];
}

function printTodo({
    title = 'Untitled',
    content = '',
    isDone = false,
    tags = [],
}: Todo = {}) {
    console.log(`Title: ${title}`);
    console.log(`Content: ${content}`);
    console.log(`Tags: ${tags.map(tag => `#${tag} `).join()} \n`);
}

printTodo({title: 'Learn Swift', tags: ['learning']});
printTodo();
```
