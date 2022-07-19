---
title: Client-side JavaScript
date: '2022-07-19'
tags: ['client-side', 'Javascript']
images: ['/static/images/postImages/kobu-agency-ipARHaxETRk-unsplash.jpg']
draft: false
summary: JavaScript is used to create dynamic content within a webpage. However, client-side JavaScript also deals with user-generated events and interacts with the DOM.
---

Now we focus on how JavaScript works in the browser and also begin to get comfortable with the fundamentals of Document Object Model (DOM) traversal and manipulation with jQuery.

## DOM Events

### Adding Event Listeners

- you must explicitly add an event listener to an element
- once an event listener is added, it will be called when the event occurs

Consider the following code:

```html
<html>
  <head>
    <title>My Page</title>
  </head>
  <body>
    <div id="div-one">Click me!</div>
    <div id="div-two">No! Click Me!</div>
  </body>
</html>
```

To setup an event listener, we must...

1. add the event listener to the element
2. specify the event type to listen for
3. add a function to run when the event occurs

We use `addEventListener` to add an event listener to an element.

```js
// add an event listener to the entire body
document.addEventListener('click', () => {
  console.log('You just clicked somewhere on this page.')
})
```

What if we wanted to add an event listener to a specific element? Such as the `div-one` element?

```js
// specify the DOM node to reference using the document.getElementById method and put that reference in a variable
const div1 = document.getElementById('div-one')

// when div1 is clicked, run the function
div1.addEventListener('click', () => {
  console.log('You clicked on div 1.')
})
```

> The event will fire only when you click on `div-one`.

You can do the same thing but with an **anonymous** function:

```js
// create a function
const printMessage = () => {
  console.log('You clicked on div 2.')
}

// put a reference to the "div-two" element in a variable
const div2 = document.getElementById('div-two')

// when div2 is clicked, run the function
div2.addEventListener('click', printMessage)
```

> the function `printMessage` will be called when you click on `div-two`

Basic Syntax for Adding Event Listeners

```js
const element = document.getElementById('element')

function callback() {
  alert('Hello')
}

// Add listener
element.addEventListener('click', callback)
```

### Removing Event Listeners

Removing event listeners once they are no longer needed is a best practice (especially in long-running Web applications). To do this, use the `element.removeEventListener()` method:

```js

element.removeEventListener(<event-name>, <callback>);
```

> You must have a **reference** to the callback function that was originally bound. Simply calling `element.removeEventListener(‘click’)`; will **not work**.

```js
const element = document.getElementById('element')

function callback() {
  alert('Hello once')
  element.removeEventListener('click', callback) // remove the event listener
}

// Add listener
element.addEventListener('click', callback)
```

### Maintaining Context in Event Listeners

It is possible to lose the context of the element that was clicked on when the event listener is called.

For example, even though the function has a variable named `firstName`, the value of `firstName` will be `undefined` when the function is called.

```js
const element = document.getElementById('element')

const user = {
  firstName: 'Curtis',
  greeting: function () {
    alert('My name is ' + this.firstName)
  },
}

// Attach user.greeting as a callback
element.addEventListener('click', user.greeting)

// alert => 'My name is undefined'
```

`this` in the case above is referring to the **element** that was clicked on. Not the `user` object.

We can prevent the loss of context by doing one of two things:

1. use an **anonymous function** to maintain the context of the element that was clicked on.

```js
const element = document.getElementById('element')

const user = {
  firstName: 'Curtis',
  greeting: function () {
    // anonymous function
    alert('My name is ' + this.firstName)
  },
}

// Call the method with the correct
// context inside an anonymous function
element.addEventListener('click', function () {
  user.greeting()
})
```

2. use the `bind` method to maintain the context of the element that was clicked on.

```js
const element = document.getElementById('element')

const user = {
  firstName: 'Curtis',
  greeting: function () {
    alert('My name is ' + this.firstName)
  },
}

// Overwrite the original function with a new function with its execution context 'bound' to the user object
user.greeting = user.greeting.bind(user)

// Add the bound function as the callback
element.addEventListener('click', user.greeting)
```

## Prevent The Browser’s Default Behavior

The browsers have a default behavior will respond when certain events.

The most common event is a link being _clicked_. When a `click` event occurs on an `<a>` element, it will bubble up to the document level of the DOM, and the browser will interpret the `href` attribute and **reload the window at the new address**.

We may not want the page to be refreshed! We can prevent the browser from doing this by using the `preventDefault` method.

```js
anchor.addEventListener('click', function (event) {
  event.preventDefault()
  // Do our own thing
})
```

## Useful Events

MDN list of events: [MDN](https://developer.mozilla.org/en-US/docs/Web/Events)

### Load Events

When a page is loaded, the browser will fire a `load` event.

```js
window.addEventListener('load', function () {
  console.log('Page loaded!')
})
```

### onbeforeunload

Enables you to ask the user if they want to leave the page.

```js
window.addEventListener('beforeunload', function () {
  return 'Are you sure you want to leave?'
})
```
