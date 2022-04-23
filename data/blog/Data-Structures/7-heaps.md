---
title: Doubly Linked List
date: '2022-02-26'
tags: ['Data Structures', 'Single Linked List']
draft: true
summary: Methods and implementation of a doubly linked list.
---

Are another category of trees. All the rules that apply to trees will also apply to heaps.

In a _min heap_, if `P` is a parent node of `C`, then the key (the value) of `P` is **less** than or **equal** to the key of `C`. `Parents` nodes are always **smaller** than `child` nodes.
P < C

![min binart heap](https://camo.githubusercontent.com/065e525a8985291e9506599ebaeb6e39e635f204bcfe98a121ff5b1e662c16ea/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f362f36392f4d696e2d686561702e706e67)

In a _max heap_, the key of `P` is **greater** than or **equal** to the key of `C`. `Parent` node is always **larger** than `children`.
P > C

There is no order when comparing the left and right. They are just **SMALLER** than the parent.

![Max Binary Heap](https://camo.githubusercontent.com/17a30e96c4edcf08f01638861728ff8c6f0391e4eba9a757a8cf310298ac2a05/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f332f33382f4d61782d486561702e737667)

#### Max Heap

- Each parent has at most **two** child nodes
- The value of each parent node is always greater than its child nodes
- In a **max** Binary Heap the **parent** is **greater** than the **children**, but there are no guarantees between sibling nodes.
- A binary heap is as compact as possible. All the children of each node are as full as they can be and left children are filled out first

Binary Heaps are used to implement **Priority Queues**, which are very commonly used data structures

They are also used quite a bit, with **graph traversal algorithms**

Left child is added first, then the right child.

---

### Find the child using the parent node

For any **index** of an array **n**...

- The **left** child is stored at **2n + 1**
- The **right** child is at **2n + 2**

### Find the parent using the child node

For any **child** node at **index** **n**...

Its **parent** is at index **(n-1)/2** **floored**, round down.

### Defining our class:

```js
Class Name:
       MaxBinaryHeap

Properties:
       values = []
```

Just storing values into an array.

```
class MaxBinaryHeap {
  constructor() {
    this.values = [];
  }
```

# Heap - Insert

1. add the value to the end of the array `push()`
2. bubble up (swap value until the value is in the correct spot. Larger values move up .)
   1. compare the value to its parent value using `(n-1)/2 floored`
   2. if value is **larger**, swap parent and value.
   3. if value is **smaller**, leave it.

More detailed pseudocode

- Push the value into the values property on the heap
  Bubble Up:
- Create a variable called index which is the length of the values property - 1
- Create a variable called parentIndex which is the floor of (index-1)/2
- Keep looping as long as the values element at the parentIndex is less than the values element at the child index
- Swap the value of the values element at the parentIndex with the value of the element property at the child index
- Set the index to be the parentIndex, and start over!

```js
class MaxBinaryHeap {
  constructor() {
    this.values = []
  }
  insert(element) {
    this.values.push(element)
    this.bubbleUp()
  }
  bubbleUp() {
    let index = this.values.length - 1 // keeps track of where the newly added element is.
    const element = this.values[index]
    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2)
      let parent = this.values[parentIndex]
      if (element <= parent) break
      this.values[parentIndex] = element
      this.values[index] = parent
      index = parentIndex
    }
  }
}

let heap = new MaxBinaryHeap()
heap.insert(41)
heap.insert(39)
heap.insert(33)
heap.insert(18)
heap.insert(27)
heap.insert(12)
heap.insert(55)

console.log(heap)

{
  values: [55, 39, 41, 18, 27, 12, 33]
}
```

## Removing max from a heap

- remove the root
- replace root with the most recently added
- adjust (sink down)

### Sink Down?

The procedure for deleting the root from the heap (effectively extracting the maximum element in a max-heap or the minimum element in a min-heap) and restoring the properties is called down-heap (also known as bubble-down, percolate-down, sift-down, trickle down, heapify-down, cascade-down, and extract-min/max).

1. remove the root
2. swap root with the most recently added element
3. compare new root to its children
   1. swap LARGER child with root
   2. continue comparing children and its parent.
   3. if NO larger child exists, then parent is in the correct spot.

---

**Removing (extractMax)**

1. Swap the first value in the values property with the last one
1. Pop from the values property, so you can return the value at the end.
1. Have the new root "sink down" to the correct spot...​
   1. Your parent index starts at 0 (the root)
   2. Find the index of the left child: 2 \* index + 1 (make sure its not out of bounds)
   3. Find the index of the right child: 2\*index + 2 (make sure its not out of bounds)
   4. If the left or right child is greater than the element...swap. If both left and right children are larger, swap with the largest child.
   5. The child index you swapped to now becomes the new parent index.
   6. Keep looping and swapping until neither child is larger than the element.
   7. Return the old root!

```js
class MaxBinaryHeap {
  constructor() {
    this.values = []
  }
  insert(element) {
    this.values.push(element)
    this.bubbleUp()
  }
  bubbleUp() {
    let index = this.values.length - 1 // keeps track of where the newly added element is.
    const element = this.values[index]
    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2)
      let parent = this.values[parentIndex]
      if (element <= parent) break
      this.values[parentIndex] = element
      this.values[index] = parent
      index = parentIndex
    }
  }
  extractMax() {
    const max = this.values[0] //gives you first element
    const end = this.values.pop()
    if (this.values.length > 0) {
      this.values[0] = end // last element to root
      // sink down
      this.sinkDown()
    }
    return max
  }
  //  0   1   2   3   4   5
  // [33, 39, 41, 18, 27, 12]
  sinkDown() {
    let index = 0 // starts at beginning
    const length = this.values.length
    const element = this.values[0]
    while (true) {
      let leftChildIndex = 2 * index + 1 // 1
      let rightChildIndex = 2 * index + 2 // 2
      let leftChild, rightChild
      let swap = null

      if (leftChildIndex < length) {
        leftChild = this.values[leftChildIndex] // 39
        if (leftChild > element) {
          swap = leftChildIndex
        }
      }
      if (rightChildIndex < length) {
        rightChild = this.values[rightChildIndex] //41
        if (
          (swap === null && rightChild > element) || // swap never set to left child
          (swap !== null && rightChild > leftChild) //
        ) {
          swap = rightChildIndex
        }
      }
      if (swap === null) break
      this.values[index] = this.values[swap] // swapping with either the left or right child.
      this.values[swap] = element
      index = swap
    }
  }
}

let heap = new MaxBinaryHeap()
heap.insert(41)
heap.insert(39)
heap.insert(33)
heap.insert(18)
heap.insert(27)
heap.insert(12)

console.log(heap)
// [ 41, 39, 33, 18, 27, 12 ]

console.log(heap.extractMax())
// 41

console.log(heap)
// [ 39, 27, 33, 18, 12 ]
```

# Priority Queue

#### What is a priority queue?

- A data structure where each element has a priority.
- Elements with **higher** priorities are served **before** elements with lower priorities.
- are separate from heaps.

---

val does not matter.

The heap is constructed using **priority**

- Write a Min Binary Heap - lower number means higher priority.
- Each Node has a val and a priority. Use the priority to build the heap.
- **Enqueue** method accepts a value and priority, makes a new node, and puts it in the right spot based off of its priority.
- **Dequeue** method removes root element, returns it, and rearranges heap using priority.

Needed to add `priority` and change the `<` to `>` signs.

```js
class Node {
  constructor(val, priority) {
    this.val = val;
    this.priority = priority;
  }
}

class PriorityQueue {
  constructor() {
    this.values = [];
  }
  // accepts a value and priority, makes a new node, and puts it in the right spot based off of its priority.
  enqueue(val, priority) {
    let newNode = new Node(val, priority);
    this.values.push(newNode);
    this.bubbleUp();
  }
  bubbleUp() {
    let index = this.values.length - 1; // keeps track of where the newly added element is.
    const element = this.values[index];
    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      let parent = this.values[parentIndex];
      if (element.priority >= parent.priority) break;
      this.values[parentIndex] = element;
      this.values[index] = parent;
      index = parentIndex;
    }
  }
  dequeue() {
    //removes root element, returns it, and rearranges heap using priority.
    const min = this.values[0]; //gives you first element
    const end = this.values.pop();
    if (this.values.length > 0) {
      this.values[0] = end; // last element to root
      // sink down
      this.sinkDown();
    }
    return min;
  }
  //  0   1   2   3   4   5
  // [33, 39, 41, 18, 27, 12]
  sinkDown() {
    let index = 0; // starts at beginning
    const length = this.values.length;
    const element = this.values[0];
    while (true) {
      let leftChildIndex = 2 * index + 1; // 1
      let rightChildIndex = 2 * index + 2; // 2
      let leftChild, rightChild;
      let swap = null;

      if (leftChildIndex < length) {
        leftChild = this.values[leftChildIndex]; // 39
        if (leftChild.priority < element.priority) {
          swap = leftChildIndex;
        }
      }
      if (rightChildIndex < length) {
        rightChild = this.values[rightChildIndex]; //41
        if (
          (swap === null && rightChild.priority < element.priority) || // swap never set to left child
          (swap !== null && rightChild.priority < leftChild.priority) //
        ) {
          swap = rightChildIndex;
        }
      }
      if (swap === null) break;
      this.values[index] = this.values[swap]; // swapping with either the left or right child.
      this.values[swap] = element;
      index = swap;
    }
  }
}

let ER = new PriorityQueue();

ER.enqueue('common cold', 5);
ER.enqueue('gun shot wound', 1);
ER.enqueue('high fever', 4);
ER.enqueue('broken arm', 2);
ER.enqueue('glass in foot', 3);

console.log(ER);

PriorityQueue { values:
   [ Node { val: 'gun shot wound', priority: 1 },
     Node { val: 'broken arm', priority: 2 },
     Node { val: 'high fever', priority: 4 },
     Node { val: 'common cold', priority: 5 },
     Node { val: 'glass in foot', priority: 3 } ] }

ER.dequeue();
// removes highest priority first

console.log(ER);

PriorityQueue { values:
   [ Node { val: 'broken arm', priority: 2 },
     Node { val: 'glass in foot', priority: 3 },
     Node { val: 'high fever', priority: 4 },
     Node { val: 'common cold', priority: 5 } ] }
```

Can see it doesn't matter what order we enqueue. We always dequeue the highest (lower number) priority.

---

### Big O Binary Heaps

- Insertion - O(log N)
- Removal - O(log N)
- Search - O(N)

---

Binary Heaps are very useful data structures for sorting, and implementing other data structures like priority queues

Binary Heaps are either MaxBinaryHeaps or MinBinaryHeaps with parents either being smaller or larger than their children

With just a little bit of math, we can represent heaps using arrays!
