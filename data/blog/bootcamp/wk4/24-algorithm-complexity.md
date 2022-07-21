---
title:
date: '2022-07-22'
tags: ['CSS']
images: ['/static/images/postImages/responsive-design.jpg']
draft: false
summary:
---

In programing, an algorithm is a set of steps that a computer takes to accomplish a task. We tell computers what to do by writing code, so an algorithm is the code that accomplishes a certain task.

## Introduction to Algorithm Complexity

- Complexity is about how _fast_ or _slow_ a particular algorithm is.
- Speed is measured by counting the number of **elementary operations**.
  - The number of operations that are so simple that they take a _constant amount of time_ to perform.

Each of the following are elementary operations:

- `let number = 0;`
- `number += 2;`
- `console.log(number);`

The **runtime** is defined by the number of **elementary operations** that are performed.So if a an algorithm performs `n` elementary operations, we say the **running time** is `n`.

## Elementary Operations

An elementary operation is a simple operation that takes a _constant amount of time_ to perform.

**Constant time** meaning that the time it takes to perform the operation is the same _regardless_ of the size of the input.

![runtime](https://miro.medium.com/max/1152/1*j8FHj5GEC1rnMCS-rZ5W3g.png)

> Don't worry about Big O yet. We'll get to that in a later post. But see how constant time does not change change even when the input size is increased.

Take a look at the following code:

```js
let result = 0

for (let i = 0; i < array.length; i++) {
  let number = array[i]
  result += number
}

console.log(result)
```

The algorithm relies on **one** variable, `array`.

In order to determine the runtime we can reorder the code to make it easier to understand. We will use `n` to represent the length of an array, so we will start using `n` when an operation gets executed `array.length` times.

```js
let result = 0 // 1

for (
  let i = 0; // 1
  i < array.length; // n + 1
  i++ // n
) {
  let number = array[i] // n
  result += number // n
}

console.log(result) // 1
```

> `i < array.length` gets executed `n + 1` times (an extra time) because there is an extra check at the end in order to stop the loop, when it goes over the length.

Some of the operations here will take a _fixed amount of time_, no matter how large the input (`array` could be anything). For example, every operation that gets executed inside the for loop will get called `n` times, once for each item in the array.

Here's a list of the elementary operations that we can use to determine the runtime:

|          `1`          |           `n`           |      `n + 1`       |
| :-------------------: | :---------------------: | :----------------: |
|   `let result = 0`    |          `i++`          | `i < array.length` |
|      `let i =0`       | `let number = array[i]` |         -          |
| `console.log(result)` |   `result += number`    |         -          |

We can add up all the elementary operations to get the **running time**.

`3 + (n * 3) + n + 1` simplifies to `4 + (n * 4)` or `4n + 4`

---

- Algorithms that don't deal with dynamic data, like **loops**, usually take **constant time** (no `n` involved)
- Algorithms that **iterate over data**, involve using `n` based on the size of the data

### Binary Search

This approach is done by comparing the **middle element** of the array to the **target value**.

Binary search is an efficient algorithm for finding an item from a sorted list of items. It works by repeatedly dividing in half the portion of the list that could contain the item, until you've narrowed down the possible locations to just one.

- _only_ works on **sorted arrays**.

![binary search ](https://camo.githubusercontent.com/41ad75ebe176b7d8cede65d44e649a406d5de97b88ca957403d0cc35d0bf6950/68747470733a2f2f626c6f672e70656e6a65652e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031352f30342f62696e6172792d616e642d6c696e6561722d7365617263682d616e696d6174696f6e732e676966)
