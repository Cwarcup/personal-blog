---
title: Arrays - Basics of JavaScript
date: '2022-05-17'
tags: ['Arrays', 'JavaScript']
draft: false
summary: Intro to JavaScript arrays
---

Here we have some related stored values, all declared with a separate variable.

```js
const director = 'Steven Spielberg'
const film1 = 'Jaws'
const film2 = 'Raiders of the Lost Ark'
const film3 = 'A.I.'
```

However, it this may not be the best way to represent the data. A better way may be to use an array.

```js
const director = 'Steven Spielberg'
const films = ['Jaws', 'Raiders of the Lost Ark', 'A.I.']
```

We have declared a variable named `director` and assigned it a string value. We have also declared a variable named `films` and assigned it an array.

Arrays are a special type of object. They are a collection of values and each value has an index.

```js
'My favorite ' + director + ' film is ' + films[1] // My favorite Steven Spielberg film is Raiders of the Lost Ark
```

# Array Operations

Set a new value at any array's index by using **variable delcaration notation**, like so:

```js
const director = 'Steven Spielberg'
const films = ['Jaws', 'Raiders of the Lost Ark', 'A.I.']

films[2] = 'Jurassic Park'
films // ["Jaws", "Raiders of the Lost Ark", "Jurassic Park"]
films.push('A.I.')
films // ["Jaws", "Raiders of the Lost Ark", "Jurassic Park", "A.I."]
```

# Array Properties

One very useful property of arrays is the length property.

```js
console.log(director + ' is the director of ' + films.length + ' films')
// Steven Spielberg is the director of 3 films

films.push('E.T.')
console.log(director + ' is the director of ' + films.length + ' films') // Steven Spielberg is the director of 4 films
```

# Iterating Over Arrays

Let's say we have a list of items to go packing.

```js
const packingList = ['tent', 'bug spray', 'sleeping bag']
```

How can we iterate over this list?

```js
console.log(packingList[0]) // tent
console.log(packingList[1]) // bug spray
console.log(packingList[2]) // sleeping bag
```

## Iterating with `For` Loops

```js
const packingList = [
  'bowls',
  'plates',
  'pots',
  'pans',
  'eating utensils',
  'glasses',
  'cups',
  'cooking utensils',
]

console.log('Kitchen stuff to pack:')
for (let i = 0; i < packingList.length; i++) {
  console.log(packingList[i])
}

// Kitchen stuff to pack:
// bowls
// plates
// pots
// pans
// eating utensils
// glasses
// cups
// cooking utensils
```

**`For` Loops Start From 0**. The reason we made the choice to start at 0, is because it's very common to use loops to work with the contents of an array, one at at time, and array indexing in JavaScript, and most languages, starts at 0.

## Iterating with `while` Loops

```js
const packingList = [
  'bowls',
  'plates',
  'pots',
  'pans',
  'eating utensils',
  'glasses',
  'cups',
  'cooking utensils',
]

console.log('Kitchen stuff to pack:')
let i = 0
while (i < packingList.length) {
  console.log(packingList[i])
  i++
}

// Kitchen stuff to pack:
// bowls
// plates
// pots
// pans
// eating utensils
// glasses
// cups
// cooking utensils
```
