---
title: Accessing the DOM with Refs
date: '2022-03-20'
tags: ['react', 'refs', 'dom']
draft: false
summary: 'Access DOM elements directly by using the ref system.'
---

[React docs on refs:](https://reactjs.org/docs/refs-and-the-dom.html)

- are a system to give you access to a single DOM element.
- we create a ref in the **constructor**, assign them to **instance variables**, then pass them to a **JSX element** as a **prop**.
- ref is a JSX tag.

Will be using a ref to access an images height:

## Creating a Ref

- Refs are created using React.createRef() and attached to React elements via the ref attribute.
- Refs are commonly assigned to an instance property when a component is constructed so they can be referenced throughout the component.

```js
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  render() {
    return <div ref={this.myRef} />;
  }
```

Or in a real example:

```js
class ImageCard extends React.Component {
  constructor(props) {
    super(props)

    this.imageRef = React.createRef()
  }

  componentDidMount() {
    console.log(this.imageRef)
  }

  render() {
    const { description, urls } = this.props.image
    return (
      <div>
        <img ref={this.imageRef} alt={description} src={urls.regular}></img>
      </div>
    )
  }
}
```

#### Side Note - Callbacks on image load

In the above example, we create a reference to an image. When it loads, we console.log(); this reference and use `this.imageRef.current.clientHeight` to find the images height. However, no height exists. This is because the `clientHeight` value does NOT yet exist until the entire image has loaded.

We can solve this issue by adding an **eventListener** and listening for the ;load' event.

```js
class ImageCard extends React.Component {
  constructor(props) {
    super(props)

    this.imageRef = React.createRef()
  }

  componentDidMount() {
    this.imageRef.current.addEventListener('load', someCallBack)
  }

  render() {
    const { description, urls } = this.props.image

    return (
      <div>
        <img ref={this.imageRef} alt={description} src={urls.regular}></img>
      </div>
    )
  }
}
```

We can add a callback to console.log(); the imageRef with the height.

```js
  componentDidMount() {
    this.imageRef.current.addEventListener('load', this.setSpans);
  }

  setSpans = () => {
    console.log(this.imageRef.current.clientHeight);
  };
```
