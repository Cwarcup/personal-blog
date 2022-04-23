---
title: Doubly Linked List
date: '2022-02-26'
tags: ['Data Structures', 'Single Linked List']
draft: true
summary: Methods and implementation of a doubly linked list.
---

A graph data structure consists of a finite (and possibly mutable) set of vertices or nodes or points, together with a set of unordered pairs of these vertices for an undirected graph or a set of ordered pairs for a directed graph.

Is a collection of nodes and connections between these nodes.

There is no parent node, starting place.

## Types of Graphs

### Terminology

- Vertex - a node
- Edge - connection between nodes
- Weighted/Unweighted - values assigned to distances between vertices
- Directed/Undirected - directions assigned to distances between vertices

![direction](https://sites.google.com/a/cs.christuniversity.in/discrete-mathematics-lectures/_/rsrc/1409480658489/graphs/directed-and-undirected-graph/dir.png)

Undirected = can go from A to B, or B to A.

Directed Graph - often represented with arrows. C is basically a dead end.

![weighted graph](https://nycomdorics.com/wp-content/uploads/2020/03/graph_example2.png)

Unweighted - each edge has no value assigned with it.
Weighted graph - has information about the connection between vertices.

## Adjacency Matrix

Data we are going to represented.

Can use a table.
0 = no connection
1 = has connection

## Adjacency List

Uses an array or list to store the **edges**. Can see there's a that `0` has an edge with `5` and `1`.

What if our nodes are not numeric? What is they are string? We use a **hash table**

Will be going forward using an **ADJACENCY LIST** because most real world data looks like this (larger and more sparse).

# Graph Class for undirected graph

```js
class Graph {
  constructor() {
    this.adjacencyList = {}
  }
}
```

## Add a Vertex

- write a method called addVertex, which accepts a name of a vertex.
- it should add a key to the adjacency list with the name of the vertex and set its value to be an empty array.

```js
class Graph {
  constructor() {
    this.adjacencyList = {}
  }
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = []
  }
}

let g = new Graph()
g.addVertex('Tokyo')
g.addVertex('San Francisco')
g.addVertex('New York')
```

## Adding an EDGE

- edge represents a connection between vertexes.
- should accept two vertices.
- the function should find in the adjacency list the **key of vertex 1** and **push** **vertex2 **to the array.
- The function should find in the adjacency list the key of vertex2 and push vertex1 to the array.

```js
class Graph {
  constructor() {
    this.adjacencyList = {};
  }
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  }
  addEdge(v1, v2) {
    this.adjacencyList[v1].push(v2);
    this.adjacencyList[v2].push(v1);
  }
}

let g = new Graph();
g.addVertex('Dallas');
g.addVertex('Tokyo');
g.addVertex('Aspen');

g.addEdge('Tokyo', 'Dallas');

console.log(g);
//
{ Dallas: [ 'Tokyo' ], Tokyo: [ 'Dallas' ], Aspen: [] }
```

## Removing an edge

- This function should accept two vertices, we'll call them vertex1 and vertex2
- The function should reassign the key of vertex1 to be an array that does not contain vertex2
- The function should reassign the key of vertex2 to be an array that does not contain vertex1

```js
class Graph {
  constructor() {
    this.adjacencyList = {};
  }
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  }
  addEdge(v1, v2) {
    this.adjacencyList[v1].push(v2);
    this.adjacencyList[v2].push(v1);
  }
  removeEdge(vertex1, vertex2) {
    this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(
      (v) => v !== vertex2
    );
    this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(
      (v) => v !== vertex1
    );
    //keep everything where it is NOT equal to vertex2
  }
}

let g = new Graph();
g.addVertex('Dallas');
g.addVertex('Tokyo');
g.addVertex('Aspen');

g.addEdge('Tokyo', 'Dallas');
g.addEdge('Tokyo', 'Aspen');

console.log(g);
//
{
  Dallas: [ 'Tokyo' ],
  Tokyo: [ 'Dallas', 'Aspen' ],
  Aspen: [ 'Tokyo' ]
  }

g.removeEdge('Tokyo', 'Dallas');
g.removeEdge('Tokyo', 'Aspen');

console.log(g); // { Dallas: [], Tokyo: [], Aspen: [] }

```

## Removing a vertex

- will need to remove the vertex AND the edge between them.
- The function should accept a vertex to remove
- The function should loop as long as there are any other vertices in the adjacency list for that vertex
- Inside of the loop, call our removeEdge function with the vertex we are removing and any values in the adjacency list for that vertex
- delete the key in the adjacency list for that vertex

```js
    removeVertex(vertex){
        while(this.adjacencyList[vertex].length){
            const adjacentVertex = this.adjacencyList[vertex].pop();
            this.removeEdge(vertex, adjacentVertex);
        }
        delete this.adjacencyList[vertex]
    }

    let g = new Graph();
g.addVertex("Dallas");
g.addVertex("Tokyo");
g.addVertex("Aspen");
g.addVertex("Los Angeles");
g.addVertex("Hong Kong")
g.addEdge("Dallas", "Tokyo");
g.addEdge("Dallas", "Aspen");
g.addEdge("Hong Kong", "Tokyo");
g.addEdge("Hong Kong", "Dallas");
g.addEdge("Los Angeles", "Hong Kong");
g.addEdge("Los Angeles", "Aspen");

console.log(g);
// { Dallas: [ 'Tokyo', 'Aspen', 'Hong Kong' ],
     Tokyo: [ 'Dallas', 'Hong Kong' ],
     Aspen: [ 'Dallas', 'Los Angeles' ],
     'Los Angeles': [ 'Hong Kong', 'Aspen' ],
     'Hong Kong': [ 'Tokyo', 'Dallas', 'Los Angeles' ] }

g.removeVertex("Hong Kong");

console.log(g);
// { Dallas: [ 'Tokyo', 'Aspen' ],
     Tokyo: [ 'Dallas' ],
     Aspen: [ 'Dallas', 'Los Angeles' ],
     'Los Angeles': [ 'Aspen' ] }
```

---

```js
class Graph {
  constructor() {
    this.adjacencyList = {}
  }
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = []
  }
  addEdge(v1, v2) {
    this.adjacencyList[v1].push(v2)
    this.adjacencyList[v2].push(v1)
  }
  removeEdge(vertex1, vertex2) {
    this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter((v) => v !== vertex2)
    this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter((v) => v !== vertex1)
  }
  removeVertex(vertex) {
    while (this.adjacencyList[vertex].length) {
      const adjacentVertex = this.adjacencyList[vertex].pop()
      this.removeEdge(vertex, adjacentVertex)
    }
    delete this.adjacencyList[vertex]
  }
}

let g = new Graph()
g.addVertex('Dallas')
g.addVertex('Tokyo')
g.addVertex('Aspen')
g.addVertex('Los Angeles')
g.addVertex('Hong Kong')
g.addEdge('Dallas', 'Tokyo')
g.addEdge('Dallas', 'Aspen')
g.addEdge('Hong Kong', 'Tokyo')
g.addEdge('Hong Kong', 'Dallas')
g.addEdge('Los Angeles', 'Hong Kong')
g.addEdge('Los Angeles', 'Aspen')
```
