---
title: Weaving Two Queues Together - JavaScript Data Structures
date: '2022-04-25'
tags: ['Data Structures', 'JavaScript', 'Queues', 'Weaving']
draft: false
summary: Weave receives two queues as arguments and combines the contents of each into new, third queue.
---

Directions:

1. Implement a `peek()` method in this Queue class. `Peek` should return the _last_ element (the next one to be returned) from the queue _without_ removing it.
2. Implement the `weave(q1, q2)` function.
   - `Weave` receives two queues as arguments and combines the contents of each into new, third queue.
   - The third queue should contain the _alternating_ content of the two queues.
   - The function should handle queues of different lengths without inserting 'undefined' into the new one.
   - _Do not_ access the array inside of any queue, only use the `enqueue`, `dequeue`, and `peek` functions.

Example:

```js
const queueOne = new Queue()
queueOne.enqueue(1)
queueOne.enqueue(2)
const queueTwo = new Queue()
queueTwo.enqueue('Hi')
queueTwo.enqueue('There')

const q = weave(queueOne, queueTwo)
q.dequeue() // 1
q.dequeue() // 'Hi'
q.dequeue() // 2
q.dequeue() // 'There'
```

# Weave Solution

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

function weave(sourceOne, sourceTwo) {
  const q = new Queue()

  // as long as our next element is NOT undefined...
  while (sourceOne.peek() || sourceTwo.peek()) {
    if (sourceOne.peek()) {
      q.enqueue(sourceOne.dequeue())
    }
    if (sourceTwo.peek()) {
      q.enqueue(sourceTwo.dequeue())
    }
  }
  return q
}
```

- Create a new `Queue` object with `new Queue()`.
- Iterate through each input queue, dequeueing each element and adding it to the new queue. This will shorten the input queues.
- If one queue is empty, add the remaining elements from the other queue to the new queue.
