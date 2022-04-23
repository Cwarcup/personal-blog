---
title: Doubly Linked List
date: '2022-02-26'
tags: ['Data Structures', 'Single Linked List']
draft: true
summary: Methods and implementation of a doubly linked list.
---

[Doubly](https://www.google.com/imgres?imgurl=https%3A%2F%2Fmedia.geeksforgeeks.org%2Fwp-content%2Fcdn-uploads%2Fgq%2F2014%2F03%2FDLL1.png&imgrefurl=https%3A%2F%2Fwww.geeksforgeeks.org%2Fdoubly-linked-list%2F&tbnid=p--mLYo8d-39EM&vet=12ahUKEwjhpYD15Yn2AhXwAzQIHd3xDrQQMygAegUIARDWAQ..i&docid=P-QepajwgwMLsM&w=907&h=186&q=doubly%20linked%20list&ved=2ahUKEwjhpYD15Yn2AhXwAzQIHd3xDrQQMygAegUIARDWAQ)

- The two node links allow traversal of the list in either direction. While adding or removing a node in a doubly linked list requires changing more links than the same operations on a singly linked list, the operations are simpler and potentially more efficient (for nodes other than first nodes) because there is no need to keep track of the previous node during traversal or no need to traverse the list to find the previous node, so that its link can be modified.
- takes up more memory than singly linked list.
- bi-directional.

## Create classes for Doubly Linked List

```js
class Node {
  constructor(val) {
    this.val = val
    this.next = null
    this.prev = null
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }
}
```

### Push - add to end

- Create a new node with the value passed to the function
- If the head property is null set the head and tail to be the newly created node
- If not, set the next property on the tail to be that node
- Set the previous property on the newly created node to be the tail
- Set the tail to be the newly created node
- Increment the length
- Return the Doubly Linked List

```js
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  push(val) {
    let newNode = new Node(val);
    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    this.length++;
    return this;
  }
}

list = new DoublyLinkedList();

list.push('one');
list.push('two');
list.push('three');
list.push('four');

console.log(list);
DoublyLinkedList { head:
   Node { val: 'one',
     next: Node { val: 'two', next: [Object], prev: [Circular] },
     prev: null },
  tail:
   Node { val: 'four',
     next: null,
     prev: Node { val: 'three', next: [Circular], prev: [Object] } },
  length: 4 }
```

## Pop - removing node from the END of list

- If there is no head, return undefined
- Store the current tail in a variable to return later
- If the length is 1, set the head and tail to be null
- Update the tail to be the previous Node.
- Set the newTail's next to null
- Decrement the length
- Return the value removed

```js
pop() {
    if (this.length === 0) return undefined;

    let poppedNode = this.tail;

    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      //Update the tail to be the previous Node.
      this.tail = poppedNode.prev;
      // remove link between newTail and oldTail
      this.tail.next = null;
      // remove link between oldTail and newTail
      poppedNode.prev = null;
    }
    this.length--;
    return poppedNode;
  }

  list = new DoublyLinkedList();

list.push('one');
list.push('two');
list.push('three');
list.push('four');

list.pop();

DoublyLinkedList { head:
   Node { val: 'one',
     next: Node { val: 'two', next: [Object], prev: [Circular] },
     prev: null },
  tail:
   Node { val: 'three',
     next: null,
     prev: Node { val: 'two', next: [Circular], prev: [Object] } },
  length: 3 }

```

## Shift - remove node at beginning of list

- If length is 0, return undefined
- Store the current head property in a variable (we'll - call it old head)
- If the length is one
- set the head to be null
- set the tail to be null
- Update the head to be the next of the old head
- Set the head's prev property to null
- Set the old head's next to null
- Decrement the length
- Return old head

```js
{
  //...
  shift() {
    if (this.length === 0) return undefined;

    let shiftedNode = this.head;

    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = shiftedNode.next;
      this.head.prev = null;
      shiftedNode.next = null;
    }
    this.length--;
    return shiftedNode;
  }
}

list = new DoublyLinkedList();

list.push('one');
list.push('two');
list.push('three');
list.push('four');

list.shift();

list;

// DoublyLinkedList { head:
//    Node { val: 'two',
//      next: Node { val: 'three', next: [Object], prev: [Circular] },
//      prev: null },
//   tail:
//    Node { val: 'four',
//      next: null,
//      prev: Node { val: 'three', next: [Circular], prev: [Object] } },
//   length: 3 }
```

## Unshift - add node to beginning of list

- Create a new node with the value passed to the - function
- If the length is 0
- Set the head to be the new node
- Set the tail to be the new node
- Otherwise
- Set the prev property on the head of the list to be the new node
- Set the next property on the new node to be the head - property
- Update the head to be the new node
- Increment the length
- Return the list

```js
  unshift(val) {
    let newNode = new Node(val);
    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.head.prev = newNode;
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
    return this;
  }

list = new DoublyLinkedList();
list.push('one');
list.push('two');
list.push('three');
list.push('four');

list.unshift('ZERO');

list;
// Node { val: 'ZERO',
//   next:
//    Node { val: 'one',
//      next: Node { val: 'two', next: [Object], prev: [Circular] },
//      prev: [Circular] },
//   prev: null }
```

## GET - accessing a node by its position

- If the index is less than 0 or greater or equal to the length, return null
- If the index is less than or equal to half the length of the list...
- Loop through the list starting from the head and loop - towards the middle
- Return the node once it is found
- If the index is greater than half the length of the list
- ​Loop through the list starting from the tail and loop - towards the middle
- Return the node once it is found

```js
  get(index) {
    if (index >= this.length || index < 0) return null;
    if (index <= this.length / 2) {
      let count = 0;
      let current = this.head;

      while (count !== index) {
        // working from head
        current = current.next;
        count++;
      }
      return current;
    } else {
      // working from tail
      let count = this.length - 1;
      let current = this.tail;
      while (count !== index) {
        current = current.prev;
        count--;
      }
      return current;
    }
  }


list = new DoublyLinkedList();
list.push('one');
list.push('two');
list.push('three');
list.push('four');

list.get(3);

{val: 'three', next: Node, prev: Node} // working from start

```

## SET - replacing the value of a node at a specific index

- Create a variable which is the result of the get method at the index passed to the function
- If the get method returns a valid node, set the value of - that node to be the value passed to the function
- Return true
- Otherwise, return false

```js
  get(index) {
    if (index >= this.length || index < 0) return null;
    if (index <= this.length / 2) {
      let count = 0;
      let current = this.head;

      while (count !== index) {
        // working from head
        current = current.next;
        count++;
      }
      return current;
    } else {
      // working from tail
      let count = this.length - 1;
      let current = this.tail;
      while (count !== index) {
        current = current.prev;
        count--;
      }
      return current;
    }
  }
  set(val, index) {
    let replacedNode = this.get(index);
    if (replacedNode) {
      replacedNode.val = val;
      return true;
    }
    return false;
  }

list = new DoublyLinkedList();
list.push('one');
list.push('two');
list.push('three');
list.push('four');

list.set('TEST SET', 1);

console.log(list);
DoublyLinkedList { head:
   Node { val: 'one',
     next: Node { val: 'TEST SET', next: [Object], prev: [Circular] },
     prev: null },
  tail:
   Node { val: 'four',
     next: null,
     prev: Node { val: 'three', next: [Circular], prev: [Object] } },
  length: 4 }
```

## INSERT - adding a new node in a certain position.

- If the index is less than zero or greater than or equal to the length return false
- If the index is 0, unshift
- If the index is the same as the length, push
- Use the get method to access the index -1
- Set the next and prev properties on the correct nodes to - link everything together
- Increment the length
- Return true

```js
  insert(val, index) {
    if (index < 0 || index > this.length) return false;
    if (index === 0) return this.unshift(val);
    if (index === this.length) return this.push(val);

    let newNode = new Node(val);
    let beforeInsert = this.get(index - 1);
    let afterInsert = beforeInsert.next;

    beforeInsert.next = newNode;
    newNode.prev = beforeInsert;
    newNode.next = afterInsert;
    afterInsert.prev = newNode;
    this.length++;

    return true;
  }


list = new DoublyLinkedList();
list.push('one');
list.push('two');
list.push('three');
list.push('four');

list.insert('INSERT', 1);

console.log(list);

DoublyLinkedList { head:
   Node { val: 'one',
     next: Node { val: 'INSERT', next: [Object], prev: [Circular] },
     prev: null },
  tail:
   Node { val: 'four',
     next: null,
     prev: Node { val: 'three', next: [Circular], prev: [Object] } },
  length: 5 }
```

## REMOVE - remove a node at a specific index

- If the index is less than zero or greater than or equal to the length return undefined
- If the index is 0, shift
- If the index is the same as the length-1, pop
- Use the get method to retrieve the item to be removed
- Update the next and prev properties to remove the found - node from the list
- Set next and prev to null on the found node
- Decrement the length
- Return the removed node.

```js
  remove(index) {
    if (index < 0 || index > this.length) return undefined;
    if (index === 0) return this.shift();
    if (index === this.length - 1) return this.pop();

    let removedNode = this.get(index);
    let beforeRemove = removedNode.prev;
    let afterRemove = removedNode.next;

    beforeRemove.next = afterRemove;
    afterRemove.prev = beforeRemove;
    removedNode.next = null;
    removedNode.prev = null;
    this.length--;
    return removedNode;
  }


list = new DoublyLinkedList();
list.push('one');
list.push('two');
list.push('three');
list.push('four');

list.remove(1);

console.log(list);

DoublyLinkedList { head:
   Node { val: 'one',
     next: Node { val: 'three', next: [Object], prev: [Circular] },
     prev: null },
  tail:
   Node { val: 'four',
     next: null,
     prev: Node { val: 'three', next: [Circular], prev: [Object] } },
  length: 3 }

```

### Big O DoublyLinkedList

- Insertion = O(1)
- Removal = O(1)
- Searching = O(N)
- Access = O(N)

### Summary

- Doubly Linked Lists are almost identical to Singly
- Linked Lists except there is an additional pointer to previous nodes
- Better than Singly Linked Lists for finding nodes and can be done in half the time!
- However, they do take up more memory considering the extra pointer
- Doubly linked lists are used to implement other data structures and certain types of caches

Full Code for Doubly Linked List:

```js
class Node {
  constructor(val) {
    this.val = val
    this.next = null
    this.prev = null
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }
  push(val) {
    let newNode = new Node(val)
    if (this.length === 0) {
      this.head = newNode
      this.tail = newNode
    } else {
      this.tail.next = newNode
      newNode.prev = this.tail
      this.tail = newNode
    }
    this.length++
    return this
  }
  pop() {
    if (this.length === 0) return undefined

    let poppedNode = this.tail

    if (this.length === 1) {
      this.head = null
      this.tail = null
    } else {
      //Update the tail to be the previous Node.
      this.tail = poppedNode.prev
      // remove link between newTail and oldTail
      this.tail.next = null
      // remove link between oldTail and newTail
      poppedNode.prev = null
    }
    this.length--
    return poppedNode
  }
  shift() {
    if (this.length === 0) return undefined

    let shiftedNode = this.head

    if (this.length === 1) {
      this.head = null
      this.tail = null
    } else {
      this.head = shiftedNode.next
      this.head.prev = null
      shiftedNode.next = null
    }
    this.length--
    return shiftedNode
  }
  unshift(val) {
    let newNode = new Node(val)
    if (this.length === 0) {
      this.head = newNode
      this.tail = newNode
    } else {
      this.head.prev = newNode
      newNode.next = this.head
      this.head = newNode
    }
    this.length++
    return this
  }
  get(index) {
    if (index >= this.length || index < 0) return null
    if (index <= this.length / 2) {
      let count = 0
      let current = this.head

      while (count !== index) {
        // working from head
        current = current.next
        count++
      }
      return current
    } else {
      // working from tail
      let count = this.length - 1
      let current = this.tail
      while (count !== index) {
        current = current.prev
        count--
      }
      return current
    }
  }
  set(val, index) {
    let replacedNode = this.get(index)
    if (replacedNode) {
      replacedNode.val = val
      return true
    }
    return false
  }
  insert(val, index) {
    if (index < 0 || index > this.length) return false
    if (index === 0) return this.unshift(val)
    if (index === this.length) return this.push(val)

    let newNode = new Node(val)
    let beforeInsert = this.get(index - 1)
    let afterInsert = beforeInsert.next

    beforeInsert.next = newNode
    newNode.prev = beforeInsert
    newNode.next = afterInsert
    afterInsert.prev = newNode
    this.length++

    return true
  }
  remove(index) {
    if (index < 0 || index > this.length) return undefined
    if (index === 0) return this.shift()
    if (index === this.length - 1) return this.pop()

    let removedNode = this.get(index)
    let beforeRemove = removedNode.prev
    let afterRemove = removedNode.next

    beforeRemove.next = afterRemove
    afterRemove.prev = beforeRemove
    removedNode.next = null
    removedNode.prev = null
    this.length--
    return removedNode
  }
  reverse() {
    let currNode = this.head
    let prevNode = null
    let nextNode = null

    while (currNode) {
      // Store next node.
      nextNode = currNode.next
      prevNode = currNode.prev

      // Change next node of the current node so it would link to previous node.
      currNode.next = prevNode
      currNode.prev = nextNode

      // Move prevNode and currNode nodes one step forward.
      prevNode = currNode
      currNode = nextNode
    }

    // Reset head and tail.
    this.tail = this.head
    this.head = prevNode

    return this
  }
}

list = new DoublyLinkedList()
list.push('one')
list.push('two')
list.push('three')
list.push('four')
```
