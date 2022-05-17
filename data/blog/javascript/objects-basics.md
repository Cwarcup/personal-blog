---
title: Objects - Basics of JavaScript
date: '2022-05-18'
tags: ['Objects', 'JavaScript']
draft: false
summary: Intro to JavaScript objects
---

Sometimes we do not want to use an array, but rather a collection of values or properties. It doesn't make sense to organize data in an array if we do not care about the order of the values.

```js
const cup = ['white', '12oz', 'ceramic']
const mug = ['black', '12oz', 'ceramic']
```

Instead, we can use an object. Here, order of the values is not important.

```js
const cup = {
  colour: 'white',
  size: '12oz',
  material: 'ceramic',
}
```

# Object Literal Notation

```js
const cup = {
  colour: 'white',
  size: '12oz',
  material: 'ceramic',
}
```

- The "key" (representing a **property** or **method** name) and its "value" are separated from each other by a colon
- The `key: value` pairs are separated from each other by **commas**
- The entire object is wrapped inside curly braces `{ }`.

You can loop up a property's value by using **dot notation**:

```js
cup.colour // white
```

Or you can use **bracket notation**:

```js
cup['colour'] // white
```

# Object Methods

The `value` in the `key:value` pair will be a function.

```js
const cup = {
  colour: 'white',
  size: '12oz',
  material: 'ceramic',
  fill: function () {
    console.log('Filling cup...')
  },
}

cup.fill() // Filling cup...
```
