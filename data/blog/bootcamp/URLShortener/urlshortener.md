---
title: Server Side Rendering - URL Shortener
date: '2022-07-11'
tags: ['URL', 'SSR']
images: ['/static/images/postImages/michael-dziedzic-qDG7XKJLKbs-unsplash.jpg']
draft: true
summary: This is a summary of the process on creating a web-server and API. We will create a URL shortening service similar to bit.ly, TinyURL, and others.
---

General Techniques: When a URL is shortened, the long URL is associated with some unique key. The key is then used to access the long URL. For example, if the URl is `https://shorten.com/a1b2c3`, the key is `a1b2c3`.

Keys can be generated in base 26, which consists of letters 'a' to 'z' and numbers '0' to '9'. Alternatively, base 62 can be used, which consists of letters 'a' to 'z', numbers '0' to '9', and letters 'A' to 'Z'.

This project will use the following tools:

- Node.js: for the server
- Express: middleware
- EJS: for the templating engine
