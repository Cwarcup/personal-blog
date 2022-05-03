---
title: Arrays
date: '2022-02-26'
tags: ['Data Structures', 'Single Linked List']
draft: true
summary: Arrays
---

Sometimes called lists and orders data sequentially. If you need to iterate over some data, one by one, arrays are the best choice.

# When to use an array

Pros:

- fast loop ups: good if you know which index you want to look up
- fast push/pop: adding/removing to/from the end of array
- ordered

Cons:

- slow inserts: have to shift the array
- slow deleted
- fixed size (if using static arrays)

```js
const string = ['a', 'b', 'c', 'd']
//4*4 = 16 bytes of storage.
```

We are basically storing 'a', 'b', 'c', 'd' sequentially in ram.

```js
//push
strings.push('e')
console.log(strings) //[ 'a', 'b', 'c', 'd', 'e' ]

//pop
strings.pop()
console.log(strings)
```

Both `pop` and `push` are `O(1)` operations because we are not looping through anything. Just adding one thing to the end.

What if we wanted to add something at the beginning of the array?

```js
//unshift
strings.unshift('x')
console.log(strings) // [ 'x', 'a', 'b', 'c', 'd' ]
```

What will happen to the time complexity of this operation?
This operation will be slower than the previous. Remember, strings are stored using indexes. When we use unshift, we are changing the index of all the numbers. You have to iterate or loop through all the indexes.
This makes the operation **O(n)**.

What about adding something in the middle of the array? `splice()`.

```js
//splice()
strings.splice(2, 0, 'Alien')
console.log(strings) // [ 'a', 'b', 'Alien', 'c', 'd' ]
```

Basically tells go to index of 2, do not delete anything, and insert `'alien'`. We have shifted `c` and `d`. Therefore, our BigO is O(n).

Now this is why lookup() and push() are fast for arrays, and why insert() and delete() are slower. Therefore, it may not be best to use arrays if you need to insert or delete all the time.

## Static vs Dynamic Arrays

**Static** arrays limitations:

- are fixed in size. Meaning, you need to specify the number of elements your array will hold ahead of time.

**Dynamic** Arrays

- allow you to copy and rebuild an array at a new location. Therefore, if we need to add another item to our array, we copy the array, allocate more memory, paste the new item + the new item.

In JavaScript we do not need to deal with static arrays. By default JS uses dynamic.

## Implementing an Array

How do we actually build an array? In JavaScript, arrays are just objects with integer based keys.

```js
class MyArray {
  constructor() {
    // initially run
    this.length = 0
    this.data = {}
  }
  get(index) {
    // is a method. Could be named anything.
    return this.data[index] //this.data refers to the data we created in the constructor.
  }
}

const newArray = new MyArray()

console.log(newArray) // MyArray { length: 0, data: {} }
console.log(newArray.get(0)) // undefined. Because we have no items in the object.
```

Lets add a `push()` method: add an item to the end of the array.

```js
class MyArray {
  constructor() {
    // initially run
    this.length = 0
    this.data = {}
  }
  get(index) {
    return this.data[index] //this.data refers to the data we created in the constructor.
  }
  push(item) {
    this.data[this.length] = item
    //adding item to data, at index of this.length
    this.length++ //increasing the number of indexes.
    return this.length
  }
}

const newArray = new MyArray()
newArray.push('hi')
console.log(newArray) // MyArray { length: 1, data: { '0': 'hi' } }
```

We have added an item `'hi'` with index of 0 to our array.

Lets add the `pop()` method: delete the last item in the array.

```js
  pop() {
    const lastItem = this.data[this.length-1]; //we want the last item in the data
    delete this.data[this.length-1];
    this.length--; //shorten the array
    return lastItem;
  }

const newArray = new MyArray();

newArray.push('hi')
newArray.push('you');
newArray.push('!');
console.log(newArray) // MyArray { length: 3, data: { '0': 'hi', '1': 'you', '2': '!' } }

newArray.pop();
console.log(newArray) // MyArray { length: 2, data: { '0': 'hi', '1': 'you' } }
```

`Delete()` Method: Deletes a specific item using a specific index. Will need to change the index number of the remaining items.

```js
delete(index) {
    const item = this.data[index];
    // now we need to create a function to shift the index of all the other data types by one.
    this.shiftItems(index)
  }

  shiftItems(index) {
    for (let i = index; i < this.length -1; i++) { //here we are saying, start at the index we start the delete from and iterate through it until the for loop ends.
      this.data[i] = this.data[i+1]
      // take the previous index and add 1 to the index.
    }
    delete this.data[this.length-1]; // to delete the last item in the array.
    this.length--; //shorten the array length.
  }

console.log(myArray) // MyArray { length: 3, data: { '0': 'hi', '1': 'you', '2': '!' } }
newArray.delete(1) // MyArray { length: 2, data: { '0': 'hi', '1': '!' } }

```

## Exercise: Create a function that reverses a string.

1. check of the input. Need to make sure it's actually a string.

```js
function reverse(str) {
  if (!str || str.length < 2 || typeof str != 'string') {
    return 'hmm...this is not good.'
  }

  const backwards = []
  const totalItems = str.length - 1
  for (let i = totalItems; i >= 0; i--) {
    backwards.push(str[i])
    // here we are pushing index's, starting at the str.length -1.
  }
  return backwards.join('')
}

console.log(reverse('Curtis is cool')) //looc si sitruC
```

You can also do this using built in methods:

```js
function reverse2(str) {
  return str.split('').reverse().join('')
}

console.log(reverse2('Dog barks')) //skrab goD
```

## Merge Sorted Arrays

`mergeSortedArrays([0,3,4,31], [3,4,6,30]);`

```js
arr1 = [0, 3, 4, 31]
arr2 = [3, 4, 6, 30]

function mergeSortedArrays(arr1, arr2) {
  return arr1.concat(arr2).sort(function compareFn(a, b) {
    return a - b
  })
}

console.log(mergeSortedArrays([0, 3, 4, 31], [3, 4, 6, 30]))
//[0, 3,  3,  4, 4, 6, 30, 31]
```
