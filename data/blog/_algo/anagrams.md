---
title: Anagrams - JavaScript Algorithms
date: '2022-04-30'
tags: ['anagrams', 'javascript', 'algorithms']
draft: false
summary: Anagrams are words that contain the same letters, but in a different order.
---

Anagrams are words that contain the same letters, but in a different order. For example, the word "anagram" can be rearranged to make another word, "nag a ram".

Directions: Check to see if two provided strings are anagrams of each other.

One string is an anagram of another if it uses the **same characters** in the same **quantity**. Only consider characters, **not spaces or punctuation**. Consider capital letters to be the same as lower case.

Examples:

```js
  anagrams('rail safety', 'fairy tales') --> True
  anagrams('RAIL! SAFETY!', 'fairy tales') --> True
  anagrams('Hi there', 'Bye there') --> False
```

Tips for dealing with considering only characters, spaces and punctuation:

- use [regex](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Character_Classes) to remove all non-alphanumeric characters. The `/w` character class matches any alphanumeric character. Equivalent to [^a-za-z0-9_]. For example, /\W/ or /[^a-za-z0-9_]/ matches "%" in "50%" and "É" in "Émanuel".

```js
const word = 'HI there!!!'

let newWord = word.replace(/[^\w]/g, '').toLowerCase()

console.log(newWord) // hithere
```

We can compare the keys of an object to see if they are equal.

```js
const obj = {
  a: 1,
  b: 1,
  c: 1,
}

console.log(Object.keys(obj).length)
```

# Solution 1: Character Map

- We can create a **character map** using an **object** to compare the two strings.
- Count the number of keys in our object and compare it to the number of keys in the other object.
- We can also compare length of both strings.

Example:

```js
// helper function to create character map
function createCharMap(str) {
  let obj = {}

  for (let char of str.replace(/[^\w]/g, '').toLowerCase()) {
    obj[char] = obj[char] + 1 || 1
  }
  return obj
}

function anagram(str1, str2) {
  // create objects of each string using helper function
  const obj1 = createCharMap(str1)
  const obj2 = createCharMap(str2)

  // compare the number of keys in each object
  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false
  }

  //compare characters in each object
  for (let char in obj1) {
    if (obj1[char] !== obj2[char]) {
      return false
    }
  }
  return true
}

console.log(anagrams('rail safety', 'fairy tales')) // true
console.log(anagrams('something else', 'fairy tales')) // false
```

# Solution 2: Sort()

We can use the `sort()` method to sort the characters in a string and then compare the two strings.

Recall how the `sort()` method sorts an array.

```js
const numbers = [10, 30, 5, -90]
console.log(numbers.sort()) // [-90, 5, 10, 30]
```

Strategy:

1. Clean up both strings using regex to remove all non-alphanumeric characters.
2. Use `toLowerCase()` to make both strings lowercase.
3. Sort both strings using `sort()`
4. If the two strings are identical, they are anagrams.

```js
function anagrams(stringA, stringB) {
  return cleanString(stringA) === cleanString(stringB)
}

// helper function to clean up string
function cleanString(str) {
  return str.replace(/[^\w]/g, '').toLowerCase().split('').sort().join('')
}

console.log(anagrams('rail safety', 'fairy tales')) // true
```
