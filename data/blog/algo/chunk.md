---
title: Chunked Arrays - JavaScript Algorithms
date: '2022-05-03'
tags: ['Chunk', 'algorithms']
draft: false
summary: Returning a chunk of data with a given size
---

Directions: Given an array and **chunk size**, divide the array into many subarrays where each subarray is of length size.

Examples:

```js
chunk([1, 2, 3, 4], 2) --> [[ 1, 2], [3, 4]]
chunk([1, 2, 3, 4, 5], 2) --> [[ 1, 2], [3, 4], [5]]
chunk([1, 2, 3, 4, 5, 6, 7, 8], 3) --> [[ 1, 2, 3], [4, 5, 6], [7, 8]]
chunk([1, 2, 3, 4, 5], 4) --> [[ 1, 2, 3, 4], [5]]
chunk([1, 2, 3, 4, 5], 10) --> [[ 1, 2, 3, 4, 5]]
```

For the first example, you have an array, and a chunk with a size of 2. Therefore, the array should be broken up into CHUNKS of 2 elements.

# Solution 1:

1. Create empty array to hold chunks called 'chunked'
2. For each element in the array...
   1. retrieve the last element in the chunked array
   2. **IF** last element does not exists, or if its length is equal to the chunk size
      - push a new chunk into the chunked array
   3. **Else** add the current element to the last element in the chunked array

```js
function chunk(array, size) {
  const chunked = []

  for (let char of array) {
    const last = chunked[chunked.length - 1] // get last character in array

    if (!last || last.length === size) {
      //   if no last element, or length of chunk is size,
      chunked.push([char]) // <------------ push a new chunk containing the char to chunked array
    } else {
      last.push(char) // <----------------- push character into the last chunk
    }
  }

  return chunked
}
```

# Solution 2: while-loop & slice()

Slice() Syntax:

```
slice()
slice(start)
slice(start, end)
```

```js
function chunk(array, size) {
  // option 2 with slice()
  const chunked = []
  let index = 0
  while (index < array.length) {
    chunked.push(array.slice(index, index + size))
    index = index + size
  }
  return chunked
}
```
