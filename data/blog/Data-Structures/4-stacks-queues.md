---
title: Stacks and Queues
date: '2022-02-28'
tags: ['Data Structures', 'Stacks', 'Queues']
draft: true
summary: All about stacks and queues. Covers uses, methods and implementations.
---

If an abstract data structure. Has two principal operations:

- **push**, adds elements to the collection
- **pop**, removes the most recently added element.

**LIFO** (last in, first out). Last thing added in is the first thing removed.

![stack](https://camo.githubusercontent.com/7163784baed9e988949a1dfbf1e749eac91ea38cd1f738ec5094469f22242675/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f622f62342f4c69666f5f737461636b2e706e67)

Think about a stack of plates, or a stack of markers, or a stack of....anything.

As you pile it up the last thing (or the topmost thing) is what gets removed first.

### Uses

- managing function invocations
- undo / redo
- routing (the history object)

## Array implementation

- can use `push` and `pop`, or
- `shift` and `unshift`.
- however, it is more efficient to use `push` and `pop` because reindexing does not need to occur.

## Linked List implementation

### push(val): Add a value to the top of the stack!

- The function should accept a value
- Create a new node with that value
- If there are no nodes in the stack, set the first and last property to be the newly created node
- If there is at least one node, create a variable that stores the current first property on the stack
- Reset the first property to be the newly created node
- Set the next property on the node to be the previously created variable
- Increment the size of the stack by 1

### Pop(): Remove a value from the top of the stack!

- If there are no nodes in the stack, return null
- Create a temporary variable to store the first property on the stack
- If there is only 1 node, set the first and last property to be null
- If there is more than one node, set the first property to be the next property on the current first
- Decrement the size by 1
- Return the value of the node removed

```js
class Node {
  constructor(value) {
    this.value = value
    this.next = null
  }
}

class Stack {
  constructor() {
    this.first = null
    this.last = null
    this.size = 0
  }
  push(val) {
    let newNode = new Node(val)
    if (!this.first) {
      this.first = newNode
      this.last = newNode
    } else {
      let temp = this.first
      this.first = newNode
      this.first.next = temp
    }
    return ++this.size
  }
  pop() {
    if (!this.first) return null
    let temp = this.first
    if (this.first === this.last) {
      this.last = null
    }
    this.first = this.first.next
    this.size--
    return temp.value
  }
}

let stack = new Stack()
undefined
stack.push('First')
1
stack.push('second')
2
stack.push('3rd')
3
stack.pop()
;('3rd')
stack.pop()
;('second')
stack.pop()
;('First')
stack.pop()
null
```

## Big O of Stacks

- Insertion O(1)
- Removal O(1)
- Searching O(N)
- Access O(N)

---

# Queues

Are an abstract data type in which the entities are kept in order. Addition of entities occurs at the the rear terminal position (known as **enqueue**). Removal of entities occurs at the front terminal position (known as **dequeue**).

**First-In-First-Out (FIFO)**

- first one added will be the first one removed.

![fifo](https://camo.githubusercontent.com/a98486bae83b4a5c7efcc361d1b1440d471c4d0f874b014aab59a7374b0fddf9/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f352f35322f446174615f51756575652e737667)

---

## Building a queue with a class

```js
class Node {
  constructor(value) {
    this.value = value
    this.next = null
  }
}

class Queue {
  constructor() {
    this.first = null
    this.last = null
    this.size = 0
  }
  enqueue(val) {
    let newNode = new Node(val)
    if (!this.first) {
      this.first = newNode
      this.last = newNode
    } else {
      this.last.next = newNode
      this.last = newNode
    }
    return ++this.size
  }

  dequeue() {
    if (!this.first) return null

    let temp = this.first
    if (this.first === this.last) {
      this.last = null
    }
    this.first = this.first.next
    this.size--
    return temp.value
  }
}
```
