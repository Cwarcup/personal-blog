---
title: Detecting Linked List Loops
date: '2022-05-02'
tags: ['Data Structures', 'Singly Linked List']
draft: false
summary: In a circular or linked list which loops, we do not have a tail. The 'last' node in the list will point to a node in the list. This algorithm will detect if this has occurred.
---

In a **circular linked list**, we do **NOT** have a **tail node**. The "last node" points to a node within the list.

The current methods for iterating over a linked list such as `for...of` or `forEach` will not work with a circular linked list because these use a node that points to `null` to complete the loop. In a circular linked list, no node points to `null`.

Examples:

```js
const l = new List()
const a = new Node('a')
const b = new Node('b')
const c = new Node('c')
l.head = a
a.next = b
b.next = c
c.next = b
circular(l) // true
```

## Strategy - Circular Linked List

- use two pointers, `slow` and `fast` to iterate through the linked list.
- initialize both points to the head of the linked list.
- if the next **two nodes after** `fast` are **defined**, we will move `fast` two nodes ahead and `slow` one node ahead.
- we then do a check to see if `fast` is pointing to the **same node** as `slow`.
  - if it is, we **know that the linked list is circular.**
  - If not, we continue to iterate through the linked list, moving `fast` up two nodes and `slow` one node.

## Circular Linked List Solution

```js
function circular(list) {
  let slow = list.head
  let fast = list.head

  // loop as long as fast has two nodes ahead of it.
  while (fast.next && fast.next.next) {
    slow = slow.next
    fast = fast.next.next

    // compare slow and fast nodes
    // compare the nodes in memory, not the data
    if (slow === fast) {
      return true // circular
    }
  }
  return false // not circular
}
```
