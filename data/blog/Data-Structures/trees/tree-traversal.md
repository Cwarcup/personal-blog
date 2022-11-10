---
title: Traversing Binary Search Trees
date: '2022-04-27'
tags: ['Data Structures', 'Binary Search Trees', 'Traversal']
draft: false
summary: How can we visit every node one time? There are many ways to print out the nodes of a tree.
---

# Traversing a Tree

The idea is, if we have a tree (binary tree, unsorted tree, etc.), how can we visit every node one time? There are many ways to print out the nodes of a tree.

Two main approaches to traversing a tree:
| **Breadth-First Search (BFS)** | **Depth-First Search (DFS)** |
| ----------------------------------------------------------------------- | --------------------------------------------------------------- |
| Prints all the nodes at a given level, then move on to the level below. | Visit all nodes vertically, before moving on to a sibling node. |
| | DFS-InOrder, PreOrder, and PostOrder |

# Breadth First Search - BFS

![bfs](https://camo.githubusercontent.com/73761db9068bf4c9de4a23209da587a29e8cc672558534d4ff40ac0480854047/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f352f35642f427265616474682d46697273742d5365617263682d416c676f726974686d2e676966)

We scan through the tree _level by level_, following the order of height, from top to bottom. The nodes on higher level would be visited before the ones with lower levels. Works in a **horizontal manner.** We look at all siblings of a node before moving to the next level.

Iterative Pseudocode:

- Create a queue (this can be an array).
- Create a variable `visited` to store the **values of nodes visited**.
- Place the root node in the queue.
- Loop as long as there is anything in the queue.
  - Dequeue (`shift()`) a node from the queue and `push()` the value of the node into the `visited` variable.
    - If there is a left property on the node dequeued - add it to the queue.
    - If there is a right property on the node dequeued - add it to the queue.
- Return the variable that stores the values.

```js
class BinarySearchTree {
  //...
  BFS() {
    let visited = []
    let queue = []
    let node = this.root
    queue.push(node)
    while (queue.length) {
      // while there's something in our queue
      node = queue.shift() // assign node to the first item in the queue
      visited.push(node.data)
      if (node.left) queue.push(node.left)
      if (node.right) queue.push(node.right)
    }
    return visited
  }
}

const tree = new BinarySearchTree()
tree.insert(10)
tree.insert(6)
tree.insert(15)
tree.insert(3)
tree.insert(8)
tree.insert(20)
console.log(tree.BFS()) // [ 10, 6, 15, 3, 8, 20 ]

//       10
//    6      15
//  3    8     20
```

# Depth-first Search Traversal

One starts at the root (selecting some arbitrary node as the root in the case of a graph) and explores as far as possible along each branch before backtracking.

## DFS - PreOrder Traversal

![dfs](https://camo.githubusercontent.com/307023a33368ed02198844a9b3d9b8b7b470f67bbcc0e88574da939b76775c89/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f372f37662f44657074682d46697273742d5365617263682e676966)

> Visit the node, add it to the list. Then traverse the left subtree, traverse the right subtree.

Pseudocode:

- Create a variable to store the values of nodes visited.
- Store the root of the BST in a variable called `current`.
- Write a **helper function** which accepts a **node**.
  - Push the value of the node to the variable that stores the values.
  - If the node has a left property, **recursively call** the helper function with the **left** property on the node.
  - If the node has a right property, **recursively call** the helper function with the **right** property on the node.
- Invoke the helper function with the current variable.
- Return the array of stored visited values.

```js
  DFSPreOrder() {
    let visited = [];
    function helper(node) {
      visited.push(node.value);
      if (node.left) helper(node.left);
      if (node.right) helper(node.right);
    }
    helper(this.root);
    return visited;
  }

  let tree = new BinarySearchTree();
tree.insert(10);
tree.insert(6);
tree.insert(15);
tree.insert(3);
tree.insert(8);
tree.insert(20);
console.log(tree.DFS()); // [ 10, 6, 3, 8, 15, 20 ]

//       10
//    6      15
//  3    8     20

// [ 10, 6, 3, 8, 15, 20 ]
```

---

## DFS - PostOrder Traversal

We visit the left subtree, then the right subtree, then the root.

Pseudocode:

- Create a variable to store the values of nodes visited.
- Store the root of the BST in a variable called `current`.
- Write a **helper function** which accepts a **node**.
  - Push the value of the node to the variable that stores the values.
  - If the node has a left property, **recursively call** the helper function with the **left** property on the node.
  - If the node has a right property, **recursively call** the helper function with the **right** property on the node.
- **Push the value of the node to the variable that stores the values.**
- Invoke the helper function with the current variable.
- Return the array of stored visited values.

```js
DFSPostOrder() {
  let data = []
  function traverse(node) {
    if(node.left) traverse(node.left)
    if(node.right) traverse(node.right)
    data.push(node.value)
  }
  traverse(this.root)
  return data
}

const tree = new BinarySearchTree();
tree.insert(10);
tree.insert(6);
tree.insert(15);
tree.insert(3);
tree.insert(8);
tree.insert(20);

console.log(tree.DFSPostOrder()); // [ 3, 8, 6, 20, 15, 10 ]

//       10
//    6      15
//  3    8     20
```

## DFS - InOrder Traversal

Traverse the entire right side, visit the node. Then we traverse the entire left side, then visit the node.

![inorder](https://upload.wikimedia.org/wikipedia/commons/4/48/Inorder-traversal.gif?20200610133752)

Pseudocode:

- Create a variable to store the values of nodes visited.
- Store the root of the BST in a variable called `current`.
- Write a **helper function** which accepts a **node**.
  - Push the value of the node to the variable that stores the values.
  - If the node has a left property, **recursively call** the helper function with the **left** property on the node.
  - **Push the value of the node to the variable that stores the values.**
  - If the node has a right property, **recursively call** the helper function with the **right** property on the node.
- Invoke the helper function with the current variable.
- Return the array of stored visited values.

```js
DFSInOrder() {
  let data = [];
  function traverse(node) {
    if (node.left) traverse(node.left);
    data.push(node.value);
    if (node.right) traverse(node.right);
  }
  traverse(this.root);
  return data;
}

const tree = new BinarySearchTree();
tree.insert(10);
tree.insert(6);
tree.insert(15);
tree.insert(3);
tree.insert(8);
tree.insert(20);
console.log(tree.DFSInOrder()); // [ 3, 6, 8, 10, 15, 20 ]

//       10
//    6      15
//  3    8     20
```

# Which Search Algorithm is Best for a Binary Search Trees?

## Breadth First (BFS) vs Depth First (BFS)

Depends on the tree. If you have **lots of nodes to keep track of** (think a wide tree), then you should use a **breadth first search**.

If you have **few nodes to keep track of** (think a small tree), then you should use a **depth first search**.

| **BFS**                                            | **DFS**                                              |
| -------------------------------------------------- | ---------------------------------------------------- |
| Best when you have a **wide** tree, not very deep. | Best when you have a **skinny** tree, but very deep. |
| Many branches in the tree.                         | Few branches in the tree.                            |
| But results in a lot of **memory use**             | Doesn't use much memory, but can be slow.            |

![when to use BFS](https://github.com/Cwarcup/notes/blob/main/images/whentoDFS.png?raw=true)

> Use when each node has many children, and you want to visit all of them.

![when to use DFS](https://raw.githubusercontent.com/Cwarcup/notes/main/images/whentouseBFS.png)

> Use when each node has few children, and you want to visit all of them.

## Cases for DFS - InOrder, PostOrder, and PreOrder

### DFS InOrder

Used commonly with BST's.

Notice we get all nodes in the tree in **their underlying order**

```
//       10
//    6      15
//  3    8     20

tree.DFSInOrder() -> [ 3, 6, 8, 10, 15, 20 ] //  Lowest to highest
```

### DFS PreOrder

Can be used to "**export**" a tree structure so that it is **easily reconstructed** or **copied**. Commonly used when we want to reconstruct a tree from a string.

```
//       10
//    6      15
//  3    8     20

tree.DFSPreOrder() -> [ 10, 6, 3, 8, 15, 20 ]
```

# Recap

- **Trees** are **non-linear** data structures that contain a root and child nodes.
- **Binary** Trees can have values of any type, but at **most** **two** children for each **parent**.
- **Binary** **Search** Trees are a more specific version of binary trees where every node to the **left** of a **parent** is **less** than it's value and every node to the **right** is **greater**.
- We can search through Trees using **BFS** and **DFS**.

```js
class Node {
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null
  }

  insert(value) {
    var newNode = new Node(value)
    if (this.root === null) {
      this.root = newNode
      return this
    }
    var current = this.root
    while (true) {
      if (value === current.value) return undefined
      if (value < current.value) {
        if (current.left === null) {
          current.left = newNode
          return this
        }
        current = current.left
      } else {
        if (current.right === null) {
          current.right = newNode
          return this
        }
        current = current.right
      }
    }
  }

  find(value) {
    if (!this.root) return console.log('no root, dummy')

    let current = this.root
    let found = false
    while (current && !found) {
      if (value < current.value) current = current.left
      if (value > current.value) current = current.right
      else found = true
    }
    if (!found) return false
    return current
  }

  contains(value) {
    if (this.root === null) return false
    let current = this.root,
      found = false
    while (current && !found) {
      if (value < current.value) {
        current = current.left
      } else if (value > current.value) {
        current = current.right
      } else {
        return true
      }
    }
    return false
  }

  BFS() {
    let visited = []
    let queue = []
    let node = this.root
    queue.push(node)
    while (queue.length) {
      // while there's something in our queue
      node = queue.shift() // assign node to the first item in the queue
      visited.push(node.value)
      if (node.left) queue.push(node.left)
      if (node.right) queue.push(node.right)
    }
    return visited
  }

  DFSPreOrder() {
    let data = []
    function traverse(node) {
      data.push(node.value)
      if (node.left) traverse(node.left)
      if (node.right) traverse(node.right)
    }
    traverse(this.root)
    return data
  }

  DFSPostOrder() {
    let data = []
    function traverse(node) {
      if (node.left) traverse(node.left)
      if (node.right) traverse(node.right)
      data.push(node.value)
    }
    traverse(this.root)
    return data
  }

  DFSInOrder() {
    let data = []
    function traverse(node) {
      if (node.left) traverse(node.left)
      data.push(node.value)
      if (node.right) traverse(node.right)
    }
    traverse(this.root)
    return data
  }
}

const tree = new BinarySearchTree()
tree.insert(10)
tree.insert(6)
tree.insert(15)
tree.insert(3)
tree.insert(8)
tree.insert(20)

// console.log(tree.root.value);
// console.log(tree.find(10));
// console.log(tree.BFS());
// console.log(tree.DFSPreOrder());
// console.log(tree.DFSPostOrder());
// console.log(tree.DFSInOrder());
```
