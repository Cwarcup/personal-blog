---
title: State in React
date: '2022-03-19'
tags: ['react', 'state']
draft: false
summary: 'Understanding what is state, passing state as props, and destructuring state.'
---

# Rules of State

1. Only usable with **class components**
2. `State` is a JS **object** that contains data relevant to a **component**.
3. **Updating** `state` on a component causes the component to (almost) instantly **rerender**.
4. state must be **initialized** when a **component is created**.
5. `State` can **ONLY** be updated using the function **`setState()`**

If we want a **component to update itself**, we must change its **state!**

# Updating State

Done by using `setState()`.
We would NOT do this: `this.state.lat = 37`.

Updating state is an **additive** operation. If we use `setState()` with only one property, it only modifies that ONE property. Not the others. In the example before, the `errorMessage` would not get updated when `this.setState({ lat: position.coords.latitude })` is called. It needs its own `setState()` in order to be updated.

```js
class App extends React.Component {
  state = { lat: null, errorMessage: '' };

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      (position) => {this.setState({ lat: position.coords.latitude });},
      (err) => {this.setState({ lat: '', errorMessage: err.message });}
    );
  }
```

# Handling Errors with State

```js
class App extends React.Component {
  // constructor is used when we want to create some initial setup when our component is created. It is optional.
  constructor(props) {
    //must call super()
    super(props)

    // this is the only place we do direct assignment
    // to this.state
    this.state = { lat: '', errorMessage: '' }

    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position)
        // setState() to change state
        this.setState({ lat: position.coords.latitude })
      },
      (err) => {
        console.log(err)
        this.setState({ lat: '', errorMessage: err.message }) // can display this message when error occurs
      }
    )
  }

  render() {
    // returns some JSX
    return (
      <div>
        Latitude: {this.state.lat}
        <br></br>
        Error: {this.state.errorMessage}
      </div>
    )
  }
}
```

Now the issue is we always have `error` displayed even when an error did not occur. This is because:

```js
<div>
  Latitude: {this.state.lat}
  <br></br>
  Error: {this.state.errorMessage}
</div>
```

How do we only display an error message when an error has occurred?

Very simple method, but not the best:

```js
  render() {
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>;
    }
    if (!this.state.errorMessage & this.state.lat) {
      return <div>Latitude: {this.state.lat}</div>;
    } else {
      return <div>Loading...</div>;
    }
  }
```

# Initialize State

It is NOT the best practice to initialize the state within the **constructor**.

```js
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { lat: null, errorMessage: '' };
  }
  //...
```

It is more common and suggested to **initialize state like so:**

```js
state = { lat: null, errorMessage: '' }
```

> This is equivalent to the code above

Full code would look like:

```js
class App extends React.Component {
  state = { lat: null, errorMessage: '' }

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({ lat: position.coords.latitude })
      },
      (err) => {
        this.setState({ lat: '', errorMessage: err.message })
      }
    )
  }

  render() {
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>
    }
    if (!this.state.errorMessage & this.state.lat) {
      return <div>Latitude: {this.state.lat}</div>
    } else {
      return <div>Loading 🙃</div>
    }
  }
}
```

# Passing State as props

In our parent file:

- we can pass a component into the `render()` method like so.

```js
class App extends React.Component {
  state = { lat: null, errorMessage: '' }

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position)
        this.setState({ lat: position.coords.latitude })
      },
      (err) => {
        console.log(err)
        this.setState({ lat: '', errorMessage: err.message })
      }
    )
  }

  //...

  render() {
    //...
    if (!this.state.errorMessage && this.state.lat) {
      return <SeasonDisplay lat={this.state.lat} />
    }
    ///...
  }
}
```

Over in our `SeasonDisplay` component:

- we need to pass in props as our first argument.
  - props will be an **object** which will contain our `lat` property.

```js
const SeasonDisplay = (props) => {
  console.log(props) // {lat: 49.1711087}
  return <div>SeasonDisplay</div>
}
```

## Examples

Goal here is to implement a clock that updates every second.

Starting code: Does not work:

```js
class Clock extends React.Component {
  componentDidMount() {
    setInterval(() => {
      this.time = new Date().toLocaleTimeString()
    }, 1000)
  }

  render() {
    return <div className="time">The time is: {this.time}</div>
  }
}
```

Solution:

```js
class Clock extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      time: null,
    }
  }
  componentDidMount() {
    setInterval(() => {
      this.setState({
        time: new Date().toLocaleTimeString(),
      })
    }, 1000)
  }

  render() {
    return <div className="time">The time is: {this.state.time}</div>
  }
}
```

## Destructure props

Instead of passing props.video, we can destructure this to just provide `videos`.

```js
//app.js
export default class App extends Component {
  state = { videos: [] };
  onTermSubmit = async (term) => {
    const response = await youtube.get('/search', {
      params: {
        q: term,
      },
    });
    this.setState({ videos: response.data.items });
  };
  render() {
    return (
      <div className="ui container">
        <SearchBar onFormSubmit={this.onTermSubmit} />
        <VideoList videos={this.state.videos} /> // passing props to child
      </div>
    );
  }
}

// NO DESTRUCTURING
//VideoList.js
import React from 'react';

const VideoList = (props) => {
  return <div>{props.videos.length}</div>;
};

export default VideoList;

// WITH DESTRUCTURING
import React from 'react';

const VideoList = ({ videos }) => {
  return <div>{videos.length}</div>;
};

export default VideoList;
```
