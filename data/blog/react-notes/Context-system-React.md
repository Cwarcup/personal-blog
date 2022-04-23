---
title: React Context API
date: '2022-03-17'
tags: ['react', 'context', 'redux']
draft: false
summary: 'Instead of "prop drilling" to pass around data, we can use react context API to pass around data'
---

# About the Context System

Introduced in React v16.

Previously, we have only used the **Props System.** This is where we pass data from parent to a **direct** child components.

With the **Context System**, data gets passed form a parent to **any** nested child component.

> Each white box are react components. The **header** is showing a **button** component.
> If the **App** component wants to communicate to the **Button** component, it can do so by passing a prop to the **header**, then the **Header** communicates to the **Button** component.

> The **App** components (parent) can communicate to **any of the children**. Does not have to go through the **Header** component to get to the **Button**.

Will create a **Context Object** which will contain some type of data.

## Getting Information Inside the Context Object

Sources of data into the Context Object

- **Default Values**:
- Parent Component within a **Provider**

## Getting Information Out of the Context Object

Things that use the data from the Context Object:

- **this.context** property
- **Consumer** component

# createContext - Creating a Context Object

Make a new folder named "context" and create a new file named "context.js"

```js
import React from 'react'

export default React.createContext()
```

> Yes, this is all.

## Passing Info using Default Values

```js
import React from 'react'

export default React.createContext('default value')
```

You can pass in any type of data into the **createContext** function.

# contextType - Adding context to a component

[React docs on Class.contextType:](https://reactjs.org/docs/context.html#classcontexttype)

The `contextType` property on a class can be assigned a Context object created by `React.createContext()`.

Using this property lets you consume the nearest current value of that Context type using `this.context`. You can reference this in any of the lifecycle methods including the render function.

contextType written as a class property:

```js
class MyClass extends React.Component {
  componentDidMount() {
    let value = this.context
    /* perform a side-effect at mount using the value of MyContext */
  }
  componentDidUpdate() {
    let value = this.context
    /* ... */
  }
  componentWillUnmount() {
    let value = this.context
    /* ... */
  }
  render() {
    let value = this.context
    /* render something based on the value of MyContext */
  }
}

// written outside the class
MyClass.contextType = MyContext // <-- Assign the context object to the class
```

Or can be written **within** the class: But **must use `static` class**

```js
class MyClass extends React.Component {
  static contextType = MyContext // <-- Assign the context object to the class
  render() {
    let value = this.context
    /* render something based on the value */
  }
}
```

# this.context

Using `contextType` property allows you to use `this.context` to access the current value of the context.

Use `this.context` when you want to get information out of **one** context object inside a single component.

```js
import React, { Component } from 'react'
import LanguageContext from '../context/LanguageContext'

export class Button extends Component {
  static contextType = LanguageContext

  render() {
    const text = this.context === 'english' ? 'Submit' : 'Voorleggen'
    return <button className="ui button primary ">{text}</button>
  }
}

export default Button
```

# Context Provider and value class

[docs](https://reactjs.org/docs/context.html#contextprovider):

In our app, we have a **Provider** component. This is where we pass the data from the **Context Object** to the **App** component.

1. import the **Context Object** `import LanguageContext from '../context/LanguageContext';`
2. Wrap the component in a **Provider** component.
3. Assign a `value` property to the **Provider** component. Here is where we pass the value to the provider.

```js
   <MyContext.Provider value={/* some value */}>
    <UserCreate />
   </MyContext.Provider>
```

## Gotchas around Context Providers

The Provider is a method accessible to the Context. When you use `createContext`, this method is automatically assigned to the Context.

There is no limit you can assign to the `value` prop. You do not need to use the state system to do this.

```
<LanguageContext.Provider value={this.state.language}>
```

---

If you used a `value` class that utilizes state, it can use the state system to pass the value to the component.

But if you set the `value` class to a static string, then the component will always use the static value.

If you do NOT use a `Provider`, the component will use the **default value** specified in the **createContext** function.

```js
export class App extends Component {
  state = { language: 'english' };

  onLanguageChange = (language) => {
    this.setState({ language });
  };

  render() {
    return (
      <div className="ui container">
        <div>
          Select a language:
          <i className="flag ca" onClick={() => this.onLanguageChange('english')}></i>
          <i className="flag nl" onClick={() => this.onLanguageChange('dutch')}></i>
        </div>
        <LanguageContext.Provider value={this.state.language}>
          <UserCreate />
        </LanguageContext.Provider>
        <LanguageContext.Provider value="dutch">
          <UserCreate />
        </LanguageContext.Provider>
        <UserCreate />
      </div>
    );
  }
```

# Consumer Components - Accessing Data with Consumer Components

[Docs:](https://reactjs.org/docs/context.html#contextconsumer)

A React component that subscribes to context changes. Using this component lets you subscribe to a context within a function component.

Similar to a **Provider**, the **Consumer** component is a method accessible to the Context. When you use `createContext`, this method is automatically assigned to the Context.

Use `Consumer` anytime we want to get information out out of **multiple** different context objects inside a single component.

You do NOT need to specify a `contextType`.

```js
<MyContext.Consumer>
  {value => /* render something based on the context value */}
</MyContext.Consumer>
```

Real example frm translate app:

```js
import React, { Component } from 'react';
import LanguageContext from '../context/LanguageContext';

export class Button extends Component {
  render() {
    return (
      <button className="ui button primary ">
        <LanguageContext.Consumer>   // <-- Consumer Component
          {(value) => (value === 'english' ? 'Submit' : 'Voorleggen')}
        </LanguageContext.Consumer>
      </button>
    );
  }
}

export default Button;
```

# Pulling from Multiple Contexts

Why would you use a **Consumer** component over `this.context`?

Use `Consumer` anytime we want to get information out out of **multiple** different context objects inside a single component.

Use `this.context` when you want to get information out of **one** context object inside a single component.

Wrap the additional Contexts around the other components.

```js
//...
        <ColorContext.Provider value="red">       //<----------------- first context
          <LanguageContext.Provider value={this.state.language}> //<-- Second context
            <UserCreate />
          </LanguageContext.Provider>
        </ColorContext.Provider>
//...
```

Within your component:

```js
class Button extends Component {
  render() {
    return (
      <ColorContext.Consumer>  //<---- first context
        {(color) => (
          <button className={`ui button ${color}`}>
            <LanguageContext.Consumer>  //<---- second context within the first context
              {(value) => (value === 'english' ? 'Submit' : 'Voorleggen')}
            </LanguageContext.Consumer>
          </button>
        )}
      </ColorContext.Consumer>
    );
  }
}
```

> The `Context.Consumer` requires a function as a child. Therefore, the `value` must return a function containing the other components.

Can make this a little cleaner by making a helper function:

```js
class Button extends Component {
  renderButton(color) {
    return (
      <button className={`ui button ${color}`}>
        <LanguageContext.Consumer>
          {(value) => (value === 'english' ? 'Submit' : 'Voorleggen')}
        </LanguageContext.Consumer>
      </button>
    )
  }

  render() {
    return <ColorContext.Consumer>{(color) => this.renderButton(color)}</ColorContext.Consumer>
  }
}
```

# Replacing Redux with Context?

| Redux                                               | Context                                     |
| --------------------------------------------------- | ------------------------------------------- |
| Distributes data to **various** components.         | Distributes data to **various** components. |
| Centralizes data in a store.                        | n/a                                         |
| Provides mechanisms for changing data in the store. | n/a                                         |

# Redux vs Context

| Redux                                      | Context                                                                                                      |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| Excellent documentation                    | No need for an extra library.                                                                                |
| Well-known design patterns                 | Hard to build a 'store' component. Sharing data between the store components becomes increasingly difficult. |
| Tremendous amount of open source libraries | n/a                                                                                                          |

> Redux is much more powerful than Context.

## Using Context instead of Redux

If we want to use Context instead of Redux, we need to be able to...

1. Get data to any component in our hierarchy.
2. Separate our view logic from business logic.
3. Split up business logic into smaller components (not have a single file with 10000 lines of code).

> Number 2 and 3 are not an issue when we used Redux. We used actions and reducers to separate our business logic from our view logic.

### Creating a Store Component - Context

Would need to create a single **Store Component**. Would also need to implement a callback to change the state.

In the context/LanguageContext.js file we need to...

- assign a variable named `Context` to the `createContext` function. (Must be a capital)
- set the **state** for the value we want to kee track of.
- create a function to `setState` the value.
- a render() method which returns a `Provider` component.
- the value needs to pass the **state** `{...this.state}` and the previously created `setState` function.

```js
const Context = React.createContext('english') // <--- create a context

export class LanguageStore extends Component {
  // set a value for some data
  state = { language: 'english' }

  // ability to change the data
  onLanguageChange = (language) => {
    this.setState({ language })
  }

  render() {
    // setup a provider to pass the value to all children
    return (
      <Context.Provider value={{ ...this.state, onLanguageChange }}>
        {this.props.children}
      </Context.Provider>
    )
  }
}

export default Context
```

Inside of the main app.js file we need to...

- import the 'store'
- wrap the other components inside of the `<LanguageStore>` component.

```js
export class App extends Component {
  render() {
    return (
      <div className="ui container">
        <LanguageStore>
          <LanguageSelector />
          <ColorContext.Provider value="red">
            <UserCreate />
          </ColorContext.Provider>
        </LanguageStore>
      </div>
    )
  }
}
```

### Connecting a Selector to the Store

Import the component containing the store.

Add the `contextType` to the component with `static`. `static contextType = LanguageContext;`

Can now access the `value` of the context object with `this.context`

```js
export class LanguageSelector extends Component {
  // connect to the context
  static contextType = LanguageContext

  render() {
    console.log(this.context) // accesses the context object
    return (
      <div>
        <div>
          Select a language:
          <i className="flag ca" onClick={() => this.context.onLanguageChange('english')}></i>
          <i className="flag nl" onClick={() => this.context.onLanguageChange('dutch')}></i>
        </div>
      </div>
    )
  }
}

export default LanguageSelector
```

Need to also update any components using `this.props` to use the `context`.

```js
import React, { Component } from 'react';
import LanguageContext from '../context/LanguageContext';
import ColorContext from '../context/ColorContext';

class Button extends Component {
  renderSubmit(language) {
    return language === 'english' ? 'Submit' : 'Voorleggen';
  }
  renderButton(color) {
    return (
      <button className={`ui button ${color}`}>
        <LanguageContext.Consumer>
          {(context) => this.renderSubmit(context.language)}  //<-- accesses the context object
        </LanguageContext.Consumer>
      </button>
    );
  }

  render() {
    return (
      <ColorContext.Consumer>
        {(color) => this.renderButton(color)}
      </ColorContext.Consumer>
    );
  }
}

export default Button;
```
