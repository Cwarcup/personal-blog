---
title: Functional-Based Components in React
date: '2022-03-15'
tags: ['react', 'Functional-Based Components']
draft: false
summary: 'React has two types of components: Class-based and Functional-based. This post will show you how to implement Functional-Based Components in React.'
---

```js
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>
}
```

This function is a valid React component because it accepts a single **“props”** (which stands for properties) object argument with data and returns a React element. We call such components “function components” because they are literally JavaScript **functions**.

# Handling Async Functions with Functional Components

Is VERY difficult because..

1. JS file is loaded by the browser.
2. App component gets created.
3. we call out async function (which takes time to return).
4. App returns JSX which gets rendered to page as HTML.
5. ...time goes on...
6. we finally get the data from our function....

We have already rendered our app component! We don't really have any good way of waiting for our function to return something before we render our component.

Solution?

**Use CLASS COMPONENTS INSTEAD!**

---

Example function based component

```js
import React from 'react'

const SeasonDisplay = () => {
  return <div>SeasonDisplay</div>
}

export default SeasonDisplay
```
