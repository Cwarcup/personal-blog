---
title: 'GraphQL Basics'
date: '2022-11-22'
tags: ['GraphQL']
images: '/static/images/individualBlogPostImages/graphql-basics.jpg'
draft: false
summary: 'This article will help you get started making GraphQL queries and mutations. It covers the basics of creating a schema, queries, and mutations.'
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

Most times we will be querying a database. This means that our queries will be asynchronous. We can use the `async` and `await` keywords to make our queries asynchronous.

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

### Nested Queries

Sometimes we want to query for data that is nested. For example, we might want to query for a user's company. We can do this by creating a new type for the company.

```js
// schema.js
const graphql = require('graphql')
const axios = require('axios')

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLInt } = graphql

// company type
const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
  },
})

// creating the user type
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: CompanyType, // notice we use the company type here
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:3000/companies/${parentValue.companyId}`)
          .then((res) => res.data)
      },
    },
  },
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3000/users/${args.id}`).then((res) => res.data)
      },
    },
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3000/companies/${args.id}`).then((res) => res.data)
      },
    },
  },
})

// creating the schema
module.exports = new GraphQLSchema({
  query: RootQuery,
})
```

In the `UserType` we can add a new field called `company`. The `company` field is of type `CompanyType`. The `resolve` function is where we write the logic for our query. We can use the `parentValue` to get the `companyId` of the user. We can then use the `companyId` to query for the company.

This allows us to query for a user's company.

```graphql
{
  user(id: "23") {
    firstName
    age
    company {
      name
      description
    }
  }
}
```

Our return data will look like this.

```json
{
  "data": {
    "user": {
      "id": "2",
      "firstName": "Jane",
      "company": {
        "id": "2",
        "name": "Google",
        "description": "Google LLC is an American multinational technology company that specializes in Internet-related services and products, which include online advertising technologies, search engine, cloud computing, software, and hardware."
      }
    }
  }
}
```

### Bidirectional Queries

You can think of the `resolve` function as being an **edge** between our nodes. We can use the `resolve` function to query for data in both directions. Up until now, we have only been able to query for data in one direction. For example, we can query for a user's company, but we can't query for a company's users.

Over in our `RootQuery` we can add a new field called `company`.

```js
// schema.js

// ...

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3000/users/${args.id}`).then((res) => res.data)
      },
    },

    // adding a new field
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3000/companies/${args.id}`).then((res) => res.data)
      },
    },
  },
})
```

Over in our GraphiQL interface we can query for a company.

```graphql
{
  company(id: "1") {
    name
    description
  }
}
```

Returns...

```json
{
  "data": {
    "company": {
      "name": "Amazon",
      "description": "Amazon.com, Inc. is an American multinational technology company based in Seattle, Washington, which focuses on e-commerce, cloud computing, digital streaming, and artificial intelligence."
    }
  }
}
```

However, we still can't query a company and get their users. In order to do this, we need to setup this relationship. We know that a `Company` can have many `Users`. To do this, we need to add a new field to our `CompanyType`.

```js
// company type
const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    // we want to be able to query for users of a company
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:3000/companies/${parentValue.id}/users`)
          .then((res) => res.data)
      },
    },
  },
})
```

We use the `new GraphQLList` to tell GraphQL that we are expecting an array of `UserType` objects. We can now query for a company and get their users.

However, we get a new error: 'Cannot access 'UserType' before initialization'. This is because we are trying to access the `UserType` before it has been initialized.

We can fix this by wrapping out `fields` object in a function. This will allow us to access the `UserType` after it has been initialized.

```js
// company type
const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: () => ({
    // wrapping fields in a function
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    // we want to be able to query for users of a company
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:3000/companies/${parentValue.id}/users`)
          .then((res) => res.data)
      },
    },
  }), // closing the fields function
})
```

We can do the same thing for our `UserType`.

```js
// creating the user type
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: CompanyType,
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:3000/companies/${parentValue.companyId}`)
          .then((res) => res.data)
      },
    },
  }),
})
```

If we query for a company, we can now get their users.

```graphql
{
  company(id: "1") {
    name
    description
    users {
      id
      firstName
      age
    }
  }
}
```

```json
{
  "data": {
    "company": {
      "name": "Apple",
      "description": "Apple is a multinational technology company headquartered in Cupertino, California, that designs, develops, and sells consumer electronics, computer software, and online services.",
      "users": [
        {
          "id": "1",
          "firstName": "John",
          "age": 24
        },
        {
          "id": "6",
          "firstName": "Curtis",
          "age": 28
        }
      ]
    }
  }
}
```

### Query Fragments

You can name a query and reuse it. This is called a **query fragment**. We can use query fragments to avoid repeating ourselves. For example, we can create a query fragment for a user.

```graphql
query findUser {
  user(id: "1") {
    id
    firstName
    age
  }
}
```

You may also want to query multiple fields at one. For example, querying two companies: Apple and Google.

```graphql
{
  apple: company(id: "1") {
    id
    name
    description
  }
  google: company(id: "2") {
    id
    name
    description
  }
}
```

> You must provide a **key** for each query. In this case, we are using `apple` and `google`.

This returns a json object like so:

```json
{
  "data": {
    "apple": {
      "id": "1",
      "name": "Apple",
      "description": "Apple is a multinational technology company headquartered in Cupertino, California, that designs, develops, and sells consumer electronics, computer software, and online services."
    },
    "google": {
      "id": "2",
      "name": "Google",
      "description": "Google LLC is an American multinational technology company that specializes in Internet-related services and products, which include online advertising technologies, search engine, cloud computing, software, and hardware."
    }
  }
}
```

Notice how we had to repeat the `id`, `name`, and `description` fields. We can use a **query fragment** to avoid this.

```graphql
{
  apple: company(id: "1") {
    ...companyDetails
  }
  google: company(id: "2") {
    ...companyDetails
  }
}

fragment companyDetails on Company {
  id
  name
  description
}
```

We must use the `fragment` keyword to create a query fragment. We then give it a name, `companyDetails`. We then specify the type of object we are querying for, `Company`. Finally, we specify the fields we want to query for.

### Mutations - changing data

Mutations are used to modify the data stored on the server. We can use mutations to add, delete, or update data.

We need to create a new `GraphQLObjectType` for mutations. We will call it `mutation`. We can then use this object to manipulate our data.

```js
// schema.js

// bottom of the file, above the export statement

// mutations
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
        companyId: { type: GraphQLString },
      },
      resolve() {},
    },
  },
})
```

- The `type` refers to the type of data we are returning. In this case, we are returning a `UserType`. Sometimes the collection of data you are working on does not match the type of data we are returning.
- `args` are the arguments or **data** we are passing into the resolve function.

To ensure that the data we are passing in is valid, we can use the `GraphQLNonNull` type. This will ensure that the data we are passing in is not null.

```js
// schema.js

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) }, // adding GraphQLNonNull
        age: { type: GraphQLInt },
        companyId: { type: GraphQLString },
      },
      resolve() {},
    },
  },
})
```

We can now use the `resolve` function to add a user to our database.

```js
// mutations
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        companyId: { type: GraphQLString },
      },
      resolve(parentValue, { firstName, age, companyId = '' }) {
        return axios
          .post(`http://localhost:3000/users`, { firstName, age, companyId })
          .then((res) => res.data)
      },
    },
  },
})
```

In order to use this mutation, we need to add it to our `GraphQLSchema`.

```js
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
})
```

Calling a mutation is similar to calling a query. We use the `mutation` keyword instead of `query`.

```graphql
mutation {
  addUser(firstName: "Gilligan", age: 6) {
    id
    firstName
    age
  }
}
```

> Notice we added `id`, `firstName`, and `age` to the query. This is because we are returning a `UserType` object. ALso notice how we did not add a `companyId`. This is because we are using the default value we set in the `resolve` function.

```json
{
  "firstName": "Gilligan",
  "age": 6,
  "companyId": "",
  "id": 7
}
```

### Deleting Data

This is similar to the `addUser` mutation. We will use the `deleteUser` mutation to delete a user from our database.

```js
// mutations
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      //...
    },
    deleteUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, { id }) {
        return axios.delete(`http://localhost:3000/users/${id}`).then((res) => res.data)
      },
    },
  },
})
```

- We add a new `deleteUser` field to the `fields` object.
- The `args` object only required the `id` of the user we want to delete.
  - We use the `GraphQLNonNull` type to ensure that the `id` is not null.
- The `resolve` function uses the `id` to delete the user from the database.
  - use the `delete` method of the `axios` library to delete the user from the database.
  -

```graphql
mutation {
  deleteUser(id: "7") {
    id
  }
}
```

```json
{
  "data": {
    "deleteUser": {
      "id": null
    }
  }
}
```

> You'll notice the `id` returned is `null` because the user has been deleted from the database. GraphQL does not have a user to return.

### Editing Data

We want to be able to edit data in our database. We can use the `editUser` mutation to edit a user's data.

Reminder: We can do this with the `put` or `patch` method of the `axios` library.

- `put` will replace the **entire** user object with the new data.
- `patch` will only update the data we pass in.

It's best practice to use `patch` when updating data.

```js
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      //...
    },
    deleteUser: {
      //...
    },
    editUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
        companyId: { type: GraphQLString },
      },
      resolve(parentValue, args) {
        return axios.patch(`http://localhost:3000/users/${args.id}`, args).then((res) => res.data)
      },
    },
  },
})
```

- We add a new `editUser` field to the `fields` object.
- We use the `GraphQLNonNull` type to ensure that the `id` is not null.
  - This ensures that we are editing an existing user.
- Use `patch` to update the user's data.
  - We pass in the `id` and the `args` object.
  - The `args` object contains the data we want to update.

Making the query in GraphiQL:

```graphql
mutation {
  editUser(id: "1", firstName: "Edited Name") {
    id
    firstName
    age
  }
}
```

Returns:

```json
{
  "data": {
    "editUser": {
      "id": "1",
      "firstName": "Edited Name",
      "age": 24
    }
  }
}
```
