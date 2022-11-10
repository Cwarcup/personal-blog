---
title: Intro to TypeScript
date: '2022-08-31'
images: 'https://i0.wp.com/css-tricks.com/wp-content/uploads/2022/01/typescript-logo.png?fit=1200%2C600&ssl=1'
tags: ['Typescript']
draft: false
summary: A quick introduction to TypeScript.
---

## What is TypeScript?

- superset of JavaScript
- adds _static types_ to JavaScript
- is _compiled_ to JavaScript during the build process
  - TS => typescript compiler => JS
- **all** JavaScript is valid TypeScript

Is very useful since it catches many **errors** before they are discovered at runtime.

- recall all the edge cases we had to test out in our previous projects.

## TypeScript CLI

Install globally:

```bash
npm install -g typescript
```

`tsc` [CLI options](https://www.typescriptlang.org/docs/handbook/compiler-options.html)

We can say...

```bash
tsc myFile.ts
```

And it will compile the file to JavaScript.

Now have access to `tsc` command. (TypeScript Compiler)

```bash
# uses default settings; .js file will have the same name as .ts file
tsc index.ts # produces index.js file

# compile to named destination file
tsc index.ts --outFile my-index.js # produces my-index.js

# add the watch flag to avoid having to manually trigger the compiler
tsc index.ts --watch # watches for changes to index.ts

# the target flag allows us to specify the version of JS we are compiling to
tsc index.ts --target es6 # compiles to es6 syntax JS

tsc --init # will create a tsconfig.json file in the current directory
# after initializing, running `tsc` will use the configuration specified in the file
tsc
```

## Primitive Types

How do we add types to something?

- use the colon `:` after a variable name to specify its type

```typescript
const str: string = 'hello world'
const isLoggedIn: boolean = false
const num: number = 3.14
```

If we try to assign a value of the wrong type to a variable, TypeScript will throw an error.

```typescript
let numTwo: number = 2
numTwo = 'hello' // error

// error TS2322: Type '"hello"' is not assignable to type 'number'.
```

- Assign multiple types to a variable using the `|` operator

```typescript
let numThree: number | string = 3
numThree = 'hello' // valid
numThree = true // error
// error TS2322: Type 'false' is not assignable to type 'string | number'.
```

## Arrays

- use the `[]` syntax to specify an array of a certain type
- arrays are just collections of a type
- use the `Array<type>` syntax to specify an array of a certain type

```typescript
const arr: number[] = [1, 2, 3]
const arrTwo: Array<number> = [1, 2, 3]

arr.push(4) // valid
arr.push('hello') // error
```

## Objects and Interfaces

- are a bit more complex than arrays
- need to create an `interface` to specify the shape of the object

An `interface` specifies the **keys** an object will have, and the **type** of the value associated with each key.

- we can put interfaces in a separate file and import them into other files

```typescript
interface User {
  name: string
  age: number
  isLoggedIn: boolean
}

const user: User = {
  name: 'John',
  age: 30,
  isLoggedIn: true,
}
```

- this is like adding your own type definitions (this is known as a interface)

Another example:

```typescript
interface Author {
  name: string
  penName: string
  isActive?: boolean // optional params are marked with a question mark (?)
  writeBook: (title: string) => boolean // function types need the type of the arguments and the return type
}

const curtis: Author = {} // error!
// error TS2741: Property 'name' is missing in type '{}' but required in type 'Author'.

const person: Author = {
  name: 'Curtis',
  penName: 'Curtis',
  writeBook: (title: string) => true,
}
```

- the `?` after `isActive` indicates that the property is optional
- when using an interface to define a **function**, the function type needs to be specified
  - need to specify the **type of the arguments** and the **return type**

```typescript
const agatha: Author = {} // error!
const stephen: Author = {} as Author // no error
```

    > **Hack**: To force TypeScript to accept a type, use the `as` keyword

Can create the interface a different way:

```typescript
const user: { name: string; age: number } = {
  name: 'Curtis',
  age: 30,
}
```

Array of objects:

```typescript
const users: User[] = []

users.push(user)
```

- it is common to place a `i` in front of the interface name

## Functions

- specify the type of the `arguments` **and** the `return` type of a function

```typescript
const sayHello = (name: string): string => {
  return `Hello ${name}`
}
```

> `sayHello` accepts a `string` as an argument and returns a `string`

### Void

- if a function does **not** return anything, we must use the `void` type

```typescript
const noReturn = function (name: string): void {
  console.log(name)
}
```

### Promises

- a function that returns a `Promise` (or `async`) must wrap the return value in the `Promise` type

```typescript
const returnsPromise = (name: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(name), 1000)
  })
}

const returningPromise2 = (num: number): Promise<number> => {
  return new Promise((res) => {
    res(num * 2)
  })
}
```

If you passed no arguments into the function, it would be an error.

```typescript
returnsPromise() // error
```

## Type Inference

- TypeScript can infer the type for us, then we don't need to specify it
- docs: [Type Inference](https://www.typescriptlang.org/docs/handbook/type-inference.html)

No need to specify `string` type:

```typescript
const name = 'John'
```

Works with interfaces too:

```typescript
interface User {
  username: string
  password: string
}

// logInUser accepts a User type
const logInUser = (user: User): boolean => {
  return user.username === 'johnstamos'
}

// no type specified for potentialUser
const potentialUser = {
  username: 'johnstamos',
  password: 'pass123',
}

// no problem passing potentialUser to logInUser
const loggedIn = logInUser(potentialUser)
```

If we try to pass a user that doesn't have the correct properties, TypeScript will throw an error:

```typescript
const potentialUser = {
  username: 'johnstamos',
  password: 'pass123',
  age: 30, // error!
}

const isLoggedIn = logInUser(potentialUser)
// error!
// error TS2345: Argument of type '{ username: string; }' is not assignable to parameter of type 'User'.
// Property 'password' is missing in type '{ username: string; }' but required in type 'User'.
```

## Methods

- same syntax as functions

```typescript
interface IUser {
  username: string
  password: string
  drinkLiquid: (fluid: string) => boolean
}

const curtis: IUser = {
  username: 'curtis',
  password: 'pass123',
  drinkLiquid: (fluid: string) => {
    return true // needs to return a boolean because of the return type in the interface
  },
}
```

## Callbacks

```typescript
const higherOrderFunction = (callback: (num: number) => number): number => {
  return callback(2)
}
```

## Generics

- are interfaces when some or all types are not known at the time of definition time
  - instead, they are passed in as arguments when the interface is used
- allow us to pass a variable to a type
- we specify the variable using `<` and `>`

```typescript
interface Container<Type> {
  title: string
  contents: Type
}

const numContainer: Container<number> = {
  title: 'number container',
  contents: 7,
}

const stringContainer: Container<string> = {
  title: 'string container',
  contents: 'hello',
}
```

- It is common to shorten `Type` to simply `T`

```typescript
interface Container<T> {
  contents: T
}
```

## Compiling TypeScript tsconfig.json

- we have seen we can call `tsc` to compile our TypeScript files

- create the `tsconfig.json` file

```bash
tsc --init
```

> creates a `tsconfig.json` file in the current directory. You should do this in the root file.

- modules
  - want to preserve import/export syntax use `es6`
- root directory
  - may make it the "./src" directory
- output directory
  - may make it the "dist" directory
- allow JS files
  - set to `true`
  - need to turn this on to allow JS files to be compiled
- emit
  - where does it go to?
  - IMPORTANT `outFile` is where the compiled JS file will go.
    - will create ONE file
  - more common `outDir` is where the compiled JS file will go.
    - will create a directory with the compiled JS file

### TSC --watch

watch for changes in the file and recompile

```bash
tsc --watch
```

Will go on in the background. Even in react, you can use this to compile your TS files.

## Useful Resources

- [TS site](https://www.typescriptlang.org/)
- [TS Compiler Options](https://www.typescriptlang.org/docs/handbook/compiler-options.html)
- [TS in 5 minutes](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
- TS Playground: [TS Playground](https://www.typescriptlang.org/play/index.html)
