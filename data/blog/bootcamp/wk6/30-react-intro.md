---
title: Introduction to React
date: '2022-08-05'
tags: ['react']
images: ['/static/images/postImages/regina-victorica-FH8hDSkq8J4-unsplash.jpg']
draft: false
summary: Understanding the basics of a React app, and how to use React to build a simple app. Covers JSX, React components, and React lifecycle methods.
---

## Behind the scenes of React

### React.createElement

- Must define the type of **element** to create and any **properties** to pass to the element

**JSX:**

```jsx
const element = <h2 className="name">Name</h2>
```

Although this looks like HTML, it is actually JavaScript. This JSX is converted to JavaScript by the Babel compiler, producing the following code:

**JavaScript:**

```js
const element = React.createElement('h2', { className: 'name' }, 'Name')
```

> **Note**: In JSX we use `className` instead of `class` Many of the css classes are similar to the HTML attributes. Check out the [React documentation](https://reactjs.org/docs/dom-elements.html) for more info.

The `React.createElement(type, [props], [...children])` function allows us to create a hierarchy of **DOM nodes**. The following JSX describes a static tweet.

```jsx
import React from 'react'

function Tweet() {
  return (
    <article className="tweet">
      <header className="tweet__header">
        <img
          className="tweet__header-avatar"
          src="https://api.adorable.io/avatars/64/react@adorable.png"
          alt="Avatar"
        />
        <h2 className="tweet__header-name">React</h2>
      </header>
      <main className="tweet__content">
        <p>A JavaScript library for building user interfaces</p>
      </main>
      <footer className="tweet__footer">May 29th, 2013</footer>
    </article>
  )
}
```

This JSX can be used as a React component.

```jsx
const tweet = <Tweet />.
```

- **Components** must always start with a **capital letter**

### ReactDOM.render

- The `ReactDOM.render(element, container)` function takes a React element and renders it into the DOM.
- This requires some root element to be created.
  - Here we can use `<div id="root"></div>` to create a root element and is declared in the `index.html` file.

In the example below `document.getElementById("root")` in the call to `ReactDOM.render` is used to access the "root" DOM node.

```jsx
import React from 'react'
import ReactDOM from 'react-dom'

function Tweet(props) {
  return (
    <article className="tweet">
      <header className="tweet__header">
        <img className="tweet__header-avatar" src={props.avatar} />
        <h2 className="tweet__header-name">{props.name}</h2>
      </header>
      <main className="tweet__content">
        <p>{props.content}</p>
      </main>
      <footer className="tweet__footer">{props.date}</footer>
    </article>
  )
}

ReactDOM.render(
  <Tweet
    name="React"
    avatar="https://api.adorable.io/avatars/64/react@adorable.png"
    content="A JavaScript library for building user interfaces"
    date="May 29th, 2013"
  />,
  document.getElementById('root')
)
```

Most applications call `ReactDOM.render(element, container)` a **single time** to render the application.

### Expressions In JSX

- We can use and included expressions within JSX.
  - Expressions are wrapped in curly braces `{}`
  - Expressions are evaluated and converted to a string
  - The result of the expression is inserted into the JSX

In this example we pass in the `format` function to the `date` property of the `props` object.

Here the `format` function gets called each time the component is rendered.

```jsx
import { format } from 'date-fns'

function Footer(props) {
  return <footer className="tweet__footer">{format(props.date, 'MMMM Do, YYYY')}</footer>
}

ReactDOM.render(<Footer date="2013-05-29" />, document.getElementById('root'))
```

## JSX Rules

### Tags must be closed

- Use **two tags** (an open tag and a close tag - as with `<div>...</div>` below).
- Use **one self-closing** tag (as with `<Album />` below).

```jsx
<div>
  <img>
  <Album />
</div>
```

> Here we would get an error because the `<img>` tag is not closed. It should look like this: `<img />`

### Close child tags before parent tags

- We are making a hierarchy of tags.
  - The parent tag must be closed before the child tag is closed.
  - The parent tag must be closed before the grandchild tag is closed.

```jsx
<div>
  <ul> // this is the parent!
    <li> // WRONG
    </ul>
  </li> // WRONG
</div>
```

### JSX Expressions can only return one value

This will work:

```jsx
return (
  <div>
    <input />
  </div>
)

/* becomes */

return React.createElement('div', null, React.createElement('input', null))
```

This will not work:

```jsx
return (
  <div>
  </div>
  <input />
)

/* becomes? */

return (
  React.createElement("div", null)
  React.createElement("input", null)
)

/* Nope. Functions can't return multiple values like that. */
```

### No HTML Components

- Can't use HTML comments

BAD:

```jsx
return (
  <div>
    <!--- Not allowed --->
    {/* Allowed */}
  </div>
)
```
