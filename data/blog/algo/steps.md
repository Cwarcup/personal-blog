---
title: Printing Steps - JavaScript Algorithms
date: '2022-05-02'
tags: ['steps', 'Algorithms']
draft: false
summary: Console log a step shape with N levels using the "#" character.
---

Directions: Write a function that accepts a positive number N. The function should console log a step shape with N levels using the # character.

Make sure the step has **spaces on the right hand side**!

Example:

```js
steps(2)
;('# ')
;('##')
steps(3)
;('#  ')
;('## ')
;('###')
steps(4)
;('#   ')
;('##  ')
;('### ')
;('####')
```

# Iterative Solution

Time Complexity: O(n^2). Quadratic runtime.

Pseudocode:

1. from 0 to n...
   1. create an empty string called 'stair'
   2. from 0 to n...
      - **IF** the current number is less than or equal to the current step
        - push a # into 'stair'
      - **ELSE**
        - push a space into 'stair'
   3. console.log the 'stair' string

```js
function steps(n) {
  for (let row = 0; row < n; row++) {
    let stair = ''
    for (let col = 0; col < n; col++) {
      if (col <= row) {
        stair += '#'
      } else {
        stair += ' '
      }
    }
    console.log(stair)
  }
}
```

# Recursive Solution

Remember, we end a recursive function with some **base case**.

Recursion Tips:

1. figure out the base minimum pieces of information to represent your problem.
2. give reasonable defaults to the base minimum pieces of information.
3. check the base case. Is there any work left to do after? If not, return.
4. do some work. Call your function again, making sure the arguments have changed in some fashion.

---

Base case: if `(row === n)`, we have hit the end of our problem.

If the 'stair' string has a **length === n** then we are at the end of a row.

If the **length of the 'stair' string is less than or equal to the row number we are working on**, we add a `#`, otherwise we add a ` `.

```
|     | column |     |     |
| --- | ------ | --- | --- |
| row | #      | -   | -   |
|     | #      | #   | -   |
|     | #      | #   | #   |
```

```js
function steps(n, row = 0, stair = '') {
  if (n === row) {
    return
  }
  // at the end of a row
  if (n === stair.length) {
    console.log(stair)
    return steps(n, row + 1)
  }

  if (stair.length <= row) {
    stair += '#'
  } else {
    stair += ' '
  }
  steps(n, row, stair)
}
```
