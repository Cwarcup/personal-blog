---
title: Intro to Cookies
date: '2022-07-12'
tags: ['cookies', 'express', 'servers']
images: ['/static/images/postImages/CRUD.jpg']
draft: false
summary:
---

Recall that we have been communicating with the server and application through HTTP, which is _stateless_, meaning that the server doesn't remember the state of the application. Each request is a independent and separate transaction.

However, sometimes we want to treat users different if they are logged in. This is where **cookies** come in.

Using an HTTP server, we can tell a client to remember the state of the application. This is called a **cookie**. This state is stored as an object, with keys and values as the 'cookie'.

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
