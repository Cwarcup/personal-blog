---
title: Firebase - Authentication and Database
date: '2022-10-27'
tags: ['Firebase', 'Database', 'Authentication']
images: '/static/images/individualBlogPostImages/new-project.jpg'
draft: true
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
