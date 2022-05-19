---
title: Longest Name
date: '2022-05-19'
tags: ['Kata']
draft: true
summary: Given a list of names, determine which instructor has the longest name.
---

```js
const instructorWithLongestName = function (instructors) {
  let maxIndex = 0

  for (let i = 0; i < instructors.length; i++) {
    if (instructors[i].name.length > instructors[maxIndex].name.length) {
      maxIndex = i
    }
  }
  return instructors[maxIndex]
}
```
