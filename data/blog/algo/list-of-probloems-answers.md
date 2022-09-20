---
title: List of Various Problems and Answers - JavaScript Algorithms
date: '2022-09-20'
tags: ['Algorithms']
draft: true
summary: This is a list of various problems and answers that I have solved in JavaScript.
---

## Reverse a String

### Solution 1

```js
function reverse(str) {
  return str.split('').reverse().join('')
}

reverse('hello') // olleh
```

### Solution 2

More manual labour. Does **not** use `reverse()`.

```js
const reverseStr = (str) => {
  let result = []

  let strArr = str.split('')

  for (let i = strArr.length - 1; i >= 0; i--) {
    result.push(strArr[i])
  }

  return result.join('')
}
```

Or, using a `for...of` loop:

```js
const reverseStr = (str) => {
  let reversed = ''

  for (let char of str) {
    reversed = char + reversed
  }

  return reversed
}
```

### Solution 3

Using the reduce helper:

```js
const reverseStr = (str) => {
  return str.split('').reduce((prev, cur) => {
    return (cur += prev)
  }, '')
}
```
