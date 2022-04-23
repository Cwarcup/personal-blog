---
title: What is a transpiler?
date: '2022-04-22'
tags: ['transpiler', 'bundlers']
draft: true
summary: Why do we need a transpiler? How do we use a transpiler?
---

# Transpiler

Is a tool to take some amount ofr code, strip out the syntax that can not be executed by the browser, and then convert it to a format that can be executed by the browser.

An example of a transpiler is Babel.

```jsx
const App = () => <div> Hi there!! </div>

// transpiler 

const App = () => /*#__PURE__*/React.createElement(\"div\", null, \" Hi there!! \");
```

React app needs to take users code and send it to a backend API server were the transpiler can take it and convert it to a format that can be executed by the browser. The transpiled code can then be sent back to the React App to be rendered.

This is what occurs on codepen.io.

Another option is to transpile the code on the client side, within the browser. This is what occurs when ou use babeljs.io's 'Try it out' feature. No network requests are being made to an external server.

