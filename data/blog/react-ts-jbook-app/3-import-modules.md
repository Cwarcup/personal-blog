---
title: Modules and Webpack Integration
date: '2022-04-22'
tags: ['Modules', 'webpack']
draft: false
summary: Understanding modules and webpack. Cover the basic difference between common JS and ES6 modules.
---

# Modules

Modules are a file that makes some values available to other files and/or consumes values from other files.

The most common types of module system are:

| common js        | ES Modules           |
| ---------------- | -------------------- |
| `require()`      | `import X from 'X'`  |
| `module.exports` | `export default 123` |

**Bundlers** are used to take multiple modules and bundle them into a single file. An example is [webpack](https://webpack.js.org/).

# Webpack

Example: `npm install --save-exact webpack@5.11.1 webpack-cli@4.3.0`

```js
// message.js
module.exports = 'Hi there!'
```

```js
//index.js
const message = require('./message')

console.log(message)
```

```json
"scripts": {
    "build": "webpack --mode=development"
```

In terminal, run `npm run build`, which will generate a file called `main.js` in a new file called 'dist' the root of the project.

The bundler does the following:

1. Reads the contents of the entry file (index.js)
2. Automatically finds all the different require/import/export statements
3. Automatically finds all the different modules that are required
4. Linked these files together into a single output file with all values being correctly communicated between the files.
