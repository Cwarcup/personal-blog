---
title: Object Oriented Programming
date: '2022-07-08'
tags: ['OOP']
images: ['/static/images/postImages/andrew-petrov-hopnkQoC0dg-unsplash.jpg']
draft: true
summary: OOP is usually defined by its two core concepts. Polymorphism and Inheritance. Although both concepts are related, they are not the same. Let’s take a look at a real life example, that illustrates perfectly the advantages of Inheritance.
---

Languages that are Object Oriented (mostly):

- Java
- C++
- C#
- Python
- Ruby
- PHP
- Swift
- Objective-C

Languages that are not Object Oriented (mostly):

- Erlang
- Common Lisp
- Elixir
- Haskell
- Clojure

JavaScript can be considered an Object Oriented language. While in its infancy, it was mostly a Functional Programming language, it has since become a full-fledged Object Oriented language after the introduction of ES6. That being said, it is not completely Object Oriented liker Ruby or Python.

## Review of OOP in JavaScript

These are variables:

```js
const dogSound = 'woof'
let dogBreed = 'shih tzu'
```

Functions look like this:

```js
function dogSound() {
  console.log('woof')
}
```

Objects are like this:

```js
const dog = {
  sound: 'woof',
  breed: 'shih tzu',
  bark: function () {
    console.log(this.sound)
  },
}
```

OOP uses objects to group **related variables** and **related functions** together. This **keeps our code organized** and **easy to understand**.

### Terminology

Every object is made up of key:value pairs, collectively known as **properties**. Objects can also contain **methods**. Methods are just properties that have a function as their value.

```js
const dog = {
  sound: 'woof', // property
  breed: 'shih tzu', // property
  bark: function () {
    // method
    console.log(this.sound)
  },
}
```
