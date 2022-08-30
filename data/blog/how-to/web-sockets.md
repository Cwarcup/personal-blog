---
title: Web Sockets
date: '2022-08-30'
tags: ['Web Sockets']
images: 'https://blog.logrocket.com/wp-content/uploads/2018/05/websockets-two-way-communication-react-app-nocdn.jpg'
draft: false
summary: Web sockets are a way to communicate between a client and a server. They are used in real-time applications like chat apps, multiplayer games, and more.
---

This is a way to communicate between a client and a server via a persistent connection. This is useful for real-time applications like chat apps, multiplayer games, and more. This is different from HTTP requests because it is a persistent connection. This means that the connection is not closed after the request is sent. This is useful because it allows the server to send data to the client without the client having to send a request.

![basic http request](https://www.w3schools.in/wp-content/uploads/2019/08/http-protocol.jpg)

The server here only response to a request. Unless you ask the server, it will not send you any data. This is not the case with web sockets. The server can send data to the client without the client having to send a request.

![basic web socket request](https://images.techhive.com/images/article/2016/06/websockets-100668229-primary.idge.jpg)

However a **web socket** connection is quite different. In fact it acts a little more of `tcp`. Once a connection starts, both server and client, can send messages to each other. Until someone actually disconnects ( closes the app, or presses a disconnect ) than both server and client are connected and are listening to events.

Websockets run _on top_ of the HTTP protocol. This means there's nothing else require!

- no ports
- no ip addresses
- no firewall rules

If you can establish an HTTP connection, you can establish a websocket connection.

## How to use web sockets

It's most common to use a library to handle web sockets. There are many libraries out there. Here are some of the most popular ones:

- [Socket.io](https://socket.io/)
- [ws](https://www.npmjs.com/package/ws)
- [uWebSockets.js](https://github.com/uNetworking/uWebSockets.js)

We will be using `Socket.io` in this tutorial.

## Socket.io

[see website for more info](https://socket.io/docs/v4/)

- very easy to use
- is known as the `jQuery` of web sockets

### Getting started

- you need a client and a server

```js
// express server
const express = require('express')
const app = express()

app.listen(3000, () => {
  console.log('listening on port 3000')
})
```

Use React to create a client. You can use any other framework or library you want. Here is an example of a React client:

```js
// client
import React, { useEffect, useState } from 'react'

export default function App() {
  const text = useState('Hello')

  return (
    <div>
      <h1>Socket.io</h1>
      <div>{text}</div>
    </div>
  )
}
```

### Server Setup

Need to make the server a web socket server. This is done by using the `socket.io` library.

```bash
npm install socket.io
```

[integrate it into your server](https://socket.io/get-started/chat#integrating-socketio)

- needs an http server to work
  - `app.listen` returns a server object
-

```js
// express server
const express = require('express')
const app = express()

const { Server } = require('socket.io')

app.get('/', (req, res) => {
  // can have other routes
  res.send('Hello World')
})

const http = app.listen(3000, () => {
  console.log('listening on port 3000')
})

const io = new Server(http) // pass in the server object
```

> You do not need to use Express.

You can do this instead if you don't want to use Express, but is not as common:

```js
const { Server } = require('socket.io')
const io = new Server(3000)
```

By using Express, you can have other routes. This is useful if you want to serve a React app.

With the `io` object, you can listen for events. Here is an example of listening for a connection event:

```js
io.on('connection', (socket) => {
  console.log('a user connected')
})
```

### Client Setup

Install the `socket.io-client` library:

```bash
npm install socket.io-client
```

You can use this library to connect to the server. Here is an example of connecting to the server:

```js
// new component - chat.js

const Chat = () => {
  return (
    <div>
      <h1>Chat</h1>
    </div>
  )
}

export default Chat
```

back in the main `App.js` file, import the `Chat` component and add it to the `return` statement:

```js
// client
import React, { useEffect, useState } from 'react'
import Chat from './Chat'

export default function App() {
  const text = useState('Hello')

  return (
    <div>
      <h1>Socket.io</h1>
      <div>{text}</div>
      <Chat />
    </div>
  )
}
```

Enable the client to connect to the server. This is done by using the `socket.io-client` library:

- need to tell component to listen for events

```js
// new component - chat.js
import io from 'socket.io-client'
import { useEffect } from 'react'

const Chat = () => {
  useEffect(() => {
    const socket = io() // will default to the current host

    // all listeners will happen here

    socket.on('connect', () => {
      console.log('connected')
    })
  }, [])

  return (
    <div>
      <h1>Chat</h1>
    </div>
  )
}

export default Chat
```

### Sending and Receiving Messages

We want to send a message from the server to the client saying 'Hello'. We will do this by using the `socket.emit` method. This method takes two arguments: the event name and the data to send.

The `emit` method is used very often. It is used for sending messages. Basics of `emit`: https://socket.io/docs/v4/emitting-events/#basic-emit

`on` is used to listen/capture events.

```js
// server
// earlier in the code

const io = new Server(http)

io.on('connection', (client) => {
  console.log('a user connected')

  // everything to do with the client will happen here
  // do EVERYTHING HERE

  client.emit('system', 'Welcome!')
})
```

`emit` takes in **two** arguments: - the event name - this is a string - the data to send

Back on the client side, we need to listen for the event. We will do this by using the `socket.on` method. This method takes two arguments: the event name and a callback function.

````js
// client
// earlier in the code

	useEffect(() => {
		const socket = io()

		// all listeners will happen here

		socket.on('system', (data) => {
			console.log(data)
		})

	}, [])
	```

> When we get data, we log it to the console.

### Render messages on the client screen

We can create a list of messages and add the message to the list when we get the message from the server.

```js
// client

const Chat = () => {
	const [messages, setMessages] = useState([])

	useEffect(() => {
		const socket = io()


		socket.on('system', (data) => {
			setMessages(prev => [data, ...prev]) // adds to the beginning of the array
		})

	}, [])

		const list = messages.map((message, index) => {
			return <li key={index}>{message}</li>
		})

	return (
		<div>
			<h1>Chat</h1>
			<ul>
				{list}
			</ul>
		</div>
	)
}
````

### More from the server

If you have a logged in session, we can get user information from the session. We can use this information to send a message from the client to the server.

Generate random names for the server with `npm i ikea-name-generator`

```js
// server
const ikea = require('ikea-name-generator')

io.on('connection', (client) => {
  console.log('a user connected')

  const name = ikea.getName()

  console.log('Client connected', name)

  client.emit('system', 'Welcome!')
})
```

This `client` object is very important. If we log the client object, we can see that it has a lot of useful information. We can use this information to send messages to the client.

The most important thing is the `id` property. This is the unique identifier for the client. We can use this to send messages to the client.

With this information we can construct **everything else** in this object.

- it is just a string

```js
// server
const ikea = require('ikea-name-generator')

io.on('connection', (client) => {
  console.log('a user connected')

  const name = ikea.getName()

  console.log('Client connected', name, client.id) // client.id is the unique identifier

  client.emit('system', 'Welcome!')
})
```

This `id` is the identifier for the client. We can use this to send messages to the client.

It is also _ephemeral_. It will change if the client disconnects and reconnects.

- it should not go outside the module
- should never save it to a database
- or send it to the client

If a client disconnects and reconnects, the `id` will change.

If the sever restarts, the `id` will change.

### Listening when client disconnects

```js
io.on('connection', (client) => {
  console.log('a user connected')

  const name = ikea.getName()

  console.log('Client connected', name, client.id)

  client.emit('system', 'Welcome!')

  client.on('disconnect', () => {
    // listen for disconnect
    console.log('Client disconnected', name, client.id)
  })

  // send a message to everyone when someone connects
  client.broadcast.emit('system', `${name} has joined the chat`)

  // message when someone leaves
  client.on('disconnect', () => {
    client.broadcast.emit('system', `${name} has left the chat`)
  })
})
```

> More on broadcasting: https://socket.io/docs/v4/broadcasting-events/

Back in the client:

```js
// client
const Chat = () => {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const socket = io()

    socket.on('system', (data) => {
      setMessages((prev) => [data, ...prev]) // adds to the beginning of the array
    })

    return () => {
      socket.disconnect() // disconnect when the component unmounts
    }
  }, [])

  const list = messages.map((message, index) => {
    return <li key={index}>{message}</li>
  })

  return (
    <div>
      <h1>Chat</h1>
      <ul>{list}</ul>
    </div>
  )
}
```

### Client sending a message to other clients

Need to make sure the `socket` survives a re-render.

```js
// client
const Chat = () => {
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('') // state for the input
  const [socket, setSocket] = useState(null) // state for the socket

  useEffect(() => {
    const socket = io()
    setSocket(socket) // set the socket in state

    socket.on('system', (data) => {
      setMessages((prev) => [data, ...prev])
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  const list = messages.map((message, index) => {
    return <li key={index}>{message}</li>
  })

  // function to send messages
  const send = function () {
    socket.emit('message', text) // use emit to send a message
    setText('')
  }

  return (
    <>
      <div>
        <h1>Chat</h1>
        <textarea>
          onChange=
          {(e) => {
            setText(e.target.value)
          }}
          placeholder="Type a message"
        </textarea>
      </div>

      <button onClick={send}>Send</button>

      <ul>{list}</ul>
    </>
  )
}
```

Need to make sure the server is listening for the message.

```js
// server
io.on('connection', (client) => {
  console.log('a user connected')

  const name = ikea.getName()

  console.log('Client connected', name, client.id)

  client.emit('system', 'Welcome!')

  client.on('disconnect', () => {
    // listen for disconnect
    console.log('Client disconnected', name, client.id)
  })

  // send a message to everyone when someone connects
  client.broadcast.emit('system', `${name} has joined the chat`)

  // message when someone leaves
  client.on('disconnect', () => {
    client.broadcast.emit('system', `${name} has left the chat`)
  })

  // listen for messages
  client.on('message', (data) => {
    // 'message' is the event name. Needs to be the same as the client
    console.log('message', data)
  })
})
```

The server needs to **broadcast** this message to everyone else.

```js
// server
io.on('connection', (client) => {
  // ...
  const name = ikea.getName()
  //...

  // listen for messages
  client.on('message', (data) => {
    // 'message' is the event name. Needs to be the same as the client

    const { text } = data
    const from = name // the name of the person who sent the message
    client.broadcast.emit('public', { data, from }) // broadcast the message to everyone else
    // we can use a different event name to send the message to everyone else
  })
})
```

Back in the client:

```js
// client
socket.on('public', (data) => {
  // reciewving an object
  const message = `${data.name} says: ${data.text}`
  setMessages((prev) => [message, ...prev])
})
```

### Sending a message to a specific client

We want to target a specific client.

Remember, the `id` is ephemeral. It will change if the client disconnects and reconnects.

```js
// to individual socketid (private message)
io.to(socketId).emit(/* ... */)
```

> Used to send a message to a specific client

We need to update our code a bit:

```js
//client
const Chat = () => {
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')
  const [socket, setSocket] = useState(null)
  const [to, setTo] = useState('') // state for the recipient

  useEffect(() => {
    const socket = io()
    setSocket(socket)

    socket.on('system', (data) => {
      setMessages((prev) => [data, ...prev])
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  const list = messages.map((message, index) => {
    return <li key={index}>{message}</li>
  })

  // function to send messages
  const send = function () {
    socket.emit('message', { text, to }) // add `to` to the message
    setText('')
  }

  return (
    <>
      <div>
        <h1>Chat</h1>

        <input>
          onChange=
          {(e) => {
            setTo(e.target.value)
          }}
          placeholder="Recipient"
        </input>

        <textarea>
          onChange=
          {(e) => {
            setText(e.target.value)
          }}
          placeholder="Type a message"
        </textarea>
      </div>

      <button onClick={send}>Send</button>

      <ul>{list}</ul>
    </>
  )
}
```

In the server:

```js
client.on('message', (data) => {
  // 'message' is the event name. Needs to be the same as the client

  const { text, to } = data
  const from = name // the name of the person who sent the message
  client.broadcast.emit('public', { data, from }) // broadcast the message to everyone else
  // we can use a different event name to send the message to everyone else

  if (!to) {
    client.broadcast.emit('public', { data, from }) // broadcast the message to everyone else
  }

  // if there is a `to` value, send the message to that client
  io.to().emit('private', { data, from }) // send the message to the recipient
})
```

We need to make sure we have a `clientId` to send to. But this needs to be the recipient's `clientId`.

How do we get the recipient's `clientId`?

In the server, we can add a `clientId` to the `client` object.

DOUBLE CHECK THIS!

```js
// server

// make an object to store the client's info outside of the socket
const users = {}

io.on('connection', (client) => {
  // ...
  const name = ikea.getName()

  // add user to the users object when the connect
  users[client.id] = { name }

  // remove the user from the users object when they disconnect
  client.on('disconnect', () => {
    delete users[name]
  })

  socket.on('private', (data) => {
    // reciewving an object
    const message = `${data.name} says: ${data.text}`
    setMessages((prev) => [message, ...prev])
  })
})
```

Now we can send a message to a specific client.

```js
//client

const id = clients[to] // get the recipient's clientId
console.log(`Sending message to ${to} with id ${id}`)
io.to(id).emit('private', { text, from }) // send the message to the recipient
```

## useful links

- emit cheatsheet: https://socket.io/docs/v4/emit-cheatsheet/
