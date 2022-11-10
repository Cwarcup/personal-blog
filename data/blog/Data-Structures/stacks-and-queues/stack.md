---
title: Stacks - JavaScript Data Structures
date: '2022-04-25'
tags: ['Data Structures', 'JavaScript', 'Stack']
draft: false
summary: Overview of a stack, including creating, pushing, popping, and peeking.
---

A stack is a linear data structure that behaves much like stacking real-world physical items. Stacks follow the 'Last In, First Out' principle. For example, imagine adding a magazine on top of a stack of books. The magazine would be the first item to be removed.

**First in, last out.**

Main methods:

- `push`: Adds an element to the top of the stack
- `pop`: Removes an element from the top of the stack
- `peek`: Retrieves the element at the top of the stack, without removing it
- `isEmpty`: Checks if the stack is empty

Examples:

```js
const s = new Stack()
s.push(1)
s.push(2)
s.pop() // returns 2
s.pop() // returns 1
```

# Runtime

| Method    | Time Complexity |
| --------- | --------------- |
| `push`    | O(1)            |
| `pop`     | O(1)            |
| `peek`    | O(1)            |
| `isEmpty` | O(1)            |
| `lookup`  | O(n)            |

[big o](https://res.cloudinary.com/practicaldev/image/fetch/s--cCSlyRS8--/c_imagga_scale,f_auto,fl_progressive,h_900,q_auto,w_1600/https://dev-to-uploads.s3.amazonaws.com/i/d155tk2ttynxoehhz39k.jpeg)

# Making a Stack with an array

```js
class Stack {
  constructor() {
    this.items = []
  }

  push(item) {
    this.items.unshift(item)
  }

  pop(item) {
    return this.items.shift()
  }

  peek(item) {
    return this.items[0]
  }

  isEmpty() {
    return this.items.length === 0
  }
}
```

- Create a Stack `class` with a `constructor` method which initializes an empty array.
- Define a `push` method which **adds** an element to the top of the stack. Can use `unshift` to add to the beginning of an array.
- Define a `pop` method which **removes** an element from the top of the stack. Can use `shift` to remove from the beginning of an array.
- Define a `peek` method which **returns** the element at the top of the stack, without removing it. Can refer to the first element in an array with `[0]` since arrays are zero-indexed.
- Define a `isEmpty` method which **checks** if the stack is empty. Uses the `length` property of an array to check if the array is empty.

# Stack without an array

```js
class Node {
  constructor(value) {
    this.value = value
    this.next = null
  }
}

class Stack {
  constructor() {
    this.top = null
    this.bottom = null
    this.length = 0
  }

  peek() {
    return this.top
  }

  push(val) {
    const newNode = new Node(val)

    // check if this is the first item in the stack
    if (this.length === 0) {
      this.top = newNode
      this.bottom = newNode
    } else {
      // if we have items...
      const temp = this.top
      this.top = newNode
      this.top.next = temp
    }

    this.length++
    return this
  }

  pop() {
    // if there is no top
    if (!this.top) {
      return null
    }

    if (this.top === this.bottom) {
      this.bottom = null
    }

    // hold the top
    const result = this.top
    // make the second node the first
    this.top = this.top.next
    this.length--
    return result
  }

  isEmpty() {
    // return true or false
    if (this.length === 0) {
      return true
    }
    return false
  }
}
```
