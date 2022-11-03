---
title: 如何使用js对象存储键值对
lang: zh-CN
description: 使用js对象存储键值对. 准确的说是使用typescript的 Record 类型, 而不是 any 来存储键值对, 以提供更好的代码提示以及类型检查.
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

```ts
interface PhotoSpec {
    width: number;
    height: number;
    unit: 'mm' | 'inch';
}

type PhotoSpecId =
    'australia-passport' |
    'japan-passport' |
    'japan-resume';


const PhotoSpecListObj: Record<PhotoSpecId, PhotoSpec> = {
    'australia-passport': {
        width: 35,
        height: 45,
        unit: 'inch',
    },
    'japan-passport': {
        width: 35,
        height: 45,
        unit: 'mm',
    },
    "japan-resume": {
        width: 35,
        height: 45,
        unit: 'mm',
    }
}

function printPhotoSpecList(PhotoSpecListObj: Record<PhotoSpecId, PhotoSpec>) {
    Object.values(PhotoSpecListObj).forEach(spec => {
        console.log(spec);
    })
}
```