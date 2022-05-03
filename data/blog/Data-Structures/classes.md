---
title: Classes in JavaScript
date: '2022-03-17'
tags: ['Classes', 'this', ' hoisting']
draft: false
summary: General overview of classes in JavaScript.
---

# What do Data Structures Do?

- Are collections of values
- the relationship among values
- the functions or operations that can be applied to the data

Different data structures excel at different things. Some are highly specialized, while others (like arrays) are more generally used.

A data structure is a particular way of organizing and storing data in a computer so that it can be accessed and modified efficiently. More precisely, a data structure is a collection of data values, the relationships among them, and the functions or operations that can be applied to the data.

# ES2015 Class Syntax Overview

[JS Class Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)

## What is a class?

A class is a blueprint for creating objects with pre-defined properties and methods.

## Class Syntax

- The method to create new objects **must** be called **constructor**.
- The **class** keyword creates a constant, so you can not redefine it.

```js
class Student {
  constructor(firstName, lastName) {
    this.firstName = firstName
    this.lastName = lastName
  }
}
```

## Creating Objects From Classes

- use the **new** keyword

```js
class Student {
    constructor(firstName, lastName){
        this.firstName = firstName;
        this.lastName = lastName;
    }
}

let firstStudent = new Student("Curtis", "W");
let secondStudent = new Student("Gilligan", "Dog");

> firstStudent
< Student {firstName: 'Curtis', lastName: 'W'}
```

Defining a class does NOT do anything on its own. You must **instantiate** it by using `let someVariable = new classCreated(...)`.

# Instance Methods

- An instance is an object containing data and behavior described by the class.
- The new operator instantiates the class in JavaScript: `instance = new Class()`.

For example, you can instantiate the User class using the new operator: `const myUser = new User();`
In this case, `new User()` creates an **instance** of the` User class`.

```js
class Student {
  constructor(firstName, lastName) {
    this.firstName = firstName
    this.lastName = lastName
  }
  fullName() {
    return `Your full name is ${this.firstName} ${this.lastName}`
  }
}

let firstStudent = new Student('Curtis', 'Warcup')

firstStudent.fullName() // "Curtis Warcup"
```

Here `this` refers to the individual instance. If you made an instance called `firstStudent`, then `this` refers to `firstStudent`.

Another example:

```js
class Student {
  constructor(firstName, lastName) {
    this.firstName = firstName
    this.lastName = lastName
    this.lates = 0
    this.scores = []
  }
  fullName() {
    //basic method
    return `Your full name is ${this.firstName} ${this.lastName}`
  }
  markLate() {
    //manipulate an existing property
    this.lates += 1
    if (this.lates > 2) {
      return `You ${this.firstName} ${this.lastName} are a moron`
    }
    return `${this.firstName} ${this.lastName} has been late ${this.lates} times`
  }
  addScores(score) {
    this.scores.push(score)
    return this.scores
  }
  calculateAverage() {
    let sum = this.scores.reduce(function (a, b) {
      return a + b
    })
    return sum / this.scores.length
  }
}

let firstStudent = new Student('Curtis', 'W')
let secondStudent = new Student('Gilly', 'Poo')

firstStudent.markLate()
firstStudent.markLate()
firstStudent.markLate() //'You Curtis W are a moron'

secondStudent.addScores(25) // [25]
secondStudent.addScores(100) //[25, 100]

secondStudent.calculateAverage() //62.5
```

# Class Methods

- Use the `static` keyword in front of the **method definition**.
- The `static` keyword defines a static method or property for a class.
- Static members (properties and methods) are called **without instantiating** their class and **cannot** be called through a class instance.
- Static methods are often used to create utility functions for an application, whereas static properties are useful for caches, fixed-configuration, or any other data you don't need to be replicated across instances.

```js
class Student {
  constructor(firstName, lastName) {
    this.firstName = firstName
    this.lastName = lastName
  }

  fullName() {
    return `Your full name is ${this.firstName} ${this.lastName}`
  }

  // Static method
  static enrollStudents(...students) {
    // maybe send an email here
  }
}

let firstStudent = new Student('Curtis', 'W')
let secondStudent = new Student('Blue', 'W')

Student.enrollStudents([firstStudent, secondStudent])
```

Here `enrollStudents` is a **static class method**. It can be used to send multiple students an email, not just one. It's not related to a single individual student.

## THIS

Inside all of our **instance methods** and constructor, the keyword `this` refers to the **object** created from that **class** (also known as an **instance**).

## Hoisting

An important difference between **function** declarations and **class** declarations is that while functions can be called in code that appears before they are defined, **classes must be defined before they can be constructed**.

Code like the following will throw a ReferenceError:

```js
const p = new Rectangle() // ReferenceError

class Rectangle {}
```

## Class Expressions

A class expression is another way to define a class. Class expressions can be named or unnamed. The name given to a named class expression is local to the class's body. However, it can be accessed via the name property.

```js
// unnamed
let Rectangle = class {
  constructor(height, width) {
    this.height = height
    this.width = width
  }
}
console.log(Rectangle.name)
// output: "Rectangle"

// named
let Rectangle = class Rectangle2 {
  constructor(height, width) {
    this.height = height
    this.width = width
  }
}
console.log(Rectangle.name)
// output: "Rectangle2"
```

# Summary

- Classes are blueprints that when created make objects known as instances
- Classes are created with the new keyword
- The constructor function is a special function that gets run when the class is instantiated
- Instance methods can be added to classes similar to methods in objects
- Class methods can be added using the static keyword
