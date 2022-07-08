---
title: Object Oriented Programming
date: '2022-07-08'
tags: ['OOP']
images: ['/static/images/postImages/andrew-petrov-hopnkQoC0dg-unsplash.jpg']
draft: false
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

### `this`

We use the `this` keyword to access properties and methods of an object. We use `this` as if it were a variable, even though it's a keyword. However, the value of `this` is determined at the **time of the call** and **where** it is called.

When it comes to OOP, it's import to understand that when we use `this` inside of a method, `this` refers to the object that called the method.

```js
const dog = {
  sound: 'woof',
  breed: 'shih tzu',
  bark: function () {
    console.log(this.sound)
  },
}

dog.bark() // woof
```

> `this` refers to the `dog` object calling the method. It is logging the value of the `sound` property of the `dog` object.

```js
const dog = {
  sound: 'woof',
  breed: 'shih tzu',
  bark: function () {
    console.log(this.sound)
  },
  teachMeSomething: function () {
    if (dog === this) {
      console.log('dog === this')
    }
    this.speak()
  },
}

dog.teachMeSomething()
// dog === this
// woof
```

> Take away: Whenever a method is accessing a **property** or another method on the **same object**, use `this`.

Example 1:

```js
const dog = {
  sound: 'woof',
  speak: function () {
    console.log(this.sound)
  },
}

dog.sound = '🐶'
dog.speak() // 🐶
```

Example 2:

```js
// use an object to keep track of state
function newTask(title, description) {
  const task = {
    title: title,
    description: description,
    complete: false,
    logState: function () {
      console.log(`${this.title} has ${this.complete ? ' ' : 'not '}been completed`)
    },
    markCompleted: function () {
      this.complete = true
    },
  }
  return task
}

// DRIVER CODE BELOW

const task1 = newTask('Clean Cat Litter', 'Take all the 💩 out of the litter box')
const task2 = newTask('Do Laundry', '😨')
const tasks = [task1, task2]

task1.logState() // Clean Cat Litter has not been completed
task1.markCompleted()
task1.logState() // Clean Cat Litter has been completed
```

See repo [here](https://github.com/Cwarcup/todo-list-js-exercise):

# Classes

Think of classes like blueprints. They are used as a template to create objects. They serve as a way to **define** the **properties** and **methods** of an object.

They allow us to make as many copies of the same object as we need, all from the same source.

## Class

Declare a class by using the `class` keyword. If we wanted to create a class named `Dog`, we would write:

```js
class Dog {
  // properties
  // methods
}
```

We can use any name for a class, but it's best to use a **noun** and **capitalize** the first letter.

We can **create a new object** from a class by using the `new` keyword.

```js
const dog = new Dog()
const dog2 = new Dog()
```

Both `dog` and `dog2` are **instances** of the `Dog` class. They are both based on the `Dog` class, but they are not the same object. This is known as an **instance** of the `Dog` class.

```js
dog === dog2 // false
```

## Methods and Properties in a Class

Right now we have no properties or methods in our `Dog` class. We can add properties and methods to our class by using the `this` keyword.

```js
class Dog {
  constructor() {
    this.sounds = ['woof', 'bark', 'grr']
  }

  addSound(sound) {
    this.sounds.push(sound)
  }
}
```

The `dog` class is describing two methods: `constructor` and `addSound`. As well as a property `sounds`.

We can add more properties and methods to our class with the following syntax:

```js
class SomeClass {
  methodName(parameters) {
    // this is a method
  }

  someMethod() {
    this.hello = 'hi' // Created a property called hello
  }
}
```

To add a new property to a class, we use the `this` keyword, followed by the property name, then assign it some value.

```js
class SomeClass {
  someMethod() {
    this.hello = 'hi' // Created a property called hello
  }
}
```

## `constructor`

The `constructor` is a special kind of method that gets called when we create a new instance of a class. Everything inside a classes `constructor` whenever we call `new` on a class.

This is where we should setup any default states for our new instances.

```js
class Dog {
  constructor() {
    this.sounds = ['woof', 'bark', 'grr']
  }
}
```

> We are assuming all dogs can make sounds.

## Customizing the `constructor`

All classes can have **one** `constructor` method. Since the `construcotr` is just a method, we can pass in values to it.

```js
class Dog {
  constructor(name, color, age) {
    this.name = name
    this.color = color
    this.age = age
    this.sounds = ['woof', 'bark', 'grr']
  }

  addSound(sound) {
    this.sounds.push(sound)
  }

  wagTail() {
    console.log('wag wag')
  }
}
```

Now every time we create a new instance of the `Dog` class, we can pass in values for the `name`, `color`, and `age` properties.

```js
const dog = new Dog('Fido', 'black', 2)

console.log(dog)
// Dog {
//   name: 'Fido',
//   color: 'black',
//   age: 2,
//   sounds: [ 'woof', 'bark', 'grr' ]
// }
```

## Inheritance

You will notice that some classes have very similar properties and methods. We can use inheritance to make our classes more flexible.

For example, take a `student` and `mentor` class.

1. We will create a generic `person` class that will be the parent of both `student` and `mentor` classes.

```js
class Person {
  constructor(name, age, funFact) {
    this.name = name
    this.age = age
    this.funFact = funFact
  }

  bio() {
    return `Hello, my name is ${this.name}. I'm ${this.age} years old and a fun fact about me is ${this.funFact}.`
  }
}
```

2. We can then create a `student` and separate `mentor` class that inherits from the `person` class.

```js
class Student extends Person {
  // stays in Student class since it's specific to students only
  enroll(cohort) {
    this.cohort = cohort
  }
}

class Mentor extends Person {
  // specific to mentors
  working() {
    this.working = true
  }

  // specific to mentors
  offWork() {
    this.working = false
  }
}

const student1 = new Student('Curtis', 28, 'I like to code.')
const mentor = new Mentor('Bob', 65, 'I believe waffles are the best breakfast.')

student1.bio() // "Hello, my name is Curtis. I'm 28 years old and a fun fact about me is I like to code."
mentor.bio() // "Hello, my name is Bob. I'm 65 years old and a fun fact about me is I believe waffles are the best breakfast."
```

Here, the more general `Person` class contains code that is shared between `Student` and `Mentor` classes. The `Student` and `Mentor` classes both **inherit** the properties of the `Person` class. We can be this by using the **`extends`** keyword.

- `Student` and `Mentor` are **subclasses** of the `Person` class, since they **`extend`** from the `Person` class.
- `Person` is the **superclass** to `Student` and `Mentor`.

## super

Sometimes we want to further share some code between classes when using inheritance. This is where `super` comes into play. This brings up the concept of **method overriding**.

At some point in time, you may want a subclass to have similar but slightly different behavior than its superclass. Using the previous example, what is we wanted the `Mentor` bio to return "I'm a mentor and my name is Bob." instead of "Hello, my name is Bob."

### Method Overriding - Solution 1

Simply **override** the method in the subclass.

```js
class Person {
  constructor(name, age, funFact) {
    this.name = name
    this.age = age
    this.funFact = funFact
  }

  bio() {
    return `Hello, my name is ${this.name}. I'm ${this.age} years old and a fun fact about me is ${this.funFact}.`
  }
}

class Mentor extends Person {
  bio() {
    return `I'm a mentor and my name is ${this.name}.`
  }
}

const bob = new Mentor('Bob', 65, 'I believe waffles are the best breakfast.')
console.log(bob.bio()) // "I'm a mentor and my name is Bob."
```

> If the method already exists in the superclass, the child class will override the method.

This isn't the best way to do it, but it is a simple way to override a method. Remember, we want to keep our code DRY.

### use `super` - Solution 2

```js
class Person {
  constructor(name, age, funFact) {
    this.name = name
    this.age = age
    this.funFact = funFact
  }

  bio() {
    return `Hello, my name is ${this.name}. I'm ${this.age} years old and a fun fact about me is ${this.funFact}.`
  }
}

class Mentor extends Person {
  bio() {
    return `I'm a mentor. ${super.bio()}.`
  }
}

const bob = new Mentor('Bob', 65, 'I believe waffles are the best breakfast.')
console.log(bob.bio())
// "I'm a mentor here. Hello, my name is Bob. I'm 65 years old and a fun fact about me is I believe waffles are the best breakfast... "
```

## Getters and Setters

```js
class Pizza {
  constructor(size, crust) {
    this.size = size
    this.crust = crust
    this.toppings = ['cheese']
  }

  addTopping(topping) {
    this.toppings.push(topping)
  }

  setSize(size) {
    this.size = size
  }
  getSize() {
    return this.size
  }
}

const pizza = new Pizza()
pizza.setSize('m')
console.log(pizza.getSize()) // 'm'
```

- We use `setSize` to set the size of the pizza.
- And use `getSize` to get the size of the pizza.

This appears pointless, but it is a way to make our code more readable.

- we are _validating_ data being assigning it to a property.
- _Computing_ a value on the fly instead of pulling it out of a property.

### Validating Data

What is our pizza could only take one of the following sizes: `s`, `m`, `l`. It would be bad if someone tried to order a pizza with 🍕.

Using a **setter method** to **set** a property gives us the ability to validate data before the value gets assigned to the property.

```js
class Pizza {
  // ...

  // setSize now includes data validation
  setSize(size) {
    if (size === 's' || size === 'm' || size === 'l') {
      this.size = size
    }
    // else we could throw an error, return false, etc.
    // We choose here to ignore all other values!
  }
}

let pizza = new Pizza()
pizza.setSize('s')
```

### Computing a Value on the Fly

We can create a property to keep track of the prices of a pizza. It's much easier to compute the price of a pizza than to pull it out of a property.

```js
class Pizza {
  // ...

  getPrice() {
    const basePrice = 10
    const toppingPrice = 2
    return basePrice + this.toppings.length * toppingPrice
  }
}

// DRIVER CODE
let pizza = new Pizza()
pizza.getPrice()
```

### `get` and `set`

Classes in JavaScript have a `get` and `set` method.

In order to use these methods, we need to use the `this` keyword, **but** we need to use a different name when accessing the property.

```js
class Pizza {
  // ...
  // replace our custom getters / setters with these ones!
  get price() {
    const basePrice = 10
    const toppingPrice = 2
    return basePrice + this.toppings.length * toppingPrice
    // different name than property name
  }

  set size(size) {
    if (size === 's' || size === 'm' || size === 'l') {
      this._size = size
      // different name than property name "size"
    }
  }
}
```

Doing this allows us to access the `size` and `price` can be accessed as if they were a **value property**:

```js
let pizza = new Pizza()

pizza.price // instead of getPrice()
pizza.size = 's' // instead of setSize(size)
```
