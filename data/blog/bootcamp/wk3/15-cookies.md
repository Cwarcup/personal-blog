---
title: Intro to Cookies
date: '2022-07-12'
tags: ['cookies', 'express', 'servers']
images: ['/static/images/postImages/Cookies.jpg']
draft: false
summary: Understand the basics of a cookie and how Express can be used to create a cookie.
---

## What does it mean to say HTTP is 'stateless'?

Recall that we have been communicating with the server and application through HTTP, which is _stateless_, meaning that the server doesn't remember the state of the application. Each request is a independent and separate transaction.

| Pros                                          | Cons                                              |
| --------------------------------------------- | ------------------------------------------------- |
| Stateless                                     | Stateful                                          |
| scalability - no session related dependencies | cannot easily keep track of content               |
| less complex                                  | context has to be provided each time              |
| easier to cache                               | good for transactions, not good for conversations |
| server can not lose track of information      |                                                   |

## What is a web cookie?

With cookies, we can share information between the server and the browser.

However, sometimes we want to treat users different if they are logged in. This is where **cookies** come in.

Using an HTTP server, we can tell a client to remember the state of the application. This is called a **cookie**. This state is stored as an object, with keys and values as the 'cookie'.

Cookies are sent with _every request_ as part of the request **headers**.

We can use the `set-cookie` header in an HTTP response to tell the client to store the cookie. All subsequent requests will include the `Cookie` header.

Flow of events:

1. browser sends request to server
2. server sends the response back to the browser, with the `cookie` and website content (HTML...)
3. The browser receives the response and stores the `cookie` in its local storage.
4. When the browser sends a new request, it will keep the existing `cookie`.

See the following for more information:

- [What is a cookie YouTube video](https://www.youtube.com/watch?v=I01XMRo2ESg)
- Wikipedia: [Cookie](https://en.wikipedia.org/wiki/HTTP_cookie)
- Breakdown of how cookies work: [Cookie breakdown](https://blog.codeanalogies.com/2018/06/02/internet-cookies-explained-by-taking-your-kids-to-the-doctors-office/)

## Express and Cookies

We will be using [Cookie-Parser](https://github.com/expressjs/cookie-parser) to parse the `cookie` header.

Cookie-parser serves as Express middleware that facilitates working with cookies.

`cookie-parser` helps us **read** the values from the cookie.

To **set** the values on the cookie, we can use `res.cookie`, a [method provided by Express](http://expressjs.com/en/api.html#res.cookie).

```
$ npm install cookie-parser
```

Syntax:

```js
res.cookie(name, value [, options])
```

- sets `name` to `value`
- the `value` param may be a **string** or an **object converted to JSON**.

```js
const cookieParser = require('cookie-parser')

res.cookie('name', 'tobi', { domain: '.example.com', path: '/admin', secure: true })
res.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly: true })
```

## Restrictions on Cookies

Who has access to a cookie?

- A browser cookie is specific to the domain that created it. This means that if you create a cookie for `.example.com`, it will only be available on that domain.

## Encrypting Cookies

Plain text cookies can be manipulated by users through the browser.Therefore, it's best practice to use **encrypted** cookies.

In encryption, the string is scrambled/transformed by a function. This is a two-way process: encrypted strings can be decrypted by the intended recipient.

We want to use encryption when a cookie is storing a unique identifier for a user (e.g. `user_ID` or `username`).
