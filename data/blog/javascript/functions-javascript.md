---
title: Functions in JavaScript
date: '2022-06-06'
images: ['/static/images/postImages/functionsInJs.jpeg']
tags: ['javascript', 'hoisting']
draft: false
summary: Covers topics like hoisting, functions, and scope.
---

# Hoisting

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

# Characteristics of Functions in JavaScript

Programs are simply assigning memory, and functions will do something with those variables. Without functions, are programs will not do anything.

# Different ways to invoke a function

As soon as we invoke a function, we create a new execution context.

We get...

- `this` keyword.
- **arguments** in the function.

## Function Declaration

- Uses the `function` keyword.
- Get **hoisted**.
- Gets defined at parse time (when compiler initially looks at the code.)

```js
function canada() {
  console.log('cold')
}
```

## Function Expression

- Do not use the `function` keyword.
- Do **NOT** get **hoisted**
- Can also be written as an arrow function.
- Gets defined at **runtime** (when we call/invoke the function).

```js
const mexico = function () {
  console.log('hot')
}
```

## Arguments

```js
function marry(person1, person2) {
  console.log('args', arguments)
  return `${person1} is now married to ${person2}`
}

marry('Tim', 'Sue') //args [Arguments] { '0': 'Tim', '1': 'Sue' }

arguments // referenceError: arguments is not defined
```

> The arguments object is a special object available within function scope. It contains an array of all arguments passed to a function.

### Argument Keyword

It looks like an array, but it isn't an array. you can not use array methods on it.

How would you interact with the arguments object? You can use the new `Array.from` method to convert it to an array.

```js
function marry(person1, person2) {
  console.log('args', arguments) // arguments is not an array
  console.log(Array.from(arguments)) // [ 'Tim', 'Sue' ] is an array
  return `${person1} is now married to ${person2}`
}

marry('Tim', 'Sue')
```

## Rest Parameters

instead of using the `arguments` object, you can use the `...` spread operator to convert the arguments object to an array. These are called **rest arguments**.

```js
function marry2(...args) {
  console.log('args', args) // [ 'Curtis', 'Hana']
  console.log(Array.from(arguments))

  return `${args[0]} is now married to ${args[1]}`
}

marry2('Curtis', 'Hana') //args [ 'Curtis', 'Hana' ]
```

> We typically want to use the `...` spread operator to convert the arguments object to an array. It's not best practice to use the `arguments` object.

# Variable Environment

Within the execution context, we also get a **variable environment**.

Each function carriers its own variable environment. For example:

```js
function two() {
  var isValid
}

function one() {
  var isValid = true
  two()
}
var isValid = false

one()

// two() -- undefined
// one() -- true
// global -- false
```

# Scope Chain

Consider the following code:

```js
const x = 'x'

function findName() {
  const b = 'b'
  return printName()
}

function printName() {
  const c = 'c'
  return 'Curtis W'
}

function sayMyName() {
  const a = 'a'
  console.log(x)
  return findName()
}

console.log(sayMyName()) // Curtis W
```

> All of our functions have access to the variables in the global scope. In this case, `x` is `'x'`.

Each function have their own variable environment (b, c, a), but they also have a link to the global scope. This is known as the **scope chain**. This gives us access to the variables in the **global scope**.

When you a call a function, it will first look in the **variable environment** of the function. If it can't find it, it will look in the **scope chain**.

```js
function sayMyName() {
  const a = 'a'
  return function findName() {
    const b = 'b'
    return function printName() {
      const c = 'c'
      return 'Curtis W'
    }
  }
}

console.log(sayMyName()) // findName()
```

We can go down the scope chain to find the variable:

```js
function sayMyName() {
  const a = 'a'
  return function findName() {
    const b = 'b'
    return function printName() {
      const c = 'c'
      return 'Curtis W'
    }
  }
}

console.log(sayMyName()()) // printName()
console.log(sayMyName()()()) // Curtis W
```

These functions previously had global scope. However, now they have local scope. This is because we are creating a new execution context.

The global scope is the **root** execution context. Variables defined here can be accessed by all functions.

Variables declared within the function are **local** to the function.

Scope defined what variables can be accessed.

# Function Scope vs Block Scope

JavaScript has **function** scope. This means that variables defined within a function are accessible to all functions within the same scope. We only create a new scope when we create a new execution context (new function).

```js
if (5 > 4) {
  var secret = '123'
}
console.log(secret) // 123
```

However, most other languages have **block** scope. This means that variables defined within a block are accessible to all functions within the same block.

JavaScript wanted to create blocked scope. Therefore, we can use the `let` keyword to create blocked scope.

```js
if (5 > 4) {
  let secret = '123'
}
console.log(secret) // secret is not defined
```

This can be useful for variables that are only accessible within a certain block.
