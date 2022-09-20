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

## With Spread Operator

```js
const palindrome = (str) => {
  const s = str.toLowerCase().replace(/[\W_]/g, '')
  return s === [...s].reverse().join('')
}
```

## Reverse an integer

```js
const reverseInt = (num) => {
  let reversed = Math.abs(num).toString().split('').reverse().join('')
  console.log(reversed)

  return Math.sign(num) * parseInt(reversed)
}
```

## maxChar

Return the most common character in a string.

```js
const maxChar = (str) => {
  // create an object to store frequency of each character
  let result = {}

  // iterate through the string
  // use regex to remove spaces, lowercase all characters
  for (let char of str.toLowerCase().replace(/[\s]/g, '')) {
    // if it does not exists, set its value to 1
    if (!result[char]) {
      result[char] = 1
    }

    // if the character exists in the object, +1 to its value
    result[char]++
  }

  // now have an object with keys of each char in the string
  // and values of their respective frequency

  // return the key with the highest value
  let highestVal = 0
  let highestValsKey

  for (let key in result) {
    if (result[key] > highestVal) {
      highestVal = result[key]
      highestValsKey = key
    }
  }

  return highestValsKey
}

maxChar('abccc   ccccd') // === // "c"
maxChar('apple 1231111') // === "1"
```
