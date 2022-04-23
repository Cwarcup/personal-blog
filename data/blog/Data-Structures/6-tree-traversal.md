---
title: Doubly Linked List
date: '2022-02-26'
tags: ['Data Structures', 'Single Linked List']
draft: true
summary: Methods and implementation of a doubly linked list.
---

## Breadth First Search - BFS

![bfs](https://camo.githubusercontent.com/73761db9068bf4c9de4a23209da587a29e8cc672558534d4ff40ac0480854047/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f352f35642f427265616474682d46697273742d5365617263682d416c676f726974686d2e676966)

We scan through the tree level by level, following the order of height, from top to bottom. The nodes on higher level would be visited before the ones with lower levels.

Steps - Iteratively

- Create a queue (this can be an array) and a variable to store the values of nodes visited
- Place the root node in the queue
- Loop as long as there is anything in the queue
- Dequeue a node from the queue and push the value of the node into the variable that stores the nodes
- If there is a left property on the node dequeued - add it to the queue
- If there is a right property on the node dequeued - add it to the queue
- Return the variable that stores the values

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
    if (this.root === null) return false
    var current = this.root,
      found = false
    while (current && !found) {
      if (value < current.value) {
        current = current.left
      } else if (value > current.value) {
        current = current.right
      } else {
        found = true
      }
    }
    if (!found) return undefined
    return current
  }
  contains(value) {
    if (this.root === null) return false
    var current = this.root,
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
    let queue = []
    let visited = []
    let node = this.root
    queue.push(node) // place root node in queue
    while (queue.length) {
      //as long as something in queue
      node = queue.shift() //takes from the beginning of the queue
      visited.push(node.value) //adding node to the list we will return
      if (node.left) queue.push(node.left) // check if theres a left value, push it to queue if so.
      if (node.right) queue.push(node.right) // check if theres a right value
    }
    return visited
  }
}

var tree = new BinarySearchTree()
tree.insert(10)
tree.insert(6)
tree.insert(15)
tree.insert(3)
tree.insert(8)
tree.insert(20)
console.log(tree.BFS())

// [ 10, 6, 15, 3, 8, 20 ]
```

## Depth-first Search Traversal

One starts at the root (selecting some arbitrary node as the root in the case of a graph) and explores as far as possible along each branch before backtracking.

**DFS - PreOrder**

![dfs](https://camo.githubusercontent.com/307023a33368ed02198844a9b3d9b8b7b470f67bbcc0e88574da939b76775c89/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f372f37662f44657074682d46697273742d5365617263682e676966)

- you visit the root, then look at the left and right.

Steps - Recursively

- Create a variable to store the values of nodes visited
- Store the root of the BST in a variable called current
- Write a helper function which accepts a node
- Push the value of the node to the variable that stores the values
- If the node has a left property, call the helper function with the left property on the node
- If the node has a right property, call the helper function with the right property on the node
- Invoke the helper function with the current variable
- Return the array of values

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

  var tree = new BinarySearchTree();
tree.insert(10);
tree.insert(6);
tree.insert(15);
tree.insert(3);
tree.insert(8);
tree.insert(20);
console.log(tree.DFS());

// [ 10, 6, 3, 8, 15, 20 ]
```

**DFS - PostOrder**

- root is the last thing visited.
- all children are visited before the root.

- Create a variable to store the values of nodes visited
- Store the root of the BST in a variable called current
- Write a helper function which accepts a node
- If the node has a left property, call the helper function with the left property on the node
- If the node has a right property, call the helper function with the right property on the node
- Push the value of the node to the variable that stores the values
- Invoke the helper function with the current variable
- Return the array of values

```js
  DFSPostOrder() {
    let visited = [];
    let current = this.root;
    function helper(node) {
      if (node.left) {
        helper(node.left);
      }
      if (node.right) {
        helper(node.right);
      }
      visited.push(node.value);
    }
    helper(this.root);
    return visited;
  }

var tree = new BinarySearchTree();
tree.insert(10);
tree.insert(6);
tree.insert(15);
tree.insert(3);
tree.insert(8);
tree.insert(20);
console.log(tree.DFSPreOrder());
// PreOrder [ 10, 6, 3, 8, 15, 20 ]
console.log(tree.DFSPostOrder());
// PostOrder [ 3, 8, 6, 20, 15, 10 ]
```

## DFS - InOrder

- traverse the entire right side, visit the node
- then traverse the entire left side, then visit the node.

![inorder](https://upload.wikimedia.org/wikipedia/commons/4/48/Inorder-traversal.gif?20200610133752)

- Create a variable to store the values of nodes visited
- Store the root of the BST in a variable called current
  Write a helper function which accepts a node
- If the node has a left property, call the helper function with the left property on the node
- Push the value of the node to the variable that stores the values
- If the node has a right property, call the helper function with the right property on the node
- Invoke the helper function with the current variable
- Return the array of values

```js
  DFSInOrder(){
    var visited = [];
    function helper(node){
        if(node.left) helper(node.left);
        visited.push(node.value);
        if(node.right) helper(node.right);
    }
    helper(this.root);
    return visited;
  }

var tree = new BinarySearchTree();
tree.insert(10);
tree.insert(6);
tree.insert(15);
tree.insert(3);
tree.insert(8);
tree.insert(20);

console.log(tree.DFSInOrder());
// [ 3, 6, 8, 10, 15, 20 ]
```

# Which one should you use?

## First (BFS) vs Depth First (BFS)

Depends on the tree. If you have **lots of nodes to keep track of**, i.e., your tree is very side...

BFS will have to store a ton of data in memory.

**DFS** is not storing all the nodes across a tree. Only keeping track of a given branch. Will therefore use **less space**

If you have **few branches**, better to use **BFS**.

however, you do not see trees like this very often.

---

## Uses for DFS InOrder, PostOrder, and PreOrder

#### DFS InOrder

Used commonly with BST's

Notice we get all nodes in the tree in **their underlying order**

`[ 3, 6, 8, 10, 15, 20 ]` Lowest to highest

#### DFS PreOrder

Can be used to "export" a tree structure so that it is easily reconstructed or copied.

Want to recreate it.

`[ 10, 6, 3, 8, 15, 20 ]`

You know the root is 10, 6 is the left...

## Recap

- **Trees** are **non-linear** data structures that contain a root and child nodes
- **Binary** Trees can have values of any type, but at **most** **two** children for each **parent**
- **Binary** **Search** Trees are a more specific version of binary trees where every node to the **left** of a **parent** is **less** than it's value and every node to the **right** is **greater**
- We can search through Trees using **BFS** and **DFS**
