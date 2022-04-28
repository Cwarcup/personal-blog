---
title: Generators
date: '2022-04-28'
tags: ['Generators', 'JavaScript']
draft: false
summary: Intro to JavaScript generators
---

Generators are functions that you can use for controlling the iterator. In comparison with regular functions that return a single value or nothing, generators return multiple values in a sequence, one after another. They operate great with iterables and allow creating data streams with ease.

Good resource is at Babel:[here](https://babeljs.io/docs/en/learn#generators)

# Defining a Generator

For creating a generator, it is necessary to use a particular syntax construct. Generators have a `*` to the **left** of the function name `function *numbers()` **OR** **right** of the function keyword `function*`.

Generator functions are different from your typical function. Every time a generator is called, it doesn’t run its code. Alternatively, it returns a particular object, called “generator object” for managing the execution.

For example:

```js
function* generate() {
  yield 1
  yield 2
  return 3
}
// "generator function" creates "generator object"
let generator = generate()
console.log(generator) // [object Generator]
```

When we define a generator, we call `.next()` on it which runs the code inside the function until it hits a `yield` statement. Afterward, the function execution suspends, and the yielded value on its turn is returned to the outer code.

The result of `next()` is always an **object** with the following two properties:

- the value: that is the **yielded value**;
- done: true in case the function code has finished; otherwise, it’s false.

```js
function* numbers() {
  const result = 1 + 1
  return 20 + (yield result)
}
const generator = numbers()
console.log(generator.next()) // { value: 2, done: false }
```

When a `yield` statement is found, the generator is paused and the value of the `yield` is returned.

You can call `.next()` multiple times:

```js
function* numbers() {
  const result = 1 + 1
  return 20 + (yield result)
}
const generator = numbers()
console.log(generator.next()) // { value: 2, done: false }
console.log(generator.next()) // { value: NaN, done: true }

// easier case
function* generate() {
  yield 1
  yield 2
  return 3
}
let generator = generate()
let oneValue = generator.next()
console.log(JSON.stringify(oneValue)) // {value: 1, done: false}
let twoValue = generator.next()
console.log(JSON.stringify(twoValue)) // {value: 2, done: false}
let threeValue = generator.next()
console.log(JSON.stringify(threeValue)) // {value: 3, done: true}
```

> But if you call `.next()` with a value this time, you can think of the value replacing the entire `yield` statement.

```js
function* numbers() {
  const result = 1 + 1
  return 20 + (yield result)
}
const generator = numbers()
console.log(generator.next()) // { value: 2, done: false }
console.log(generator.next(10)) // { value: 30, done: true }
```

This can be useful if you implement multiple `yield` statements in a function.

```js
function* list() {
  yield 1
  yield 2
  yield 3
  yield 4
  yield 5
}

const generator = list()

console.log(generator.next()) // { value: 1, done: false }
console.log(generator.next()) // { value: 2, done: false }
console.log(generator.next()) // { value: 3, done: false }
console.log(generator.next()) // { value: 4, done: false }
console.log(generator.next()) // { value: 5, done: false }
console.log(generator.next()) // { value: undefined, done: true }
```

## Why are they useful?

Can be used like so to **iterate over a list**:

```js
function* list() {
  yield 1
  yield 2
  yield 3
  yield 4
  yield 5
}

const generator = list()

const numbers = []
for (let value of generator) {
  numbers.push(value)
}
numbers // [1, 2, 3, 4, 5]
```

### Nested Generators

```js
function* numbers() {
  yield 1
  yield 2
  yield* moreNumbers()
  yield 6
  yield 7
}

function* moreNumbers() {
  yield 3
  yield 4
  yield 5
}

const generator = numbers()

const values = []

for (let value of generator) {
  values.push(value)
}

values // [1, 2, 3, 4, 5, 6, 7]
```

> `yield*` is a special syntax that allows you to call another generator function.

Real example - walking through a tree:

```js
class Tree {
  constructor(value = null, children = []) {
    this.value = value
    this.children = children
  }

  *printValues() {
    yield this.value
    for (let child of this.children) {
      yield* child.printValues()
    }
  }
}

const tree = new Tree(1, [new Tree(2, [new Tree(4)]), new Tree(3)])

// I want to iterate over the tree and print the values.
// expect to see 1, 2, 4, 3

const values = []
for (let value of tree.printValues()) {
  values.push(value)
}

values // [1, 2, 4, 3]
```
