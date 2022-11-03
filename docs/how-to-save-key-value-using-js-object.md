---
title: How to use js object to store key values pairs
lang: en-US
description: Use js object to store key values pairs. To be precise, use the typescript Record type instead of any to store key values pairs to provide better code hints and type checking.
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