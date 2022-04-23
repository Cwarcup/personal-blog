---
title: Getting Started with Redux
date: '2022-03-25'
tags: ['react', 'redux']
draft: false
summary: 'Overview of Redux and how to use it. Includes basics of actions, reducers, and store.'
---

# What is Redux?

- A state management library for JavaScript apps.
- Makes creating **complex** applications easier.
- **Not** required to create a React app.
- **Not explicitly** designed to be used with React.

# Redux Project Setup

Need to install:

- [`React-Redux`](https://www.npmjs.com/package/react-redux) and [`Redux`](https://www.npmjs.com/package/redux)

```
npm install --save react-redux redux
```

# How Redux Works

- Anytime we want to **change state**, we need to **dispatch an [action](https://github.com/Cwarcup/notes/blob/main/root/react/react-notes/redux.md#action-creator-people-dropping-off-a-form)**.
  - uses **action creator**
- Creates an **action**, which gets fed into the **[dispatch function](https://github.com/Cwarcup/notes/blob/main/root/react/react-notes/redux.md#dispatch-is-part-of-the-redux-library-itself-so-we-dont-need-to-write-it)**.
- Dispatcher makes 'copies' of the action, and sends them off to our different **[reducers](https://github.com/Cwarcup/notes/blob/main/root/react/react-notes/redux.md#reducers-are-like-our-departments)**
- **[Reducers](https://github.com/Cwarcup/notes/blob/main/root/react/react-notes/redux.md#reducers-are-like-our-departments)** take in an action and make changes to the state if they need to.

# Redux Cycle:

Action Creator → Action → Dispatch → Reducer → State

1. **Action Creator:**

- Is a function that creates/returns a plain JavaScript object.
  - The object is known as an **action**.
- Only purpose is to **create an action**.

2. **Action:**

- Is a plain JavaScript object.
- Purpose is to describe some change to the data inside our application.
- An action has two properties:
  - **type:** A string that defines the **type of action**.
  - **payload:** The **data** that is being **sent** to the **reducer**.

3. **Dispatch Function:**

- Takes in an action.
- Makes **copies** of the action.
- Pass off these copies to different parts of our application.

4. **Reducers:**

- Is a function responsible for **taking in an action** and processing the data, making some changes to the data, then decides what to do with the data.
- **Receive** an action.
- **Change** the state.
- **Return** a new state.

5. **State property:**

- Is the central repository of all data that has been created by our Reducer.
- **All information gets stored** in this property.

# Action Creator:

People dropping off a form:

```js
// need to create an action for each type of action
// every Action creator has a type property and a payload property
const createPolicy = (name, amount) => {
  return {
    // Action ,a form in our analogy
    type: 'CREATE_POLICY',
    payload: {
      name: name,
      amount: amount,
    },
  }
}

const deletePolicy = (name) => {
  return {
    type: 'DELETE_POLICY',
    payload: {
      name: name,
    },
  }
}

const createClaim = (name, amountOfMoneyToCollect) => {
  return {
    type: 'CREATE_CLAIM',
    payload: {
      name: name,
      amountOfMoneyToCollect: amountOfMoneyToCollect,
    },
  }
}
```

# Dispatch

- is part of the redux library itself, so we don't need to write it

# Reducers

- are like our departments
  > Need to add `oldListOfClaims = []` in the case we are running this function for the first time.
  > If we don't do this, the reducer will be undefined

```js
const claimsHistory = (oldListOfClaims = [], action) => {
  if (action.type === 'CREATE_CLAIM') {
    // we care about this action (FORM)
    // will update our list of claims with the payload
    return [...oldListOfClaims, action.payload] // takes an array (oldListOfClaims), creates a new array, and adds the payload to the end of the new array
  }
  // we don't care about this action (FORM)
  return oldListOfClaims
}

const accounting = (bagOfMoney = 100, action) => {
  // case of creating a claim
  if (action.type === 'CREATE_CLAIM') {
    return bagOfMoney - action.payload.amountOfMoneyToCollect
  }
  // case of creating a policy, signing up.
  else if (action.type === 'CREATE_POLICY') {
    return bagOfMoney + action.payload.amount
  }
  return bagOfMoney
}

const policyList = (listOfPolicies = [], action) => {
  if (action.type === 'CREATE_POLICY') {
    return [...listOfPolicies, action.payload.name]
  } else if (action.type === 'DELETE_POLICY') {
    return listOfPolicies.filter((name) => name !== action.payload.name)
  }
  return listOfPolicies
}
```

**Testing our reducers:**

```js
const { createStore, combineReducers } = Redux

const ourDepartments = combineReducers({
  // are the names of our various reducers
  accounting: accounting,
  claimsHistory: claimsHistory,
  policyList: policyList,
})

const store = createStore(ourDepartments)

// store object represents our entire redux application. Contains references to all our reducers and their states.
// one function here is the dispatch function.

store.dispatch(createPolicy('Alex', 20))
store.dispatch(createPolicy('Jim', 30))
store.dispatch(createPolicy('Bob', 40))

store.dispatch(createClaim('Alex', 120))
store.dispatch(createClaim('Jim', 50))

store.dispatch(deletePolicy('Bob'))

console.log(store.getState())
```

# More on Reducers

Setup a dummy reducer so we can make errors go away in our initial setup.

```js
import { combineReducers } from 'redux'

export default combineReducers({
  replaceMe: () => 'replaceMe',
})
```

# Object based Reducers

Have a few option in how we want to represent the return values from our reducer.

Option 1: Could have a reducer return an **array** of objects:

`streamsReducer -> [{id: 1, name: 'stream1', description: ''}, {id: 2, name: 'stream2', description: ''}]`

Option 2: Could have a reducer return an **object**:

```js
streamsReducer -> {
  1: {id: 1, name: 'stream1', description: ''},
  2: {id: 2, name: 'stream2', description: ''},
  22: {id: 22, name: 'stream22', description: ''},
  37: {id: 37, name: 'stream22', description: ''},
}
```

The **key** represents the **id** of the object.

In order to access any given stream within this object, we need to access the object by the **key**.

### Key Interpolation Syntax

Basic example:

```js
const animalSounds = { cat: 'meow', dog: 'bark' }

const animal = 'lion'

const sound = 'roar'

console.log({ ...animalSounds, [animal]: sound })
// { cat: 'meow', dog: 'bark', lion: 'roar' }
```

Still part of object based reducers:

```js
const streamReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_STREAM:
      // const newState = { ...state };           // old way
      // newState[action.payload.id] = action.payload;
      // return newState;

      return { ...state, [action.payload.id]: action.payload } // ES6 way, this is known as key interpolation
    default:
      return state
  }
}
```

> The important thing to note here is that the key is surrounded by square brackets ([ ]). Setting the key up this way tells JavaScript that what's inside needs to be interpolated as its value.

#### Side note on Spread (...) operator:

```js
const numbers = [1, 2, 3]
const addFour = [...numbers, 4] // (4) [1, 2, 3, 4] new array created and pushed 4 to the end.
console.log(addFour) // [ 1, 2, 3, 4 ]

console.log(numbers) // [1, 2, 3] still have access to old array
```

# combineReducers

```js
const ourDepartments = combineReducers({
  accounting: accounting,
  claimsHistory: claimsHistory,
  policyList: policyList,
})
```

- Purpose is to bring together all the reducers into one place.
- is a built in method in the redux library.
- We have different keys:
  - we do not need to add the same names to our reducers.
- will pass in an object. The keys of our object will be the keys that show up in our state object.

```js
const ourDepartments = combineReducers({
  moneyWeHave: accounting,
  claimsHistory: claimsHistory,
  policyList: policyList,
})
```

# Dispatch

```js
store.dispatch(createPolicy('Alex', 20))
```

- Each dispatch is running an entire cycle of the redux library.
- We can print out each state after each dispatch.

- You can **only** modify the state through the dispatch function. You cannot access the state directly. It must be changed by an action.

# Redux Dev Tools

[Download and Docs:](https://github.com/reduxjs/redux-devtools/tree/main/extension#redux-devtools-extension)

Setup your store with [middleware](http://redux.js.org/docs/api/applyMiddleware.html) and enhancers: [link](https://github.com/reduxjs/redux-devtools/tree/main/extension#12-advanced-store-setup)

Go into root index.js file and add the following lines of code:

```js
import { createStore, applyMiddleware, compose } from 'redux'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, composeEnhancers(applyMiddleware()))
```

> Will eventually add `redux-thunk` to the middleware, add change code to `createStore(reducers, composeEnhancers(applyMiddleware(thunk)))`.

Can now navigate to your react app in the browser and refresh the page. The Redux Dev Tools will show up and be colored in. Can now see the state of the store.

## Debugging with Redux Dev Tools

In the browser, go to [http://localhost:3000/?debug_session= RANDOM STRING OF LETTERS ](http://localhost:3000/?debug_session=asdasd).

This tells react dev tools you are starting a debug session. It will save all data in the Redux Store between refreshes of the page.

Can still jump bak to a previous state, even after refreshing the page.
