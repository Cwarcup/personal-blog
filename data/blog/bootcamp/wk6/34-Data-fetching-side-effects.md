---
title: Data Fetching & Side Effects
date: '2022-08-11'
tags: ['Data Fetching', 'Side Effects', 'React']
images: 'https://miro.medium.com/max/1000/1*ycqhUTo1LqydeC355iHRoA.jpeg'
draft: false
summary: Fetching data and handling side effects in React.
---

## Rules of Hooks

- Don't call Hooks inside loops, conditions, or nested functions. **Always use Hooks at the top level of your React functions**.
- Only call Hooks from React functions.
- All hooks start with the prefix `use`.

### Pure Function

- given the same arguments, it returns the same result
- doesn't have side effect.

```js
// simple pure function
const addTwo = (num) => num + 2

const sayHello = (name) => {
  return `Hello there ${name}!`
}
```

## Side Effects

- Writing to standard out (eg. `console.log`)
- Modifying the DOM directly (instead of relying on React)
- Establishing socket connections (eg. `ws` or `Socket.io`)
- Retrieving data from an API (eg. `axios`, `jQuery`, or the `fetch` API)
- Setting timers or intervals

```js
let addition = 5

const addTwo = (num) => {
  return num + addition
}
```

> This is no longer pure! It is accessing a variable that is outside of the function scope.

We need to deal with side effects in a predictable way. This is why we use `useEffect()`.

- `useEffect()` allows us to control **when** a side effect is executed, how often it is executed, and what to do when it is executed.

## useEffect()

- put your side effect within the `{}` callback of the `useEffect()` function.

```jsx
useEffect(() => {
	document.title = ('Hello World!')  // this IS a side effect. Interacting with the DOM directly.
} [])
```

- by default, it will run on every single render.
  - in our example, it runs every time we click the button, updating the `document.title` every time.
- you can have an unlimited number of `useEffect()` functions.
  - best practice to put 'like with like' side effects in the `useEffect()` function.

Within `useEffect()`, you can add a return statement to prevent the side effect from running on every render.

```jsx
const [count, setCount] = useState(0)

useEffect(() => {
  // set up an interval to increment a timer
  const myInterval = setInterval(() => {
    console.log(`the count is ${count}`)
  }, 1000)

  // declare a cleanup function
  const cleanup = () => {
    clearInterval(myInterval)
  }

  return cleanup // return the cleanup function to the effect
}, [])
```

## useEffect Flow

1. React turns your JSX into HTML (client-side rendering) and updates the DOM
1. The browser responds to the change by updating the UI
1. Any cleanup for effects from the previous render are performed
1. New effects for the current render are performed

![useEffect flow](https://raw.githubusercontent.com/andydlindsay/lectures/master/w07d04/useEffect%20Flow.png)

What if we have more than one piece of state?

- every time this component updates, it to run the **entire** `useEffect()` function.
- we can present this from occur by adding an empty array as the second argument to `useEffect()`.

```jsx
const [count, setCount] = useState(0)
const [count2, setCount2] = useState(0)

useEffect(() => {
  const myInterval = setInterval(() => {
    console.log(`the count is ${count}`)
  }, 1000)

  const cleanup = () => {
    clearInterval(myInterval)
  }

  return cleanup
}, []) // empty array here
```

If you add a variable to the array, the effect will **only** run when that variable changes.

```jsx
const [count, setCount] = useState(0)
const [count2, setCount2] = useState(0)

useEffect(() => {
  const myInterval = setInterval(() => {
    console.log(`the count is ${count}`)
  }, 1000)

  const cleanup = () => {
    clearInterval(myInterval)
  }

  return cleanup
}, [count])
```

> Now, the effect will only run when the `count` variable changes.

## Infinite Loop Issue

```jsx
useEffect(() => {
  setCount(count + 1)
}, [count])
```

- this is an infinite loop.
- the useEffect updates the state, which causes the effect to run again. This is an infinite loop.

```jsx
useEffect(() => {}) // run on every render
useEffect(() => {}, [count]) // run only when count changes
useEffect(() => {}, []) // once and only once
```
