---
title: Doubly Linked List
date: '2022-02-26'
tags: ['Data Structures', 'Single Linked List']
draft: true
summary: Methods and implementation of a doubly linked list.
---

![tree](https://camo.githubusercontent.com/5025767109de4e8efdc97a7c0b00f15065a747b8a521bd09068ba4cbb5b1f0b2/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f662f66372f42696e6172795f747265652e737667)

A simple unordered tree; in this diagram, the node labeled 7 has two children, labeled 2 and 6, and one parent, labeled 2. The root node, at the top, has no parent.

Lists are linear. Everything is in a row.

Trees are NOT linear. There are multiple paths you can take.

- Root - The top node in a tree.
- Child -A node directly connected to another node when moving away from the Root.
- Parent - The converse notion of a child.
- Siblings -A group of nodes with the same parent.
- Leaf - A node with no children.
- Edge - The connection between one node and another.

[Terminology](https://www.tutorialspoint.com/data_structures_algorithms/images/binary_tree.jpg)

### Uses

- HTML DOM
- Folders in Operating Systems
- Computer File Systems

## Binary Trees

- each node can have **at most, 2 children**

## Binary Search Trees (BST)

- special try of binary tree.
- 0, 1, 2 children
- are sorted in a particular way. Can be **compared**, sortable.

![bst](/images/BST.png)

- Every parent node has at most **two** children
- Every node to the **left** of a parent node is always **less than the parent**
- Every node to the **right** of a parent node is always **greater than the parent**

### Searching BST

- you compare...
- if val > node -> go left
- if val < node -> go right

## BST Classes

```
class Node {
    constructor(value){
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor(){
        this.root = null;
    }
}

//setting up a basic tree

var tree = new BinarySearchTree();
tree.root = new Node(10);
tree.root.right = new Node(15);
tree.root.left = new Node(7);
tree.root.left.right = new Node(9);

console.log(tree);

BinarySearchTree { root:
   Node { value: 10,
     left: Node { value: 7, left: null, right: [Object] },
     right: Node { value: 15, left: null, right: null } } }
```

## BST Inserting

- will make a new node and place it in the correct place.

- Create a new node
- Starting at the root
- Check if there is a root, if not the root now becomes that new node!
- If there is a root, check if the value of the new node is - greater than or less than the value of the root. Easiest to use a while() loop.
- If it is greater
- Check to see if there is a node to the right
- If there is, move to that node and repeat these steps
- If there is not, add that node as the right property
- If it is less
- Check to see if there is a node to the left
- If there is, move to that node and repeat these steps
- If there is not, add that node as the left property

```
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }
  insert(value) {
    let newNode = new Node(value);
    if (!this.root) {
      this.root = newNode;
      return this;
    } else {
      let current = this.root; // select the node
      while (true) {
        if (value < current.value) {
          if(value === current.value) return undefined; //do not do anything with duplicates
          if (current.left === null) {
            //if no left
            current.left = newNode;
            return this;
          } else {
            current = current.left;
          }
        } else if (value > current.value) {
          if (current.right === null) {
            current.right = newNode;
            return this;
          } else {
            current = current.right;
          }
        }
      }
    }
  }
}

//setting up your basic tree
let tree = new BinarySearchTree();
tree.insert(10);
tree.insert(5);
tree.insert(2);
tree.insert(13);
tree.insert(11);
tree.insert(16);
tree.insert(7);

    //       10
    //   5        13
    // 2   7    11   16
```

## BST Find

- searching a binary tree to see if a value is present in the tree.

Starting at the root

- Check if there is a root, if not - we're done searching!
- If there is a root, check if the value of the new node is the value we are looking for. If we found it, we're done!
- If not, check to see if the value is greater than or less than the value of the root
- If it is greater...
  - Check to see if there is a node to the right
    - If there is, move to that node and repeat these steps
    - If there is not, we're done searching!
- If it is less
  - Check to see if there is a node to the left
    - If there is, move to that node and repeat these steps
    - If there is not, we're done searching!

```
  find(value) {
    if (this.root === null) return false;
    let current = this.root;
    let found = false; // keeps track of if we found the item
    // run loop until found is not true, and we have something to loop over.
    while (!found && current) {
      if (value < current.value) {
        // know our value must be on the left
        current = current.left;
      } else if (value > current.value) {
        // know our value must be on the right
        current = current.right;
      } else {
        found = true;
      }
    }
    if(!found) return false;
    return current;
  }

  let tree = new BinarySearchTree();
tree.insert(10);
tree.insert(5);
tree.insert(2);
tree.insert(13);
tree.insert(11);
tree.insert(16);
tree.insert(7);
console.log(tree.find(211)); // false
```

## Big O of BST

- Insertion O(log n)
- Searching/finding O(log n)

[big o](https://res.cloudinary.com/practicaldev/image/fetch/s--cCSlyRS8--/c_imagga_scale,f_auto,fl_progressive,h_900,q_auto,w_1600/https://dev-to-uploads.s3.amazonaws.com/i/d155tk2ttynxoehhz39k.jpeg)

```
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }
  insert(value) {
    let newNode = new Node(value);
    if (!this.root) {
      this.root = newNode;
      return this;
    } else {
      let current = this.root; // select the node
      while (true) {
        if (value === current.value) return undefined; //do not do anything with duplicates
        if (value < current.value) {
          if (current.left === null) {
            //if no left
            current.left = newNode;
            return this;
          } else {
            current = current.left;
          }
        } else if (value > current.value) {
          if (current.right === null) {
            current.right = newNode;
            return this;
          } else {
            current = current.right;
          }
        }
      }
    }
  }
  find(value) {
    if (this.root === null) return false;
    let current = this.root;
    let found = false; // keeps track of if we found the item
    // run loop until found is not true, and we have something to loop over.
    while (!found && current) {
      if (value < current.value) {
        // know our value must be on the left
        current = current.left;
      } else if (value > current.value) {
        // know our value must be on the right
        current = current.right;
      } else {
        found = true;
      }
    }
    if (!found) return false;
    return current;
  }
}

//setting up your basic tree
let tree = new BinarySearchTree();
tree.insert(10);
tree.insert(5);
tree.insert(2);
tree.insert(13);
tree.insert(11);
tree.insert(16);
tree.insert(7);
```
