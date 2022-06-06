---
title: Hoisting in JavaScript
date: '2022-06-06'
tags: ['javascript', 'hoisting']
draft: false
summary: Hoisting is a JavaScript feature that allows you to declare variables before you use them. This is useful for when you want to declare a variable before you use it. This article covers hoisting behavior in JavaScript.
---

Variables are **hoisted** to the top of their scope.

```js
console.log('1-----')

console.log(teddy) // undefined
console.log(sing()) // will run the function!

var teddy = 'bear'

function sing() {
  console.log('lalalala') // lalalala
}
```

The function will run, but the variable will be undefined because of **hoisting**.

During the creation phase, the JavaScript engine will look for the variable and create it if it doesn't exist. If the variable exists, the engine will assign some memory space to it. This occurs to the variable and function.

When we call `teddy` in the console, it will be undefined because the engine has allocated memory for it, but it has not been assigned a value.

Variables are **partially hoisted.** This means that the variable will be created, but it will not be assigned a value.

Functions are **fully hoisted.** This means that the function will be created, but it will not be assigned a value. During the creating phase, the engine will look for the function and create it if it doesn't exist.

Let's test this out some more. What if you put the function within brackets?

```js
console.log('1-----')

console.log(teddy)
console.log(sing())
var teddy = 'bear'

;(function sing() {
  // like so
  console.log('lalalala')
})
```

We will not get an error because the function is created, but it will not be assigned a value.

What if you changed `var` to `let` or `const`?

```js
console.log('1-----')

console.log(teddy) // Cannot access 'teddy' before initialization
console.log(sing())
let teddy = 'bear'

;(function sing() {
  console.log('lalalala')
})
```

Get a error because the function is not created. However, instead of getting 'undefined', we get a reference error with more information about the error.

These differences are very important because we can declare functions as function expressions or function declarations.

```js
var sing2 = function () {
  // function expression
  console.log('oh oh oh oh')
}

function sing3() {
  // function declaration
  console.log('lalalala')
}
```

Function **expressions** will be assigned `undefined`. If you call this before it is created, you will get an error.

But this is not the case for function **declarations**. If you call this before it is created, you will get `undefined`.

What do you think will happen here?

```js
a()

function a() {
  console.log('a')
}

function a() {
  console.log('b')
}
```

> Function returns `b` because it is the last function that was created.

The function `a` is hoisted and assigned in memory. but when the second function is created, it overwrites the first function.

What about this one?

```js
var favoriteFood = 'pizza'

const foodThoughts = function () {
  console.log(`I love ${favoriteFood}`)
  var favoriteFood = 'sushi'
  console.log(`New fav food I love ${favoriteFood}`)
}

foodThoughts()
```

```
I love undefined
New fav food I love sushi
```

Why did we get undefined? Because hoisting happens on every execution context. The first line gets hoisted and `favoriteFood` is assigned `undefined`. The function is created, but it is not assigned a value, getting assigned `undefined`. This is the **creation phase**.

Next, the execution phase occurs. Imagine all the `vars` are gone. When we reach the function, a **NEW** execution context is created. It has no `favoriteFood` variable. So it gets assigned `undefined`. It then sees that `favoriteFood` is assigned `undefined` and it assigns it to `sushi`.

Hoisting can make it difficult to understand what is happening. I suggest actually avoiding hoisting if possible.

This can be done by using `let` or `const` instead of `var`.
