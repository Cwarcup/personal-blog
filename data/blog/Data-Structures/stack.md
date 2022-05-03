---
title: Stacks - JavaScript Data Structures
date: '2022-04-25'
tags: ['Data Structures', 'JavaScript', 'Stack']
draft: true
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

# Making a Stack

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
