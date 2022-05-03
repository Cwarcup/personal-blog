---
title: Stacks and Queues
date: '2022-04-28'
tags: ['Data Structures', 'Stacks', 'Queues']
draft: false
summary: All about stacks and queues. Covers uses, methods and implementations.
---

# Stacks

**First in, last out (FIFO)**

- Create a Stack `class` with a `constructor` method which initializes an empty array.
- Define a `push` method which **adds** an element to the top of the stack. Can use `unshift` to add to the beginning of an array.
- Define a `pop` method which **removes** an element from the top of the stack. Can use `shift` to remove from the beginning of an array.
- Define a `peek` method which **returns** the element at the top of the stack, without removing it. Can refer to the first element in an array with `[0]` since arrays are zero-indexed.
- Define a `isEmpty` method which **checks** if the stack is empty. Uses the `length` property of an array to check if the array is empty.

Example:

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

# Queue

**First one in, first one out (FIFO)**

Enqueue: add to the end of the queue.
Dequeue: remove from the front of the queue.

| Queue             | JavaScript Equivalent |
| ----------------- | --------------------- |
| add to queue      | `array.push()`        |
| remove from queue | `array.shift()`       |

A common way to make a queue is to make a `queue class`, which has initialized an empty array. This array has tons of built in methods, but we will only expose the `unshift()` and `pop()` methods, limiting it to a **queue**.

Description: Create a queue data structure. The queue should be a class with methods 'add' and 'remove'. Adding to the queue should store an element until it is removed.

| We should be able to...                        | Run This                     |
| ---------------------------------------------- | ---------------------------- |
| Create a new, empty queue                      | `const queue = new Queue();` |
| Add an element to the end of the queue         | `queue.enqueue(1);`          |
| Remove the element from the front of the queue | `queue.dequeue();`           |
| Get the element at the front of the queue      | `queue.peek();`              |

Examples:

```js
const q = new Queue()
q.enqueue(1)
q.dequeue() // returns 1;

q.isEmpty() // returns true;

q.enqueue('A')
q.enqueue('B')
q.enqueue('C')

q.peek() // returns 'A';
```

# Making a Queue

```js
class Queue {
  constructor() {
    this.items = []
  }

  enqueue(item) {
    this.items.push(item)
  }

  dequeue(item) {
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
