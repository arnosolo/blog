---
title: 如何将一串字符串转为A到B之间的一个数
lang: zh-CN
description: 使用js将字符串转为A到B之间的一个数. 而且来说, 输入相同的字符串会输出固定的数.
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

## 效果

```ts
'hello' --> 152.3
'go home' --> 153.1
'1,2,3' --> 151.1
```

## 代码

总体来说, 一共分2步

1. 将`字符串`转换为`32位的整数`
   
2. 将`32位整数`转换为`a到b之间的数`

```ts
/**
 * string -> int32 (-2147483648 ~ 2147483647)
 * @param {string} str string
 * @returns {number} int32 number
 */
function stringToInt32(str: string): number {
    let hash = 0; let i; let chr;
    if (str.length === 0) {
        return hash;
    }
    for (i = 0; i < str.length; i++) {
        chr = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}

/**
 * Map a number from [0, 1] to [a, b]
 * @param {number} val int32 number
 * @returns {number} [a, b]
 */
function int32ToNumberBetweenAtoB(val: number, a: number, b: number): number {
    const min = -2147483648;
    const max = 2147483647;
    return (val - min) / (max - min) * (b - a) + a;
}

export function stringToNumberBetweenAtoB(str: string, a: number, b: number): number {
    return int32ToNumberBetweenAtoB(stringToInt32(str), a, b);
}
```