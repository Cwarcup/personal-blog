---
title: Weekly Test Answers
date: '2022-06-27'
tags: ['Test']
images: ['/static/images/postImages/paulius-dragunas-Nhs0sLAn1Is-unsplash.jpg']
draft: true
summary: Weekly Test Answers
---

## tempConverter

Examples:

- tempConverter(32, true) returns 89.6 as a result
- tempConverter(32, false) returns 0.0 as a result
- tempConverter(98.6, false) returns 37 as a result
- tempConverter("12", <anything>) returns NaN as a result

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

- keyMatcher({a: 1, b: 2, c: 3}, {here: 3, is: 2, a: 1, silly: 0, example: -1}, 'a') returns true (since the value and type are the exact same)
- keyMatcher({apple: "red", banana: "yellow", cherry: "red"}, {apple: "green", banana: "brown", cherry: "black"}, "apple") returns false since the values are completely different ("red" vs "green")
- keyMatcher({a: 1, b: 2, c: 3}, {a: "1", b: "2", c: "3"}, 'c') returns false since the values are different types (3 vs "3")
- keyMatcher({a: 1, b: 2, c: 3}, {d: 4, e: 5, f: 6}, 'b') returns false since b is not in the second object

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

- countWhich([1, 2, 3, 4, 5], function(num) { return (num > 4); }) returns 1 (only matches 5)
- countWhich(["apple", "banana", "cherry"], function(fruit) { return fruit[0] === "a"; }) returns 1 (only matches apple)
- countWhich([10, 20, 30, 40, 50], function(num) { return num % 7 === 0; }) returns 0 (none of the numbers are divisible by 7)
- countWhich(["apple", "banana", "cherry"], function(fruit) { return fruit.length > 5; }) returns 2 ("apple" is shorter than 6 characters)
- countWhich([], function(x) { return x > 10 }) returns 0
- countWhich("This should fail", function(word) { return true; }) returns false (because the first argument is not an array)

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

Many programming languages have a range() functionality which will generate an array of numbers that increment from either 0 or 1 up to the number of digits requested. For example, range(10) might return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] or it might return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] depending on the implementation. Some even allow you to control the direction.

Unfortunately, JavaScript doesn't have a built-in range() function, so we want you to build one. Build out the function range() so that it takes three parameters:

1. The number of integers to generate
2. A boolean for whether to skip 0 or not (true: skip zero)
3. A boolean for whether the range should be in reverse/decreasing order or regular/increasing order (true: reverse/decreasing order)

If a non-number is passed in for the first argument, return an empty array.

Pro Tip: Remember to work incrementally. Start off just implementing the false and false scenario for the second and third parameters. In other words, focus on the zero-based, ascending range first. Work on edge cases at the very end (such as passing in a string instead of a number, as shown in the final example below.)

**Examples:**

- range(10, false, false) should return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
- range(10, true, false) should return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
- range(10, true, true) should return [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
- range(10, false, true) should return [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
- range(3, true, false) should return [1, 2, 3]
- range(0, false, <anything>) should return [0]
- range(10) should do the same thing as range(10, false, false)
- range(10, true) should do the same thing as range(10, true, false)
- range("2", <anything>, <anything>) should return []

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

Given an array of values, the `minmax()` function will return an array that contains the minimum and maximum values in the array, always with minimum at index 0 and maximum at index 1. For the purposes of this question, you are not allowed to use `Math.max()` or M`ath.min()`.

The array can be a list of lower-cased strings instead of numbers. In this case, min is the string that would be sorted first alphabetically and max is the string that would be sorted last alphabetically ("a" < "b", while "ab" > "aa", and so on).

Mixed-type (strings and numbers) arrays are not of concern to us (meaning, do not worry about this situation).

Examples:

- minmax([1, 2, 3, 4, 5]) returns [1, 5]
- minmax([90, 89, 123, 3]) returns [3, 123]
- minmax(["apple", "banana", "canada"]) returns ["apple", "canada"]
- minmax([]) returns [undefined, undefined]

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
