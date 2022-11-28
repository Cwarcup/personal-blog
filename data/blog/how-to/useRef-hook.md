---
title: 'React Hooks: useRef & forwardRef'
date: '2022-11-27'
tags: ['Hooks']
images: '/static/images/individualBlogPostImages/useRef.jpg'
draft: false
summary: 'I never truly understood when I should use Reacts useRef hook. It felt similar to useState, but I never really understood the difference. I also never understood when I should use forwardRef. I will explain both of these hooks and when you should use them.'
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

- import `useRef` from react

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

### useRef to store a DOM node

Sometime you may need to access a DOM node directly. For example, you may want to focus on an input element when the page loads, or you may want to measure the size of an element. You can use the `useRef` hook to store a reference to a DOM node.

#### Getting a reference to a DOM node

```jsx
import { useRef } from 'react'

export default function Form() {
  // Create a ref
  const inputRef = useRef(null)

  // Focus on the input element when the page loads
  function handleClick() {
    inputRef.current.focus()
  }

  return (
    <>
      {/* Get a reference to the input element */}
      <input ref={inputRef} />

      {/* When the button is clicked, focus on the input element */}
      <button onClick={handleClick}>Focus the input</button>
    </>
  )
}
```

#### Managing a list of refs using a ref callback

Sometimes you might need a ref to each item in the list, and you don’t know how many you will have. Something like this wouldn’t work:

```jsx
<ul>
  {items.map((item) => {
    // Doesn't work!
    const ref = useRef(null)
    return <li ref={ref} />
  })}
</ul>
```

> You cannot call `useRef` in a loop condition, or inside a `map` call.

The best solution to this is to **pass a function to the `ref` attribute.** This is known as a **ref callback**. The function will be called with the DOM node as an argument. You can store the node in a ref object.

This allows you to maintain your own array of refs, and you can access them later. You can also create a new [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) object to store the refs.

```jsx
import { useRef } from 'react'

export default function CatFriends() {
  // create a ref object
  const itemsRef = useRef(null)

  function scrollToId(itemId) {
    const map = getMap()
    const node = map.get(itemId)
    node.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    })
  }

  function getMap() {
    if (!itemsRef.current) {
      // Initialize the Map on first usage.
      itemsRef.current = new Map()
    }
    return itemsRef.current
  }

  return (
    <>
      <nav>
        <button onClick={() => scrollToId(0)}>Tom</button>
        <button onClick={() => scrollToId(5)}>Maru</button>
        <button onClick={() => scrollToId(9)}>Jellylorum</button>
      </nav>
      <div>
        <ul>
          {catList.map((cat) => (
            <li
              key={cat.id}
              ref={(node) => {
                const map = getMap()
                if (node) {
                  map.set(cat.id, node)
                } else {
                  map.delete(cat.id)
                }
              }}
            >
              <img src={cat.imageUrl} alt={'Cat #' + cat.id} />
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

const catList = []
for (let i = 0; i < 10; i++) {
  catList.push({
    id: i,
    imageUrl: 'https://placekitten.com/250/200?image=' + i,
  })
}
```

## forwardRef

If you try to put a `ref` on **your own** component, you will get `undefined` as the value of the ref. This is because the ref is passed to the component as a prop, and the component doesn’t forward it to the DOM node.

For example, this code will **not** work:

```jsx
import { useRef } from 'react'

// your own component
function MyInput(props) {
  return <input {...props} />
}

export default function MyForm() {
  // create a ref object in another component
  const inputRef = useRef(null)

  function handleClick() {
    inputRef.current.focus()
  }

  return (
    <>
      {/* Pass the ref to your own component */}
      <input ref={inputRef} />
      <button onClick={handleClick}>Focus the input</button>
    </>
  )
}
```

> The `ref` prop is not forwarded to the DOM node. When you click the button, the input will not be focused.

This happens because by default React does not let a component access the DOM nodes of **other components**. **Not even for its own children!**

Solution: use `forwardRef` to pass the ref to the DOM node.

Instead, components that **_want_** to expose their DOM nodes have to opt in to that behavior. A component can specify that it “forwards” its ref to one of its children. Here’s how `MyInput` can use the `forwardRef` API:

```jsx
import { forwardRef } from 'react'

const MyInput = forwardRef((props, ref) => {
  return <input {...props} ref={ref} />
})
```

Now, when you pass a ref to `<MyInput>`, the ref will be forwarded to the `<input>` element inside it.

```jsx
import { useRef, forwardRef } from 'react'

// your own component
const MyInput = forwardRef((props, ref) => {
  return <input {...props} ref={ref} />
})

export default function MyForm() {
  // create a ref object in another component
  const inputRef = useRef(null)

  function handleClick() {
    inputRef.current.focus()
  }

  return (
    <>
      {/* Pass the ref to your own component */}
      <MyInput ref={inputRef} />
      <button onClick={handleClick}>Focus the input</button>
    </>
  )
}
```

It is common to use `forwardRef` in components like buttons, inputs, and other components that need to be accessed by the parent component.

## Best Practices for Refs

- Only use `ref`'s when you need to access the DOM node directly. Don't use it to store data.
  - examples of when you need to access the DOM node directly:
    - focus on an input element
    - measure the size of an element
    - add event listeners to an element
    - scroll position
    - calling browser APIs that React doesn't support
- Don't use `ref`'s to store data. Use `useState` instead.
- Avoid changing DOM nodes managed by React.
  - Example: if you use `ref.current.remove()` to remove a DOM node, React will not be able to update it. If you called `setState` after that, React will not be able to update the DOM node.
