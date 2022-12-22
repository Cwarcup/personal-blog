---
title: JavaScript is weird, but TypeScript can help
date: '2022-12-21'
tags: ['JavaScript', 'TypeScript']
draft: false
summary: "JavaScript is weird, but TypeScript can help you avoid some of its quirks. In this post, we'll take a look at some of the weird things that can happen in JavaScript, and how TypeScript can help you avoid them."
---

Hey everyone,

As you all know, JavaScript can be a weird language sometimes. It's not uncommon to come across oddities that can trip you up, especially when you're working with complex codebases or trying to do something outside the box.

## Dynamic typing

One example of this is the fact that JavaScript is dynamically typed. This means that variables don't have a fixed type, and you can reassign them to values of any type without throwing an error. While this can be convenient in some cases, it can also lead to bugs if you're not careful.

For example, let's say you have a function that adds two numbers together and returns the result. It might look something like this:

```js
function add(a, b) {
  return a + b
}

console.log(add(1, 2)) // 3
```

This works great when you pass in two numbers, but what if you pass in something else?

```js
console.log(add('1', '2')) // '12'
console.log(add(true, false)) // 1
console.log(add(null, undefined)) // 0
```

In the first example, JavaScript converts the strings `1` and `2` to numbers and adds them together. In the second example, it converts the `boolean` values `true` and `false` to `1` and `0`, respectively, and adds them together.

While this behavior might be expected in some cases, it can also be confusing and lead to unintended consequences. For example, what if you wanted to check if a variable was a number, but it could potentially be a string or boolean? You might try something like this:

```js
function isNumber(x) {
  return typeof x === 'number'
}

console.log(isNumber(1)) // true
console.log(isNumber('1')) // false
console.log(isNumber(true)) // false
```

But this wouldn't work as intended, because JavaScript converts the other types to numbers before the function is even called.

## Type checking

This is where TypeScript comes in. TypeScript is a superset of JavaScript that adds type checking to the language. This means that you can specify the types of variables, functions, and objects, and the TypeScript compiler will check that you're using them correctly.

For example, here's the same `add` function written in TypeScript:

```ts
function add(a: number, b: number): number {
  return a + b
}

console.log(add(1, 2)) // 3
```

Now, if we try to pass in something other than a number, the TypeScript compiler will throw an error.

```ts
console.log(add('1', '2')) // Error: Argument of type '"1"' is not assignable to parameter of type 'number'.
console.log(add(true, false)) // Error: Argument of type 'true' is not assignable to parameter of type 'number'.
```

This can save you a lot of headache when you're working on large codebases, because it helps catch errors before you even run the code. It can also make your code easier to understand, because it's clear what types of values are expected at each step.

TypeScript isn't a silver bullet, and it won't fix all of JavaScript's quirks. But it can definitely make your life as a developer a lot easier by giving you more control over your code and helping you catch errors before they become a problem.

## TypeScript to the rescue

Let's take a look at some more complex examples of how TypeScript can help you avoid weird situations in JavaScript.

One common issue that developers run into is working with arrays and objects. In JavaScript, you can access properties of an object using either dot notation (e.g. `obj.property`) or square bracket notation (e.g. `obj['property']`). This can be convenient, but it also means that you could potentially try to access a property that doesn't exist, which would result in an error.

Here's an example of how this can cause problems:

```js
const obj = {
  name: 'John',
  age: 30,
}

console.log(obj.name) // 'John'
console.log(obj.job) // undefined
```

The first console log works as expected, but the second one returns `undefined` because the `job` property doesn't exist on the `obj` object. This might not seem like a big deal, but it can become a problem if you're working with large objects and you're not sure what properties they might have.

One way to avoid this issue is to use TypeScript's type annotations to specify the properties that an object should have. Here's the same object written in TypeScript:

```ts
interface Person {
  name: string
  age: number
}

const obj: Person = {
  name: 'John',
  age: 30,
}

console.log(obj.name) // 'John'
console.log(obj.job) // Error: Property 'job' does not exist on type 'Person'.
```

Now, if we try to access a property that doesn't exist on the `Person` interface, the TypeScript compiler will throw an error. This can save you a lot of time and frustration when you're working with complex objects, because you can be sure that you're only accessing properties that are supposed to be there.

Another common issue that developers run into is working with arrays. In JavaScript, you can access elements of an array using square bracket notation (e.g. `arr[0]`). This can be convenient, but it also means that you could potentially try to access an element that doesn't exist, which would result in an error.

Here's an example of how this can cause problems:

```js
const arr = [1, 2, 3]

console.log(arr[0]) // 1
console.log(arr[3]) // undefined
```

The first console log works as expected, but the second one returns `undefined` because the element at index `3` doesn't exist in the `arr` array. This might not seem like a big deal, but it can become a problem if you're working with large arrays and you're not sure what elements they might have.

One way to avoid this issue is to use TypeScript's type annotations to specify the elements that an array should have. Here's the same array written in TypeScript:

```ts
const arr: number[] = [1, 2, 3]

console.log(arr[0]) // 1
console.log(arr[3]) // Error: Index signature in type 'number[]' only permits reading.
```

Now, if we try to access an element that doesn't exist on the `number[]` array, the TypeScript compiler will throw an error. This can save you a lot of time and frustration when you're working with complex arrays, because you can be sure that you're only accessing elements that are supposed to be there.

## Conclusion

TypeScript is a superset of JavaScript that adds type checking to the language. This means that you can specify the types of variables, functions, and objects, and the TypeScript compiler will check that you're using them correctly.

TypeScript isn't a silver bullet, and it won't fix all of JavaScript's quirks. But it can definitely make your life as a developer a lot easier by giving you more control over your code and helping you catch errors before they become a problem.

## Resources

- [TypeScript](https://www.typescriptlang.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/basic-types.html)
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [TypeScript vs. JavaScript](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
