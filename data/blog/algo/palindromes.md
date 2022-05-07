---
title: Palindromes - JavaScript Algorithms
date: '2022-05-06'
tags: ['Palindromes', 'algorithms']
draft: false
summary: Palindromes are words that are the same backwards and forwards. Here are a few examples that determine if a given string is a palindrome.
---

A palindrome is a word, phrase, number, or sequence of words that reads the same backward as forward. An example of a palindrome is "madam", which reads as "madam" backwards. Sentences can be palindromes as well. For example: "taco cat" and "red rum, sir, is murder".

Example were we want to include _spaces_ and _punctuation_ in determining if the string is a palindrome.

```js
palindrome('abba') // true
palindrome('abcdefg !') // false
```

# Methods

## Direct Comparison with Reverse

```js
function palindrome(str) {
  let newStr = str.split('').reverse().join('')
  return str === newStr
}
```

## Every() method

Can use the `every` method to check if every element in the array is true.

```js
every((element, index, array) => {
  /* ... */
})
```

The every() method tests whether all elements in the array pass the test implemented by the provided function. It returns a Boolean value.

```js
const array = [1, 30, 39, 29, 10, 13]

array.every((value) => value < 40) // true, because all values in the array are less than 40.
```

We could use `every()` to check if every element in the array is true. However, the downside if you are doing a lot of extra comparisons. You only NEED to compare until you get halfway through the array.

```js
function palindrome(str) {
  return str.split('').every((character, index) => {
    return character === str[str.length - index - 1]
  })
}
```

## With Spead Operator

```js
const palindrome = (str) => {
  const s = str.toLowerCase().replace(/[\W_]/g, '')
  return s === [...s].reverse().join('')
}
```
