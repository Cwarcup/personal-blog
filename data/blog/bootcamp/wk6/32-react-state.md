---
title: React - State
date: '2022-08-08'
tags: ['state', 'react']
images: 'https://miro.medium.com/max/1200/1*hYSKyofnqThnPIsYRfnUUQ.png'
draft: true
summary: Passing props to components.
---

State is a piece of data that is stored in a component. It represents the current condition, values or contents of a program.

State in React allows us to dynamically change the contents of a component based on the value of a variable passed to a component. State also allows us to retain information across multiple renders.

We use **"hooks"**, specifically the **`useState`** hook, to manage state.

Use this repository to follow along with the examples: [here](https://github.com/Cwarcup/fancy-buttons)

## Using State in React

We must firs timport the `useState` hook from the React library.

```jsx
import { useState } from 'react'
```

- The `useState` function receives an _optional_ argument which is the **initial/default** value of the state.
- `useState` returns an array
  - first element is the **current** state
  - second element is a function to **update the state** (`setState`)
  - we use array deconstruction to extract the current state and the update state function

```jsx
import { useState } from 'react'

function Application(props) {
  const [count, setCount] = useState(0) // array deconstruction

  return (
    <main>
      <Button onClick={() => setCount(count + 1)}>Increment</Button>
      <h1>Button was clicked {count} times.</h1>
    </main>
  )
}
```

## Importing The useState Hook

- `useState` is a React hook, therefore it must be imported from the `React` object.

```jsx
import { useState } from 'react'
```

## Using useState

- Use the `useState` hook by calling it within our component.
- It must **NOT be called** within...
  - conditionals
  - loops
  - or other functions
- It must be called at the top level of our component.

Calling the `useState()` hook will return an **array** containing two values:

- a **reference** to get the current value of the state
- a **setter function** (i.e. a way to set the reference and re-render the app)
  - the setter function **needs** to **start** with the word `set` like in the example below.

```jsx
const [reference, setReference] = useState()
// or
const [state, setState] = useState()
```

> Use array deconstruction to extract the current state and the setter function.

Our app should look like so:

```js
function AngryButton(props) {
  const [anger, setAnger] = useState()
  //...
}
function CounterButton(props) {
  const [clickAmount, setClickAmount] = useState()
  //...
}
function LightSwitchButton(props) {
  const [light, setLight] = useState()
  //...
}
function TextRepeaterButton(props) {
  const [repetitions, setRepetitions] = useState()
  //...
}
```

For the Anger Button:

- we want the value of anger to go from 0 to 1 by increments of 0.1, and once we go over 1, reset it to zero. We need to use the value of anger in two places:
  - for the background color of the button
  - as a condition that will determine which message is displayed.

```jsx
import { useState } from 'react'

function AngryButton() {
  // count the percentage of anger
  const [anger, setAnger] = useState(0)
  return (
    <button style={{ backgroundColor: `rgba(255,0,0,${anger})` }} className="AngryButton">
      {anger < 1 && <span>Don't click me too much! </span>}
      {anger > 1 && <span>Rawr!</span>}
    </button>
  )
}

export default AngryButton
```

CounterButton:

- For this button, we want the value of clickAmount to start at 0 and increment by 1 with each click. We want to use the value of clickAmount in the text of the button.

```jsx
function CounterButton() {
  //count amount of clicks
  const [clickAmount, setClickAmount] = useState(0)

  return <button className="CounterButton">You clicked me {clickAmount} amount of times</button>
}
```

## Modifying The State

- Use the setter function (second argument) to update the state.

```jsx
let [x, setX] = useState(42)
// WRONG!
x = 99

// CORRECT!
setX(99)
```

For our click counter, we need to add an `onClick` event handler to the button. To keep our code clean, we will create a function that can be referenced in the event handler.

```jsx
  const handleClick = (event) => setState(event.target.value ? event.target.value : "");

  <button onClick={handleClick} />

  // instead of

  <button onClick={event => setState(event.target.value ? event.target.value : "")} />
```

For our project, it should look like this:

```jsx
function AngryButton() {
  // count the percentage of anger
  const [anger, setAnger] = useState(0)

  const handleClick = () => {
    if (anger < 1) {
      setAnger(anger + 0.1)
    } else {
      setAnger(0)
    }
  }

  return (
    <button
      onClick={handleClick}
      style={{ backgroundColor: `rgba(255,0,0,${anger})` }}
      className="AngryButton"
    >
      {anger < 1 && <span>Don't click me too much! </span>}
      {anger > 1 && <span>Rawr!</span>}
    </button>
  )
}
```

## Lifting State Up

Right now, only the component that uses the state has access to the state.

What if we wanted to share the state between components? We can do this by lifting the state up to the component that needs it.

Let's do this to change the background color of our `App` component (the parent to all these components).

> From the React docs: In React, sharing state is accomplished by moving it up to the closest common ancestor of the components that need it. This is called _“lifting state up”_.

```jsx
// Before, only the AngryButton component has access to the state
function App() {
  return (
    // ...
    <LightSwitchButton />
  )
}

function LightSwitchButton(props) {
  const [light, setLight] = useState('off')
  // ...
}
```

```jsx
// After, now parent App component has access to the state
function App() {
  const [light, setLight] = useState('off')
  return (
    // ...
    <LightSwitchButton light={light} setLight={setLight} /> // pass as props
  )
}

// back over at the LightSwitchButton component
function LightSwitchButton(props) {
  const { light, setLight } = props // destructuring props
  // ...
}
```

## Adding a Dark Mode

We want to change the colour of our app.

- switch the backgrounds from white to black
- the text
- button borders from black to white.

We can accomplish that task by adding a `dark` **class** name to the **parent** `div` element inside the `App` component.

```css
.App.dark,
.App.dark button {
  background: #222;
  border-color: white;
  color: white;
}
```

## Passing Down State Values

In the child:

```jsx
function LightSwitchButton(props) {
  const { light, setLight } = props // destructuring props
  const handleClick = () => setLight(light === 'on' ? 'off' : 'on') // keep the handleClick function in the child component

  return (
    <button onClick={handleClick} className="LightSwitchButton">
      {light === 'on' && (
        <span className="on">
          <i>💡</i> I'm on!
        </span>
      )}

      {light === 'off' && (
        <span className="off">
          <i>💡</i> I'm off!
        </span>
      )}
    </button>
  )
}
```

In the parent:

```jsx
import './App.css'
import { useState } from 'react' // import useState from react
import LightSwitchButton from './components/LightSwitchButton'

function App() {
  //want to know if the light is on or off
  const [light, setLight] = useState('off') // useState is a hook

  return (
    <div className={'App dark'}>
      <h1>Fancy Buttons!</h1>
      <section>
        <LightSwitchButton light={light} setLight={setLight} /> // pass as props
      </section>
    </div>
  )
}
```

## Change From Dark To Light Mode

```jsx
function App() {
  //want to know if the light is on or off
  const [light, setLight] = useState('off') // default to off, in dark mode

  const dark = light === 'off' ? 'dark' : '' // if light is off, add the class dark to the parent div

  return (
    <div className={`App ${dark}`}>
      {' '}
      // conditional className
      <h1>Fancy Buttons!</h1>
      <section>
        <AngryButton />
        <CounterButton />
        <LightSwitchButton light={light} setLight={setLight} />
        <TextRepeaterButton />
      </section>
    </div>
  )
}
```

## Better Parent State Modifications

It is good practice to keep logic that changes the state near the declaration, and not in a child component. The reason behind this is that if the code that changes the state is written in a component that is several levels down, it can be hard to find the source of a bug.

```jsx
//child

const { light, switchLight } = props

// ...
;<button onClick={switchLight} className="LightSwitchButton"></button>
```

```jsx
// parent
<LightSwitchButton light={light} setLight={setLight} switchLight={switchLight} />
```

We ca forgo `handleClick` and give `switchLight` **directly** to the `onClick` event listener.

## Controlled Components

In HTML we use form elements to get user input and create interactive websites. An important thing forms do is keep track of their state by using an `<input>` element to keep track of the `value` of the input.

However, recall that React uses does not need to this. It has other ways of keeping track of state.

**Controlled Components** are ones that **override** HTML form elements to let React control their state.

Controlled components pattern:

1. Set a variable that is stored in state as the `value` attribute on the `form` element.
1. Use an `onChange` event that uses the **setter** of your state to set a new value when the `input` changes.

Recall from reading about event handling that events in the DOM generate event objects which have lots of useful information for programmers.

When the user types on the keyboard, that triggers the `onChange` event and the value of the data is found in `event.target.value`.

Example:

```jsx
function DisplayWord(props) {
  const [word, setWord] = useState('')

  return (
    <main>
      <input
        value={word}
        onChange={(event) => setWord(event.target.value)}
        placeholder="Please enter a word"
      />
      <h1>Your word is: {word}.</h1>
    </main>
  )
}
```

> As noted above, the `<input>` element becomes a **controlled component** when we provide a `value` prop and an `onChange` event handler that can update the value

Read more about React forms [here](https://reactjs.org/docs/forms.html)
