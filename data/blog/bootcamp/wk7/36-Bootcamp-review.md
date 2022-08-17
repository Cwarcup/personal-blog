---
title: A review of React
date: '2022-08-15'
tags: ['React']
images: 'https://user-images.githubusercontent.com/47307889/116921331-826bbe80-ac5c-11eb-9f48-d8fbde144b04.png'
draft: True
summary: Review of React
---

## Components

- Building blocks of a React application
- Represented as functions that return JSX

## Props

- Is data that is passed into a components from a parent
  - Parent passes JavaScript data into a child component

The **attribute name** used to pass in the value becomes the **key in props** used to access the value

```jsx
// in the parent component's return
;<ChildComponent propOne="hello" propTwo="world" />

// in the child, the values can be accessed in props
console.log(props) // { propOne: 'hello', propTwo: 'world' }
```

- Blocks of JSX can also be passed down to a child component if **placed between** the opening and closing tag of the child
  - JSX passed down like this can be accessed using `props.children`

```jsx
<ChildComponent>
  <h2>These DOM elements</h2>
  <p>become `props.children` in the child</p>
</ChildComponent>
```

> This can be useful if you want the child component to wrap some of your JSX

```jsx
// inside the child component's return
<h2>These props are from the parent</h2>
<ul>
  { props.children }
</ul>

// this is equivalent to
<h2>These props are from the parent</h2>
<ul>
  <h2>These DOM elements</h2>
  <p>become `props.children` in the child</p>
</ul>
```

## Data Fetching

- All data fetching should be done **inside** of a `useEffect` hook

Can setup a server quickly with Express in a new directory

```js
// require express and create the server
const express = require('express')
const app = express()
const todos = [
  { id: 1, text: 'Learn React' },
  { id: 2, text: 'Build a Todo app' },
  { id: 3, text: 'Create a React app' },
  { id: 4, text: 'Test the React app' },
  { id: 5, text: 'Deploy the React app' },
]

// create a route to return all todos
app.get('/todos', (req, res) => {
  res.send(todos)
})

// start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
```

In the original `setState()` you may need to set the initial state to an empty array

```jsx
const [todos, setTodos] = useState([])
```

Import `useEffect` from `react` and use it to fetch the data. Can use `axios` or `fetch` to fetch the data.

```jsx
useEffect(() => {
  axios.get('http://localhost:3000/todos')
    .then(res => res.json())
    .then(data => setTodos(data))
    .catch(err => console.log(err))
} [])

```

### Cors Errors

- Cors errors are caused by the server not allowing access to the client's origin

Possible solutions:

- In the `package.json` file in the front-end app and set up a proxy for outgoing requests:

```json
// in the front-end app's package.json file
"proxy" : "http://localhost:3000"
```

- Remove the `package-lock.json` file from the front-end app and reinstall the dependencies

## Immutable Patterns

- important not to mutate original state
- often need to make a **deep** copy of the state.
  - recall that the spread operator `...` makes a deep copy of an object, but only one level deep

### Making a deep copy of an object

Can use `JSON.parse(JSON.stringify(object))` :

- is easy but slow
- not good for large objects

```js
const object = {
  key: 'value',
  key2: 'value2',
  key3: {
    key4: 'value4',
    key5: 'value5',
  },
}
const newObject = JSON.parse(JSON.stringify(object))
```

---

Can use `map()` to make a deep copy of an array:

```js
const array = [
  { key: 'value' },
  { key2: 'value2' },
  { key3: { key4: 'value4', key5: 'value5' } }
]
const newArray = array.map(item => return{ ...item })
```

---

Can use `...` spread operator:

- not the best solution
- doesn't go very deep

```js
const array = [{ key: 'value' }, { key2: 'value2' }, { key3: { key4: 'value4', key5: 'value5' } }]
const newArray = [...array]
```

## Storybook

```
npx sb init
```

- Storybook and React install needs to match.
- Will create a new `.storybook` directory in the root of the project.
- see [legacy storybook for more info](https://github.com/storybookjs/storybook/blob/master/lib/core/docs/storiesOf.md)

```
npm run storybook
```

> To run Storybook

- You can delete the boilerplate code

Inside of `index.stories.js`...

```js
import { storiesOf } from '@storybook/react'

// import any components you want to add to the storybook
import ComponentOne from './componentOne'

storiesOf('ComponentOne', module).add('with some props', () => <ComponentOne />)
```

## Useful Links

- Lecture repository: [here](https://github.com/ChristianNally/web-ft-27jun2022-lecture-code-nally/tree/main/w08_react_review/todo)
