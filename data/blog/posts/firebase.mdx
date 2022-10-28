---
title: Firebase - Authentication and Database
date: '2022-10-27'
tags: ['Firebase', 'Database', 'Authentication']
images: '/static/images/individualBlogPostImages/firebase.jpg'
draft: false
summary: Basics of using Firebase for authentication and database storage. Covers how to set up a project, create a database, and authenticate users in a React app.
---

# Firebase Configuration

It's a good idea to create a separate file for your Firebase configuration. This will keep your Firebase credentials secure and out of your code. You can create a new file in your `src` folder called `firebaseUtils.js`. This file will contain your Firebase configuration.

Install the Firebase SDK for React.

```bash
npm install firebase
```

```js
import { initializeApp } from 'firebase/app'
// initialize the app and create the Firebase App object

const firebaseConfig = {
  apiKey: // ... put in your Firebase config here after creating a project
  authDomain: // ...
  projectId: // ...
  storageBucket: // ...
  messagingSenderId: // ...
  appId: // ...
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)
```

## Authentication

You can use authentication in a number of ways. You can use email and password, Google, Facebook, Twitter, and more. You can also use authentication with a custom backend. For this example, I will use email and password authentication.

You can configure an option in the Firebase console in the Authentication section under 'Sign-in method'.

### Authenticate Using Google

You can use Google authentication to allow users to sign in with their Google account.

```js
// import the GoogleAuthProvider
import { GoogleAuthProvider } from 'firebase/auth'

const provider = new GoogleAuthProvider()
googleProvider.setCustomParameters({ prompt: 'select_account' })
```

> The provider is a GoogleAuthProvider object. You can use this object to set custom parameters. In this case, I am setting the prompt to 'select_account' so that the user is prompted to select their account if they are already signed in to multiple Google accounts.

You will also need a few other functions from the `firebase/auth` package.

```js
import {
  getAuth, // create an instance of the auth service
  signInWithPopup, // sign in with a popup window
  signInWithRedirect, // sign in with a redirect - requires some additional configuration
  GoogleAuthProvider, // the GoogleAuthProvider class
  createUserWithEmailAndPassword, // create a user with email and password
  signInWithEmailAndPassword, // sign in with email and password
  signOut, // sign out
} from 'firebase/auth'

// time to create the auth instance and use it to sign in with Google
export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider) // sign in with a popup window
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider) // sign in with a redirect
```

> You can use these inside other components to sign in with Google.

#### Using the redirect method

When you redirect a user to a new page and then back to your app, you need to handle the results of the redirect. This was done by using `useEffect` and the `getRedirectResult` method.

```js
const { setCurrentUser } = useContext(UserContext)
// created a context to store the current user

useEffect(() => {
  const handleRedirectResult = async () => {
    // get the redirect result from the signInWithGoogleRedirect() function
    const response = await getRedirectResult(auth)

    if (response) {
      // create a user document in the firestore database
      createUserDocumentFromAuth(response.user)
      // set the current user in the UserContext
      setCurrentUser(response.user)
    }
  }

  handleRedirectResult()
}, [])

const signInGoogleRedirectUser = async () => {
  const { user } = await signInWithGoogleRedirect()
  // triggers the useEffect() hook above
  await createUserDocumentFromAuth(user)
}
// gets called when the user clicks the button to sign in with Google
```

> This was done in a separate component called `Authenticate.jsx`.

#### Signing in with email and password

Is similar to signing in with Google. You will need to import the `signInAuthUserWithEmailAndPassword` functions from your `firebaseUtils.js` file.

Recall, the `signInAuthUserWithEmailAndPassword` function is defined as follows:

```js
// Sign in with Firebase using Password-Based Accounts
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return

  return await signInWithEmailAndPassword(auth, email, password)
}
```

Back in your `Authenticate.jsx` component:

```js
import {
  auth, // the auth instance
  signInWithGoogleRedirect, // sign in with a redirect
  signInAuthUserWithEmailAndPassword, // sign in with email and password
} from '../utils/firebase/firebaseUtils'

// called when the user submits the form
const handleSubmit = async (e) => {
  e.preventDefault()

  try {
    // sign in with email and password
    const response = await signInAuthUserWithEmailAndPassword(email, password)

    if (response) {
      resetFormFields()
      console.log('successful sign in ✅ ', response)
      setCurrentUser(response.user)
    }
  } catch (error) {
    console.error(error)

    // error handling
    switch (error.code) {
      case 'auth/user-not-found':
        setErrorText('No existing user found with that email address')
        setTimeout(() => {
          setErrorText(null)
        }, 3000)

        break
      case 'auth/wrong-password':
        setErrorText('Incorrect password')
        setTimeout(() => {
          setErrorText(null)
        }, 3000)
        break
      default:
        setErrorText('Something went wrong')
    }
  }
}
```

The `handleSubmit` function gets called when the user submits the form. It will call the `signInAuthUserWithEmailAndPassword` function. It takes in the email and password from the form.

If the user is successfully signed in, the `setCurrentUser` function will be called. This will set the current user in the UserContext.

I have created a few `switch` cases to handle errors, but this is not necessary. You can just use the `error.message` property to display the error message.

## Signing Up with email and password - Creating a new user

You may need to create a new user for your application.

Very very similar to signing in with email and password. You will need to import the `createAuthUserWithEmailAndPassword` and `createUserDocumentFromAuth` function from your `firebaseUtils.js` file.

I created a new component to handle signing up and named it `SignUp.jsx`.

We need to import the `c

```js
import {
  createAuthUserWithEmailAndPassword, // create a user with email and password
  createUserDocumentFromAuth,
} from '../utils/firebase/firebaseUtils'

// gets called when the user submits the form
const handleSubmit = async (e) => {
  e.preventDefault()

  try {
    const response = await createAuthUserWithEmailAndPassword(email, password)

    if (response) {
      // create a user document in the firestore database
      // also pass the displayName from the form. This is passed as an additionalInformationObj to the createUserDocumentFromAuth() function
      await createUserDocumentFromAuth(response.user, { displayName })

      console.log('successful sign up ✅ ')
      setCurrentUser(response.user)
    }
  } catch (error) {
    switch (error.code) {
      case 'auth/email-already-in-use':
        setErrorText('Email already in use')
        break
      case 'auth/invalid-email':
        setErrorText('Invalid email')
        break
      case 'auth/weak-password':
        setErrorText('Password is too weak')
        break
      default:
        setErrorText('Something went wrong')
    }

    setTimeout(() => {
      setErrorText(null)
    }, 3000)

    console.error(error)
  }
}
```

## Observable Listener

Is a function that listens for changes in the authentication state. It will be called every time the authentication state changes. Our code is getting a little messy.

We can use the `onAuthStateChanged` function to listen for changes in the authentication state. This function will be called every time the authentication state changes.

Read more about the `onAuthStateChanged` function [here](https://firebase.google.com/docs/reference/js/firebase.auth.Auth#onauthstatechanged).

```js
// inside firebaseUtils.js
// observer - Adds an observer for changes to the user's sign-in state.
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)
```

Will import this in our `userContext` file. We want to run the `onAuthStateChangedListener` function when the app loads. We will do this in the `UserProvider` component by using the `useEffect` hook.

We use can run the callback method whenever out `auth` state changes. This will be called every time the authentication state changes. So when a user signs in or signs out, this callback function will be called.

The `onAuthStateChanged` is **always** listening for changes in the authentication state. You need this to unmount

```js
// inside userContext.js

import { createContext, useState, useEffect } from 'react'
import { onAuthStateChangedListener } from '../utils/firebase/firebaseUtils'

// the actual value of the context is an object
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
})

// provider component
export const UserProvider = ({ children }) => {
  // the initial state of the user context, base, empty state
  const [currentUser, setCurrentUser] = useState(null)
  // allows you to pass the getter and setter functions to the children components
  const value = { currentUser, setCurrentUser }

  useEffect(() => {
    // onAuthStateChangedListener() is a function that returns an unsubscribe function
    const unsubscribe = onAuthStateChangedListener((user) => {
      setCurrentUser(user)
    })

    return unsubscribe // unsubscribe from the listener when the component unmounts
  }, [])
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
```

We are going to modify our code to use the `onAuthStateChangedListener` function. We will use the `onAuthStateChangedListener` function to set the current user in the `UserContext`.

We can remove all references to the `setCurrentUser` function from our `Authenticate.jsx` and `SignUp.jsx` components because we are using the `onAuthStateChangedListener` function to set the current user in the `UserContext`.

We know when a user signs in, the `onAuthStateChangedListener` function will be called, the callback `(user) => {setCurrentUser(user)}` will be called. This will set the current user in the `UserContext`.

If a user signs out, the `onAuthStateChangedListener` function will be called, the callback `(user) => {setCurrentUser(user)}` will be called. This will set the current user in the `UserContext` to `null`.

Why would you do this?

You can use the `onAuthStateChanged` function to centralize all the user authentication logic into the `UserContext` file. This will make your code cleaner and easier to maintain. We are not needing to pass the `setCurrentUser` function down to the child components. We simply use the `onAuthStateChanged` function to set the current user in the `UserContext`.

#### Observer Pattern

Think of the `onAuthStateChanged` as a stream, a sequence of events in order of time. There is a variable, unknown number of time between events.

We can use a listener to listen for changes in the authentication state. We can use the `onAuthStateChanged` function to listen for changes in the authentication state. This function will be called every time the authentication state changes.

The listener has three key methods:

- `next` - is called every time a new event is emitted. It points to the callback function.
- `error` - is called when an error occurs. It points to the error callback function.
- `complete` - is called when the stream is has ended. You can use this to do something when finished.

So, we need a way to subscribe the listener to the stream. We want to run the `next` method every time a new event is emitted. However, by the time we subscribe to the stream, the stream may have already emitted some events.

<div className="flex justify-center">
  ![streams](/static/images/individualBlogPostImages/steams.svg)
</div>

This is a pretty simple logic. Once we get an event, we fire `next`. Once we run the `complete` method, we unsubscribe from the stream.

We see this in our `UserContext` file. We are using the `useEffect` hook to run the `onAuthStateChangedListener` function. This function will be called every time the authentication state changes.

```js
useEffect(() => {
  // onAuthStateChangedListener() is a function that returns an unsubscribe function
  const unsubscribe = onAuthStateChangedListener((user) => {
    if (user) {
      createUserDocumentFromAuth(user)
    }
    // set the current user in the UserContext
    setCurrentUser(user)
  })

  // clean up function
  return unsubscribe // unsubscribe from the listener when the component unmounts
}, [])
```

# Firestore Database

It's a bad idea to store large amounts of data on the front end. We can use Firestore, a NoSQL database, to store our data.

## General Structure of a Firestore Database

In general, we have two types of databases:

| Relational Database (SQL)                                          | NoSQL Database                                               |
| ------------------------------------------------------------------ | ------------------------------------------------------------ |
| Data is stored in tables                                           | Data is stored in collections                                |
| Data is related to each                                            | Data is not related to each other                            |
| Data is structured. Each item in a table will have the same shape. | Data is not structured. Documents can have different shapes. |
| PostgreSQL, MySQL, Supabase                                        | MongoDB, Firestore                                           |

In a NoSQL database, we have collections and documents. A collection is a group of documents. A document is a single record.

We can easily add any property to a document. We can add a new property to a document without having to change the structure of the document.

<div className="flex justify-center">
  ![adding to NoSQL](/static/images/postImages/firestore-1.png)
</div>

WHen using a NoSQL database you need to think about how you are going to structure your data. You need to think about how you are going to query your data.For example, in order to predictably map over a collection of documents, you need to ensure the documents have the same shape. If you don't have the same shape, you will need to do some extra work to map over the collection.

## Uploading Data to Firestore

We can create a method in the `firebaseUtils` file to upload data to Firestore.

See docs here: https://firebase.google.com/docs/firestore/manage-data/add-data

Start off by importing the `collection` and `writeBatch` functions from the `firebase` package.

- `collection` - gets a reference to a collection
- `writeBatch` - allows you to write multiple documents to a collection in a single batch

```js
import { getFirestore, doc, setDoc, getDoc, collection, writeBatch } from 'firebase/firestore'

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  //...
}
```

`collectionKey` is the name of the collection. `objectsToAdd` is an array of objects. We want to add each object to the collection.

When we write to the database, we are completing a _transaction_. Think of a transaction as a series of steps, writing each collection to the db. There are numerous writes in a single transaction.

We can use the `writeBatch` function to write multiple documents to a collection in a single batch. This would be a single transaction.

If a single write fails, the entire transaction **fails**. We need to make sure all the writes are successful.

more on [writeBatch](https://firebase.google.com/docs/reference/js/v8/firebase.firestore.WriteBatch?hl=en)

```js
// firestore - database
export const db = getFirestore()

// adding a collection to firestore
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  // create a collection reference using the db we created above
  const collectionRef = collection(db, collectionKey)

  // use a batch to write multiple documents at once
  const batch = writeBatch(db)

  objectsToAdd.forEach((obj) => {
    // create a new document reference
    const newDocRef = doc(collectionRef, obj.title.toLowerCase())
    // add the object to the batch
    batch.set(newDocRef, obj)
  })

  // begins the batch write
  await batch.commit()
  console.log('batch write complete')
}
```

We can do a `forEach` loop over the `objectsToAdd` array. For each object, we create a new document reference. We add the object to the batch. Once we have added all the objects to the batch, we can commit the batch.

You can import the `addCollectionAndDocuments` into the `App.js` file and call it. Only call it once and delete it afterwards.

```js
import SOME_DATA from './data/some-data.js'
// SOME_DATA is an array of objects
import { addCollectionAndDocuments } from './firebase/firebase.utils'

export default function App() {
  useEffect(() => {
    addCollectionAndDocuments('collections', SOME_DATA)
  }, [])
}
```

## Reading Data from Firestore

Now we need to pull data from Firestore and use them in our app.

We need the `query` and `getDocs` functions from the `firebase/firestore` package.

- `query` - creates a query against a collection or collection group.
- `getDocs` - gets all the documents from a collection that match the query.

The object we get back from `getDocs` is a `QuerySnapshot`. We can use the `docs` property to get an array of documents.

```js
// get a document from firestore
export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories')
  const q = query(collectionRef)

  const querySnapshot = await getDocs(q) // can use this to access the data

  console.log('querySnapshot', querySnapshot.docs[0].data())
  // {
  //   "items": [
  //       {
  //           "id": 1,
  //           "name": "Brown Brim",
  //           "price": 25,
  //           "imageUrl": "https://i.ibb.co/ZYW3VTp/brown-brim.png"
  //       },
  //       {
  //           "name": "Blue Beanie",
  //           "id": 2,
  //           "imageUrl": "https://i.ibb.co/ypkgK0X/blue-beanie.png",
  //           "price": 18
  //       },
  //       //...
  //   ],
  //   "title": "Hats"
  // }
}
```

Completed:

```js
// get a document from firestore
export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories')
  const q = query(collectionRef)

  const querySnapshot = await getDocs(q) // can use this to access the data
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data()
    acc[title.toLowerCase()] = items
    return acc
  })

  return categoryMap
}
```

> The main purpose of this helper function is to get the data from Firestore and convert it into the shape we need.

This allows us to have a single source of truth for our data. We can use the data from Firestore in our app.
