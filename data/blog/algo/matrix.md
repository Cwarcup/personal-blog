---
title: Matrix Spiral Algorithm - JavaScript Algorithms
date: '2022-04-25'
tags: ['Matrix', 'JavaScript', 'algorithms']
draft: false
summary: Generating NxN spirals of arrays.
---

Directions: Write a function that accepts an integer N
and returns a NxN spiral matrix.

Examples

```js
matrix(2)[([1, 2], [4, 3])]
matrix(3)[([1, 2, 3], [8, 9, 4], [7, 6, 5])]
matrix(4)[([1, 2, 3, 4], [12, 13, 14, 5], [11, 16, 15, 6], [10, 9, 8, 7])]
```

Pseudocode:

- Create empty array called `results`.
- Create a counter variable called `count` and set it to 1.
- As long as `(start column <= end column)` **AND** `(start row <= end row)`
  - **loop** from start column to end column.
    - at `results[start row][i]` assign `count`variable.
    - increment `count` by 1.
  - increment `start row` by 1.
  - **loop** from start row to end row.
    - at `results[i][end column]` assign `count`variable.
    - increment `count` by 1.
  - decrement `end column` by 1.
  - ...repeat for other two sides.

This solution relies on variables `start column`, `end column`, `start row`, and `end row`. We keep track of these variables to know when to stop the loops.

We keep track of the **index** of character in a row or column.

We use a series of for loops to iterate through some `start column` and `end column`. You then insert some value into the row. When you reach the end of the row, you increment the row value.

First 'for loop' determines the top row.

The next 'for loop' determines the right column.

```js
function matrix(n) {
  // create empty array
  const results = []
  // push the number of sub-arrays into results
  for (let i = 0; i < n; i++) {
    results.push([])
  }
  console.log(results)

  // keep track of the number we are pushing into results
  let counter = 1
  // index of the columns
  let startColumn = 0
  let endColumn = n - 1
  //index of rows
  let startRow = 0
  let endRow = n - 1

  while (startColumn <= endColumn && startRow <= endRow) {
    //Top row
    for (let i = startColumn; i <= endColumn; i++) {
      results[startRow][i] = counter
      counter++
    }
    startRow++
    // we are now done row 1

    // right column
    for (let i = startRow; i <= endRow; i++) {
      results[i][endColumn] = counter
      counter++
    }
    endColumn--

    // bottom row
    for (let i = endColumn; i >= startColumn; i--) {
      results[endRow][i] = counter
      counter++
    }
    endRow--

    // start column
    for (let i = endRow; i >= startRow; i--) {
      results[i][startColumn] = counter
      counter++
    }
    startColumn++
  }
  return results
}

console.log(matrix(3))
```
