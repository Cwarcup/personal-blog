---
title: Weekly Test Answers
date: '2022-06-27'
tags: ['Test']
images: ['/static/images/postImages/paulius-dragunas-Nhs0sLAn1Is-unsplash.jpg']
draft: true
summary: Weekly Test Answers
---

All tests can be found here:

```
git clone  git@github.com:lighthouse-labs/assessment-exam-student.git
```

# Week 2

## tempConverter

Examples:

```js
tempConverter(32, true) returns 89.6 as a result
tempConverter(32, false) returns 0.0 as a result
tempConverter(98.6, false) returns 37 as a result
tempConverter("12", <anything>) returns NaN as a result
```

```js
const tempConverter = function (value, cToF) {
  if (typeof value !== 'number') {
    return NaN
  }

  if (cToF === true) {
    const f = value * (9 / 5) + 32
    return Math.round(f * 10) / 10
  }

  if (cToF === false) {
    const c = (value - 32) * (5 / 9)
    return Math.round(c * 10) / 10
  }
}
```

## object key matcher

Build a function called keyMatcher() which, when passed two objects and a string, will use the string to look up the key-value pair in each object and compare the values. If the two values are explicitly equal to each other, return true, otherwise return false if either the values or not the same, or both objects do not have that key.

Examples:

```
keyMatcher({a: 1, b: 2, c: 3}, {here: 3, is: 2, a: 1, silly: 0, example: -1}, 'a') returns true (since the value and type are the exact same)

keyMatcher({apple: "red", banana: "yellow", cherry: "red"}, {apple: "green", banana: "brown", cherry: "black"}, "apple") returns false since the values are completely different ("red" vs "green")

keyMatcher({a: 1, b: 2, c: 3}, {a: "1", b: "2", c: "3"}, 'c') returns false since the values are different types (3 vs "3")

keyMatcher({a: 1, b: 2, c: 3}, {d: 4, e: 5, f: 6}, 'b') returns false since b is not in the second object
```

```js
const keyMatcher = function (firstObj, secondObj, key) {
  for (let item in secondObj) {
    key
    if (secondObj[item] === firstObj[item]) {
      return true
    }
  }
  return false
}
```

## count true values from an array

Implement a function called countWhich() which will take in a list of items and a callback, and it will return the number of elements which return a truthy value from the callback function.

If the first argument is not an array, our function should return false instead of a number.

Examples:

```
countWhich([1, 2, 3, 4, 5], function(num) { return (num > 4); }) returns 1 (only matches 5)

countWhich(["apple", "banana", "cherry"], function(fruit) { return fruit[0] === "a"; }) returns 1 (only matches apple)

countWhich([10, 20, 30, 40, 50], function(num) { return num % 7 === 0; }) returns 0 (none of the numbers are divisible by 7)

countWhich(["apple", "banana", "cherry"], function(fruit) { return fruit.length > 5; }) returns 2 ("apple" is shorter than 6 characters)

countWhich([], function(x) { return x > 10 }) returns 0

countWhich("This should fail", function(word) { return true; }) returns false (because the first argument is not an array)
```

```js
const countWhich = function (list, cb) {
  if (!Array.isArray(list)) {
    return false
  }

  let val = 0

  for (let item of list) {
    if (cb(item)) {
      val += 1
    }
  }
  return val
}
```

## range function

Implement the function as defined below.

Many programming languages have a `range()` functionality which will generate an array of numbers that increment from either `0` or `1` up to the number of digits requested. For example, `range(10)` might return `[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]` or it might return `[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]` depending on the implementation. Some even allow you to control the direction.

Unfortunately, JavaScript doesn't have a built-in `range()` function, so we want you to build one. Build out the function `range()` so that it takes three parameters:

1. The number of integers to generate
2. A boolean for whether to skip `0` or not (true: skip zero)
3. A boolean for whether the range should be in reverse/decreasing order or regular/increasing order (true: reverse/decreasing order)

If a non-number is passed in for the first argument, return an empty array.

Pro Tip: Remember to work incrementally. Start off just implementing the false and false scenario for the second and third parameters. In other words, focus on the zero-based, ascending range first. Work on edge cases at the very end (such as passing in a string instead of a number, as shown in the final example below.)

**Examples:**

```
- range(10, false, false) should return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
- range(10, true, false) should return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
- range(10, true, true) should return [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
- range(10, false, true) should return [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
- range(3, true, false) should return [1, 2, 3]
- range(0, false, <anything>) should return [0]
- range(10) should do the same thing as range(10, false, false)
- range(10, true) should do the same thing as range(10, true, false)
- range("2", <anything>, <anything>) should return []
```

```js
const range = function (count, skipZero, descending) {
  const result = []
  if (typeof count !== 'number') {
    return result
  }
  // use ternary to define i
  // end when result length is equal to count
  for (let i = skipZero ? 1 : 0; result.length < count; i++) {
    result.push(i)
  }

  if (descending) {
    return result.reverse()
  }

  return result
}
```

## return min/max from an array

Implement the function as defined below.

Given an array of values, the `minmax()` function will return an array that contains the minimum and maximum values in the array, always with minimum at index 0 and maximum at index 1. For the purposes of this question, you are not allowed to use `Math.max()` or `Math.min()`.

The array can be a list of lower-cased strings instead of numbers. In this case, min is the string that would be sorted first alphabetically and max is the string that would be sorted last alphabetically.

Mixed-type (strings and numbers) arrays are not of concern to us (meaning, do not worry about this situation).

Examples:

```
- minmax([1, 2, 3, 4, 5]) returns [1, 5]
- minmax([90, 89, 123, 3]) returns [3, 123]
- minmax(["apple", "banana", "canada"]) returns ["apple", "canada"]
- minmax([]) returns [undefined, undefined]
```

```js
const minmax = function (list) {
  // ternary to check if something in array
  // if something is, assign min to list.reduce()
  // else, assign it undefined
  let min =
    list.length > 0
      ? list.reduce((prev, cur) => {
          return prev < cur ? prev : cur
        })
      : undefined

  let max =
    list.length > 0
      ? list.reduce((prev, cur) => {
          return prev > cur ? prev : cur
        })
      : undefined

  return [min, max]
}
```

# Week 3

Convert a given object into an array of arrays.

Given an object, create an array which contains arrays with the key/value pairs.

To keep this simple, the values will only be primitive types (number, string, etc.) and not other objects or array.

Furthermore, assume that the input is always clean/accurate. In other words, don't worry about handling edge cases.

Examples

```js
objectToArray({ a: 1, b: 2, c: 3 })
// => [['a', 1], ['b', 2], ['c', 3]]

objectToArray({ name: 'Dave', role: 'Instructor', yearsOfExperience: 10 })
// => [['name', 'Dave'], ['role', 'Instructor'], ['yearsOfExperience', 10]]
```

```js
const objectToArray = function (obj) {
  const arr = []

  for (let key in obj) {
    arr.push([key, obj[key]])
  }

  return arr
}
```

---

Convert an array of arrays into an object.

This is the inverse of the previous question.

Arrays will only have two elements: [key, value]

To keep this simple, the values will only be primitive types (number, string, etc.) and not other objects or array.

Furthermore, assume that the input is always clean/accurate. In other words, don't worry about handling edge cases.

Examples:

```js
arrayToObject([
  ['a', 1],
  ['b', 2],
  ['c', 3],
])
// => { a: 1, b: 2, c: 3 }

rrayToObject([
  ['name', 'Dave'],
  ['role', 'Instructor'],
  ['yearsOfExperience', 10],
])
//=> {name: 'Dave', role: 'Instructor', yearsOfExperience: 10}
```

```js
const arrayToObject = function (arr) {
  const obj = {}

  for (let item of arr) {
    obj[item[0]] = item[1]
  }

  return obj
}
```

---

Write a function which will split an array into two arrays (i.e. partition it).

It will take two parameters, the first is an array of Integer values, and the second will be a callback which will return a boolean. If the callback returns true for an element, it should be placed into the left array, otherwise it should be placed into the right array.

Examples:

```js
partition([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], (n) => n % 2 === 0)
//  => [[2, 4, 6, 8, 10], [1, 3, 5, 7, 9]]

partition([-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5], (n) => n < 0)
//  => [[-5, -4, -3, -2, -1], [0, 1, 2, 3, 4, 5]]
```

```js
const partition = function (arr, callback) {
  const result = [[], []]

  for (let num of arr) {
    if (callback(num)) {
      result[0].push(num)
    } else {
      result[1].push(num)
    }
  }
  return result
}
```

---

Let's revisit Question 01 which had us convert an array of arrays into an object.

This time, make it support nested arrays.

The nested arrays also only contain 2 element arrays to represent key & value: [key, value]. However, this time we are allowing the value to be another array.

Non-array objects need NOT be supported/handled at all.

Examples:

```js
deepArrayToObject([
  ['a', 1],
  ['b', 2],
  ['c', [['d', 4]]],
])
// => { a: 1, b: 2, c: { d: 4 } }

deepArrayToObject([
  ['a', 1],
  ['b', 2],
  [
    'c',
    [
      [
        'd',
        [
          ['e', 5],
          ['f', 6],
        ],
      ],
    ],
  ],
])
// => { a: 1, b: 2, c: { d: { e: 5, f: 6 } } }
```

```js
const deepArrayToObject = function (arr) {
  const obj = {}
  // loop through the array
  for (let item of arr) {
    // if the item in the array at index 1 is another array, call the function again
    if (Array.isArray(item[1])) {
      obj[item[0]] = deepArrayToObject(item[1])
    } else {
      // if no nested arrays, do the same as before
      obj[item[0]] = item[1]
    }
  }

  return obj
}
```

---

Given a size in bits convert it to relevant size in B/KB/MB/GB/TB. Round your answers to two decimal places at most. Use base 10 for sizes.

- 1 B
- 1 kB == 1000 B
- 1 MB == 1000 kB
- 1 GB == 1000 MB
- 1 TB == 1000 GB

More info on these in case you are curious:
https://en.wikipedia.org/wiki/Byte#Unit_symbol

Examples:

```js
filesize(1) // => "1B"
filesize(1000) // => "1kB"
filesize(1000000) // => "1MB"
filesize(1500000) // => "1.5MB"
filesize(1250000000) // => "1.25GB"
filesize(9000000000000) // => "9TB"
```

```js
const filesize = function (bytes) {
  let data = bytes
  if (data < 1000) {
    return `${data}B`
  }
  const sizes = ['B', 'kB', 'MB', 'GB', 'TB']
  let i = 0
  while (data >= 100) {
    data /= 1000
    i++
  }

  const result = data.toString().slice(0) + sizes[i]

  return result.replace(/0./, '')
}
```

## Week 4

```
git clone  git@github.com:lighthouse-labs/assessment-exam-student.git w4-test

npm install sqlite3@4.0.9 && npm install --no-bin-links

npm run question 0
```

### Question 00

Given a collection of game outcome records, determine who all the players are by returning an array of their names.

The array should be ordered by how the names are encountered.

Example Input:

```js
;[
  { winner: 'Alishah', loser: 'Bob', loser_points: 3 },
  { winner: 'Maria', loser: 'Xu Jin', loser_points: 1 },
  { winner: 'Elise', loser: 'Bob', loser_points: 2 },
  { winner: 'Elise', loser: 'Maria', loser_points: 4 },
  { winner: 'Alishah', loser: 'Maria', loser_points: 2 },
  { winner: 'Maria', loser: 'Xu Jin', loser_points: 3 },
  { winner: 'Xu Jin', loser: 'Elise', loser_points: 2 },
]
```

Expected Result:

```js
;['Alishah', 'Bob', 'Maria', 'Xu Jin', 'Elise']
```

Solution:

```js
const allPlayerNames = function (outcomes) {
  let playersArr = []

  for (let player of outcomes) {
    if (!playersArr.includes(player.winner)) {
      playersArr.push(player.winner)
    }
    if (!playersArr.includes(player.loser)) {
      playersArr.push(player.loser)
    }
  }
  return playersArr
}
```

### Question 01

Implement a function which can run a given function after a delay.

Arguments:

- callback: the function to execute after the delay
- delay: number of milliseconds to wait
- data: the one (and only) argument to pass to the callback

Solution:

```js
const doShortly = function (callback, delay, data) {
  setTimeout(() => {
    callback(data)
  }, delay)
}
```

### Question 02

Implement a function fetchDataForUser, which fetches data from a remote JSON api and then returns a part of it.

Since this is a network call, it will need to be an asynchronous function and return the data via a callback.

The JSON-based data will be fetched from this URL, and others like it:

'https://gist.githubusercontent.com/kvirani/f7d65576cc1331da1c98d5cad4f82a69/raw/4baad7566f0b6cd6f651c5d3558a015e226428b5/data.json'

The callback should be called with two arguments:

1. error: if request comes back with an err, pass it through to this callback. otherwise set this to null
2. data: if there is no error, this should be the object representing the wins and losses for the given username. If there is an error, this should be set to null.

Use the request library (https://www.npmjs.com/package/request) to fetch data.

Solution:

```js
const request = require('request')
const fetchDataForUser = function (url, username, callback) {
  request(url, (err, res) => {
    if (err) {
      callback(err, null)
    } else {
      const data = JSON.parse(res.body)
      callback(null, data['users'][username])
    }
  })
}
```

### Question 03

Write a function which takes in two file paths and can **sum** the numbers found in each file.

For example,

Given:

```txt
filePath1 points to a txt file which contains "42"
filePath2 points to a txt file which contains "24"
```

Then call the callback with the number `66`

The callback should be called with two arguments (an error object, followed by data) as is typical in Node. The data passed in should therefore be the second argument, not the first.

The callback should be called with two arguments:

1. `error`: if there is an **fs** error, pass it through to this callback. otherwise set this argument to null
2. `data`: if there is no error, this should be the sum (number). If there is an error, this should be set to null.

- The function should support negative and decimal point numbers.
- Don't worry about other edge cases. For example, you can assume that if the given files are there, they WILL contain valid numbers.

Solution:

```js
const fs = require('fs')
const sumFileData = function (filePath1, filePath2, callback) {
  fs.readFile(filePath1, 'utf8', (err, data1) => {
    if (err) {
      callback(err, null)
    } else {
      fs.readFile(filePath2, 'utf8', (err, data2) => {
        if (err) {
          callback(err, null)
        } else {
          callback(null, parseFloat(data1) + parseFloat(data2))
        }
      })
    }
  })
}
```

### Question 04

Write a function which creates and returns a **promise**.

Its job will be similar to that of Question 01:

> Run a given (callback) function after a delay.

However:

- if the given callback returns a `falsy` value, the promise should fail (`reject`)
  the string "Falsy value retrieved" should be sent through to the `reject` function
- if the given callback returns a `truthy` value, the promise should pass (`resolve`)
  the return value of the executed callback should be sent through to the resolve function

Solution:

```js
const doShortlyExpectingTruthy = function (callback, delay, data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = callback(data)
      if (result) {
        resolve(result)
      } else {
        reject('Falsy value retrieved')
      }
    }, delay)
  })
}
```
