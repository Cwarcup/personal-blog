---
title: Conditional Sums
date: '2022-05-19'
tags: ['Kata']
draft: true
summary: Adding only the numbers in the array which match the given condition
---

```js
const conditionalSum = function (values, condition) {
  let result = []
  values.map((item) => {
    if (condition === 'even') {
      if (item % 2 === 0) {
        result.push(item)
      }
    } else if (condition === 'odd') {
      if (item % 2 !== 0) {
        result.push(item)
      }
    }
  })
  return result.reduce((partialSum, item) => partialSum + item, 0)
}

// or

const conditionalSum = function (values, condition) {
  let sum = 0
  for (let i = 0; i < values.length; i++) {
    if (condition === 'even' && values[i] % 2 === 0) {
      sum += values[i]
    } else if (condition === 'odd' && values[i] % 2 !== 0) {
      sum += values[i]
    }
  }
  return sum
}

console.log(conditionalSum([1, 2, 3, 4, 5], 'even')) // 6
console.log(conditionalSum([1, 2, 3, 4, 5], 'odd')) // 9
console.log(conditionalSum([13, 88, 12, 44, 99], 'even')) // 144
console.log(conditionalSum([], 'odd')) // 0
```
