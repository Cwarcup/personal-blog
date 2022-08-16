---
title: Unit & Integration Testing
date: '2022-08-16'
tags: ['Testing', 'React', 'unit testing', 'integration testing']
images: 'https://jestjs.io/img/opengraph.png'
draft: false
summary: Designing and writing tests for React applications with unit and integration testing. Covers helpful libraries and techniques for testing React applications.
---

We can write unit tests for a lot of JavaScript code using the core Jest framework. To test our React components and Hooks we prefer to add a layer of test helpers. The combination of React Testing Library, DOM Testing Library and jest-dom provides a powerful test API.

Unit and integration tests require some level of mocking. We can mock functions to spy on them, or we can provide replacement implementations for libraries.

The quality of our tests will directly impact the quality of our software. Coverage reports can indicate whether the tests are executing the code or not. They cannot indicate if the software does what we want when we take certain actions.

---

### Unit testing

- Means testing individual modules of an application in isolation (without any interaction with dependencies) to confirm that the code is doing things right.
- Testing a single function.

### Integration testing

- Means checking if different modules are working fine when combined together as a group.

## Functional testing

- Means testing a slice of functionality in the system (may interact with dependencies) to confirm that the code is doing the right things.

## Why we need unit testing

- protect against bugs
- protect features that have already been made

## Integration Testing with JEST and @testing-library/react

Jest is the framework we use to run our tests. Is built into React by default.

- `npm run test` will start Jest in watch mode and run the tests
- `npm run test -- --coverage` will start Jest in watch mode and show your coverage status after each test

### JestDOM

`JestDOM` is a set of matchers (like `.toHaveClass()` or `toBeVisible()`) to help you target elements in the DOM to facilitate your testing.

[docs for jest](https://github.com/testing-library/jest-dom)

### DOM Testing Library

- DOM Testing Library is a set of tools to help you target DOM elements.

#### getBy & queryBy

- One small thing about `getBy` and `queryBy` to be aware of is that `getBy` will throw an **error** if the element is not found.
- `queryBy` will return only `null`, so it's up to the context to guide you which you should use.

[docs for dom-testing-library](https://testing-library.com/docs/dom-testing-library/intro)

We have been using `JEST` but its time to start testing out components. We will be using some of `@testing-library/react` tools to help us out.

Make sure to install it:

```bash
npm install --dev @testing-library/react
```

Use the `describe` function to group your tests. [See docs here](https://jestjs.io/docs/api#describename-fn)

Testing a component is as simple as:

```jsx
import React, { useState } from 'react'
import Item from '../Components/Item'

//render <- to do render of the component
//fireEvent <- for clicking
import { render, fireEvent } from '@testing-library/react'

describe('items', () => {
  //xIt
  //test vs it ( same thing )

  it('The Component mounts', () => {
    // render returns an object with a bunch of functions that will let us query the DOM
    render(<Item item={'buy apples'} done={false} />)
  })

  it('should have "buy apples" text', () => {
    // render returns an object with a bunch of functions that will let us query the DOM
    const { getByText } = render(<Item item={'buy apples'} done={false} />)
    // should find the text "buy apples"
    expect(getByText('buy apples'))
  })

  it('Clicked! Should be checked now', () => {
    //  but more of show you how to click an event
    let status = false
    const toggleClick = jest.fn()
    const { container, getByTestId } = render(
      <Item item={'buy apples'} done={status} toggleDone={toggleClick} />
    )
    const checkbox = getByTestId('checkbox')
    fireEvent.click(checkbox)
    expect(toggleClick).toHaveBeenCalled()
    expect(toggleClick).toHaveBeenCalledTimes(1)
  })
})
```

## Coverage

- Coverage is a measure of how much of your code is covered by tests.

```bash
npm run test -- --coverage
```

## Asynchronous Testing

```js
describe('Load friends tests', () => {
  it('loadNewFriends returns 5 random friends', () => {
    loadNewFriends(5) // returns a promise!
      .then((data) => {
        expect(data.length).toBe(5)
      })
  })

  // shorter way of writing promises but is not taught in the course

  it('loadNewFriends returns 5 random friends - async version', async () => {
    const friends = loadNewFriends(5)
    expect(friends.length).toBe(5)
  })
})
```

Now you may want to mock a function that returns a promise.

You can write a folder called `__mocks__` and put your mock functions in there.

Or you can use the newer way of writing mocks.

- we still need to import your test data
- need to ask `Jest` to use the mock data

```js
const { loadNewFriends } = require('.helpers/loadNewFriends')
const axios = require('axios')
jest.mock('axios')

const data = [
  {
    id: 1,
    name: 'John',
  },
  {
    id: 2,
    name: 'Jane',
  },
]

describe('Load friends tests', () => {
  it('loadNewFriends returns 5 random friends', () => {
    axios.get.mockResolvedValue({ data })
    loadNewFriends(5) // returns a promise!
      .then((data) => {
        expect(data.length).toBe(5)
      })
  })
})
```

## Testing with React Testing Library

- React Testing Library is a set of tools to help you target DOM elements.

[Docs here:](https://testing-library.com/docs/react-testing-library/intro/)

- Create a testing file like normal, but import the `@testing-library/react` library.

```js
import React from 'react'
import { render, prettyDOM } from '@testing-library/react'
import { Item } from '../Components/Item'

describe('items', () => {
  it('The Component mounts', () => {
    render(<Item item={'buy apples'} done={false} />) // expects to be passed JSX!
  })

  it('The Component mounts', () => {
    const { container } = render(<Item item={'buy apples'} done={false} />)
    console.log(prettyDOM(container))
  })
})
```

`prettyDOM` is a function that will print out the DOM in a readable way.

You can then `assert` that the DOM has the correct data in it.

- need to use a **query** to find the element you want to test
- More about queries [here](https://testing-library.com/docs/queries/about)

have three types of queries:

- `get`
- `query`
- `find`

Will most often use the `get` query.

Should be testing for Queries Accessible to Everyone first!

- `getByRole` for testing buttons, links, etc.
- `getByLabelText` for testing form elements

You can use `fireEvent` to simulate events such as typing in an input field.

```js
const { getByLabelText } = render(<Item item={'buy apples'} done={false} />)
const input = getByLabelText('item')
fireEvent.change(input, { target: { value: 'buy oranges' } })
expect(input.value).toBe('buy oranges')
```

## Additional Resources

- [Francis notes](https://github.com/FrancisBourgouin/lhl-12-w8d1)
