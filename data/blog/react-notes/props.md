---
title: Passing Props to a Component
date: '2022-03-19'
tags: ['react', 'props']
draft: false
summary: 'Simple guide on how props are used to display and pass information to a component.'
---

Basic example of how to use props. For example, this code renders “Hello, Sara” on the page:

```js
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>
}

const element = <Welcome name="Sara" />
ReactDOM.render(element, document.getElementById('root'))
```

Component Hierarchy

- `App` is the **parent** to `CommentDetail`

```js
const App = () => {
  return (
    <div className="ui comments container">
      <CommentDetail />
      <CommentDetail />
    </div>
  )
}
```

---

Props are a system for passing data from a **parent** component to a **child**.
The overall goal is to **customize or configure** a child component.

There is no limit on the amount of information we can pass through props.

# Passing Through Props

- a child can NOT pass data through the props system directly.
  - generally about parent communicating to the child.

### Providing a prop to a child

Can also reference some javascript variable.

```js
// in parent component
const App = () => {
  return (
    <div className="ui comments container">
      <CommentDetail
        author={faker.name.findName()}
        text={faker.lorem.sentence()}
        timeAgo="Sun at 4:05PM"
      />
      <CommentDetail
        author={faker.name.findName()}
        text={faker.lorem.sentence()}
        timeAgo="Tues at 7:33PM"
      />
      <CommentDetail
        author={faker.name.findName()}
        text={faker.lorem.sentence()}
        timeAgo="Fri at 4:20PM"
      />
    </div>
  )
}
```

Must add the **props** as a parameter in the component.

```js
//in the child component
import React from 'react'
import faker from '@faker-js/faker'

const CommentDetail = (props) => {
  return (
    <div className="comment">
      <a href="/" className="avatar">
        <img alt="avatar" src={faker.image.avatar()} />
      </a>
      <div className="content">
        <a href="/" className="author">
          {props.author}
        </a>
        <div className="metadata">
          <span className="date">{props.timeAgo}</span>
        </div>
        <div className="text">{props.text}</div>
      </div>
    </div>
  )
}

export default CommentDetail
```

Can also pass deconstructed props:

```js
//in parent, App.js
import React from 'react';
import Accordion from './components/Accordion';

const items = [
  {
    title: 'What is React?',
    content: 'React is a front end javascript framework',
  },
  {
    title: 'Why use react?',
    content: 'React is a favorite JS library among engineers',
  },
  {
    title: 'How do you use React?',
    content: 'You use React by creating components',
  },
];

const App = () => {
  return (
    <div>
      <Accordion items={items} />
    </div>
  );
};

export default App;


// in child, Accordion.js
import React from 'react';

const Accordion = ({ items }) => { // deconstructed
  return <div>{items.length}</div>; //passings the prop
};

export default Accordion;
```

# Communicating from Child to Parent

Typically done by passing a callback from the parent to desired child. Then using an event within the child to trigger the callback, in tern, passing that information back to the child.

1. create method in App to pass on the callback to child first

```js
export default class App extends Component {
  state = { videos: [], selectedVideo: null } //add new property to the state
  //...
  onVideoSelect = (video) => {
    // create method, passing the video prop
    console.log('From the App!', video)
  }
  render() {
    return (
      <div className="ui container">
        <SearchBar onFormSubmit={this.onTermSubmit} />
        <VideoList
          onVideoSelect={this.onVideoSelect} // pass method as a prop to child
          videos={this.state.videos}
        />
      </div>
    )
  }
}
```

2. In the child, in our example 'VideoList.js', **Pass the prop** to the next child

```js
const VideoList = ({ videos, onVideoSelect }) => {
  // need to reference our destructured prop, onVideoSelect

  const renderedList = videos.map((video) => {
    return <VideoItem video={video} onVideoSelect={onVideoSelect} /> // pass the prop to the next child, VideoItem
  })

  return <div className="ui relaxed divided list">{renderedList}</div>
}

export default VideoList
```

3. Need to create a callback using `onClick` on the final child.

```js
const VideoItem = ({ video, onVideoSelect }) => {
  return (
    // pass in the callback as an arrow function so we can pass the video
    <div onClick={() => onVideoSelect(video)} className="video-item item">
      <img
        className="ui image"
        src={video.snippet.thumbnails.medium.url}
        alt={video.snippet.chanelTitle}
      />
      <div className="content">
        <div className="header">{video.snippet.title}</div>
        <div class="description">{video.snippet.description}</div>
      </div>
    </div>
  )
}
```

> Now if we search and click on the div, we can see a console.log() of the video being clicked. This means we are successfully communicating to the parent, App.js!

Summary:

1. parent defined a new callback method.
2. method from parent gets passed to child as a prop
3. child in tern passes that prop to another child
   1. now whenever a user clicked, it triggered the method, passing that information back to the original parent.

# Showing Custom Children - reusable components

You can pass a child into a prop like so:

```js
const ApprovalCard = (props) => {
  return (
    <div className="ui cards">
      <div className="card">
        <div className="content">
          {props.children} // add child
          <div className="extra content">
            <div className="ui two buttons">
              <div className="ui basic green button">Approve</div>
              <div className="ui basic red button">Reject</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
```

Can then pass the desired child as an argument inside the parent:

```js
const App = () => {
  return (
    <div className="ui comments container">
      <ApprovalCard>
        {' '}
        // parent
        <CommentDetail // child
          avatarImg={faker.image.avatar()}
          author={faker.name.findName()}
          text={faker.lorem.sentence()}
          timeAgo="Sun at 4:05PM"
        />
      </ApprovalCard>
    </div>
  )
}
```

We take a **child**, wrap it in a **parent component**. The child component will show up on the ` {props.children}`. We can then reference that child anywhere in the parent component.

If we want to make our components re-usable, we **must** have `{props.children}` somewhere in the **parent component**.

```js
<div className="content">{props.children}</div>
```

---

One last basic props example:

```js
const App = () => {
  return (
    <div>
      <Message
        headerText="Changes in Service"
        paraText="We just updated our privacy policy here to better service our customers."
      />
    </div>
  )
}

const Message = (props) => {
  return (
    <div className="ui message">
      <div className="header">{props.headerText}</div>
      <p>{props.paraText}</p>
    </div>
  )
}
```

# Default Props

```js
// in app.js
//set a specific message
<Loader message={'Please approve location services'} />
//loader.js
export default class Loader extends Component {
  render() {
    return (
      <div class="ui active dimmer">
        <div class="ui massive text loader">
          {this.props.message}
        </div>
      </div>
    );
  }
}
//

// no message specified
// default message will be displayed
//app.js
return <Loader />;
//loader.js
export default class Loader extends Component {
  render() {
    return (
      <div class="ui active dimmer">
        <div class="ui massive text loader">
          {this.props.message || 'Loading'}
        </div>
      </div>
    );
  }
}

//OR written as a functional component

import React from 'react';

const Loader = (props) => {
  return (
    <div class="ui active dimmer">
      <div class="ui massive text loader">{props.message}</div>
    </div>
  );
};

Loader.defaultProps = { message: 'Loading...' };

export default Loader;
```

# Callbacks in Children

Whenever we are invoking a `prop` within a class, we must refer to it using `this.props`.
Like so:

```js
//in child
class SearchBar extends React.Component {
  state = { term: '', placeholder: 'Search' }

  onFormSubmit = (event) => {
    event.preventDefault()
    this.props.onSubmit(this.state.term) //passing props to parent
  }

  render() {
    return (
      <div className="ui segment">
        <form onSubmit={this.onFormSubmit} className="ui form">
          <div className="field">
            <label>Image Search</label>
            <input
              type="text"
              value={this.state.term}
              onChange={(e) => this.setState({ term: e.target.value })}
              placeholder={this.state.placeholder}
            ></input>
          </div>
        </form>
      </div>
    )
  }
}

//in parent
class App extends React.Component {
  onSearchSubmit(term) {
    console.log(term)
  }

  render() {
    return (
      <div className="ui-container" style={{ marginTop: '10px' }}>
        <SearchBar onSubmit={this.onSearchSubmit} /> // have our child component and send it props
        this way
      </div>
    )
  }
}
```
