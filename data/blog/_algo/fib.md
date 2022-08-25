---
title: Fibonacci Sequence - JavaScript Algorithms
date: '2022-04-25'
tags: ['Fibonacci', 'JavaScript', 'algorithms']
draft: false
summary: Generating and printing the 'n-th' entry in the Fibonacci sequence.
---

The fibonacci series is an ordering of numbers where each number is the sum of the preceding two.

Directions: Print out the **n-th entry** in the fibonacci series.

Here are the first ten entries of the fibonacci series.

```
 [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```

The '4th' entry is the sum of the '3rd' and '2nd' entries.

```js
;[0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
fib(4) === 3
```

Usually solved by generating all the entries in the sequence and then returning the **n-th entry**.

Big trick: the _first two_ entries need to be created manually to start the sequence.

## Iterative Solution

```js
function fib(n) {
  let fib = [0, 1]
  for (let i = 2; i <= n; i++) {
    fib.push((fib[i] = fib[i - 1] + fib[i - 2]))
  }
  return fib[n]
}
```

BigO Notation: O(n) Linear Time.

## Recursive Solution

```js
function fib(n) {
  if (n < 2) {
    return n
  }
  return fib(n - 1) + fib(n - 2)
}
```

Big O Notation: O(2^n) Exponential Time. This is very poor. Can speed this up by storing the results of previous calls (memoization).

```js
function memoize(fn) {
  let cache = {}

  return function (...args) {
    if (cache[args]) {
      return cache[args]
    }

    result = fn.apply(this, args)
    cache[args] = result
    return result
  }
}

fib = memoize(fib)

console.log(fib(50)) //12586269025
```
