---
title: How to convert a string to a number between A and B
lang: en-US
description: Use js to convert a string to a number between A and B. Moreover, entering the same string will output a fixed number.
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

## Result

```ts
'hello' --> 152.3
'go home' --> 153.1
'1,2,3' --> 151.1
```

## Code

In general, there are 2 steps

1. Convert `string` to `32-bit integer`
   
2. Convert `32-bit integer` to `number between a and b`

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