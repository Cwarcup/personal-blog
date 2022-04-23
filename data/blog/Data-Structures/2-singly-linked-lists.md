---
title: Single Linked List
date: '2022-02-26'
tags: ['Data Structures', 'Single Linked List']
draft: true
summary: Deep dive into creating a singly linked list. Methods, properties, and how to traverse the list.
---

# What is a linked list?

- data structure that contains a **head, tail** and **length property**.
- consists of nodes, and each **node** has a **value** and a **painter** to another node or null (if last node).
- but there is no index...
- each element is known as a node.
- each element points to the next.
- each node is composed of data and a reference (in other words, a link) to the next node in the sequence.
- A drawback of linked lists is that access time is linear (and difficult to pipeline).

Also see [this link here](https://github.com/trekhleb/javascript-algorithms/tree/master/src/data-structures/linked-list) for more:

![linked list](https://assets.digitalocean.com/articles/alligator/js/linked-lists-implementation/linked-list-insert.gif)

# Comparisons with Arrays

- Lists

  - Do not have indexes!
  - Connected via nodes with a next pointer
  - Random access is not allowed

- Arrays
  - Indexed in order!
  - Insertion and deletion can be expensive
  - Can quickly be accessed at a specific index

# Pushing Pseudocode

- This function should accept a value
- Create a new node using the value passed to the function
- If there is no head property on the list, set the head and tail to be the newly created node
- Otherwise set the next property on the tail to be the new node and set the tail property on the list to be the newly created node
- Increment the length by one
- Return the linked list

```js
Add(value)
  Pre: value is the value to add to the list
  Post: value has been placed at the tail of the list
  n ← node(value)
  if head = ø // no head
    head ← n
    tail ← n
  else
    tail.next ← n
    tail ← n
  end if
end Add
```

```js
// piece of data = val
// reference to next node = next

class Node {
  constructor(val) {
    this.val = val
    this.next = null
  }
}

class SinglyLinkedList {
  constructor() {
    this.length = 0
    this.head = null
    this.tail = null
  }
  push(value) {
    const newNode = new Node(value)

    // If there is no head yet let's make new node a head.
    if (!this.head) {
      this.head = newNode
      this.tail = newNode
    } else {
      // Attach new node to the end of linked list.
      this.tail.next = newNode
      this.tail = newNode
    }
    this.length++
    return this
  }
}

var list = new SinglyLinkedList()
list.push('1')
list.push('2')
list.push('3')
list.push('4')

// head: Node {val: '1', next: Node}
// length: 4
// tail: Node {val: '4', next: null}
```

# Popping

- removing a node from the end of the Linked List.

## Popping pseudocode

1. If there are no nodes in the list, return undefined
1. Loop through the list until you reach the tail
1. Set the next property of the 2nd to last node to be null
1. Set the tail to be the 2nd to last node
1. Decrement the length of the list by 1
1. Return the value of the node removed

```js
// piece of data = val
// reference to next node = next

class Node {
  constructor(val) {
    this.val = val
    this.next = null
  }
}

class SinglyLinkedList {
  constructor() {
    this.length = 0
    this.head = null
    this.tail = null
  }
  push(value) {
    const newNode = new Node(value)

    // If there is no head yet let's make new node a head.
    if (!this.head) {
      this.head = newNode
      this.tail = newNode
    } else {
      // Attach new node to the end of linked list.
      this.tail.next = newNode
      this.tail = newNode
    }
    this.length++
    return this
  }
  pop() {
    if (!this.head) return undefined
    let current = this.head
    let newTail = this.head
    while (current.next) {
      // while we have a next value...
      newTail = current //set the previous item (newTail) to the current value
      current = current.next // set current value to next value
    }
    this.tail = newTail // now we can set our new tail.
    this.tail.next = null // set the last item to null, severing the connection.
    this.length--
    if (this.length === 0) {
      this.head = null
      this.tail = null
    }
    return current
  }
}

var list = new SinglyLinkedList()

list.push('1')
list.push('2')
list.push('3')
list.push('4')

list.pop() // Node {val: '4', next: null} removes the 4

list //head: Node {val: '1', next: Node}
//length: 3
//tail: Node {val: '3', next: null}
```

---

# Shift

- removing a new node from the beginning of the list.

## Shifting pseudocode

- If there are no nodes, return undefined
- Store the current head property in a variable
- Set the head property to be the current head's next property
- Decrement the length by 1
- Return the value of the node removed

```js
class Node{
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

class SinglyLinkedList{
    constructor(){
        this.length = 0;
        this.head = null;
        this.tail = null;
    }
    push(value) {
      const newNode = new Node(value);

      // If there is no head yet let's make new node a head.
      if (!this.head) {
        this.head = newNode;
        this.tail = newNode;
      } else { // Attach new node to the end of linked list.
        this.tail.next = newNode;
        this.tail = newNode;
      }
      this.length++;
      return this;

      }
    shift() {
        if(!this.head) return undefined;

        let currentHead = this.head;
        this.head = this.head.next;
        this.length--;
        return currentHead;
    }
}

var list = new SinglyLinkedList()

list.push("1")
list.push("2")
list.push("3")
list.push("4")

list.shift();  // {val: '1', next: Node}

list;
head: Node {val: '2', next: Node}
length: 3
tail: Node {val: '4', next: null}
```

# unshifting

- Adding a new node to the **beginning** of the Linked List.

## Unshifting pseudocode

- This function should accept a value
- Create a new node using the value passed to the function
- If there is no head property on the list, set the head and tail to be the newly created node
- Otherwise set the newly created node's next property to be the current head property on the list
- Set the head property on the list to be that newly created node
- Increment the length of the list by 1
- Return the linked list

```js
class Node {
  constructor(val) {
    this.val = val
    this.next = null
  }
}

class SinglyLinkedList {
  constructor() {
    this.length = 0
    this.head = null
    this.tail = null
  }
  unshift(val) {
    // create new node
    const newNode = new Node(val)

    if (!this.head) {
      // if there was nothing in the list
      this.head = newNode
      this.tail = newNode
    } else {
      newNode.next = this.head // set newly created nodes next node to be this.head
      this.head = newNode // set previous head to newNode
    }
    this.length++ // increment the length
    return this
  }
}

var list = new SinglyLinkedList()

list.push('1')
list.push('2')
list.push('3')
list.push('4')

list.unshift(20) // SinglyLinkedList {length: 5, head: Node, tail: Node}

list.head
// next: Node {val: '1', next: Node}
// val: 20
```

# Get

- Retrieving a **node** by it's **position** in the Linked List.

## Get Pseudocode

- This function should accept an index
- If the index is less than zero or greater than or equal to the length of the list, return null
- Loop through the list until you reach the index and return the node at that specific index

```js
class Node {
  constructor(val) {
    this.val = val
    this.next = null
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }
  get(index) {
    if (index < 0 || index >= this.length) return null
    let counter = 0
    let current = this.head
    while (counter !== index) {
      current = current.next
      counter++
    }
    return current
  }
}

var list = new SinglyLinkedList()
list.push('HELLO')
list.push('GOODBYE')
list.push('!')
list.push('<3')
list.push(':)')

console.log(list)

console.log(list.get(3)) // Node { val: '<3', next: Node { val: ':)', next: null } }
```

# Set

- Changing the value of a node based on it's position in the Linked List

## Set Pseudocode

- This function should accept a value and an index
- Use your **get** function to find the specific node.
- If the node is not found, return false
- If the node is found, set the value of that node to be the value passed to the function and return true

```js
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  get(index) {
    if (index < 0 || index >= this.length) return null;
    let counter = 0;
    let current = this.head;
    while (counter !== index) {
      current = current.next;
      counter++;
    }
    return current;
  }
  set(val, index) {
    let nodeFound = this.get(index);
    if (nodeFound === null) return false;
    if (nodeFound) {
      nodeFound.val = val;
    }
    return true;
  }
}

var list = new SinglyLinkedList();
list.push('HELLO');
list.push('GOODBYE');
list.push('!');
list.push('<3');
list.push(':)');

console.log(list.set('Test', 0)); //true ​​​​​at ​​​​​​​​list.set('Test', 0)

console.log(list.head); // Node { val: 'Test',
  next: Node { val: 'GOODBYE', next: Node { val: '!', next: [Object] } } }
```

# Insert

- Adding a node to the Linked List at a **specific position**

## Insert Pseudocode

- If the index is **less than zero** or **greater than the length**, return **false**
- If the index is the same as the length, **push** a new node to the end of the list
- If the index is 0, **unshift** a new node to the start of the list
- Otherwise, using the get method, access the node at the index - 1
- Set the next property on that node to be the new node
- Set the next property on the new node to be the previous next
- Increment the length
- Return true

```js
class Node {
  constructor(val) {
    this.val = val
    this.next = null
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }
  push(val) {
    var newNode = new Node(val)
    if (!this.head) {
      this.head = newNode
      this.tail = this.head
    } else {
      this.tail.next = newNode
      this.tail = newNode
    }
    this.length++
    return this
  }
  unshift(val) {
    var newNode = new Node(val)
    if (!this.head) {
      this.head = newNode
      this.tail = this.head
    } else {
      newNode.next = this.head
      this.head = newNode
    }
    this.length++
    return this
  }
  get(index) {
    if (index < 0 || index >= this.length) return null
    let counter = 0
    let current = this.head
    while (counter !== index) {
      current = current.next
      counter++
    }
    return current
  }
  insert(val, index) {
    if (index < 0 || index > this.length) return false
    if (index === this.length) return this.push(val)
    if (index === 0) return this.unshift(val)

    let newNode = new Node(val)

    let prevNode = this.get(index - 1)
    newNode.next = prevNode.next
    prevNode.next = newNode
    this.length++
    return true
  }
}

var list = new SinglyLinkedList()
list.push('one')
list.push('two')
list.push('three')
list.push('four')
list.push('five')

console.log(list.insert('Test', 5))

console.log(list.get(5))
```

# Remove

- Removes a node from the Link List at a **specific position**.

## Remove Pseudocode

- If the index is less than zero or greater than the length, return undefined
- If the index is the same as the length-1, pop
- If the index is 0, shift
- Otherwise, using the get method, access the node at the index - 1
- Set the next property on that node to be the next of the next node
- Decrement the length
- Return the value of the node removed

```js
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  push(val) {
    var newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
    return this;
  }
  pop() {
    if (!this.head) return undefined;
    var current = this.head;
    var newTail = current;
    while (current.next) {
      newTail = current;
      current = current.next;
    }
    this.tail = newTail;
    this.tail.next = null;
    this.length--;
    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }
    return current;
  }
  shift() {
    if (!this.head) return undefined;
    var currentHead = this.head;
    this.head = currentHead.next;
    this.length--;
    if (this.length === 0) {
      this.tail = null;
    }
    return currentHead;
  }
  unshift(val) {
    var newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
    return this;
  }
  get(index) {
    if (index < 0 || index >= this.length) return null;
    let counter = 0;
    let current = this.head;
    while (counter !== index) {
      current = current.next;
      counter++;
    }
    return current;
  }
  set(val, index) {
    let nodeFound = this.get(index);
    if (nodeFound === null) return false;
    if (nodeFound) {
      nodeFound.val = val;
    }
    return true;
  }
  insert(val, index) {
    if (index < 0 || index > this.length) return false;
    if (index === this.length) return this.push(val);
    if (index === 0) return this.unshift(val);

    let newNode = new Node(val);

    let prevNode = this.get(index - 1);
    newNode.next = prevNode.next;
    prevNode.next = newNode;
    this.length++;
    return true;
  }
  remove(index) {
    if (index < 0 || index >= this.length) return undefined;
    if (index === this.length - 1) return this.pop();
    if (index === 0) return this.shift();
    let prevNode = this.get(index - 1);
    let removedNode = this.get(index);
    prevNode.next = removedNode.next;
    this.length--;
    return removedNode;
  }
}

var list = new SinglyLinkedList();
list.push('one');
list.push('two');
list.push('three');
list.push('four');
list.push('five');

console.log(list.remove(2)); //Node { val: 'two',

console.log(list); // SinglyLinkedList { head: Node { val: 'one', next: Node { val: 'three', next: [Object] } },
  tail: Node { val: 'five', next: null },
  length: 4
```

# Reverse

- Reversing the linked list **in place**. You do not make a copy.

## Reverse Pseudocode

- Swap the head and tail
- Create a variable called next
- Create a variable called prev
- Create a variable called node and initialize it to the head property
- Loop through the list
- Set next to be the next property on whatever node is
- Set the next property on the node to be whatever prev is
- Set prev to be the value of the node variable
- Set the node variable to be the value of the next variable
- Once you have finished looping, return the list

```js
//...
  reverse() {
    let temp = this.head;
    this.head = this.tail;
    this.tail = temp;

    let prevNode = null;
    let nextNode = null;

    for (let i = 0; i < this.length; i++) {
      nextNode = temp.next;
      temp.next = prevNode;
      prevNode = temp;
      temp = nextNode;
    }
    return this;
  }
}

var list = new SinglyLinkedList();
list.push('one');
list.push('two');
list.push('three');
list.push('four');
list.push('five');

console.log(list.reverse());

console.log(list.print()) // [ 'five', 'four', 'three', 'two', 'one' ]
```

# Big O of Single Linked List

- Insertion O(1)

- Removal It depends.... O(1) or O(N)

- Searching O(N).

- Access O(N)

[Big O](https://media.geeksforgeeks.org/wp-content/cdn-uploads/mypic.png)

# Full Code for Singly Linked List

```js
class Node {
  constructor(val) {
    this.val = val
    this.next = null
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }
  push(val) {
    var newNode = new Node(val)
    if (!this.head) {
      this.head = newNode
      this.tail = this.head
    } else {
      this.tail.next = newNode
      this.tail = newNode
    }
    this.length++
    return this
  }
  pop() {
    if (!this.head) return undefined
    var current = this.head
    var newTail = current
    while (current.next) {
      newTail = current
      current = current.next
    }
    this.tail = newTail
    this.tail.next = null
    this.length--
    if (this.length === 0) {
      this.head = null
      this.tail = null
    }
    return current
  }
  shift() {
    if (!this.head) return undefined
    var currentHead = this.head
    this.head = currentHead.next
    this.length--
    if (this.length === 0) {
      this.tail = null
    }
    return currentHead
  }
  unshift(val) {
    var newNode = new Node(val)
    if (!this.head) {
      this.head = newNode
      this.tail = this.head
    } else {
      newNode.next = this.head
      this.head = newNode
    }
    this.length++
    return this
  }
  get(index) {
    if (index < 0 || index >= this.length) return null
    let counter = 0
    let current = this.head
    while (counter !== index) {
      current = current.next
      counter++
    }
    return current
  }
  set(val, index) {
    let nodeFound = this.get(index)
    if (nodeFound === null) return false
    if (nodeFound) {
      nodeFound.val = val
    }
    return true
  }
  insert(val, index) {
    if (index < 0 || index > this.length) return false
    if (index === this.length) return this.push(val)
    if (index === 0) return this.unshift(val)

    let newNode = new Node(val)

    let prevNode = this.get(index - 1)
    newNode.next = prevNode.next
    prevNode.next = newNode
    this.length++
    return true
  }
  remove(index) {
    if (index < 0 || index >= this.length) return undefined
    if (index === this.length - 1) return this.pop()
    if (index === 0) return this.shift()
    let prevNode = this.get(index - 1)
    let removedNode = this.get(index)
    prevNode.next = removedNode.next
    this.length--
    return removedNode
  }
  print() {
    var arr = []
    var current = this.head
    while (current) {
      arr.push(current.val)
      current = current.next
    }
    console.log(arr)
  }
  reverse() {
    let temp = this.head
    this.head = this.tail
    this.tail = temp

    let prevNode = null
    let nextNode = null

    for (let i = 0; i < this.length; i++) {
      nextNode = temp.next
      temp.next = prevNode
      prevNode = temp
      temp = nextNode
    }
    return this
  }
}

var list = new SinglyLinkedList()
```
