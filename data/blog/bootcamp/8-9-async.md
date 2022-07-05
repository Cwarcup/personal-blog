---
title: Intro to Async Control Flow
date: '2022-08-04'
tags: ['Async']
images: ['/static/images/postImages/nordwood-themes-kRNZiGKtz48-unsplash.jpg']
draft: false
summary: Introduction to how async programming works in Node.js
---

Async programming is a new way to handle control flow in Node.js. It allows your code to start executing a potentially long-running task, while still allowing you to continue to do other things. Once the task is complete, your program can present the result. This is a powerful way to handle control flow in Node.js.

There are many functions enabled by browsers to handle asynchronous tasks. For example, the `fetch` function is used to make a request to a remote server. The `Promise` object is used to handle asynchronous tasks. One of the easiest ways to learn about asycn programming is to look at `setTimeout()`.

Why do we need to use async programming? Because Node.js is a single threaded language, and it is not possible to make requests to a remote server in the same thread as the code that is running.

The problem created with these long-running tasks is that the code that is running is not aware of when the task is complete. This means that the code that is running is not aware of the result of the task. Therefore, we need a way to:

- Start a long-running task
- Have a function start the operation and return something right away (allows the program to be responsive to the user)
- Tell us when the result of the task is available and is complete

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

## SetInterval

# Filesystem Functions and Async Programming

# Events and Event Handlers
