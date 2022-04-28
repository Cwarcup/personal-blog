---
title: Stacks and Queues
date: '2022-04-28'
tags: ['Data Structures', 'Stacks', 'Queues']
draft: false
summary: All about stacks and queues. Covers uses, methods and implementations.
---

# Stacks

Adding a record is done by `push`ing to the top of the stack.
Removing a record is done by `pop`ing from the top of the stack.

**First in, last out.**

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
    this.data = []
  }

  push(value) {
    this.data.push(value)
  }

  pop() {
    return this.data.pop()
  }

  peek() {
    return this.data[this.data.length - 1]
  }
}
```

# Queue

**First one in, first one out (FIFO).**

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
