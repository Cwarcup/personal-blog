---
title: Queues - JavaScript Data Structures
date: '2022-04-24'
tags: ['Data Structures', 'JavaScript', 'Queues']
draft: false
summary: Implementation and methods of a queue.
---

# Definition

Queues are a data type or collection in which the collection maintains a particular oder in which the elements are added and removed. Queues follow First-In-First-Out (FIFO) principle. The first element added to the queue is the first one to be removed.

| We should be able to...                        | Run This                     |
| ---------------------------------------------- | ---------------------------- |
| Create a new, empty queue                      | `const queue = new Queue();` |
| Add an element to the end of the queue         | `queue.add(1);`              |
| Remove the element from the front of the queue | `queue.remove();`            |
| Check if a queue is empty                      | `isEmpty()`                  |

# Implementation

```js
class Queue {
  constructor() {
    this.data = []
  }

  enqueue(item) {
    this.data.push(item)
  }

  dequeue(item) {
    return this.data.shift()
  }

  peek(item) {
    return this.data[0]
  }

  isEmpty() {
    return this.data.length === 0
  }
}

// Test
const queue = new Queue()

queue.isEmpty() // true

queue.enqueue('A')
queue.enqueue('B')
queue.enqueue('C')
queue.enqueue('D')
queue.enqueue('E')

queue.isEmpty() // false

queue.peek() // 'A'

queue.dequeue() // 'A'
queue.dequeue() // 'B'
queue.dequeue() // 'C'
```

- Create a `class` with a `constructor` that initializes an empty array of `data`.
- Define an `enqueue()` method to add an element to the _end_ of the `data` array.
- Define a `dequeue()` method to remove an element from the _start_ of the `data` array.
- Define a `peek()` method, which retrieves the value of the first element in the `data` array, _without_ removing it.
- Define an `isEmpty()` method to determine if the `data` array is empty.
