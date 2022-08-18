---
title: Class-based Components
date: '2022-08-18'
tags: ['Components', 'React']
images: 'https://patterns.dev/img/reactjs/react-logo@3x.svg'
draft: false
summary: It's import to understand how class-based components work in React. Legacy/older React apps may use this pattern to create components, therefore it's important to understand how it works.
---

## Review of ES6 Classes

- Classes are syntactic sugar for functions that return objects
- You can make reference to the objects own properties and methods using the this keyword
- When a new object is created, any arguments used will be passed as parameters to the constructor method

- constructors only get called once, when the object is created
  - whatever we pass in `new MyClass(arg1, arg1)`, then the constructor will be called with those arguments
  - we access the arguments using the `this` keyword

```js
// class declaration
class Rectangle {
  constructor(length, width) {
    this.length = length // 2
    this.width = width // 3
  }

  area() {
    // add a method to the class
    return this.length * this.width
  }
}

const rectangle = new Rectangle(2, 3)
console.log(rectangle.area()) // 6

// class expression
const Cube = class {
  constructor(length, width, height) {
    this.length = length // 2
    this.width = width // 3
    this.height = height // 4
  }

  volume() {
    return this.length * this.width * this.height
  }
}

const cube = new Cube(2, 3, 4)
console.log(cube.volume()) // 24
```

- we can extend the functionality of a class by using the `extends` keyword

```js
class Prism extends Rectangle {}

const prism = new Prism(2, 3)

console.log(prism.area()) // 6
```

> Even though the Prism class doesn't have an `area` method, it still inherits the `area` method from the Rectangle class.

- use `super()` to access the constructor of the parent class
  - ensures that the _parent_ class is called **first**
  - Need this only if you have a constructor in the child class

```js
class Prism extends Rectangle {
  constructor(length, width) {
    super(length, width)
    this.height = height
  }

  volume() {
    return this.length * this.width * this.height
  }
}

const prism = new Prism(2, 3, 4)
console.log(prism.volume()) // 24
```

- a child can also call one of its parent's methods

```js
class Prism extends Rectangle {
  constructor(length, width) {
    super(length, width)
    this.height = height
  }

  volume() {
    return this.area() * this.height
  }
}

const prism = new Prism(2, 3, 4)
console.log(prism.volume()) // 24
```

## Class-based Components

- An alternative to creating functional components using ES6 classes
- Used for making stateful components prior to the release of hooks
- Must `extends` `React.Component`
  - import `React` from `react`
- Must have a `render()` method

```js
// a simple class component
class HelloWorld extends React.Component {
  render() {
    return <h1>Hello World</h1>
  }
}
```

**State** is established in the constructor:

```js
class StateExample extends React.Component {
  constructor() {
    super()
    this.state = {
      message: 'hello world',
    }
  }
  render() {
    return (
      <div>
        <h2>{this.state.message}</h2>
      </div>
    )
  }
}
```

## Passing props to a class component

- access props using `this.props`
- passed from parent to child through **attributes**
- `props` are not accepted like they are in a functional component
  - props are **automatically** passed
  - anywhere you'd

```js
// in parent component
<HelloWorld message="hello there">
  <p>Greetings and good day</p>
</HelloWorld>

// in child
<p>Message: {this.props.message}</p>
<div>{this.props.children}</div>
```

- you can destructure props using `{ propsName } = this.props`

```js
// in parent component
class HelloWorld extends React.Component {
  render() {
    const { message } = this.props
    return <h1>{message}</h1>
  }
}
```

## Handling Events

- need to use the `bind` method when **event handlers** are created

  - `bind` ensures that any references to `this` keyword inside the function point to the component itself

- need to `bind` this to the event handler (`onClick`, `onChange`, `onSubmit`)

```js
class BindExample extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this) // bind the handleClick method to the component
  }

  handleClick(event) {
    // do something using the `this` keyword
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}></button>
      </div>
    )
  }
}
```

- instead of using `bind`, you can use `arrow functions`

```js
<button onClick={() => this.clickHandler()}> Click me! </button>
```

> Turn all handlers into arrow functions instead of using `bind`

- can also solve this by changing function into an instance method:

```js
constructo() {
	//...
	clickHandler = () => { // turn them into instance methods
		//...
	}
}
```

---

It is most common just to use `bind` at the bottom of your constructor method.

## Changes to State

- state is established within the **constructor**
- we use the `this.state` to set **all state**
  - we only get **one** state object

```js
class ClassBased....

```

- **never** want to mutate state directly

```js
// this is bad
this.state.count = this.state.count + 1
```

- use `setState` to update state
  - values passed to `setState` are **merged** with the existing state

```js
this.setState({ count: this.state.count + 1 })
```

- always call `setState` with an object

```js
handleEvent(event) {
	this.setState({
		count: this.state.count + 1
	});
}
```

## Lifecycle Methods

- _lifecycle_ events refer to the different stages of a component's lifecycle

  - mounting: when the component is first added to the DOM
  - rendering: when the component is rendered to the DOM
  - unmounting: when the component is removed from the DOM
  - updating: when the component is updated

- `render` and `constructor` are considered life cycle methods

```js
// the component has mounted successfully
// set up timers or create socket connections in this method
componentDidMount() {}

// runs every time the component updates
// run logic that depends on state or props
componentDidUpdate(prevProps, prevState) {}

// runs right before the component unmounts
// clear intervals and close connections; perform any cleanup necessary
componentWillUnmount() {}
```

![common lifecycle methods](https://miro.medium.com/max/4560/1*EnuAy1kb9nOcFuIzM49Srw.png)

### `componentDidMount()`

- used when..
  - fetch data
  - connect to websockets server
  - set up an internal
  - any axios calls
- only gets called once!

### `componentDidUpdate()`

- called every time state or props change
  - every render
- equivalent to `useEffect(() => {}, [props.whatever])`
  - differs that we can only call it once

```js
componentDidUpdate(prevProps, prevState) {
	if (prevProps.username !== this.props.whatever) {
		// if the username changes, do something
	}
	if (prevState.count !== this.state.count) {
		// if the count changes, do something
	}
}
```

> can be a bit annoying.

### `componentWillUnmount()`

- only fires one time when the component is removed from the DOM
  - good place to clean up timers and close connections
- equivalent to `useEffect(() => {returns cleanup() }, [])`

- use when...
  - cleanup
  - server socket connection

## Useful Links

- [ES6 Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- [Functional Components: Binding this](https://www.freecodecamp.org/news/this-is-why-we-need-to-bind-event-handlers-in-class-components-in-react-f7ea1a6f93eb/)
- [React docs: setState](https://reactjs.org/docs/react-component.html#setstate)
- [super(props) vs super()](https://overreacted.io/why-do-we-write-super-props/)
- [life cycle methods](https://programmingwithmosh.com/javascript/react-lifecycle-methods/)
