---
title: Working with the Browser
date: '2022-05-19'
tags: ['Browser', 'JavaScript', 'DOM']
draft: false
summary: We'll learn about HTML and CSS and how the Box Model works.
---

When a web page is loaded, the browser creates a Document Object Model (or DOM) tree for the page. The DOM tree is a representation of the page's structure. The DOM tree is made up of nodes, which are objects that represent the elements of the page.

The DOM allows JavaScript to interact with the page's elements, adding or removing them, changing their attributes, and so on.

# Working with the DOM

- **DOM** elements are defined as **objects**.
- A **property** is a values that can be retrieved or set.
- A **method** is a function that can be called (invoked) on an object.

You can change an HTML by setting the `innerHTML` property of an element.

# setTimeout

`setTimeout` is a method that allows you to run a function after a certain amount of time (in milliseconds).

```js
const sayHello = function () {
  alert('Hello')
}
setTimeout(sayHello, 3000)
```

```js
myTimeout = setTimeout(function, milliseconds);
```

# setInterval

`setInterval` is a method that allows you to run a function **repeatedly** after a certain amount of time (in milliseconds).

In this example, an alert with the text 'Hello' will appear every 3 seconds.

```js
const sayHello = function () {
  alert('Hello')
}
const timer = setInterval(sayHello, 3000)
```

# Accessing the DOM

Accessing the DOM is done by using the `document` object. Below are some examples of how to access the DOM using built-in JavaScript methods.

```js
document.getElementById('identifier')
document.getElementsByTagName('p')
document.getElementsByClassName('class-name')
```

## Finding an element by ID

The value of the `id` attribute of an element can be accessed using the `getElementById` method. This value should be **unique** to the entire page.

```html
<p id="this-element-is-unique">JavaScript on The DOM</p>
```

```js
let dom = document.getElementById('this-element-is-unique')
alert(dom.innerHTML)
```

## Finding an element by Tag Name

Recall, the 'Tag Name' of an element is the name of the element's HTML tag.

```html
<p>The 'Tag Name' of this element is 'p'</p>
```

We can find elements by their Tag Name in JavaScript with the `document.getElementsByTagName` method.

```js
document.getElementsByTagName('p')
```

Don't forget, the `getElementsByTagName` method returns a **NodeList**, which is an array-like object. You can access the elements of the NodeList using the bracket notation.

```html
<p id="intro">Hello World!</p>

<p id="info">JavaScript on The DOM</p>
```

```js
let dom = document.getElementsByTagName('p')
alert(dom[0].innerHTML)
dom[1].innerHTML = 'Curtis is the best!'
```

## Finding an element by Class Name

Uses the `getElementsByClassName` DOM method.

Best to use this method when you have multiple elements with the same **class** name. Recall we can have multiple classes on a single element.

```html
<p id="paragragh-one" class="blue"></p>
<p id="paragragh-two" class="blue"></p>
<p id="paragragh-tree" class="blue big"></p>
<p id="paragragh-four" class="blue small"></p>
```

Just like the `getElementsByTagName` method, the `getElementsByClassName` method returns a **NodeList**.

You can easily convert the NodeList to an array using the `Array.from` method.

```js
let myArray = Array.from(nodeList)
// or
let array1 = [...nodeList]
```

NodeList is an array-like object. You can access the elements of the NodeList using the bracket notation.

You can also use the `forEach` [method](https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach) to iterate over the NodeList.

```js
someNodeList.forEach(callback[, thisArg]);
```

For example:

```html
<h2>List of People:</h2>

<ul class="people">
  <li class="name">Clara</li>
  <li class="name">James</li>
  <li class="name">Sara</li>
</ul>
```

```js
let names = []

let list = document.getElementsByClassName('name')

for (let i = 0; i < list.length; i++) {
  names.push(list[i].innerHTML.trim())
}

console.log(...names) // Clara, James, Sara
```

## querySelector

```js
document.querySelector('#name-field')
```

[querySelector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) be used to select an element by its id, class name, or tag name.

```js
document.querySelector('.class-name')
document.querySelector('p')
document.querySelector('#id')
```

## Changing Content with .innerHTML

```js
// first we find the element
const element = document.getElementById('paragraph-1')
// then we set it's innerHTML property
element.innerHTML = 'My new text'
```

## Changing Attributes

In order to change the value of an image's width with JavaScript, we would need to change the `width` attribute of the `img` element.

```html
<img id="logo" src="https://placekitten.com/200/300" width="200" height="300" />
```

```js
document.getElementById('logo').width = '300'
```

# DOM Events

JavaScript provides the ability to interact with elements on the page by adding, removing and changing elements on a page. This is called **DOM events**.

Some common events are:

- `onclick` when an element is clicked
- `onmouseover` when the mouse is over an element
- `onchange` when an element's value is changed.

Additional events can be found [here](https://www.w3schools.com/js/js_htmldom_events.asp).

```html
<button onclick="alert('Clicked!!')">Click Me!</button>

<button id="my-button" onclick="buttonClicked('#my-button')">Click Me!</button>
```

```js
const buttonClicked = function (selector) {
  alert('The ' + selector + ' button has been clicked.')
}
```

Can learn more about eventListeners here: [MDN](https://www.w3schools.com/js/js_htmldom_eventlistener.asp)
