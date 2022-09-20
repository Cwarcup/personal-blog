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

## Palindromes

### Solution 1 - Using `reverse()` helper

```js
const isPalindrome = (str) => {
  let reversed = str.split('').reverse().join('')
  return reversed === str
}
```

### Solution 2 - Using `every()` helper

```js
const isPalindrome = (str) => {
  return str
    .toLowerCase()
    .split('')
    .every((char, index) => {
      return char === str[str.length - 1 - index].toLowerCase()
    })
}
```

### Solution 3 - Using `...` spread operator

```js
const isPalindrome = (str) => {
  const s = str.toLowerCase().replace(/[\W_]/g, '')
  console.log(s)
  return s === [...s].reverse().join('')
}
```

## Reverse an integer

```js
const reverseInt = (num) => {
  let reversed = Math.abs(num).toString().split('').reverse().join('')

  return Math.sign(num) * parseInt(reversed)
}
```

## maxCharacters in a string

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
```

## FizzBuzz

```js
const fizzBuzz = (n) => {
  for (let i = 1; i <= n; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      console.log('fizzbuzz')
    } else if (i % 3 === 0) {
      console.log('fizz')
    } else if (i % 5 === 0) {
      console.log('buzz')
    } else {
      console.log(i)
    }
  }
}
```
