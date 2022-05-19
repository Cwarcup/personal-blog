---
title: Sum the Largest Numbers
date: '2022-05-19'
tags: ['Katas']
draft: true
summary: We will then have to find the two largest numbers in that array, and sum them together.
---

Given an array of 2 or more numbers. Find the two largest numbers in that array, and sum them together.

```js
const sumLargestNumbers = function (data) {
  let num1 = data
    .sort((a, b) => {
      return a - b
    })
    .pop()

  let num2 = data
    .sort((a, b) => {
      return a - b
    })
    .pop()

  return num1 + num2
}

console.log(sumLargestNumbers([1, 10])) // 11
console.log(sumLargestNumbers([1, 2, 3])) // 5
console.log(sumLargestNumbers([10, 4, 34, 6, 92, 2])) // 126
```
