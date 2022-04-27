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

## Binary Search Trees (BST)

- Is a special type of binary tree.
- Has either 0, 1, or 2 children.
- Are sorted in a particular way in which they can be **compared**, **sortable**.
- Every node to the **left** of a parent node is always **less than the parent**
- Every node to the **right** of a parent node is always **greater than the parent**.

![BinarySearchTree](https://www.30secondsofcode.org/assets/blog_images/ds-binary-tree.webp)

**Searching** a binary search tree is done by...

- if `val > node`: go left
- if `val < node`: go right

# Binary Search Tree (BST) Node

```js
class Node {
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
  }
}
```

# Binary Search Tree (BST) Class

```js
class BinarySearchTree {
  constructor() {
    this.root = null
  }
}
```

Can construct a very basic BST:

```js
const tree = new BinarySearchTree()
tree.root = new Node(10)
tree.root.right = new Node(15)
tree.root.left = new Node(7)
tree.root.left.right = new Node(9)

console.log(tree)
// Node { value: 10,
//      left: Node { value: 7, left: null, right: [Object] },
//      right: Node { value: 15, left: null, right: null } }
```

## BST Insert()

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

    // check to see if there's a root
    if (!this.root) {
      this.root = newNode
      return this
    } else {
      let currentNode = this.root

      while (true) {
        if (value === currentNode.value) return undefined
        if (value < currentNode.value) {
          // check to see is there's a left
          if (currentNode.left === null) {
            currentNode.left = newNode
            return this
          } else {
            currentNode = currentNode.left
          }
        } else if (value > currentNode.value) {
          if (currentNode.right === null) {
            currentNode.right = newNode
            return this
          } else {
            currentNode = currentNode.right
          }
        }
      }
    }
  }
}

const tree = new BinarySearchTree()
tree.insert(10)
tree.insert(5)
tree.insert(13)
tree.insert(11)
tree.insert(2)
tree.insert(16)
tree.insert(7)

//       10
//   5        13
// 2   7    11   16
```

## BST Find()

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
    if (!this.root) return false;

    let current = this.root;
    let found = false; // keeps track of if we found the item

    while (current && !found) {
      // while there is something to loop over and we have not found it
      if (value < current.value) {
        // recall, smaller values on the left
        current = current.left;
      } else if (value > current.value) {
        current = current.right;
      } else {
        // if we found it, loops ends
        found = true;
      }
    }
    if (!found) return false;
    return current; // returns the node if found
  }

const tree = new BinarySearchTree();
tree.insert(10);
tree.insert(5);
tree.insert(13);
tree.insert(11);
tree.insert(2);
tree.insert(16);
tree.insert(7);
console.log(tree.find(11)); // Node { value: 11, left: null, right: null }
console.log(tree.find(100)); // false
```

## BST Contains()

Returns a boolean if the value is in the tree.

```js
  contains(value) {
    if (!this.root) return false;

    let current = this.root;

    while (current) {
      // while there is something to loop over and we have not found it
      if (value < current.value) {
        // recall, smaller values on the left
        current = current.left;
      } else if (value > current.value) {
        current = current.right;
      } else {
        // if we found it, loops ends
        return true
      }
    }
    return false// returns the node if found
  }

tree.insert(10);
tree.insert(5);
tree.insert(13);
tree.insert(11);
tree.insert(2);
tree.insert(16);
tree.insert(7);
console.log(tree.find(11)); // Node { value: 11, left: null, right: null }
console.log(tree.contains(11)); // true
console.log(tree.contains(100)); // false
```

## Big O of BST

| Operation | Time Complexity |
| --------- | --------------- |
| Insertion | O(log n)        |
| Searching | O(log n)        |

[big o](https://res.cloudinary.com/practicaldev/image/fetch/s--cCSlyRS8--/c_imagga_scale,f_auto,fl_progressive,h_900,q_auto,w_1600/https://dev-to-uploads.s3.amazonaws.com/i/d155tk2ttynxoehhz39k.jpeg)

# Complete Code for BST

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

    // check to see if there's a root
    if (!this.root) {
      this.root = newNode
      return this
    } else {
      let currentNode = this.root

      while (true) {
        if (value === currentNode.value) return undefined
        if (value < currentNode.value) {
          // check to see is there's a left
          if (currentNode.left === null) {
            currentNode.left = newNode
            return this
          } else {
            currentNode = currentNode.left
          }
        } else if (value > currentNode.value) {
          if (currentNode.right === null) {
            currentNode.right = newNode
            return this
          } else {
            currentNode = currentNode.right
          }
        }
      }
    }
  }

  find(value) {
    if (!this.root) return false

    let current = this.root
    let found = false // keeps track of if we found the item

    while (current && !found) {
      // while there is something to loop over and we have not found it
      if (value < current.value) {
        // recall, smaller values on the left
        current = current.left
      } else if (value > current.value) {
        current = current.right
      } else {
        // if we found it, loops ends
        found = true
      }
    }
    if (!found) return false
    return current // returns the node if found
  }

  // returns true or false if a value is within a tree
  contains(value) {
    if (!this.root) return false

    let current = this.root

    while (current) {
      // while there is something to loop over and we have not found it
      if (value < current.value) {
        // recall, smaller values on the left
        current = current.left
      } else if (value > current.value) {
        current = current.right
      } else {
        // if we found it, loops ends
        return true
      }
    }
    return false // returns the node if found
  }
}

const tree = new BinarySearchTree()
tree.insert(10)
tree.insert(5)
tree.insert(13)
tree.insert(11)
tree.insert(2)
tree.insert(16)
tree.insert(7)
console.log(tree.find(11))
console.log(tree.contains(11))
```
