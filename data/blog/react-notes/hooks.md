---
title: Getting Started with Hooks in React
date: '2022-03-14'
tags: ['react', 'hooks']
draft: false
summary: 'Hooks are a way to write reusable code, instead of more classic techniques like inheritance. Come take a look at the most commonly used hooks in React.'
---

Hooks are a way to write reusable code, instead of more classic techniques like inheritance.

## Hooks System

- `useState`
  - function that lets you use **state** in a functional component.
- `useEffect`
  - function that lets you use something like **lifecycle methods** in a functional component.
- `useRef`
  - function that lets you create a **'ref'** in a functional component.

## Primitive Hooks

Are built-in react functions:

- useState
- useEffect
- useContext
- useReducer
- useCallback
- useMemo
- useRed
- useImperativeHandle
- useLayoutEffect
- useDebugValue

## Custom Hook

May reuse a few primitive hooks from react. We can create our own and should be reusable.

# useState

[React docs:](https://reactjs.org/docs/hooks-state.html)

Used to give us access to the **state** system within a functional component. Previously, this was not possible with functional components, only **class based components.**

Example with **hooks** in a **functional** component:

```js
import React, { useState } from 'react'

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}
```

Same example but using **class components**:

```js
class Example extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
    }
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>Click me</button>
      </div>
    )
  }
}
```

One last example of useState:

```js
export default function App() {
  const [count, setCount] = useState(0) // initialize

  const onButtonClick = () => {
    // setter function
    setCount(count + 1)
  }

  return (
    <div>
      <button onClick={onButtonClick}>Click Me!</button> // invoking setter function
      <h1>Current Count: {count}</h1>
    </div>
  )
}
```

#### useState syntax

`const [activeIndex, setActiveIndex] = useState(null);`

This is known as **array destructuring**. Is the same idea as object destructuring. Basically a shortcut to get references to elements within an array.

Whenever we call `useState()` we get access to **two elements inside it**.

The **first** element in the array is something we want to keep track of, it will **change over time**. In our case, we are keeping track of the `count`. When you click the button, it increments the value.

The **second** element in the array, named as `setFirstVariableName`, is a **function** we call to **update our piece of state**. Anytime we call the **setter** function, it will cause our entire component to re-render.

> The named of the first and second elements are NOT special. They can be anything we want.

## Initialize, reference and updating hooks

Comparing class and function components:

## Multiple State Variables

In functional components, **we call `useState` multiple times**.

```js
const [activeIndex, setActiveIndex] = useState(0)
const [term, setTerm] = useState('')
```

Same goes for if we want to **update those states**, we need to call the **setter for each state we are following.**

```js
setActiveIndex(10)
setTerm('Gilligan')
```

Back in **class based components**, we can initialize states very easily, like so:
`state = { activeIndex:0, term: '' }`

# Setter Function

Whenever you invoke the **setter function** (setSomething), it will **change** the value of the variable which is changing state. It will NOT go back to the default value.

## Text Input with hooks

Here our `state` is update on every keystroke in the search bar:

```js
import React, { useState } from 'react'

const Search = () => {
  const [term, setTerm] = useState('')

  return (
    <div className="ui form">
      <div className="field">
        <label>Enter Search Term</label>
        <input value={term} onChange={(e) => setTerm(e.target.value)} className="input"></input>
      </div>
    </div>
  )
}

export default Search
```

# useEffect - how to detect that a state has changed

[React Docs on useEffect](https://reactjs.org/docs/hooks-effect.html):

- Allows function components to use something like lifecycle methods.
- We configure the hook to run some code automatically in one of three scenarios.
  1. when the component is rendered for the **first time only**.
  2. when the component is rendered **for the first time and whenever it re-renders**.
  3. when the component is rendered for the **first time**, whenever it **re-renders**, and **some piece of data has changed**.

We have to tell React when we want to use effect, i.e., one of the three scenarios above. We do this by providing a **second argument**.

```js
const Search = () => {
  const [term, setTerm] = useState('');

  useEffect(() => {
    console.log('aasdf');
  }, [term]); // second term used to determine when to use effect
```

## Async with useEffect

Making a request to an API while using the `useEffect` hook.

Option 1: Wrap the request in (), and then immediately call it.

```js
useEffect(() => {
  ;(async () => {
    await axios.get('ddsfg')
  })()
}, [term])
```

Option 2: Use normal promises.

```js
useEffect(() => {
  axios.get('asd').then((response) => {
    console.log(response.data)
  })
}, [term])
```

Option 3: Define a new function inside of `useEffect`, mark it as async, then call it manually.

```js
const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // define new function as async
      const getData = async () => {
          const { data } = await axios.get(URL); //add await to make it async
          setUsers(data)
      };

      // call async function manually
      getData();



  }, []);
```

## dangerouslySetInnerHTML - XSS Attack

`<span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>`

Take a string from a 3rd party (API in our case) and execute it as HTML. Can slo do
