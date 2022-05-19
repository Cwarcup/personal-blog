---
title: Percent Encoded String
date: '2022-05-19'
tags: ['Kata']
draft: true
summary: Given a normal string of words, turn it into a percent-encoded string by replacing all whitespace with %20.
---

Take a look at the following URL, specifically the last part:

```
https://www.google.com/search?q=javascript+string+replace+whitespace
```

This URL will perform a google search for the term "javascript string replace whitespace". Notice that when the string "javascript string replace whitespace" is part of a URL, the space is replaced with `%20`

For this exercise, focusing on replacing the spaces with `%20`.

```js
const urlEncode = function (text) {
  return text.replace(/[\s]/g, '%20')
}

// without replace

const urlEncode = function (text) {
  let result = ''

  for (let char of text.trim().split('')) {
    if (char === ' ') {
      char = '%20'
      result = result + char
    } else {
      result = result + char
    }
  }
  return result
}
```
