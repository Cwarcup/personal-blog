---
title: HTTP Intro
date: '2022-07-06'
tags: ['HTTP', 'Headers']
images: ['/static/images/postImages/matt-duncan-IUY_3DvM__w-unsplash.jpg']
draft: false
summary: Basics of HTTP requests, paths, headers and more.
---

## HTTP Requests

When a client wants to communicate to a server, it sends a **request**.

This request contains information about the resource that the client wants to access, such as the URL,the **path**, the **method**, and the **headers**.

## HTTP Methods

| Method   | Description                      |
| -------- | -------------------------------- |
| `GET`    | **Retrieve** data from a server. |
| `POST`   | **Send** data to a server.       |
| `PUT`    | **Update** data on a server.     |
| `DELETE` | **Delete** data on a server.     |

## HTTP Paths and URL Structure

See MDN article [URLs](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_is_a_URL)

The **path** is part of the URL.

![Anatomy of a URL](../../../public/static/images/individualBlogPostImages/mdn-url-all.png)

### Scheme

Is the fist part of the URL. It indicates the protocol used to communicate with the server. Includes HTTP and HTTPS.

There are other protocols such as `mailto:` and `ftp:`.

### Authority

Is the second part of the URL. It indicates the server and port number.

### Path

Is the third part of the URL. It indicates the resource that the client wants to access.

### Parameters

```
?key1=value1&key2=value2
```

Parameters are always separated by `&` and are always in the form of `key=value`.

They start with `?`.

### Anchor

Represents some part of the resource that the client wants to access. Think of it as some type of a bookmark inside of a resource.

This part is never actually sent to the server within a request.

## HTTP Responses

When a server receives a request, it sends a **response**.

This response contains information about the resource that the server has sent back to the client: the status code, the **headers**, and the **body**.

### Status Codes

List of status codes: [MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

Important ones to know:

- 200: "Everything went great!"
- 201: "The request has succeeded and a new resource has been created as a result."
- 404: "Resource was not found."
- 500: "The server had an error."

### Response Body

Response **body** actually contains the data that the server has sent back to the client.

The body can store many kinda of data such as HTML, **JSON**, XML, images, etc.

### Headers

Is extra information that the server sends back to the client.

Can also be part of the request.
