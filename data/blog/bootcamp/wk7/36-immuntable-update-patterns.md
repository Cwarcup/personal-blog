---
title: Immutable Update Patterns
date: '2022-08-15'
tags: ['update patterns', 'React']
images: 'https://images.unsplash.com/photo-1639322537138-5e513100b36e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80'
draft: false
summary: Learn to copy an object without altering the original object, as well as updating keys and data inside of an object.
---

It's important to consider the difference between mutating and copying an object, especially when it comes to managing state in React.

## Copying an Object

- Goal is create a clone of an object (not a reference to the original object)

```js
const original = { one: 1 }
const bad = original // bad - mutates original object
const good = { ...original } // spread operator

console.log(original === original) // true
console.log(original === bad) // true
console.log(original === good) // false - different spaces in memory!
```

- Using the **spread operator**, we take the **first level** of keys and copy them into the object.

> IMPORTANT: Spread operator only copies the first level of keys.

```js
const original = {
  one: 1,
  sub: { two: 2 },
}

const copy = { ...original, sub: { ...original.sub } }

console.log(original === copy) // false
console.log(original.sub === copy.sub) // false
```

- Best way to avoid complexity is to **keep nested state to a minimum**.

## Add to an Object

- can also use the **spread operator** to add to an object
- order the keys are added matters!
- all original keys will be added to the new object

```js
const original = { one: 1 };
const copy = { ...original, two: 2 };

console.log(original === copy); // false

/* original */
{
  one: 1
}

/* copy */
{
  one: 1,
  two: 2
}
```

## Updating an Object

- keys declared later will override keys declared earlier

```js
const original = { one: 1, two: 3 };
const copy = { ...original, two: 2 }; // two will be updated to 2

console.log(original === copy); // false

/* original */
{
  one: 1,
  two: 3
}

/* copy */
{
  one: 1,
  two: 2
}
```

## Merging Multiple Objects

- **spreading** two or more objects into a new object

```js
const first = { one: 1 };
const second = { two: 2 };
const copy = { ...first, ...second }; // merger with spread operator

console.log(copy === copy); // true
console.log(first === copy); // false
console.log(second === copy); // false

/* first */
{
  one: 1
}

/* second */
{
  two: 2
}

/* copy */
{
  one: 1,
  two: 2
}
```
