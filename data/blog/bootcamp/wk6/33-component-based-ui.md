---
title: Custom Hooks
date: '2022-08-10'
tags: ['Hooks', 'React']
images: 'https://tsh.io/wp-content/uploads/2020/03/react-component-lifecycle-methods-graphic_.png'
draft: false
summary: Basics of building a custom Hook.
---

Custom Hooks can be used to share logic between components. These Hooks work the exact same as the built-in Hooks.

## Rules of Custom Hooks

- Don't call any Hooks inside of a **loop**, **conditionally**, or inside a **nested function**.
- Only call Hooks inside of a **React component**.

These rules also apply to our custom Hooks with one exception:

- Custom Hooks **must start with the word "use"**

It's also important to know that custom Hooks can also call any Hooks that are built into React.

## Sharing Logic Between Functions

Benefits of Hooks:

- It's hard to reuse stateful logic between components.
- Complex components grow in size.
- Classes confuse people and machines.

It's common to create multiple controlled inputs and buttons in a form. But this can get repetitive and messy:

```jsx
function Application(props) {
  const [firstname, setFirstName] = useState('')
  const [lastname, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  return (
    <form>
      <input value={firstname} onChange={(event) => setFirstName(event.target.value)} />
      <input value={lastname} onChange={(event) => setLastName(event.target.value)} />
      <input value={email} onChange={(event) => setEmail(event.target.value)} />
      <input
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        type="password"
      />
      <input
        value={passwordConfirmation}
        onChange={(event) => setPasswordConfirmation(event.target.value)}
        type="password"
      />
    </form>
  )
}
```

This is a great time to use a custom Hook!

- This Hook will track the state of the input field and return an object that contains a `value` and an `onChange` property.
- These match the attributes that an `input` field must have to become controlled.

```jsx
function useControlledInput(initial) {
  const [value, setValue] = useState(initial)

  return {
    value,
    onChange: (event) => setValue(event.target.value),
  }
}
```

- We can use this Hooks instead of all the `useState`'s we used before.
- We store the object that the Hook returns in a separate variable **per input**.
- The **spread operator** provides an easy way to pass the `value` and `onChange` props directly to each input element.

```jsx
function Application(props) {
  const firstname = useControlledInput('')
  const lastname = useControlledInput('')
  const email = useControlledInput('')
  const password = useControlledInput('')
  const passwordConfirmation = useControlledInput('')

  return (
    <form>
      <input {...firstname} />
      <input {...lastname} />
      <input {...email} />
      <input {...password} type="password" />
      <input {...passwordConfirmation} type="password" />
    </form>
  )
}
```
