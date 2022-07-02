---
title: Modules and Unit Testing
date: '2022-08-02'
tags: ['Modules', 'Unit Testing']
images: ['/static/images/postImages/ferenc-almasi-EWLHA4T-mso-unsplash.jpg']
draft: false
summary: Sharing functions with modules and automated testing.
---

# Modules

Recall, we want to keep our code [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself#DRY_vs_WET_solutions)!

## Exporting Modules

A JavaScript file must export the part that we want to share. This makes it `require`able. It's common to export objects, including functions.

In order to export a function, we need to use the `module.export` keyword.

```js
const sayHelloTo = function (person) {
  console.log(`Hello, ${person}`)
}
// add this line to the end of the file.
module.exports = sayHelloTo
```

## Requiring a Module

Basic syntax for **importing from local filesystem** using `require`:

```js
const sayHelloTo = require('./myModule')
```

> Here we are assuming that the file is in the same directory as the file that is importing it.

File extensions are not necessary, but can be used.

```js
const sayHelloTo = require('./myModule.js')
```

Example with [chalk](https://github.com/chalk/chalk):

```js
const chalk = require('chalk')

const message = `Hello ${chalk.yellow('World')}`
console.log(message)

// or with import
import chalk from 'chalk'

console.log(chalk.blue('Hello world!'))
```

# Packages and npm

What are packages?

> A package is a collection of modules. They are useful for grouping similar modules together, and can be installed into a project using `npm install`.

What are libraries?

> A collection of pre-written code. Libraries can be private, but many are packaged up nicely, branded and made publicly available for other developers to use in their own projects. Think jQuery and Bootstrap for example.

## package.json

All node.js projects have a `package.json` file. This file contains information about the project, such as the name, version, and dependencies.

More on [package.json](https://docs.npmjs.com/cli/v8/configuring-npm/package-json) via npm.

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "description": "A simple project",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "author": "John Doe",
  "license": "ISC",
  "dependencies": {
    "express": "^4.13.4"
  }
}
```

### Custom Scripts in `package.json`

The `scripts` portion allows us to run commands using an **alias**, for instance:

```bash
npm run start
```

### Dependencies in `package.json`

The `dependencies` section of `package.json` lists the packages that need to be installed for the project to run properly. In the above example it lists a package called `express`, and the value `^4.13.4` specifies the version.

```bash
///
"dependencies": {
    "express": "^4.13.4"
  }
///
```

### package-lock.json

The `package-lock.json` file lists all the details about our project's dependencies. It should be checked into git, along with `package.json.`

We should always **avoid** **editing** the `package-lock.json` this file directly. We modify it indirectly via commands like `npm install`.

# Unit Testing

Unit testing is the practice of testing small pieces of code, typically individual functions, alone and isolated.

Unit tests should be fairly simple to write. A unit tests should essentially just give the function that’s tested some inputs, and then check what the function outputs is correct.

Examples include [Jest](https://jestjs.io/), [Mocha](https://mochajs.org/), [Cypress](https://docs.cypress.io/guides/overview/why-cypress) and [Puppeteer](https://jestjs.io/docs/puppeteer).

### Types of Testing

**Integration tests**: are similar to unit tests, but there’s one big difference: while unit tests are isolated from other components, integration tests are not. For example, a unit test for database access code would not talk to a real database, but an integration test would.

Integration testing is mainly useful for situations where unit testing is not enough. Sometimes you need to have tests to verify that two separate systems – like a database and your app – work together correctly, and that calls for an integration test.

---

**Functional Testing**: sometimes called E2E testing, or browser testing, is a way to test the behavior of a web application. In practice with web apps, this means using some tool to automate a browser, which is then used to click around on the pages to test the application.

## Mocha and Chai Introduction

**BDD** or **Behavior Driven Development** is a process that emerged from test-driven development. BDD encourages you to specify the behavior of your app in terms of user stories which are broken down into scenarios that can be built and tested.
