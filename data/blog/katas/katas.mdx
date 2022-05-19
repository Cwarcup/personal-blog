---
title: Kata - Practice Problems
date: '2022-05-22'
tags: ['Kata']
draft: false
summary: Large list of popular Katas to practice different programming patterns.
---

<TOCInline toc={props.toc} asDisclosure />

# What is a Kata?

According to [Wikipedia](https://en.wikipedia.org/wiki/Kata), "Kata (型 or 形 literally: "form"), a Japanese word, are detailed choreographed patterns of movements practiced either solo or in pairs."

![Kata](https://media.giphy.com/media/J2xkAW1E8kvyE/giphy.gif)

We will be using Katas to practice different programming patterns.

# Check Air Quality

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

# Conditional Sums

Adding only the numbers in the array which match the given condition.

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

# Longest Name

Given a list of names, return which instructor has the longest name.

```js
const instructorWithLongestName = function (instructors) {
  let maxIndex = 0

  for (let i = 0; i < instructors.length; i++) {
    if (instructors[i].name.length > instructors[maxIndex].name.length) {
      maxIndex = i
    }
  }
  return instructors[maxIndex]
}

console.log(
  instructorWithLongestName([
    // {name: "Jeremiah", course: "Web"}
    { name: 'Samuel', course: 'iOS' },
    { name: 'Jeremiah', course: 'Web' },
    { name: 'Ophilia', course: 'Web' },
    { name: 'Donald', course: 'Web' },
  ])
)
console.log(
  instructorWithLongestName([
    // {name: "Domascus", course: "Web"}
    { name: 'Matthew', course: 'Web' },
    { name: 'David', course: 'iOS' },
    { name: 'Domascus', course: 'Web' },
  ])
)
```

# Percent Encoded String

Given a normal string of words, turn it into a percent-encoded string by replacing all whitespace with %20.
Take a look at the following URL, specifically the last part:

```
https://www.google.com/search?q=javascript+string+replace+whitespace
```

This URL will perform a google search for the term "javascript string replace whitespace". Notice that when the string "javascript string replace whitespace" is part of a URL, the space is replaced with `%20`

For this exercise, focusing on replacing the spaces with `%20`.

```js
const urlEncode = function (text) {
  return text.replace(/[\s]/g, '%20')
}

// without replace

const urlEncode = function (text) {
  let result = ''

  for (let char of text.trim().split('')) {
    if (char === ' ') {
      char = '%20'
      result = result + char
    } else {
      result = result + char
    }
  }
  return result
}

console.log(urlEncode('Curtis Warcup')) // "Curtis%20Warcup"
console.log(urlEncode(' Curtis Warcup ')) // "%20Curtis%20Warcup%20"
console.log(urlEncode('dogs are super cool')) // "dogs%20are%20super%20cool"
```

# Sum of Largest Numbers

Given an array of 2 or more numbers. Find the two largest numbers in that array, and sum them together.

```js
const sumLargestNumbers = function (data) {
  let num1 = data
    .sort((a, b) => {
      return a - b
    })
    .pop()

  let num2 = data
    .sort((a, b) => {
      return a - b
    })
    .pop()

  return num1 + num2
}

console.log(sumLargestNumbers([1, 10])) // 11
console.log(sumLargestNumbers([1, 2, 3])) // 5
console.log(sumLargestNumbers([10, 4, 34, 6, 92, 2])) // 126
```

# Count Number of Vowels

Counting the number of vowels that appear in a given string.

```js
const numberOfVowels = function (data) {
  let result = data.match(/[aeiou]/gi)
  return (result = result ? result.length : 0)
}

console.log(numberOfVowels('orange')) // 2
console.log(numberOfVowels('Curtis Warcup')) // 4
console.log(numberOfVowels('aeiou')) // 5
console.log(numberOfVowels('')) // 0
```

# Where can I park?

We need to write a function called `whereCanIPark()` that returns the coordinates of an available parking spot for the vehicle, or returns false if there is no available spot. Our function receives an array of arrays representing parking spots, and a string with type of the vehicle that is looking for a parking spot.

There are three kinds of possible vehicles: **regular** cars, **small** cars, and **motorcycles**.

- Regular cars can only park in **R** spots.
- Small cars can park in **R** or **S** spots.
- Motorcycles can park in **R**, **S**, or **M** spots.

In the array of parking spots, spots are written in both lower-case and upper-case. An upper-case letter means that the particular spot is **AVAILABLE**, while lower-case letters mean that the spot is **UNAVAILABLE**.

Our function must return an array with the coordinates of the spot as an `[X, Y]` pair. See the example input and output below for an illustration.

```js
console.log(
  whereCanIPark(
    // [4, 0]
    [
      // COLUMNS ARE X
      // 0    1    2    3    4    5
      ['s', 's', 's', 'S', 'R', 'M'], // 0 ROWS ARE Y
      ['s', 'M', 's', 'S', 'r', 'M'], // 1
      ['s', 'M', 's', 'S', 'r', 'm'], // 2
      ['S', 'r', 's', 'm', 'r', 'M'], // 3
      ['S', 'r', 's', 'm', 'r', 'M'], // 4
      ['S', 'r', 'S', 'M', 'M', 'S'], // 5
    ],
    'regular'
  )
)
```

Possible solution:

```js
const whereCanIPark = function (spots, vehicle) {
  const avail = vehicleSpots(vehicle)

  for (let row = 0; row < spots.length; row++) {
    for (let col = 0; col < spots.length; col++) {
      let char = spots[row][col]
      if (avail.indexOf(char) > -1) {
        return new Array(col, row)
      }
    }
  }
  return false
}

function vehicleSpots(vehicle) {
  let avail

  if (vehicle === 'regular') {
    return (avail = 'R')
  } else if (vehicle === 'small') {
    return (avail = 'RS')
  } else if (vehicle === 'motorcycle') {
    return (avail = 'RSM')
  } else {
    return 'Need to add type of vehicle'
  }
}

console.log(vehicleSpots('regular'))
console.log(vehicleSpots('small'))
console.log(vehicleSpots('motorcycle'))

console.log(
  whereCanIPark(
    // [3, 1]
    [
      ['s', 's', 's', 's', 's', 's'],
      ['s', 'm', 's', 'S', 'r', 's'],
      ['s', 'm', 's', 'S', 'r', 's'],
      ['S', 'r', 's', 'm', 'r', 's'],
      ['S', 'r', 's', 'm', 'R', 's'],
      ['S', 'r', 'S', 'M', 'm', 'S'],
    ],
    'motorcycle'
  )
)
console.log(
  whereCanIPark(
    // [4, 0]
    [
      // COLUMNS ARE X
      // 0    1    2    3    4    5
      ['s', 's', 's', 'S', 'R', 'M'], // 0 ROWS ARE Y
      ['s', 'M', 's', 'S', 'r', 'M'], // 1
      ['s', 'M', 's', 'S', 'r', 'm'], // 2
      ['S', 'r', 's', 'm', 'r', 'M'], // 3
      ['S', 'r', 's', 'm', 'r', 'M'], // 4
      ['S', 'r', 'S', 'M', 'M', 'S'], // 5
    ],
    'regular'
  )
)

console.log(
  whereCanIPark(
    // false
    [
      ['M', 'M', 'M', 'M'],
      ['M', 's', 'M', 'M'],
      ['M', 'M', 'M', 'M'],
      ['M', 'M', 'r', 'M'],
    ],
    'small'
  )
)
```
