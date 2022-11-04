---
title: Converting to TypeScript from React JS
date: '2022-11-04'
tags: ['typescript']
images: '/static/images/individualBlogPostImages/ts-conversion.jpg'
draft: False
summary: I recently started to convert my React JS project to TypeScript. I wanted to share my journey in converting my project and the steps I took to get started. Here I cover a few key concepts when you convert a React JS project to TypeScript.
---

# Typing Functions

After the function name, you must add a colon and the type of the function. In this case, we are typing the function that returns a boolean. We need to state what the function takes in and what it returns.

```ts
const func: (a: string, b: number, c: boolean) => boolean = (a, b, c) => {
  return true
  // must return a boolean
}
```

We can also have functions that do not return anything. In this case, we would use the `void` keyword.

```ts
const func: (a: string, b: number, c: boolean) => void = (a, b, c) => {
  console.log('hello')
  // does not return anything
}
```

# Typing In React

## Typing Props

We have two ways of typing props: `interface` and `type`.

| interface                          | type               |
| ---------------------------------- | ------------------ |
| Are extendable. Similar to classes | Are not extendable |

Use this component as an example:

```tsx
const SearchBox = ({ className, placeholder, onChangeHandler }) => (
  <input
    className={`search-box ${className}`}
    type="search"
    placeholder={placeholder}
    onChange={onChangeHandler}
  />
)

export default SearchBox
```

To props is an **object** that contains the props that are passed into the component. We can type the props by adding a colon and the type of the props. In this case, we are typing the props as an object that contains a `className`, `placeholder`, and `onChangeHandler` property.

We will use the `interface` keyword to type the props.

```tsx
interface SearchBoxProps {
  // describe the shape of the props object
}
```

Here we would say the props is an object that contains a `className`, `placeholder`, and `onChangeHandler` property.

> We can also tell typescript that a property is optional by using the `?` symbol.

```tsx
interface SearchBoxProps {
  className: string;
  placeholder?: string;
  onChangeHandler: // but what type is this?
}
```

How do we type the `onChangeHandler` property? We can use the `type` keyword to type the `onChangeHandler` property.

### Extending Interfaces

Remember how we said that interfaces are extendable? We can use the `extends` keyword to extend the `SearchBoxProps` interface.

```tsx
interface SearchBoxProps extends SearchBoxProps {
  className: string;
  placeholder?: string;
  onChangeHandler: // but what type is this?
}

interface someChangeHandlerProps {
  // describe the shape of the onChangeHandler props
  onChangeHandler: (a: string) => void;
}
```

### Overloading Interfaces

```tsx
interface SearchBoxProps {
  className: string
  placeholder: string
}

interface SearchBoxProps {
  // describe the shape of the onChangeHandler props
  onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const SearchBox = ({ className, placeholder, onChangeHandler }: SearchBoxProps) => (
  <input
    className={`search-box ${className}`}
    type="search"
    placeholder={placeholder}
    onChange={onChangeHandler}
  />
)
```

> Use the same name for the interface to overload it.

## Types

- do not allow for extension
- can not overload them

So why do we like to use types? **UNIONS!**

We can use the `|` symbol to create a union type. This means that the type can be one of the types that we specify.

For example, what if we needed to create a type of an address? US and Canada have different address formats. We can use a union type to specify that the type can be a US address or a Canadian address.

```ts
type Address = {
  province: string
  state: string
}
```

How do we handle this?

```ts
type CanadianAddress = {
  street: string
  province: string
}

type USAddress = {
  street: string
  state: string
}

// make a union type
type NorthAmericanAddress = CanadianAddress | USAddress
```

This means that our `NorthAmericanAddress` type can be a `CanadianAddress` or a `USAddress`.

This example would work fine:

```ts
const address: NorthAmericanAddress = {
  street: '123 Main St',
  province: 'Ontario',
}
```

### Typing Props

Back to the `SearchBox` component:

```tsx
type SearchBoxProps = {
  className: string
  placeholder?: string | undefined
  onChangeHandler: ChangeEventHandler<HTMLInputElement>
}

const SearchBox = ({ className, placeholder, onChangeHandler }: SearchBoxProps) => (
  <input
    className={`search-box ${className}`}
    type="search"
    placeholder={placeholder}
    onChange={onChangeHandler}
  />
)
```

The `onChangeHandler` property is a function that takes in an event and returns nothing. We can use the `ChangeEventHandler` type to type the `onChangeHandler` property.

The `onChange` function is being provided by the `input` element. We can use the `ChangeEventHandler` type to type the `onChange` function. This is why we need to pass the `ChangeEventHandler` the `HTMLInputElement` type.

---

Another example with a different component:

```tsx
type Monster = {
  id: number
  name: string
  email: string
}

type CardProps = {
  monster: Monster
}

const Card = ({ monster }: CardProps) => {
  const { id, name, email } = monster

  return (
    <div className="card-container">
      <img alt={`monster ${name}`} src={`https://robohash.org/${id}?set=set2&size=180x180`} />
      <h2>{name}</h2>
      <p>{email}</p>
    </div>
  )
}

export default Card
```

# Generics

## Typing Fetched Data

When we make a fetch request, we don't know exactly what we will get. Sometimes there's no data, sometimes there's an error, and sometimes there's data.

```ts
fetch('https://jsonplaceholder.typicode.com/users')
  .then((response) => response.json())
  .then((users) => setMonsters(users))
```

We can create a utility function to handle the different cases.

```ts
// fetchData.ts

export const getData = async (url) => {
  const response = await fetch(url)
  return await response.json()
}
```

We know that the URL will be a `string`.

But what does this function return? It could be a number of things.

```ts
export const getData = async (url: string):RETURN_TYPE_HERE??? => {
  const response = await fetch(url);
  return await response.json();
}
```

Since this is an async function, we can use the `Promise` type to type the function.

```ts
export const getData = async (url: string):Promise<????> => {
  const response = await fetch(url);
  return await response.json();
}
```

What should we put in the `Promise` type? TypeScript does not know.

But we know the data we are getting back. This is where we can use a `generic` type.

```ts
export const getData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url)
  return await response.json()
}
```

Here we are saying that the function will return a `Promise` that resolves to a `T`. We need to specify what `T` is.

### Using Generics

```ts
import { getData } from './fetchData'

// we know we have some async function
const fetchUsers = async () => {
  const users = await getData<OUR_T_TYPE_HERE>('https://jsonplaceholder.typicode.com/users')
  ///.... continued
}
```

We haven't told typescript what `T` is. We need to specify what `T` is. We know that the data we are getting back is an **array** of **objects**.

```ts
type Monster = {
  id: number
  name: string
  email: string
}

const [monsters, setMonsters] = useState([])

const fetchUsers = async () => {
  const users = await getData<Monster[]>('https://jsonplaceholder.typicode.com/users')
  setMonsters(users)
}
```

#### Types for `useState`

Now we get a new error: `Argument of type 'Monster[]' is not assignable to parameter of type 'SetStateAction<never[]>'.`

This is because in our `useState` hook, we didn't specify what type of data we are getting back. We use the `useState` hook in the `setMonsters` function.

```ts
// original
const [monsters, setMonsters] = useState([]) // we need to specify what type of data we are getting back

// updated
const [monsters, setMonsters] = useState<Monster[]>([])
```

> In the updated version of the code, we are saying that the `useState` hook will return an array of `Monster` objects.

We only need to explicitly state the type of data we are getting back when we have **not** initialized the state.

Take this for example:

```ts
const [searchField, setSearchField] = useState('')
```

Typescript **infers** that the type of data we are getting back is a `string` because we initialized the state with an empty string.

Same goes for something like this:

```ts
type Monster = {
  id: number
  name: string
  email: string
}

const [filteredMonsters, setFilteredMonsters] = useState(monsters)
```

> We initialized `filteredMonsters` with the `monsters` array. TypeScript infers that the type of data we are getting back is an array of `Monster` objects.

However, if we do this, we have **not** initialized the state:

```ts
const [searchField, setSearchField] = useState([])
```

#### Types for `onChangeHandler`

Take this jsx for example:

```jsx
// some component

const onSearchChange = (event) => {
  const searchFieldString = event.target.value.toLocaleLowerCase()
  setSearchField(searchFieldString)
}

return (
  <>
    <h1 className="app-title">Monsters Rolodex</h1>
    <SearchBox
      className="monsters-search-box"
      onChangeHandler={onSearchChange} //
      placeholder="search monsters"
    />
    <CardList monsters={filteredMonsters} />
  </>
)
```

Here we have an `onChangeHandler` function that takes in an event, gets the value of the input, and sets the `searchField` state. When we convert this to typescript, we get an error: `Parameter 'event' implicitly has an 'any' type.`

We know we are going to return `void` from this function.

We also know that this is **change event** which receives an **HTML input**.

Recall our `SearchBox` component:

```jsx
const SearchBox = ({ className, onChangeHandler, placeholder }: SearchBoxProps) => (
  <input
    className={`search-box ${className}`}
    type="search"
    placeholder={placeholder}
    onChange={onChangeHandler}
  />
)
```

We can update our `onChangeHandler` function to take in an `HTMLInputElement`:

```ts
  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  return (
    <>
      <h1 className="app-title">Monsters Rolodex</h1>
        <SearchBox
          className="monsters-search-box"
          onChangeHandler={onSearchChange}
          placeholder="search monsters"
        />
      <CardList monsters={filteredMonsters} />
    <>
  );
```
