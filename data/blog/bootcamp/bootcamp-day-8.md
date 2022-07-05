---
title: Intro to Async Control Flow
date: '2022-08-04'
tags: ['Async']
images: ['/static/images/postImages/nordwood-themes-kRNZiGKtz48-unsplash.jpg']
draft: true
summary: Introduction to how async programming works in Node.js
---

One of the easiest ways to learn about asycn programming is to look at `setTimeout()`.

## setTimeout

`setTimeout()` is a function that runs a function after a certain amount of time. We can specify how long it should wait before running the function by passing the duration in milliseconds as the second argument.

Can read more about setTimeout [here](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout).

Syntax:

```js
setTimeout(functionRef, delay)
```

Example:

```js
console.log('line one')

setTimeout(() => {
  console.log('timeout log')
}, 1000)

console.log('last line')
```

The code above will print out the following:

```
first line
last line
timeout line
```

> timeout line will appear after 1 second.

### Why do we use setTimeout?

- We want to run a function after a certain amount of time.
- A site may use setTimeout to run a function after a certain amount of time.
