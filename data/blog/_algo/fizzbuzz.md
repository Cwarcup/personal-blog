---
title: FizzBuzz - JavaScript Algorithms
date: '2022-05-01'
tags: ['FizzBuzz', 'Algorithms']
draft: false
summary: FizzBuzz is a classic programming problem. The goal is to print the numbers from 1 to n. For multiples of three print "Fizz" instead of the number and for the multiples of five print "Buzz". For numbers which are multiples of both three and five print "FizzBuzz".
---

This is a classic interview question.

Directions: Write a program that console logs the numbers from 1 to n. But for multiples of three print “fizz” instead of the number and for the multiples of five print “buzz”. For numbers which are multiples of both three and five print “fizzbuzz”.

Example:

```js
fizzBuzz(5)
1
2
fizz
4
buzz
```

# Solution:

```js
function fizzBuzz(n) {

  for(let i = 1; i <= n; i++) {
    // is n multiple 3 and 5?
    if (i % 5 === 0 && i % 3 === 0) {
      console.log("FizzBuzz")
    // is n a multiple of 3?
    }else if (i % 3 === 0) {
      console.log("Fizz");
    } else if (i % 5 === 0 ) {
      console.log("Buzz");
    } else {
      console.log(i);
    }
  }
```
