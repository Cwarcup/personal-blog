---
title: Number of Vowels
date: '2022-05-19'
tags: ['Kata']
draft: true
summary: Counting the number of vowels that appear in a given string.
---

```js
const numberOfVowels = function (data) {
  let result = data.match(/[aeiou]/gi)
  return (result = result ? result.length : 0)
}

console.log(numberOfVowels('orange'))
console.log(numberOfVowels('lighthouse labs'))
console.log(numberOfVowels('aeiou'))
console.log(numberOfVowels(''))
```
