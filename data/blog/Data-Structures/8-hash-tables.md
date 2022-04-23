---
title: Doubly Linked List
date: '2022-02-26'
tags: ['Data Structures', 'Single Linked List']
draft: true
summary: Methods and implementation of a doubly linked list.
---

[Slides](https://cs.slides.com/colt_steele/hash-tables)

#### What is a hash table?

- They are used to store key-value pairs.
- keys are **NOT** ordered. (unlike in arrays)
- are **fast** for adding, finding, and removing values.
- are very commonly used because of their speed.

Are all key-values data stores.

- JS has Objects and Maps
- Python has Dictionaries
- Java, Go, and Scala have Maps
- Ruby has Hashes

Pretend these built in hash tables do not exist...

#### What makes a good hash?

1. Fast (constant time)
2. Does NOT cluster outputs at specific indices, but distributes uniformly
3. deterministic (same input results in same output)

### Writing your first hash function

How would you convert a string into a number?

- can use UTF characters

`"a".charCodeAt(0) // returns 97`

```
function hash(key, arrayLen) {
  let total = 0;
  for (let char of key) {
    // map "a" to 1, "b" to 2, "c" to 3, etc.
    let value = char.charCodeAt(0) - 96
    total = (total + value) % arrayLen;
  }
  return total;
}
```

Problem with our current hash:

- only hashes strings (wont worry about this yet)
- not constant time - linear in key length
- is not very random

---

Make it faster:

- add in a minimum. Will only loop the first 100 characters

```
function hash(key, arrayLen) {
  let total = 0;
  let WEIRD_PRIME = 31;
  for (let i = 0; i < Math.min(key.length, 100); i++) {
    let char = key[i];
    let value = char.charCodeAt(0) - 96
    total = (total * WEIRD_PRIME + value) % arrayLen;
  }
  return total;
}
```

The prime number in the hash is helpful in spreading out the keys more **uniformly**.

It's also helpful if the array that you're putting values into has a prime length.

Using primes results in **less collisions**

---

#### How do we handle collisions?

```
function hash(key, arrayLen) {
  let total = 0;
  let WEIRD_PRIME = 31;
  for (let i = 0; i < Math.min(key.length, 100); i++) {
    let char = key[i];
    let value = char.charCodeAt(0) - 96;
    total = (total * WEIRD_PRIME + value) % arrayLen;
  }
  return total;
}

console.log(hash('pink', 13)); // 5
console.log(hash('cyan', 13)); // 5
```

## Separate Chaining

- With separate chaining, at each index in our array we store values using a more sophisticated data structure (e.g. an array or a linked list).

- This allows us to store multiple key-value pairs at the same index.

So if you were looking for `salmon`, you'd hash `salmon`, get 4. Then loop through the array or linked list at 4 to find the desired value.

## Linear Probing

- With linear probing, when we find a collision, we search through the array to find the next empty slot.

- Unlike with separate chaining, this allows us to store a single key-value at each index.

## Hash Table Class

```
class HashTable {
  constructor(size=53){
    this.keyMap = new Array(size);
  }

  _hash(key) {
    let total = 0;
    let WEIRD_PRIME = 31;
    for (let i = 0; i < Math.min(key.length, 100); i++) {
      let char = key[i];
      let value = char.charCodeAt(0) - 96
      total = (total * WEIRD_PRIME + value) % this.keyMap.length;
    }
    return total;
  }
}
```

### Set / Get Methods

Set:

1. accepts a key and a value
2. hashes a key
3. stores the key-value pair in the hash table array via separate chaining

```
  set(key, value) {
    let index = this._hash(key);
    if (!this.keyMap[index]) {
      // check to see if nothing at this index
      // if nothing there, create new array
      this.keyMap[index] = [];
    }
    // now push key-value pair into the array ata given index
    this.keyMap[index].push([key, value]);
  }
```

Get:

1. accepts a key
2. hashes the key, get the hash back
3. retrieves the key-value pair in the hash table
4. if the key is not found, it returns `undefined`

```
  get(key) {
    // hash the key to get an index
    let index = this._hash(key);
    //check to see if anything is at that index
    if (this.keyMap[index]) {
      for (let i = 0; i < this.keyMap[index].length; i++) {
        // comparing the first key to the desired key
        if (this.keyMap[index][i][0] === key) {
          // if match found, return the value
          return this.keyMap[index][i][1];
        }
      }
    }
    return undefined; //nothing at that index for the given hash
  }

let ht = new HashTable();

ht.set('maroon', '#800000');
ht.set('yellow', '#FFFF00');
ht.set('olive', '#808000');
ht.set('salmon', '#FA8072');
ht.set('lightcoral', '#F08080');
ht.set('mediumvioletred', '#C71585');

console.log(ht.get('salmon')); // #FA8072
```

## Keys and Values Methods

Need to also think of how we handle duplicate data.

Values: Loops through the hash table array and returns an array of values in the table

```
  values() {
    let valuesArr = [];
    //need to loop over entire keyMap
    for (let i = 0; i < this.keyMap.length; i++) {
      if (this.keyMap[i]) {
        for (let j = 0; j < this.keyMap[i].length; j++)
          if (!valuesArr.includes(this.keyMap[i][j][1])) {
            //prevents duplicates
            valuesArr.push(this.keyMap[i][j][1]);
          }
      }
    }
    return valuesArr;
  }

  let ht = new HashTable();

ht.set('maroon', '#800000');
ht.set('yellow', '#FFFF00');
ht.set('olive', '#808000');
ht.set('salmon', '#FA8072');
ht.set('lightcoral', '#F08080');
ht.set('mediumvioletred', '#C71585');
ht.set('purple', '#C71585');
ht.set('violet', '#C71585'); // will get duplicates

console.log(ht.values());

// [ '#FFFF00', '#808000', '#C71585', '#800000', '#FA8072', '#F08080' ]
```

Keys: Loops through the hash table array and returns an array of keys in the table

```
  keys() {
    let keysArr = [];
    //need to loop over entire keyMap
    for (let i = 0; i < this.keyMap.length; i++) {
      if (this.keyMap[i]) {
        for (let j = 0; j < this.keyMap[i].length; j++)
          if (!keysArr.includes(this.keyMap[i][j][0])) {
            //prevents duplicates
            keysArr.push(this.keyMap[i][j][0]);
          }
      }
    }
    return keysArr;
  }

let ht = new HashTable();

ht.set('maroon', '#800000');
ht.set('yellow', '#FFFF00');
ht.set('olive', '#808000');
ht.set('salmon', '#FA8072');
ht.set('lightcoral', '#F08080');
ht.set('mediumvioletred', '#C71585');
ht.set('purple', '#C71585');
ht.set('violet', '#C71585'); // will get duplicates


console.log(ht.keys());
//
[ 'yellow',
  'olive',
  'violet',
  'maroon',
  'salmon',
  'lightcoral',
  'mediumvioletred',
  'purple' ]
```

---

entire hash

```
class HashTable {
  constructor(size = 53) {
    this.keyMap = new Array(size);
  }

  _hash(key) {
    let total = 0;
    let WEIRD_PRIME = 31;
    for (let i = 0; i < Math.min(key.length, 100); i++) {
      let char = key[i];
      let value = char.charCodeAt(0) - 96;
      total = (total * WEIRD_PRIME + value) % this.keyMap.length;
    }
    return total;
  }
  set(key, value) {
    let index = this._hash(key);
    if (!this.keyMap[index]) {
      // check to see if nothing at this index
      // if nothing there, create new array
      this.keyMap[index] = [];
    }
    // now push key-value pair into the array ata given index
    this.keyMap[index].push([key, value]);
  }
  get(key) {
    let index = this._hash(key);
    if (this.keyMap[index]) {
      for (let i = 0; i < this.keyMap[index].length; i++) {
        if (this.keyMap[index][i][0] === key) {
          return this.keyMap[index][i][1];
        }
      }
    }
    return undefined; //nothing at that index for the given hash
  }
  values() {
    let valuesArr = [];
    //need to loop over entire keyMap
    for (let i = 0; i < this.keyMap.length; i++) {
      if (this.keyMap[i]) {
        for (let j = 0; j < this.keyMap[i].length; j++)
          if (!valuesArr.includes(this.keyMap[i][j][1])) {
            //prevents duplicates
            valuesArr.push(this.keyMap[i][j][1]);
          }
      }
    }
    return valuesArr;
  }
  keys() {
    let keysArr = [];
    //need to loop over entire keyMap
    for (let i = 0; i < this.keyMap.length; i++) {
      if (this.keyMap[i]) {
        for (let j = 0; j < this.keyMap[i].length; j++)
          if (!keysArr.includes(this.keyMap[i][j][0])) {
            //prevents duplicates
            keysArr.push(this.keyMap[i][j][0]);
          }
      }
    }
    return keysArr;
  }
}

let ht = new HashTable();

ht.set('maroon', '#800000');
ht.set('yellow', '#FFFF00');
ht.set('olive', '#808000');
ht.set('salmon', '#FA8072');
ht.set('lightcoral', '#F08080');
ht.set('mediumvioletred', '#C71585');
ht.set('purple', '#C71585');
ht.set('violet', '#C71585');
```

## Big O of Hash Tables

- Insert: O(1)
- Deletion: O(1)
- Access: O(1)

---

Summary:

Hash tables are collections of key-value pairs

Hash tables can find values quickly given a key

Hash tables can add new key-values quickly

Hash tables store data in a large array, and work by hashing the keys

A good hash should be fast, distribute keys uniformly, and be deterministic

Separate chaining and linear probing are two strategies used to deal with two keys that hash to the same index
