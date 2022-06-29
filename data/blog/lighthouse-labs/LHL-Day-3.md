---
title: Lighthouse Labs - Day 3
date: '2022-07-29'
tags: ['objects', 'data types']
images: ['/static/images/postImages/michael-dziedzic-qDG7XKJLKbs-unsplash.jpg']
draft: true
summary: Different languages will implement objects in different ways, but they all have a data type to store key-value pairs. JavaScript takes things a step further, as virtually everything is derived from Object. Almost everything.
---

# Summary

Objects are a fundamental data type in JavaScript, as it is designed around objects. Almost everything in JavaScript is an object.

An object is a collection of key-value pairs, where the key is a string and the value is an object or primitive.

```js
const myObject = {
  key: 'value',
  anotherKey: 'another value',
}
```

> The above code is an **object literal**, which is a way to create an object.

## Primitive Data Types

| Data Type | Description                                |
| --------- | ------------------------------------------ |
| String    | A string of characters                     |
| Number    | A number, either integer or floating point |
| Boolean   | A true or false value                      |
| Null      | A value that is explicitly undefined       |
| Undefined | A value that is not explicitly defined     |
| Symbol    | A unique identifier for a value            |

**Objects** are a special type of data type, but they are **not** primitive data types.

JavaScript has some strange features, for example, **functions** are objects!

### Object Literals

Here is an example of an object literal:

```js
const myObject = {}
```

> this is an empty object.

You can have key-value pairs in an object literal, like this:

```js
const myObject = {
  key: 'value',
  anotherKey: 'another value',
}
```

### Object Values

Object values can be **any type**.

```js
const myObject = {
  key: 'value',
  anotherKey: 'another value',
  anotherKey2: true,
  anotherKey3: null,
  anotherKey4: undefined,
  anotherKey5: [1, 2, 3],
  anotherKey6: {
    key: 'value',
    anotherKey: 'another value',
  },
}
```

## Accessing Object Values

We have two ways to access object values: **dot** notation and **bracket** notation.

> **dot notation** is the preferred way to access object values.
> **bracket notation** is a way to access object values.

### Bracket Notation

```js
const person = { firstName: 'Khurram' }
const firstName = person['firstName'] // get the value associated with the key "firstName"
```

In order to access the values of an object using bracket notation, the key must be a **string**, surrounded by **quotes**.

That being said, if the variable name points to a string, you can do **not** need to surround it with quotes.

```js
const person = { firstName: 'Khurram' }
const propertyName = 'firstName'
const firstName = person[propertyName] // interpreted as person["firstName"], and therefore works fine :)
```

### Dot Notation

```js
const person = { firstName: 'Khurram' }
const firstName = person.firstName // get the value associated with the key "firstName"
```

### Accessing a Key that does not exist

Will return `undefined` if the key does not exist.

### Assigning a New Value to a Key

```js
const mary = { name: 'Mary Sue' }
mary['name'] = 'Mary Jane'
mary['age'] = 22

console.log(mary) // { name: "Mary Jane", age: 22 }
```

### Objects as Values

An object can be assigned as a value to another object.

```js
const person = {
  name: 'Paul',
  address: {
    street: '310 W 95th',
    city: 'New York',
    zipCode: 10027,
  },
}

typeof person['address'] // 'object'

person['address']['city'] // => "New York"

person.address.city // => 'New York'
```

Here, the `address` object is assigned as the value of the `person` object.

### Arrays as Values

An array can be assigned as a value to another object.

```js
const person = {
  name: 'Paul',
  address: {
    street: '310 W 95th',
    city: 'New York',
    zipCode: 10027,
  },
}

person.phoneNumbers = [123456789, 123456789]

console.log(person)
// {
//  name: "Paul",
//  address: {…},
//  phoneNumbers: [123456789, 123456789]
// }

console.log(person.phoneNumbers instanceof Object) // => true
console.log(person.phoneNumbers instanceof Array) // => true
console.log(person.phoneNumbers instanceof String) // => false
```

## Object Keys

| Rules of Object Keys                          |
| --------------------------------------------- |
| 1. Must be **unique**.                        |
| 2. Must be **strings**.                       |
| 3. Cannot be reserved words.                  |
| 4. Each key is associated with **one** value. |

When writing out object literals, like `{ myKey: "some value" }`, the key is always interpreted as a **literal string**, even if it's unquoted.

It's only necessary to use quotes around the key if the key contains **spaces**, **hyphens** or **periods**. For instance: `{ "my-hyphenated-key": "some value" }`.

The following example shows two ways of specifying the same value in an object literal: using a literal string for the value, or using a variable.

```js
const spam = 'spam'

person['dislikes'] = {
  food: spam,
  'e-mail': 'spam',
}
```

> Here, the value of `food` is assigned to the variable `spam`. While the value of `e-mail` is assigned to the literal string `spam`.

### Object.keys()

This function returns an **array** of all the keys in an object.

```js
Object.keys(person) // => [ 'name', 'address', 'phoneNumbers' ]
```

## Iterating Over an Object

Will be using a for loop to iterate over an object `for (const key in object) { … }`.

Recall that iterating over an array can easily be done with a for loop by using the index of the array.

```js
or (var i = 0; i < 10; i++) {
  // iterating over an array
  console.log(someArray[i]);
}
```

However, JavaScript objects, `{key: value}`, themselves are **not iterable** in the way that arrays are. Instead we need to do things a little differently, using a `for...in` statement.

For example, we can iterate over an object like this:

```js
const planetMoons = {
  mercury: 0,
  venus: 0,
  earth: 1,
  mars: 2,
  jupiter: 67,
  saturn: 62,
  uranus: 27,
  neptune: 14,
}

for (let planet in planetMoons) {
  const numberOfMoons = planetMoons[planet]
  console.log(`${planet} has ${numberOfMoons} moon(s)`)
}

// mercury has 0 moon(s)
// venus has 0 moon(s)
// earth has 1 moon(s)
// mars has 2 moon(s)
// jupiter has 67 moon(s)
// saturn has 62 moon(s)
// uranus has 27 moon(s)
// neptune has 14 moon(s)
```

### Limitations of `for... in`

Objects have properties that can be inherited from their prototype chain as well as method names.

```js
for (let planet in planetMoons) {
  // additional filter for object properties:
  if (planetMoons.hasOwnProperty(planet)) {
    //  ...
  }
}
```

# Lotide

## middle

Implement `middle` which will take in an array and return the middle-most element(s) of the given array.

The `middle` function should return an array with only the middle element(s) of the provided array. This means that the length of the returned elements could vary.

- For arrays with **one** or **two elements**, there is no middle. Return an empty array.

```js
middle([1]) // => []
middle([1, 2]) // => []
```

- For arrays with **odd** number of elements, an array containing a single middle element should be returned.

```js
middle([1, 2, 3]) // => [2]
middle([1, 2, 3, 4, 5]) // => [3]
```

- For arrays with an even number of elements, an array containing the two elements in the middle should be returned

```js
middle([1, 2, 3, 4]) // => [2, 3]
middle([1, 2, 3, 4, 5, 6]) // => [3, 4]
```

Possible Solution:

```js
const middle = (arr) => {
  // edge case when arr has less than 3 items
  if (arr.length < 3) {
    return []
  }

  // get middle index of array
  const middleIndex = Math.floor(arr.length / 2)

  // if true (1), return first
  // if false (even length) (0), return second option
  return arr.length % 2 ? arr[middleIndex] : [arr[middleIndex - 1], arr[middleIndex]]
}

// test cases
console.log(middle([1])) // => []
console.log(middle([1, 2])) // => []
console.log(middle([1, 2, 3])) // => [2]
console.log(middle([1, 2, 3, 4, 5])) // => [3]
console.log(middle([1, 2, 3, 4])) // => [2, 3]
console.log(middle([1, 2, 3, 4, 5, 6])) // => [3, 4]
```
