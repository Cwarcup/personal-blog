---
title: Capitalize First Letter - JavaScript Algorithms
date: '2022-04-30'
tags: ['capitalize', 'javascript', 'algorithms']
draft: false
summary: Capitalize the first letter of a string.
---

Directions: Write a function that accepts a string. The function should capitalize the first letter of **each word** in the string then return the capitalized string.

Example:

```js
capitalize('a short sentence') --> 'A Short Sentence'
capitalize('a lazy fox') --> 'A Lazy Fox'
capitalize('look, it is working!') --> 'Look, It Is Working!'
```

# Solution 1: slice()

We can use the built in javascript method `slice(startIndex, endIndex)` and concatenate the first letter to the rest of the string.

1. Make an empty array to contain the capitalized words.
2. Use `split()` on the input string to split the string into an array of words, splitting on spaces.
3. For each word in the array...
   - Use `toUpperCase()` on the first letter of the word.
   - Join first letter with rest of the string
   - Push results into the empty array.
4. Join the array containing the capitalized words into a string and return the result.

```js
function capitalize(str) {
  let words = []
  for (let word of str.split(' ')) {
    words.push(word[0].toUpperCase() + word.slice(1))
  }

  return words.join(' ')
}
```

# Solution 2: For...of Loop

1. Initialize a string with the capitalized version of the first letter of the input string.
2. For each character in the string...
   - **IF** the character to the left is a **space**
     - use `toUpperCase()` on the character
     - push it into the string containing the capitalized words.
   - **ELSE**
     - push the character into the string containing the capitalized words.
3. Return the newly created string.

```js
function capitalize(str) {
  let result = str[0].toUpperCase()

  for (let i = 1; i < str.length; i++) {
    if (str[i - 1] === ' ') {
      result += str[i].toUpperCase()
    } else {
      result += str[i]
    }
  }
  return result
}
```
