---
title: Air Quality Checker
date: '2022-05-22'
tags: ['Kata']
draft: true
summary: Implement a function which will check a collection of air samples. The first argument is an array of strings, where each string represents a small air sample that is either clean or dirty. The second argument is a number representing the highest acceptable amount of dirty samples.
---

For this challenge we will implement a function called `checkAir()`, which will check a collection of air samples.

The function will take in two arguments.

- The first argument is an array of strings, where each string represents a small air sample that is either `clean` or `dirty`.
- The second argument is a number representing the **highest acceptable amount of dirty samples**. For example, a threshold of 0.4 means that there must be less than 40% of total samples classified as dirty for our air to be considered clean.

Our function must return `Polluted` if there are **too many dirty air samples**, or `Clean` if the proportion of dirty samples is **below the threshold**.

```js
const checkAir = function (samples, threshold) {
  const numOfSamples = samples.length
  const dirtySamples = counter(samples, 'dirty')

  return dirtySamples / numOfSamples > threshold ? 'Polluted' : 'Clean'
}

function counter(samples, result) {
  let count = 0
  for (let char of samples) {
    if (char === result) {
      count++
    }
  }
  return count
}

console.log(
  checkAir(
    // should return 'Polluted'
    ['clean', 'clean', 'dirty', 'clean', 'dirty', 'clean', 'clean', 'dirty', 'clean', 'dirty'],
    0.3
  )
)

console.log(
  checkAir(
    // should return 'Polluted'
    ['dirty', 'dirty', 'dirty', 'dirty', 'clean'],
    0.25
  )
)

console.log(
  checkAir(
    // should return 'Clean'
    ['clean', 'dirty', 'clean', 'dirty', 'clean', 'dirty', 'clean'],
    0.9
  )
)
```
