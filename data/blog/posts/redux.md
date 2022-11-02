---
title: Classic Redux Setup
date: '2022-11-01'
tags: ['Redux', 'State']
images: '/static/images/individualBlogPostImages/classic-redux.jpg'
draft: false
summary: Cover the basics required to setup Redux in a React application. Covers reducers, actions, action types, and the store.
---

# Redux Setup

## Create a Store

Create a new file named `store.js` in the `src` folder. In this file, we will create a store. The store is where we will store our state. We will also create a reducer. The reducer is where we will update our state.

This store is where all of our redux happens. This is where the `store` object is created.

```js
import { compose, createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'

// root reducer
```

We need to create a `rootReducer`, which is where **all** of our reducers live. We use the `combineReducers` function to combine all of our reducers into **one** reducer. This makes it easier to manage our state.

```js
// rootReducer.js

import { combineReducers } from 'redux'

// will combine all of our reducers into one reducer later
```

## Creating a Reducer

We need to create a reducer. A reducer is a function that takes in the current state and an action. The reducer will then return the new state. The reducer will be called every time an action is dispatched.

For this example, we are going to create an authentication/login reducer. This reducer will handle the state of the user's authentication.

```js
// userReducer.js

// initial state
const INITIAL_USER_STATE = {
  currentUser: null,
}

// the reducer function to update the state
const userReducer = (state = INITIAL_USER_STATE, action) => {
  // we always have a type and a payload on the action
  const { type, payload } = action

  // use a switch statement to handle different actions
  switch (type) {
    case 'SET_USER': // this is the action type
      return {
        ...state, // spread the current state
        currentUser: payload,
      }
    default:
      // return current state if no action is matched
      // important for rerenders
      return state
  }
}

export default userReducer
```

The `switch` statement is used to handle different actions. The `type` is the action type. The `payload` is the data that we want to update the state with.

In this simple example, the `SET_USER` action type will update the `currentUser` property on the state.

### Reducers in Redux

Reducers in Redux are a little different than reducers in plain old React.

In Redux, our `rootReducer` **receive every single action** that gets dispatched. This is why we need to return the **default state** if none of the cases match to the **type** of the action.

Remember, **actions pass to every single reducer!**

## Back to the Store setup

The `createStore` takes in **three** arguments:

- the **reducer**: this is the `rootReducer`. This is where all of our reducers live. This is **required**.
- **preloaded state**: this is the initial state of our application. This is **optional**.
- the **logger**: allows you to see the state before and after the action is dispatched. This is **optional**. It is very useful for debugging.

In order to use our `logger` we need to pass in `applyMiddleware`.

The `compose` function is used to add additional functionality to our store. Again, this is optional and is used for debugging.

```js
import { compose, createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import { rootReducer } from './rootReducer'

// middleware
const middlewares = [logger] // we could add more middlewares here

const composedEnhancers = compose(applyMiddleware(...middlewares))

// root reducer
export const store = createStore(rootReducer, undefined, composedEnhancers)

//... more to come
```

## Provider

Providers are used to provide the store to our application. We need to wrap our application in a provider. This is done in the `index.js` file.

Much like we do with `useContext` in React, we need to wrap our app in a `Provider` and pass in the `store` as a prop.

```js
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

import { Provider } from 'react-redux' // NEW - import the provider
import { store } from './store/store' // NEW - import the store

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <Provider store={store}>
    {' '}
    // NEW - wrap the app in the provider
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
```

## Creating an Action

The action is what we will dispatch to our reducer. The action is an object that has a `type` and a `payload`.

- `type` is a string that describes **what we want to do**.
- `payload` is the **data** that we want to update our state with.

To make our lives a little easier, we can create a helper function to create our actions. This function will take in the `type` and the `payload` and return an object with the `type` and `payload`.

```js
// utilities/actionCreator.js

export const actionCreator = (type, payload) => {
  return {
    type,
    payload,
  }
}
```

We can also store all our action types in a separate file. This makes it easier to manage our action types. This is good practice to prevent typo errors.

```js
// userActionTypes.js

export const USER_ACTION_TYPES = {
  SET_USER: 'SET_USER',
}
```

Now with all these setup, we can create our action.

```js
// userActions.js
import { createAction } from '../../utils/reducer'
import USER_ACTION_TYPES from './userActionTypes'

// action creator
export const setCurrentUser = (user) => createAction(USER_ACTION_TYPES.SET_USER, user)

// this only creates the action object
// we still need to dispatch it to the reducer
```

### Creating the Action Type

The action type is a string that describes what we want to do. We will create a file named `userActionTypes.js` in the `src` folder. This is where we will store all of our action types.

```js
// userActionTypes.js
export const USER_ACTION_TYPES = {
  SET_USER: 'SET_USER',
}
```

## Updating our Reducer

Now that we have the action type and the action creator, we can update our reducer to handle the action.

Remember, we will export the reducer to our `rootReducer.js` file. This is where we will combine all of our reducers into one reducer.

```js
// userReducer.js

import { USER_ACTION_TYPES } from './userActionTypes' // NEW - import the action type

const INITIAL_USER_STATE = {
  currentUser: null,
}

const userReducer = (action, state = INITIAL_USER_STATE) => {
  const { type, payload } = action

  switch (type) {
    case USER_ACTION_TYPES.SET_USER: // NEW - use the action type
      return {
        ...state,
        currentUser: payload,
      }
    default:
      return state
  }
}

export default userReducer
```

## Root Reducer

Now that we have one reducer, we need to combine all of our reducers into one reducer. This is done in the `rootReducer.js` file.

```js
import { combineReducers } from 'redux'
import userReducer from './user/userReducer'
import categoriesReducer from './categories/categoryReducer' // if we had another reducers

export const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
})
```

# Dispatching an Action

When we say **dispatch an action**, we are saying that we want to send the action to the reducer.

Inside of the component we want to dispatch the action, we need to import the `useDispatch` hook from `react-redux`. We will also import the action creator that we created earlier.

The `useDispatch` hook allows us to interact with the Redux store. We can dispatch actions and read from the store.

It works the exact same way as out `useContext` hook dispatch, except we are dispatching actions to the store.

`dispatch()` actions to our **`rootReducer`**, which will then pass the action to every single reducer function.

```js
// App.js
import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
//... removed other imports for brevity
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from '../utils/firebase/firebaseUtils'

// NEW STUFF -----------
import { useDispatch } from 'react-redux' // NEW
import { setCurrentUser } from './store/user/userAction' // NEW

function App() {
  const dispatch = useDispatch() // NEW

  // this useEffect will run once when the component mounts
  // is used to fetch the user from firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user)
      }
      // use the dispatch function to dispatch the action
      dispatch(setCurrentUser(user)) // NEW
    })

    return unsubscribe // unsubscribe from the listener when the component unmounts
  }, [])

  return (
    <Routes>
      <Route path="/" element={<Nav />}>
        <Route index element={<Home />} />
        <Route path="sign-in" element={<Authenticate />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="shop/*" element={<CategoryPreview />} />
        <Route path="cart" element={<Cart />} />
      </Route>
    </Routes>
  )
}

export default App
```

- import the action you want to perform (in this case, `setCurrentUser`)
- import the `useDispatch` hook from `react-redux` to dispatch the action
- call the `dispatch` function and pass in the action creator
  - remember, the action takes in the payload
  - the payload is the data we want to update our state with

When the dispatch function is called, it will send the action to the reducer. The reducer will then update the state with the payload.

### Another example of dispatching an action

If we want to update the store, we need to dispatch an action to the reducer. We can do this by importing the `useDispatch` hook from `react-redux`. We can then call the `dispatch()` function and pass in the action we want to dispatch.

```js
// some component to sign out a user
// by setting the currentUser to the user object to null

import { useDispatch } from 'react-redux' // import the hook to dispatch actions
import { setCurrentUser } from '../store/user/userAction' // import the action you want to perform

const someComponent = () => {
  const dispatch = useDispatch()
  const handleClick = () => {
    dispatch(setCurrentUser(null))
  }
  return (
    <div>
      <button onClick={handleClick}>Sign Out</button>
    </div>
  )
}
```

# Reading from the Store

We use the `useSelector` hook to read from the store. This hook takes in a function that returns the state we want to read from. This hook will rerender the component when the state changes.

```js
// some component showing the user's name

import { useSelector } from 'react-redux'

const someComponent = () => {
  const currentUser = useSelector((state) => state.user.currentUser)
  return (
    <div>
      <h1>Hello {currentUser.displayName}</h1>
    </div>
  )
}
```

Our `currentUser` state is stored in the `user` reducer. We can access the `currentUser` state by calling `state.user.currentUser`.

This of `state` as the root of our store. We can access any state by calling `state.reducerName.stateName`.

# Summary

This was a lot of work, but we have successfully implemented Redux into our application. We have created a store, a reducer, and an action. We have also dispatched an action to the reducer and read from the store.

There is an easier option to implement Redux into our application. We can use the `createSlice` function from `@reduxjs/toolkit`.

I highly recommend checking out this option if you are using Redux in a small application. It is much easier to implement and use.
