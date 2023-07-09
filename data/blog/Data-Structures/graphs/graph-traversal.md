---
title: Doubly Linked List
date: '2022-02-26'
tags: ['Data Structures', 'Single Linked List']
draft: true
summary: Methods and implementation of a doubly linked list.
---

- Visiting/Updating/Checking each vertex in a graph.
- Since we do not have a dedicated starting point, we need to define one.

### Graph Traversal Uses

- Peer to peer networking
- Web crawlers
- Finding "closest" matches/recommendations
- Shortest path problems
  - GPS Navigation
  - Solving mazes
  - AI (shortest path to win the game)

## Depth First Search Traversal

- explore as far as possible down one brach before "backtracking".
- general idea is we prioritizing children of a given node before we visit siblings.
- in graphs we have NO ROOT NODE.
- follow a graph down, and visit neighbors before you backtrack.

### Depth First Search Recursive

```js
 DFS(vertex):
    if vertex is empty // base case
        return (this is base case)
    add vertex to results list // build an array and add results
    mark vertex as visited // can do this by setting it to true in the results list
    for each neighbor in vertex's neighbors:
       if neighbor is not visited:
          recursively call DFS on neighbor
```

Here is what we have:

```js
class Graph {
  constructor() {
    this.adjList = {};
  }
  addVertex(vertex) {
    if (!this.adjList[vertex]) this.adjList[vertex] = [];
  }
  addEdge(v1, v2) {
    this.adjList[v1].push(v2);
    this.adjList[v2].push(v1);
  }
  removeEdge(vertex1, vertex2) {
    this.adjList[vertex1] = this.adjList[vertex1].filter((v) => v !== vertex2);
    this.adjList[vertex2] = this.adjList[vertex2].filter((v) => v !== vertex1);
  }
  removeVertex(vertex) {
    while (this.adjList[vertex].length) {
      const adjacentVertex = this.adjList[vertex].pop();
      this.removeEdge(vertex, adjacentVertex);
    }
    delete this.adjList[vertex];
  }
  depthFirstRecursive(start) {}
}

let g = new Graph();

g.addVertex('A');
g.addVertex('B');
g.addVertex('C');
g.addVertex('D');
g.addVertex('E');
g.addVertex('F');

g.addEdge('A', 'B');
g.addEdge('A', 'C');
g.addEdge('B', 'D');
g.addEdge('C', 'E');
g.addEdge('D', 'E');
g.addEdge('D', 'F');
g.addEdge('E', 'F');

console.log(g);
Graph { adjList:
   { A: [ 'B', 'C' ],
     B: [ 'A', 'D' ],
     C: [ 'A', 'E' ],
     D: [ 'B', 'E', 'F' ],
     E: [ 'C', 'D', 'F' ],
     F: [ 'D', 'E' ] } }

//          A
//        /   \
//       B     C
//       |     |
//       D --- E
//        \   /
//          F
```

- The function should accept a starting node
- Create a list to store the end result, to be returned at - the very end
- Create an object to store visited vertices
- Create a helper function which accepts a vertex
- The helper function should return early if the vertex is empty
- The helper function should place the vertex it accepts into the visited object and push that vertex into the - result array.
- Loop over all of the values in the adjacencyList for that vertex
- If any of those values have not been visited, recursively invoke the helper function with that vertex
- Invoke the helper function with the starting vertex
- Return the result array

```js
// start...
  depthFirstRecursive(start) {
    const results = [];
    const visited = {};
    const adjList = this.adjList;
    function dfs(vertex) {
      if (!vertex) return null;
      visited[vertex] = true;
      results.push(vertex);
      console.log(adjList[vertex]); // [ 'B', 'C' ]
    }
    dfs(start);
  }

// final


  depthFirstRecursive(start) {
    const results = [];
    const visited = {};
    const adjList = this.adjList;
    function dfs(vertex) {
      if (!vertex) return null;
      visited[vertex] = true;
      results.push(vertex);
      adjList[vertex].forEach((neighbor) => {
        if (!visited[neighbor]) {
          return dfs(neighbor);
        }
      });
    }
    dfs(start);
    return results;
  }

  console.log(g.depthFirstRecursive('A'));

  //
  [ 'A', 'B', 'D', 'E', 'C', 'F' ]
```

## DFS Iteratively

```js
DFS-iterative(start):
    let S be a stack
    S.push(start)
    while S is not empty
        vertex = S.pop()
        if vertex is not labeled as discovered:
            visit vertex (add to result list)
            label vertex as discovered
            for each of vertex's neighbors, N do
                S.push(N)
```

- The function should accept a starting node
- Create a stack to help use keep track of vertices (use a list/array)
  Create a list to store the end result, to be returned at the very end
- Create an object to store visited vertices
- Add the starting vertex to the stack, and mark it visited
- While the stack has something in it:
  - Pop the next vertex from the stack
  - If that vertex hasn't been visited yet:
    - ​Mark it as visited
    - Add it to the result list
    - Push all of its neighbors into the stack

```js
 depthFirstIterative(start) {
    const stack = [start];
    const results = [];
    const visited = {};
    let currentVertex;

    visited[start] = true;
    while (stack.length) {
      console.log(stack);
      currentVertex = stack.pop();
      results.push(currentVertex);
      // now need to access the neighbors of currentVertex
      this.adjList[currentVertex].forEach((neighbor) => {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          stack.push(neighbor);
        }
      });
    }
    return results;
  }

  let g = new Graph();

g.addVertex('A');
g.addVertex('B');
g.addVertex('C');
g.addVertex('D');
g.addVertex('E');
g.addVertex('F');

g.addEdge('A', 'B');
g.addEdge('A', 'C');
g.addEdge('B', 'D');
g.addEdge('C', 'E');
g.addEdge('D', 'E');
g.addEdge('D', 'F');
g.addEdge('E', 'F');

console.log(g);

//          A
//        /   \
//       B     C
//       |     |
//       D --- E
//        \   /
//          F

console.log(g.depthFirstIterative('A'));

//
[ 'A', 'C', 'E', 'F', 'D', 'B' ]

```

## Breadth First Graph Traversal

**Visit neighbors at current depth first!**

- This function should accept a starting vertex
- Create a queue (you can use an array) and place the starting vertex in it
- Create an array to store the nodes visited
- Create an object to store nodes visited
- Mark the starting vertex as visited
- Loop as long as there is anything in the queue
- Remove the first vertex from the queue and push it into the array that stores nodes visited
- Loop over each vertex in the adjacency list for the vertex you are visiting.
- If it is not inside the object that stores nodes visited, mark it as visited and enqueue that vertex
- Once you have finished looping, return the array of visited nodes

```js
  breadthFirst(start) {
    const queue = [start];
    const results = [];
    const visited = {};
    let currentVertex;
    visited[start] = true;

    while (queue.length) {
      currentVertex = queue.shift();
      results.push(currentVertex);

      this.adjList[currentVertex].forEach((neighbor) => {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          queue.push(neighbor);
        }
      });
    }
    return results;
  }

let g = new Graph();

g.addVertex('A');
g.addVertex('B');
g.addVertex('C');
g.addVertex('D');
g.addVertex('E');
g.addVertex('F');

g.addEdge('A', 'B');
g.addEdge('A', 'C');
g.addEdge('B', 'D');
g.addEdge('C', 'E');
g.addEdge('D', 'E');
g.addEdge('D', 'F');
g.addEdge('E', 'F');

console.log(g);

//          A
//        /   \
//       B     C
//       |     |
//       D --- E
//        \   /
//          F

console.log(g.breadthFirst('A'));
// [ 'A', 'B', 'C', 'D', 'E', 'F' ]
```

**Full code**

```js
class Graph {
  constructor() {
    this.adjList = {}
  }
  addVertex(vertex) {
    if (!this.adjList[vertex]) this.adjList[vertex] = []
  }
  addEdge(v1, v2) {
    this.adjList[v1].push(v2)
    this.adjList[v2].push(v1)
  }
  removeEdge(vertex1, vertex2) {
    this.adjList[vertex1] = this.adjList[vertex1].filter((v) => v !== vertex2)
    this.adjList[vertex2] = this.adjList[vertex2].filter((v) => v !== vertex1)
  }
  removeVertex(vertex) {
    while (this.adjList[vertex].length) {
      const adjacentVertex = this.adjList[vertex].pop()
      this.removeEdge(vertex, adjacentVertex)
    }
    delete this.adjList[vertex]
  }
  depthFirstRecursive(start) {
    const results = []
    const visited = {}
    const adjList = this.adjList
    function dfs(vertex) {
      if (!vertex) return null
      visited[vertex] = true
      results.push(vertex)
      adjList[vertex].forEach((neighbor) => {
        if (!visited[neighbor]) {
          return dfs(neighbor)
        }
      })
    }
    dfs(start)
    return results
  }
  depthFirstIterative(start) {
    const stack = [start]
    const results = []
    const visited = {}
    let currentVertex

    visited[start] = true
    while (stack.length) {
      console.log(stack)
      currentVertex = stack.pop()
      results.push(currentVertex)
      // now need to access the neighbors of currentVertex
      this.adjList[currentVertex].forEach((neighbor) => {
        if (!visited[neighbor]) {
          visited[neighbor] = true
          stack.push(neighbor)
        }
      })
    }
    return results
  }
  breadthFirst(start) {
    const queue = [start]
    const results = []
    const visited = {}
    let currentVertex
    visited[start] = true

    while (queue.length) {
      currentVertex = queue.shift()
      results.push(currentVertex)

      this.adjList[currentVertex].forEach((neighbor) => {
        if (!visited[neighbor]) {
          visited[neighbor] = true
          queue.push(neighbor)
        }
      })
    }
    return results
  }
}

let g = new Graph()

g.addVertex('A')
g.addVertex('B')
g.addVertex('C')
g.addVertex('D')
g.addVertex('E')
g.addVertex('F')

g.addEdge('A', 'B')
g.addEdge('A', 'C')
g.addEdge('B', 'D')
g.addEdge('C', 'E')
g.addEdge('D', 'E')
g.addEdge('D', 'F')
g.addEdge('E', 'F')
```
