---
title: Trees and Binary Search Trees
date: '2022-04-26'
tags: ['Data Structures', 'Trees', 'Binary Search Trees']
draft: false
summary: Terminology, implementation and common methods of trees and binary search trees.
---

# Trees

A tree is a data structure that consists of a node and a collection of nodes in a _parent-child relationship_.

|                 List                  |                Tree                 |
| :-----------------------------------: | :---------------------------------: |
| Linear. Everything is is single path. | Have multiple paths. Is not linear. |

There are [many types](https://en.wikipedia.org/wiki/List_of_data_structures#Trees) of trees. We will focus on binary trees and binary search trees.

## Terminology

- **Root** - The top node in a tree. The root node is the first node in the tree.
- **Child** -A node directly connected to another node when moving away from the Root.
- **Parent** - The converse notion of a child.
- **Siblings** - A group of nodes with the same parent.
- **Leaf** - A node with no children.
- **Edge** - The connection between one node and another.

![Terminology](https://www.tutorialspoint.com/data_structures_algorithms/images/binary_tree.jpg)

# Uses Cases For Trees

| Uses Case                    | Description                                                          |
| :--------------------------- | :------------------------------------------------------------------- |
| HTML DOM                     | A tree that represents the structure of an HTML document.            |
| Folders in Operating Systems | Have a hierarchy of folders.                                         |
| AI                           | Can have a tree which describes all the possible outcomes of a game. |

## Binary Trees

- each node can have **at most, 2 children**

![BinaryTree](https://www.30secondsofcode.org/assets/blog_images/ds-tree.webp)

### Runtime

| Operation | Big O    |
| :-------- | :------- |
| Insert    | O(log n) |
| Lookup    | O(log n) |
| Delete    | O(log n) |

[big o](https://res.cloudinary.com/practicaldev/image/fetch/s--cCSlyRS8--/c_imagga_scale,f_auto,fl_progressive,h_900,q_auto,w_1600/https://dev-to-uploads.s3.amazonaws.com/i/d155tk2ttynxoehhz39k.jpeg)

### Binary Search Trees (BST)

- Is a special type of binary tree.
- Has either 0, 1, or 2 children.
- Are sorted in a particular way in which they can be **compared**, **sortable**.
- Every node to the **left** of a parent node is always **less than the parent**
- Every node to the **right** of a parent node is always **greater than the parent**.

![BinarySearchTree](https://www.30secondsofcode.org/assets/blog_images/ds-binary-tree.webp)

**Searching** a binary search tree is done by...

- if `val > node`: go left
- if `val < node`: go right

### Binary Search Tree (BST) Node

```js
class Node {
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
  }
}
```

### BST Insert()

Should be able to call `insert(value)` on a BST and it will insert the value into the tree in the correct spot. Recall, the **left** side of the tree is always less than the parent node. The **right** side of the tree is always greater than the parent node.

Pseudocode:

- Create a new node.
- Starting at the root.
  - Check if there is a root, if not - the root now becomes that new node!
  - If there is a root, check if the value of the new node is **greater** than or **less** than the **value of the root**. Easiest to use a `while()` loop.
    - If it is **less**.
      - Check to see if there is a node to the **left**.
        - If there is, move to that node and repeat these steps.
        - If there is not, add that node as the left property.
    - If it is **greater**.
      - Check to see if there is a node to the **right**.
        - If there is, move to that node and repeat these steps.
        - If there is not, add that node as the right property.

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
    const newNode = new Node(value)
    if (this.root === null) {
      this.root = newNode
      return this
    }
    let current = this.root
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
}

const tree = new BinarySearchTree()
tree.insert(10)
tree.insert(6)
tree.insert(15)
tree.insert(3)
tree.insert(8)
tree.insert(20)

//       10
//    6      15
//  3    8     20
```

### BST Find()

Searching a binary tree to see if a particular value is within the tree.

Pseudocode:

- Check if there is a root, if not - return null.
  - If there is a root, check if the value of the new node is the value we are looking for. If we found it, we're done!.
  - If not, check to see if the value is **greater** than or **less** than the value of the **root**.
    - If it is greater...
      - Check to see if there is a node to the right.
        - If there is, move to that node and repeat these steps.
        - If there is not, we're done searching!.
    - If it is less...
      - Check to see if there is a node to the left.
        - If there is, move to that node and repeat these steps.
        - If there is not, we're done searching!.

```js
find(value) {
  if (!this.root) return console.log('no root, dummy');

  let current = this.root;
  let found = false;
  while (current && !found) {
    if (value < current.value) current = current.left;
    if (value > current.value) current = current.right;
    else found = true;
  }
  if (!found) return false;
  return current;
}

const tree = new BinarySearchTree();
tree.insert(10);
tree.insert(6);
tree.insert(15);
tree.insert(3);
tree.insert(8);
tree.insert(20);
console.log(tree.find(10)); // 10
console.log(tree.find(100)); // false

//       10
//    6      15
//  3    8     20
```

### BST Contains()

Returns a boolean if the value is in the tree.

```js
contains(value) {
  if (this.root === null) return false;
  let current = this.root,
    found = false;
  while (current && !found) {
    if (value < current.value) {
      current = current.left;
    } else if (value > current.value) {
      current = current.right;
    } else {
      return true;
    }
  }
  return false;
}

const tree = new BinarySearchTree();
tree.insert(10);
tree.insert(6);
tree.insert(15);
tree.insert(3);
tree.insert(8);
tree.insert(20);
console.log(tree.contains(10)); // true
console.log(tree.contains(100)); // false

//       10
//    6      15
//  3    8     20
```

## Complete Code for BST

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

# Alternative Code for BST

```js
class Node {
  constructor(value) {
    this.left = null
    this.right = null
    this.value = value
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null
  }

  insert(value) {
    const newNode = new Node(value)

    // check to see if there are any nodes in the existing tree
    if (!this.root) {
      this.root = newNode
      return this
    }

    // start at the root node
    let current = this.root
    // traverse the tree
    while (true) {
      if (value === current.value) return undefined

      // check the left side
      if (value < current.value) {
        // check to see if there is a node to the left
        if (!current.left) {
          // if there is not, then add the new node
          current.left = newNode
          return this
        }
        // if there is something to the left...
        // update the current node to be the left node
        // keep looping
        current = current.left
      } else {
        // check the right side
        // if there is no right node
        // make new node the right node
        if (!current.right) {
          current.right = newNode
          return this
        }
        // if there is a right node
        // make current node the right node
        // keep looping
        current = current.right
      }
    }
  }

  lookup(value) {
    if (!this.root) {
      return false
    }

    let current = this.root

    while (current) {
      // compare current to value
      if (value < current.value) {
        // if value is less than current, go left
        current = current.left
      } else if (value > current.value) {
        // if value is greater than current, go right
        current = current.right
      } else if (value === current.value) {
        // if value is equal to current, return current
        // means we got a match
        return current
      }
    }

    // if we get to the end of the tree and we haven't found the value
    return false
  }
}

const bst = new BinarySearchTree()

//            9
//     4           20
//  1     6     15    170

bst.insert(9)
bst.insert(4)
bst.insert(20)
bst.insert(1)
bst.insert(6)
bst.insert(15)
bst.insert(170)

// function to traverse the tree and print out the values
function traverse(node) {
  const tree = { value: node.value }
  tree.left = node.left === null ? null : traverse(node.left)
  tree.right = node.right === null ? null : traverse(node.right)
  return tree
}

console.log(JSON.stringify(traverse(bst.root)))
```
