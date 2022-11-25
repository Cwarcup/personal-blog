---
title: 'GraphQL using Apollo'
date: '2022-11-22'
tags: ['GraphQL', 'Apollo', 'React']
images: '/static/images/individualBlogPostImages/graphql-basics.jpg'
draft: true
summary: 'This article will help you get started making GraphQL queries and mutations. It covers the basics of creating a schema, queries, and mutations.'
---

It's great to understand how GraphQL works, but how do we use it in a front-end application? In this article, we'll cover how to make GraphQL queries and mutations in a front-end application.

There are a few libraries that we can use to make GraphQL queries and mutations in a front-end application. We'll be using [Apollo Client](https://www.apollographql.com/docs/react/) in this article.

## Schema Definition Language

Before we can make any queries or mutations, we need to define our schema. We can do this using the [Schema Definition Language](https://www.apollographql.com/docs/apollo-server/schema/schema/).

See https://www.apollographql.com/tutorials/lift-off-part1/schema-definition-language-sdl/ for a good introduction to the Schema Definition Language.

```graphql
"""
Adventurous Feline
exporing the universe!
"""
type SpaceCat {
  "You can even add comments here"
  name: String!
  age: Int
  missions: [Mission]
}
```

## Getting Started on the server side - Apollo Server

See Docs: [here](https://www.apollographql.com/docs/apollo-server)

The purpose of Apollo Server is to provide a production-ready GraphQL server that's easy to set up, fast to run, and easy to integrate with your existing data sources.

You can use Apollo server to create a GraphQL server that can be used in a front-end application.

### Creating the Schema

Install the following dependencies:

```bash
npm install apollo-server graphql
```

Create a file called `schema.js` and add the following code:

```js
const { gql } = require('apollo-server')
```

> What is this `gql` thing we're importing? It's a tagged template literal, used for wrapping GraphQL strings like the schema definition we're about to write.

```js
// schema.js

const { gql } = require('apollo-server')

const typeDefs = gql`
  type Query {
    "Get tracks array for homepage grid"
    tracksForHome: [Track!]!
  }

  "A track is a group of Modules that teaches about a specific topic"
  type Track {
    id: ID!
    "The track's title"
    title: String!
    "The track's main author"
    author: Author!
    "The track's main illustration to display in track card or track page detail"
    thumbnail: String
    "The track's approximate length to complete, in minutes"
    length: Int
    "The number of modules this track contains"
    modulesCount: Int
  }

  "Author of a complete Track"
  type Author {
    id: ID!
    "Author's first and last name"
    name: String!
    "Author's profile picture url"
    photo: String
  }
`

module.exports = typeDefs
```

We use the `type Query` as the **root type** for all GraphQL queries. We can define fields on this type, which will be the entry points into our API. In our example, we have a single field called `tracksForHome` that returns an array of `Track` objects.

- We use an `!` to indicate that the field is non-nullable. This means that the GraphQL service promises to always give you a value when you query this field. In the type system, we'll represent those as `String!` instead of `String`.
- A field can also return a list of objects. In that case, we'll use square brackets: `[Track!]!`.

This is a good reference for the [Schema Definition Language](https://www.apollographql.com/tutorials/lift-off-part1/schema-definition-language-sdl).

### Apollo Server

inside `index.js` on your server, add the following code:

```js
const { ApolloServer } = require('apollo-server')
const typeDefs = require('./schema')

// create an instance of the ApolloServer
// and pass in our schema
const server = new ApolloServer({ typeDefs })

// create a port for the server to listen on
server.listen().then(() => {
  console.log(`
    🚀  Server is running!
    🔉  Listening on port 4000
    📭  Query at http://localhost:4000
  `)
})
```

> Running `npm start` will start the server on port 4000.

The purpose of the Apollo Server is...

- return the data requested by the client
- validate the GraphQL queries against the schema
- receive incoming requests and send back responses

#### Mocking Data

Sometimes we are not connected to a database, or we don't have a database yet. In this case, we can use [Apollo Server's mocking feature](https://www.apollographql.com/docs/apollo-server/testing/mocking/).

We can use the `mocks` option to provide mock data for our schema. This is useful for testing and development.

```js
const server = new ApolloServer({ typeDefs, mocks })
```

We can create a `mock` object that contains the data we want to return for each field in our schema.

```js
const mocks = {
  Query: () => ({
    tracksForHome: () => [...new Array(6)],
  }),
  // we can also mock nested fields
  Track: () => ({
    id: () => 'track_01',
    title: () => 'Astro Kitty, Space Explorer',
    author: () => {
      return {
        name: 'Grumpy Cat',
        photo:
          'https://res.cloudinary.com/dety84pbu/image/upload/v1606816219/kitty-veyron-sm_mctf3c.jpg',
      }
    },
    thumbnail: () =>
      'https://res.cloudinary.com/dety84pbu/image/upload/v1598465568/nebula_cat_djkt9r.jpg',
    length: () => 1210,
    modulesCount: () => 6,
  }),
}
```

Example `mock` with a type `SpaceCat`, an `id` of 'spacecat_01', and a `title` of 'spacecat pioneer'.

```js
const mocks = {
  SpaceCat: () => ({
    id: () => 'spacecat_01',
    title: () => 'spacecat pioneer',
  }),
}
```

#### Testing Queries with Apollo Explorer

See more [here](https://www.apollographql.com/tutorials/lift-off-part1/apollo-explorer).

This is a great guide for understanding how to use Apollo Explorer.

### Setting up a GraphQL Client - Front End

We will assume you are using React for this tutorial.

Inside of your client folder, run the following command:

```bash
npm install graphql @apollo/client
```

Inside of your `index.js` file, add the following code:

```js
import React from 'react'
import ReactDOM from 'react-dom'
import GlobalStyles from './styles'
import Pages from './pages'

// import the required packages
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

// create an instance of the ApolloClient
const client = new ApolloClient({
  uri: 'http://localhost:4000', // the URL of the GraphQL server, localhost for now
  cache: new InMemoryCache(), // cache to store the data
})

// wrap the app with the ApolloProvider
ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <GlobalStyles />
      <Pages />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
```

#### Creating a Query from the Client

Inside of the page you want to query, add the following code:

```js
// src/pages/tracks.js

// import the gql function
import { gql } from '@apollo/client'

// define the query
const TRACKS = gql`
  query getTracks {
    tracksForHome {
      id
      title
      thumbnail
      length
      modulesCount
    }
  }
`

// use the query
const Tracks = () => {
  //... later
}
```

- The `gql` function is used to parse the query string into a query document.
- When defining a query, use capital letters for the query name.
- We can use the Apollo Explorer to create our queries and use them here.

```js
const TRACKS = gql`
  # Query goes here
`
```

Another example of a query:

> Create a `ListSpaceCats` query with a `spaceCats` query field and its `name`, `age` and `missions` selection set in that order. For the `missions` field, select `name` and `description`

```js
const SPACECATS = gql`
  query ListSpaceCats {
    spaceCats {
      name
      age
      missions {
        name
        description
      }
    }
  }
`
```

Best practices for naming queries:

- Assign each query string with a **constant** with an **ALL_CAPS name**. `const SPACECATS = ...`.
- Only include the fields that the client needs.
- Test out the query in the Apollo Explorer to make sure it works.
- Wrap each query in the `gql` function with template literals.

#### Using the Query with the useQuery Hook

Docs on `useQuery` hook: https://www.apollographql.com/docs/react/data/queries

We primarily use the `useQuery` hook to fetch data from the server.

Deconstruct the `useQuery` hook and pass in the query we created with your query string:

```js
const Tracks = () => {
  const { data, loading, error } = useQuery(TRACKS)

  if (loading) return <div>Loading...</div>

  if (error) return `Error! ${error.message}`

  return <Layout grid>{JSON.stringify(data)}</Layout>
}

export default Tracks
```

This will display some pretty ugly JSON data. We will fix this in the next section.

We can import a component to display the data in a more readable format.

```js
const Tracks = () => {
  const { data, loading, error } = useQuery(TRACKS)

  if (loading) return <div>Loading...</div>

  if (error) return `Error! ${error.message}`

  return (
    <Layout grid>
      {data.tracksForHome.map((track) => (
        <TrackCard key={track.id} track={track} />
      ))}
    </Layout>
  )
}

export default Tracks
```

You can create a component to wrap the `useQuery` hook and pass in the query string as a prop.

```js
import React from 'react'
import { Layout } from '../components'
import { gql, useQuery } from '@apollo/client'
import TrackCard from '../containers/track-card'
import QueryResult from '../components/query-result'

/**
 * Tracks Page is the Catstronauts home page.
 * We display a grid of tracks fetched with useQuery with the TRACKS query
 */

const TRACKS = gql`
  query GetTracks {
    tracksForHome {
      id
      length
      modulesCount
      thumbnail
      title
      author {
        id
        name
        photo
      }
    }
  }
`
const Tracks = () => {
  const { data, loading, error } = useQuery(TRACKS)

  return (
    <Layout grid>
      <QueryResult loading={loading} error={error} data={data}>
        {' '}
        // pass in the query result
        {data?.tracksForHome?.map((track) => (
          <TrackCard key={track.id} track={track} />
        ))}
      </QueryResult>
    </Layout>
  )
}

export default Tracks
```

## Getting Our Data

In GraphQL, data can come from anywhere. It can come from a database, a REST API, a file, or even a third-party API.

For example, what if we had an API with multiple endpoints that we wanted to combine into one GraphQL API? W

```bash
GET   /tracks
GET   /track/:id
PATCH /track/:id
GET   /track/:id/modules
GET   /author/:id
GET   /module/:id
```

We want to use the `tracks` endpoint to get a list of tracks, and the `track/:id` endpoint to get a single track. Inside this `tracks` is the `author`, which we need to make another request to get the author's information.

How can our resolver functions use a REST API to get data?

### Accessing data from a REST API with Apollo Server

Typically when we make a request to a REST API, we use the `fetch` API. We can use the `fetch` API inside of our resolver functions to get data from a REST API.

If we need to make a request to get the `track` data, we can use the `fetch` API to get the data from the `track/:id` endpoint, and then another to get the `author` data from the `author/:id` endpoint, what would happen if we had 100 authors? We would have to make 100 requests to get the data!

```js
fetch('apiUrl/tracks').then(function (response) {
  // do something with our tracks JSON
})

fetch('apiUrl/track/1').then(function (response) {
  // do something with our track JSON
})
```

This is crazy inefficient. We can use the `dataloader` library to batch requests to the REST API.

To solve this, we can use the `DataSource` class from the `apollo-datasource-rest` package. This class allows us to make requests to a REST API and batch them together.

##### RESTDataSource Class

Install the `apollo-datasource-rest` package inside of your server directory:

```bash
npm install apollo-datasource-rest
```

Create a new folder called `dataSources` inside of the `server` directory. Create a new file called `tracks-api.js` inside of the `dataSources` folder.

```js
import { RESTDataSource } from 'apollo-datasource-rest'

class TrackAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'https://odyssey-lift-off-rest-api.herokuapp.com/'
  }

  getTracksForHome() {
    return this.get('tracks')
  }

  getAuthor(authorId) {
    return this.get(`authors/${authorId}`)
  }
}

module.exports = TrackAPI
```

- We create the methods `getTracksForHome` and `getAuthor` to make requests to the REST API.
- Our resolver will use these methods to get the data from the REST API.
- We always create a new class that extends the `RESTDataSource` class.
- Add the `baseURL` to the constructor. This is the base URL for our REST API.

##### Resolvers

Resolvers are used to populate the data in a field for the schema. It's a function that has the same name as the field in the schema.

There are 4 parameters for a resolver function:

- `parent` - The parent object, which is the object that contains the current field. This is used for nested fields. Is the return value of the resolver for the parent field.
- `args` - An object that contains the arguments passed into the field. This is used for arguments passed into the field.
