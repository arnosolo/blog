---
title: A better way to pass parameters to functions
lang: en-US
description: If a function requires 4 arguments, then we need to pass in 4 arguments, even if the middle argument is not needed in some cases. So can you pass in a few parameters if you need a few parameters? Yes, you will know after reading this article.
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

```ts
// 👎 Ordinary way of passing parameters
printTodo('Learn Swift', undefined, undefined, ['learning']);
// 👍 Pass in only the parameters needed
printTodo({title: 'Learn Swift', tags: ['learning']});
```

### Ordinary way

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

### Pass in only the parameters needed

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
