---
title: Understanding 'this' in JavaScript
date: '2022-03-18'
tags: ['react', 'this']
draft: false
summary: '"this" has always been confusing for many JavaScript developers, but this post will hopefully shed some light on it. '
---

# this

### What is 'this' used for in a class?

- Is used to refer back to the **instance** of a class.

### How is the value of 'this' determined?

```js
class Car {
  setDriveSound(sound) {
    this.sound = sound
  }
  drive() {
    return this.sound
  }
}

const car = new Car()
car.setDriveSound('Vroom')
car.drive() //'vroom' gets returned
```

When we call the drive function..

```js
drive() {
    return this.sound
  }
```

This refers to the `car`. To the **LEFT** of the `this` keyword

[Video on this:](https://www.udemy.com/course/react-redux/learn/lecture/12531282#content)
