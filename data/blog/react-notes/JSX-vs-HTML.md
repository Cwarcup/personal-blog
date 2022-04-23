---
title: JSX vs HTML
date: '2022-03-13'
tags: ['react', 'jsx', 'html']
draft: false
summary: 'So many people have asked me about JSX vs HTML. I will try to answer them here.'
---

# What is JSX?

- is a special dialect of JS (its NOT HTML!).
- browsers do not understand JSX, therefore, we use Babel to convert JSX into normal JS.
- is very similar in form and function to HTML with a couple differences

## JSX vs HTML

### React CSS

Adding custom styling to an element uses different **syntax**.

In JSX, JavaScript expressions are written inside curly braces, and since JavaScript objects also use curly braces, the styling in the example above is written inside two sets of curly braces `{{}}`.

```js
const App = () => {
  return (
    <div>
      <label class="label" for="name">
        Enter name:
      </label>
      <input id="name" type="text" />
      <button style={{ backgroundColor: 'blue', color: 'white' }}>Submit</button>
    </div>
  )
}
```

```html
<div>
  <label class="label" for="name"> enter name: </label>
  <input id="name" type="text" />
  <button style="background-color: blue; color: white;">Submit</button>
</div>
```

Must also use **camelCase property names**.
Use `backgroundColor` instead of `background-color`:

More info [here](https://www.w3schools.com/react/react_css.asp)

# Class vs className

```html
<label class="label" for="name">Enter name:</label>
```

```jsx
<label className="label" for="name">
  Enter name:
</label>
```

> We do this to ensure that JS does not get confused when we use a class declaration.

# JSX can reference JS variables

- can take a JS variable and easily print it in our JSX block.
- first set of {} means we want to reference a JS variable

```jsx
// Create react component
const App = () => {
  const buttonText = 'Click me!' // new JS variable
  return (
    <div>
      <label class="label" for="name">
        Enter name:
      </label>
      <input id="name" type="text" />
      <button style={{ backgroundColor: 'blue', color: 'white' }}>
        {buttonText} // reference to the variable
      </button>
    </div>
  )
}
```

> can reference a string, an array, a function.

Or we can reference a JS function

```js
function getButtonText() {
  return 'Click on me!'
}

// Create react component
const App = () => {
  const buttonText = 'Click me!'
  return (
    <div>
      <label class="label" for="name">
        Enter name:
      </label>
      <input id="name" type="text" />
      <button style={{ backgroundColor: 'blue', color: 'white' }}>{getButtonText()}</button>
    </div>
  )
}
```

# Variables JSX can NOT show

Referencing an Object will NOT work properly.

```js
const App = () => {
  const buttonText = { text: 'click me' }
  return (
    <div>
      <label class="label" for="name">
        Enter name:
      </label>
      <input id="name" type="text" />
      <button style={{ backgroundColor: 'blue', color: 'white' }}>{buttonText}</button>
    </div>
  )
}
```

Get an error: ` Objects are not valid as a React child (found: object with keys {text}). If you meant to render a collection of children, use an array instead.`

Instead, we must reference it like so `{buttonText.text}`.

We can use JS object as long as we are not trying to print them as text in our application.

This will work fine for the style:

```js
const App = () => {
  const buttonText = { text: 'click me' }
  const style = { backgroundColor: 'blue', color: 'white' }
  const labelText = 'Enter Name:'
  return (
    <div>
      <label class="label" for="name">
        {labelText}
      </label>
      <input id="name" type="text" />
      <button style={style}>{buttonText.text}</button>
    </div>
  )
}
```
