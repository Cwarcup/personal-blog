---
title: Promises
date: '2022-07-07'
tags: ['promises', 'json']
images: ['/static/images/postImages/andrew-petrov-hopnkQoC0dg-unsplash.jpg']
draft: false
summary: At the end of the day, promises are a way to make sure that a function is called at a certain time. They are a common pattern to help us manage asynchronous code and callbacks.
---

A `Promise` is an object that represents a value that may be available now, or in the future, or never. The value is not necessarily available yet, but it will be eventually. This allows us to write code that is asynchronous, and handle the value when it is available.

Compared to synchronous code which returns a value immediately, asynchronous code returns a `Promise` that may not be available yet.

Promises can take one of three states:

- `pending`: The initial state of a promise. The promise is waiting for some action to happen.
- `fulfilled`: The promise has been resolved, and the value is available.
- `rejected`: The promise has been rejected (error), and the reason for rejection is available.

When either of these states has been reached, the result is queued up by a promises `then` method.

> The `then` method takes a callback function, which is called when the promise is in the `fulfilled` or `rejected` state.

![promise .then and .catch()](../../../public/static/images/individualBlogPostImages/promises.png)

Promises can be returned by either the [`.then()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) or [`.catch()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch) methods.

Before we go deeper, let's take a look [JSON](https://www.json.org/json-en.html).

# JSON

JSON is a data format that is used to store data in a simple, human-readable format.

It is composed of two main parts:

- A collection of key-value pairs.
- An order list of values.

An object encoded using JSON looks like the following:

```json
{
  "name": "John",
  "age": 30,
  "cars": ["Ford", "BMW", "Fiat"],
  "address": {
    "street": "Main street",
    "city": "New York"
  }
}
```

- **keys** are always wrapped in double quotes `" "`.
- The value of a key can be any type of data.

## Serialization

_Serialization_ is the process of converting a data structure or object into a string. It can then be passed between computers.

The opposite of serialization would look like going from a `string` -> `OBject`. This process is known as _deserialization_.

More on JSON on MDN: [JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON)

```bash
> const jsonString = '{"a":1, "b":2, "foo":"bar"}'
undefined

> const obj = JSON.parse(jsonString)
undefined

> obj
{ a: 1, b: 2, foo: 'bar' }

> const string = JSON.stringify(obj)
undefined

> string
'{"a":1,"b":2,"foo":"bar"}'

> delete obj.foo
true

> obj
{ a: 1, b: 2 }
```

### `JSON.stringify()`

Returns a string containing the JSON representation of the object.

### `JSON.parse()`

Parses a string as JSON and returns the resulting JavaScript object.

## JSON Media Type

When we sent data using HTTP requests/responses, the Media Type `application/json` was used.

> "A media type (also known as a Multipurpose Internet Mail Extensions or MIME type) indicates the nature and format of a document, file, or assortment of bytes." - [MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types)

In comparison, the Media Type for HTML is `text/html`.

The Media Type is set in the `Content-Type` **header** of the HTTP response.

# Callback waterfall - callback hell problem

# Error Handling with Promises (and callbacks)

# Parallelizing Asynchronous Code

## Promise.race

## Promise.all
