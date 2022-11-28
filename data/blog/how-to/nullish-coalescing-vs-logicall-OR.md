---
title: 'Nullish Coalescing Operator in JavaScript'
date: '2022-11-25'
tags: ['javascript']
images: '/static/images/individualBlogPostImages/nullish-coal.jpg'
draft: false
summary: 'I was reading some code and saw this nullish coalescing operator (??) which I had never seen these before, so I decided to look them up and write a blog post about them. I have always used the logical OR (||) operator to check for null or undefined values, but I learned that there is a better way to do it.'
---

Introduced in ES2020, the nullish coalescing operator (`??`) is a logical operator that returns its right-hand side operand when its left-hand side operand is `null` or `undefined`, and otherwise returns its left-hand side operand.

This is a logical operator, meaning that it returns either `true` or `false`.

It is different from the logical OR (||) operator, which returns the first truthy value.

## Examples

```js
const foo = null ?? 'default string'

console.log(foo)
// expected output: "default string"
```

```js
const foo = 0 ?? 42

console.log(foo)
// expected output: 0
```

The `||` can create some issues if your left value is falsy, like `0` or `''`.

```js
const foo = 0 || 42
console.log(foo) // 42

const bar = 0 ?? 42
console.log(bar) // 0
```

Unlike `||`, `??` does not return the first truthy value. It only returns the right value if the left value is `null` or `undefined`.

```js
const foo = '' || 'default string'
console.log(foo) // 'default string'

const bar = '' ?? 'default string'
console.log(bar) // ''

const baz = undefined ?? 'default string'
console.log(baz) // 'default string'
```

## Use Cases

The nullish coalescing operator is useful when you want to return a default value if a variable is `null` or `undefined`.

```js
const [result, setResult] = useState(null)

useEffect(() => {
  fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then((response) => response.json())
    .then((json) => setResult(json))
}, [])

return <div>{result ?? 'Loading...'}</div>
```

In this example, we are fetching data from an API. If the data is not yet loaded, we want to display a loading message.

This can also be useful when using React and TypeScript. For example, take this type:

```ts
type User = {
  name: string
  happy: boolean | null
}

export const User = ({ user }: { user: User }) => {
  return (
    <div>
      <h1>{user.name}</h1>
      {user.happy ?? 'Unknown'}
    </div>
  )
}
```

In this example, we are displaying a user's name and whether or not they are happy. If the user's happiness is `null`, we want to display `Unknown`. This satisfies the type checker, because `null` is a valid value for `boolean | null`.
