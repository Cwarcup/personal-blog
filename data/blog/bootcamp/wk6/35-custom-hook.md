---
title: Custom Hooks in React
date: '2022-08-12'
tags: ['Hooks', 'React']
images: 'https://github.com/Eliav2/how-react-hooks-work'
draft: false
summary: Basics of creating custom hooks in React, resources for pre-made hooks, and resources for creating custom hooks.
---

## Creating Custom Hooks

"Building your own Hooks lets you extract component logic into reusable functions." - [React documentation](https://reactjs.org/docs/hooks-custom.html)

- useful for repetitive tasks or complex logic
- are essentially just JavaScript functions
- must start with `use` prefix so React knows this is a custom hook

```jsx
// simple custom hook
const useDocumentTitle = (title) => {
  useEffect(() => {
    document.title = title
  }, [title])
}

// inside of a component
useDocumentTitle('My New Title')
```

### Steps to create a custom hook

1. Create a new file in the `src/hooks` directory

Typically have one hook per file.

```jsx
// src/hooks/useDocumentTitle.js
import React, { useEffect } from 'react'

const useDocumentTitle = (title) => {
  useEffect(() => {
    document.title = title
  }, [title])
}

export default useDocumentTitle
```

- Make sure the hook has access to any variables that it needs to update the document title
- Custom hooks **can** or **cannot** return anything.

2. Import the hook into your component file

```jsx
import useDocumentTitle from './hooks/useDocumentTitle'
```

---

Another example: We want to create a hook to listen to the mouse position.

- We are interested in the `clientX` and `clientY` properties of the `event` object
  - If we look in the `event` object we have multiple properties with the same values! Most likely due to browsers using different properties.

```jsx
// src/hooks/useMousePosition.js
import React, { useEffect } from 'react'

const ShowMousePosition = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0 })

  useEffect(() => {
    document.addEventListener('mousemove', (event) => {
      setCoords({
        x: event.clientX,
        y: event.clientY,
      })
    })
  }, [])

  return (
    <h1>
      X: {x}, Y: {y}
    </h1>
  )
}

export default MousePosition

// in your component file
//...
function App() {
  return (
    <div className="App">
      <ShowMousePosition />
    </div>
  )
}
```

We also need to consider **clean up** for our hook.

```jsx
const ShowMousePosition = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  useEffect(() => {
    // have to make reference to the function to remove it
    const moveHandler = (event) => {
      setCoords({
        x: event.clientX,
        y: event.clientY,
      })
    }

    document.addEventListener('mousemove', moveHandler)

    // create clean up function
    const cleanup = () => {
      document.removeEventListener('mousemove', moveHandler)
    }

    // return clean up function
    return cleanup
  }, [])
}
```

## Testing Custom Hooks

- Need to import the `@testing-library/react-hooks` [library](https://github.com/testing-library/react-hooks-testing-library)
- import the custom hook into the testing file

``
npm install --save-dev @testing-library/react-hooks

````

```js
import { renderHook, act } from "@testing-library/react-hooks";

import ShowMousePosition from "./hooks/ShowMousePosition";
````

- purpose of `act` is to wait for asynchronous code to finish

  - need to wait for the update to re-render the component

- `test suites' is the actual test file. Can have multiple `tests` within the same file.

## Custom Hooks Example

- [Browser Dimensions Codesandbox](https://codesandbox.io/s/custom-hooks-exercise-browser-dimensions-d5tv7)
- [Mouse position example](https://codesandbox.io/s/eloquent-allen-dxfns?fontsize=14)

## Resources

- [React custom hooks](https://reactjs.org/docs/hooks-custom.html)
- Easy to understand [React custom hooks](https://usehooks.com/)
- [Awesome-react-hooks on Github](https://github.com/rehooks/awesome-react-hooks)
