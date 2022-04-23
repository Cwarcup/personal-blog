---
title: Doubly Linked List
date: '2022-02-26'
tags: ['Data Structures', 'Single Linked List']
draft: true
summary: Methods and implementation of a doubly linked list.
---

In JavaScript, hash tables are known as Objects.
Get to set a key and value.
Key is used as the index to find the value.

Pros:

- fast load ups
- fast inserts
- flexible keys

Cons:

- unordered
- slow key iteration

## Hash Functions

Have many types of hash functions. You give it an input, and generates a value of fixed length.

It is **idempotent**: given an input, the output will always be the same.
`Hello` --> MD5 Hash --> `8b1a9953c4611296a827abf8c47804d7`

Because it is not ordered, we do not need to rearrange indexes.

```js
let user = {
  age: 28,
  name: 'Curtis',
  magic: true,
  scream: function() {
    console.log('aaaaaahhhhhhh!');
  }
}

console.log(user.age) // O(1)
user.spell = 'abra kadabra'; // O(1)
console.log(user)
returns
 {
  age: 28,
  name: 'Curtis',
  magic: true,
  scream: [Function: scream],
  spell: 'abra kadabra'
}
```

## Hash Collisions

As soon as we hashed `Sandra dee` it became the same address space as `John Smith`. This ia **collision**. We need a way of storing both users in this address space. This can not be avoided. We have limited memory, and can have large amounts of data.

There are multiple ways to handle collisions. Downside is, hashes could be slower O(n) if collisions occur.

## Implementing A Hash Table

```js
class HashTable {
  constructor(size) {
    this.data = new Array(size);
  }
  //create an array to hold the key/values.

  _hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash + key.charCodeAt(i) * i) % this.data.length
    }
    return hash;
  }

  set(key, value) {
    let address = this._hash(key);
    if (!this.data[address]) {
      this.data[address] = [];
      this.data[address].push(key, value)
      console.log(this.data)
    } else {
      this.data[address].push(key, value)
      return this.data
    }
  }
}

const myHashTable = new HashTable(50); //want 50 spaces
myHashTable.set('grapes', 10000)
myHashTable.set('apples', 9)
// returns
[
  <23 empty items>,
  [ 'grapes', 10000 ],
  <15 empty items>,
  [ 'apples', 9 ],
  <10 empty items>
]

```

Can add a `get()` method

```js
  get(key) {
    let address = this._hash(key); //where we want to go in our table
    const currentBucket = this.data[address];
    console.log(currentBucket)

  }
myHashTable.get('apples') //[ 'apples', 9 ] but we just want to value (thats what get does)
```

## First Recurring Character

```js
function firstRecurringCharacter(input) {
  for (let i = 0; i < input.length; i++) {
    //grabs a single number
    for (let j = i + 1; j < input.length; j++) {
      // loops through to compare to another number in the array
      if (input[i] === input[j]) {
        return input[i]
      }
    }
  }
  return undefined
}

console.log(firstRecurringCharacter([7, 1, 1, 2, 3, 5, 1, 2, 4])) // 1
```

Better approach:

```js
function firstRecurringCharacter2(input) {
  let map = {}
  for (let i = 0; i < input.length; i++) {
    if (map[input[i]] !== undefined) {
      //if our key exists in our hash table, stop looping and return the existing key
      return input[i]
    } else {
      map[input[i]] = i
    }
  }
  console.log(map)
  return undefined
}

console.log(firstRecurringCharacter2([2, 5, 1, 2, 3, 5, 1, 2, 4])) //2
```
