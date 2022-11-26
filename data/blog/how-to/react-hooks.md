---
title: 'Beyond the Basic React Hooks'
date: '2022-11-25'
tags: ['Hooks']
images: '/static/images/individualBlogPostImages/nullish-coal.jpg'
draft: true
summary: 'Most react developers are familiar with the basic hooks like useState, useEffect, and useRef. But there are many more hooks that can be used to make your code more readable and easier to maintain.'
---

# Beyond the Basic React Hooks

I think it's safe to say that react developers have used the basic hooks like `useState`, `useEffect`, and `useRef`. But as you start to use react more and more, you will find that there are many more hooks. Here are some of the more advanced hooks that I have found useful.

## useRef

Use the `useRef` hook when you want to "remember" a value, but don't want that value to trigger a re-render. This is useful when you want to store a value that you don't want to change, but you don't want to store it in state.

Examples include:

- A reference to a DOM node
  - i.e. `const inputRef = useRef()` and then `inputRef.current.focus()`
- A reference to a component instance
  - i.e. `const componentRef = useRef()` and then `componentRef.current.someMethod()`

### Using useRef to store a value

- import `useRef` from reac

  t

- inside your component, call `useRef` and pass in the initial value

```jsx
import { useRef } from 'react'

export default function App() {
  const ref = useRef(0)

  console.log(ref.current) // returns 0

  return <div className="App">{ref.current}</div>
}
```

- You can access the current value of the ref by calling `ref.current`
- This current value is intentionally **mutable**. You can change it by assigning a new value to it.
  - You can read and write to it, but it will not trigger a re-render.

```jsx
import { useRef } from 'react'

export default function App() {
  const ref = useRef(0)

  console.log(ref.current) // returns 0

  ref.current = 1

  console.log(ref.current) // returns 1

  ref.current++ // returns 2

  return <div className="App">{ref.current}</div>
}
```

Unlike state, ref is a plain JavaScript object contianing the `current` property. You can add any properties you want to it.

```jsx
import { useRef } from 'react'

export default function App() {
  const ref = useRef(0)

  ref.current = 1

  ref.current++ // returns 2

  ref.current = 'hello' // returns 'hello'

  ref.current = { name: 'John' }

  return <div className="App">{ref.current.name}</div>
}
```

When a piece of information is used for rendering, keep it in state. When a piece of information is only needed by event handlers and changing it doesn’t require a re-render, using a ref may be more efficient.

### Ref vs State

| ref                                                                                         | state                                                                                                     |
| ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `useRef(initialVal)` returns `{current: initialVal}`                                        | `useState(initialVal)` returns `[currentVal, setVal]`                                                     |
| Does **not** trigger a re-render                                                            | Triggers a re-render when you change it                                                                   |
| Mutable, meaning you can modify and update `current` value outside of the rendering process | Immutable, meaning you can only update it with `setVal`. When this occurs, a re-render **will** occur.    |
| Should not be used to read or write the `current` value during rendering                    | You can read state at any time. However, each render has its own snapshot of state which does not change. |

`useRef` is could be though of like a specific flavor of `useState`. Take the following example:

```jsx
// Inside of React
function useRef(initialValue) {
  const [ref, unused] = useState({ current: initialValue })
  return ref
}
```

During the first render, `useRef` return `{current: initialValue}`. This is the same as `useState({current: initialValue})`. However, `useState` will trigger a re-render when you change the value of `current`. `useRef` will not trigger a re-render.

Information obtained from [beta.reactjs](https://beta.reactjs.org/learn/referencing-values-with-refs).

### Examples of useRef

```jsx
import { useState, useRef } from 'react'

export default function App() {
  const [text, setText] = useState('')
  const [isSending, setIsSending] = useState(false)
  const timeoutRef = useRef(null)

  function handleSend() {
    setIsSending(true)
    timeoutRef.current = setTimeout(() => {
      alert('Sent!')
      setIsSending(false)
    }, 3000)
  }

  function handleUndo() {
    setIsSending(false)
    clearTimeout(timeoutRef.current)
  }

  return (
    <>
      <input disabled={isSending} value={text} onChange={(e) => setText(e.target.value)} />
      <button disabled={isSending} onClick={handleSend}>
        {isSending ? 'Sending...' : 'Send'}
      </button>
      {isSending && <button onClick={handleUndo}>Undo</button>}
    </>
  )
}
```

```jsx
import { useState, useRef } from 'react'

function DebouncedButton({ onClick, children }) {
  const timeoutRef = useRef(null)
  return (
    <button
      onClick={() => {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(() => {
          onClick()
        }, 1000)
      }}
    >
      {children}
    </button>
  )
}
```
