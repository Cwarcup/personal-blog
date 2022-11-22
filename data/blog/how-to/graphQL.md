---
title: 'GraphQL'
date: '2022-11-22'
tags: ['GraphQL']
images: 'https://blog.logrocket.com/wp-content/uploads/2018/05/websockets-two-way-communication-react-app-nocdn.jpg'
draft: true
summary: 'GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools.'
---

It's important to have a very good understanding of RESTful routing before we dive into GraphQL. If you're not familiar with RESTful routing, I recommend reading this article first.

## What is Restful Routing?

RESTful routing is a set of conventions that developers follow when creating routes for their API. It's a way of structuring your API so that it's easy to understand and use. RESTful routing is based on the HTTP protocol, which is the standard for how data is transferred on the web.

Imagine you are creating a user interface where a user can create a post, then view all of their posts. You would want to create a route that allows the user to create a post, and a route that allows the user to view all of their posts. In RESTful routing, you would create a route that allows the user to create a post, and a route that allows the user to view all of their posts.

| URL       | Method | Operation             |
| --------- | ------ | --------------------- |
| /posts    | POST   | Create a post         |
| /posts    | GET    | Get all posts         |
| /posts/14 | GET    | Get post number 14    |
| /posts/14 | PUT    | Update post number 14 |
| /posts/14 | DELETE | Delete post number 14 |

> These five actions are the basis of RESTful routing.

Imagine you want to get all the posts by a particular user. But things get their when you start to nest routes.

| URL                | Method | Operation                        |
| ------------------ | ------ | -------------------------------- |
| /users/14/posts    | GET    | Get all posts by user 14         |
| /users/14/posts/14 | GET    | Get post number 14 by user 14    |
| /users/14/posts/14 | PUT    | Update post number 14 by user 14 |

> This is a nested route. It's a route that is nested inside of another route.

These relations can get very complicated, and it's easy to get lost in the nesting. This is where GraphQL comes in.

## What is GraphQL?

In GraphQL, a graph is a data structure that is represented by nodes which are connected by edges. A graph can be directed or undirected. A directed graph has edges that point in a specific direction. An undirected graph has edges that point in both directions.

Once you have organized your data into a graph, you can use GraphQL to query the data. In short, you instruct GraphQL to return the data you want, and it returns the data in the format you want.

```graphql
query {
  user(id: 14) {
    name
    posts {
      title
      body
    }
  }
}
```

> This is a GraphQL query. It's a query that asks for the name and posts of a user with an id of 14.

## Working with GraphQL

We will make a small app using Express and GraphQL. We will use the GraphQL Playground to test our queries.

### Setting up the project

First, we need to create a new project folder and initialize a new npm project.

```bash
mkdir graphql
cd graphql

mkdir users
npm init -y
npm install express express-graphql graphql-http lodash
```

```js
// server.js

import express from 'express'
import { createHandler } from 'graphql-http/lib/use/express'

const app = express()

app.all('/graphql', createHandler({ schema }))

app.listen({ port: 4000 })
console.log('Listening to port 4000')
```

> But we don't have a schema yet. We will create a schema in a moment.

### Setting up a Schema

Use the `GraphQLObjectType` to create a type. A type is a collection of fields. A field is a property of a type. A type can have many fields. A field can have many types.

```js
// schema.js

const graphql = require('graphql')
const _ = require('lodash')

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLInt } = graphql

// hard coded data
const users = [
  { id: '23', firstName: 'John', age: 20 },
  { id: '47', firstName: 'Sara', age: 24 },
  { id: '29', firstName: 'Bill', age: 30 },
]

// creating the user type
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
  },
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return _.find(users, { id: args.id })
      },
    },
  },
})

// creating the schema
module.exports = new GraphQLSchema({
  query: RootQuery,
})
```

We can create a query type that allows us to query for a user by id. This is known as the **root query**.

#### Root Query

This represents the 'root' of our graph. It's the entry point into our graph. It's the starting point for our queries.

```js
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return _.find(users, { id: args.id })
      },
    },
  },
})
```

This is a query that allows is to query for `users` by `id`. The `userType` is the type of data we want to return. The `args` are the arguments we want to pass to the query.

The `resolve` function is where we write the logic for our query. It takes two arguments, `parentValue` and `args`. The `parentValue` is the value of the parent type. In this case, the parent type is the `RootQuery`. The `args` are the arguments we passed to the query. The `resolve` function returns the data we want to return.

The `args` parameter is an object that contains the arguments we passed to the query. We can use the `args` parameter to query our database for the data we want to return. If our query expects we pass in an `id` of a user, then `args` must contain an `id` property.

Back in our `server.js` file, we need to import our schema.

```js
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const app = express()

const schema = require('./schema/schema.js')

// Create a express instance serving all methods on `/graphql`
// where the GraphQL over HTTP express request handler is
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
)

app.listen(4000)
```

We can go over to 'localhost:4000/graphql' to test our query.

```graphql
{
  user(id: "23") {
    firstName
    age
  }
}
```

This query gets sent to our `RootQuery` and returns the data we want. Because we specified the `user` type, we get the `firstName` and `age` of the user with an `id` of `23`.

### Async Queries

The `resolve` function can also get async data, therefore the `resolve` function can return a promise. We can use the `axios` library to make async requests.

```js
// schema.js
const graphql = require('graphql')
const axios = require('axios')

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLInt } = graphql

// creating the user type
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
  },
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return axios // returns a promise
          .get(`http://localhost:3000/users/${args.id}`)
          .then((res) => res.data)
      },
    },
  },
})

// creating the schema
module.exports = new GraphQLSchema({
  query: RootQuery,
})
```
