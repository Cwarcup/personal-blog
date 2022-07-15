---
title: REST Conventions
date: '2022-07-14'
tags: ['REST']
images: ['/static/images/postImages/sincerely-media-CWL6tTDN31w-unsplash.jpg']
draft: false
summary: Rest is a convention for communicating with a server. Here are some common conventions.
---

An API that uses the REST convention is said to be RESTful. This means that the API is designed to be accessed using a set of well-defined methods that communicate with the server in a way that is consistent with the way that humans communicate with one another.

RESTful routes look like the following:

| **Method** | **Path**              | **Purpose**                           |
| :--------: | :-------------------- | :------------------------------------ |
|    GET     | /resources            | Retrieve all of a resource (Browse)   |
|    GET     | /resources/:id        | Retrieve a particular resource (Read) |
|    POST    | /resources/:id        | Update a resource (Edit)              |
|    POST    | /resources            | Create a new resource (Add)           |
|    POST    | /resources/:id/delete | Delete an existing resource (Delete)  |

## Advantages to RESTful API's

- can easily guess the endpoint for a particular resource
- clean URLs (ie. `/resources` instead of `/get-my-resource`)
- simplified HTTP verbs (ie. `GET` instead of `GET-MY-RESOURCE`)

### Selectors

- Selectors are used to select a resource from a collection of resources.
- Are always plural.
  Example: `/resources` or `/users`

## More on HTTP methods

| **Method** | **Path**       | **Purpose**                           |
| :--------: | :------------- | :------------------------------------ |
|    GET     | /resources     | Retrieve all of a resource (Browse)   |
|    GET     | /resources/:id | Retrieve a particular resource (Read) |
|    PUT     | /resources/:id | Replace a resource (Edit)             |
|   PATCH    | /resources/:id | Update a resource (Edit)              |
|    POST    | /resources     | Create a new resource (Add)           |

There are many more [_verbs_](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) available to us than just `GET` and `POST`.

## Modular Routing

We can store routes in separate files.

For example, in Express we need to use Express.Router() method to give us back a **router** object. All routes will be added to this _router_ object. We export the _router_ object from the file to be imported into our Express server file (eg. `server.js`)

```js
// post-router.js
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  // typical route handler in here
  res.send('hello world')
})

module.exports = router

// server.js
const postRouter = require('./routes/post-router')
app.use('/posts', postRouter)
```
