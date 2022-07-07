---
title: More on Async and Networking
date: '2022-07-06'
tags: ['Async', 'Networking']
images: ['/static/images/postImages/omar-flores-MOO6k3RaiwE-unsplash.jpg']
draft: false
summary: Deeper dive into async. Introduction to networking with TCP and HTTP.
---

# What is networking?

`net` docs: [node.js](https://nodejs.org/dist/latest-v16.x/docs/api/net.html)
`net.createConnection`: [node.js](https://nodejs.org/dist/latest-v16.x/docs/api/net.html#netcreateconnection)
`net.socket`: [here](https://nodejs.org/dist/latest-v16.x/docs/api/net.html#class-netsocket)

where can I see a list of all methods available to the object created by `net.createConnection`? Is it just the 'events' api?

### Metaphor - Networking with people:

- find the person to talk to
- approach the person
- initiate conversation 'hello, my name is ...'
- listen to the person
- ask the person a question
- end the conversation

These are the 'rules' of networking.

### What things(mediums) are involved to communicate?

- voice
- gestures
- eye contact
- text messages
- zoom (any other platform online).

### Rules doe Computer Networking

- computer A
- computer B

- computer A wants to connect with Computer B
- Computer A needs to know where Computer B is (lives at)
- Computer A goes to the location to initiate contact with Computer B
- Computer B accepts to talk to Computer A
  -- TALK TO EACH OTHER
- Computer A sends a message
- Computer B receives the message
  -- END THE CONVERSATION
- Computer A decides to disconnect, and disconnects from Computer B

There are a few steps in between this, however it is somewhat accurate.

## Transmission Control Protocol (TCP) Introduction and demo

Can be used to communicate over a network. Can remain open for a long time.

Example can be seen in network requests on [skrribbl](https://skribbl.io/)

Facebook notifications, emails, etc. We need to use TCP to communicate over the internet because the connection needs to remain open.

You can MIX TCP and HTTP.

## HTTP Fundamentals

HyperText Transfer Protocol (HTTP) is a stateless protocol for transferring data over the internet. It is a **subset** of TCP.

There are some extra rules that are not in TCP, but are in HTTP.

- Computer A can **only send 1 request** message
- Computer B can **only send 1 response**

Is a good solution for things that are more 'static'.

## IP Address

Refers to your address (computers address).

There is the **local IP** and **global IP**

| Local IP                                           | Global IP                      |
| -------------------------------------------------- | ------------------------------ |
| Are unique to each computer                        | Are shared across the internet |
| `ifconfig` will bring up the local IP under 'inet' |                                |
| Use local IP to communicate to another device      |                                |
| '192.' is always local                             |                                |

### Request and Response Nature

### How HTTP leverages TCP

### Important parts of a request

### Common Status Codes

## Node HTTP Client Example (using request)

# Building a Server

Using `net` node package. `net` is a module that allows you to create a socket.

See Node.js [docs](https://nodejs.org/docs/latest-v16.x/api/net.html).

We can use `net.createServer` to create a server.

```js
// server
const net = require('net')
//                                user
const server = net.createServer((socket) => {
  console.log('Someone has connected!')
})
//            PORT
server.listen(3001, () => {
  console.log('listening on port 3001')
})
```

> If we run this code, we will see the message 'listening on port 3001'. Now we have a computer that is listening on port 3001. It literally just hangs around, waiting for a connection.

The **port** is a place where we can communicate with the computer (have a connection). Think of it as a tunnel that we can use to communicate with the computer.

the `net.createServer` function takes a callback function. This callback function is called when a connection is made.

We can use the event listener `.on` to listen for the event.

```js
// server
const server = net.createServer((socket) => {
  console.log('Someone has connected!')

  socket.setEncoding('utf8')
  socket.write('Hello World!')
  socket.on('data', (data) => {
    console.log('data from users')
    console.log(data)
  })
})
```

> Need to add an encoding to the socket.on function.

List of events that can be listened to: [here](https://nodejs.org/dist/latest-v16.x/docs/api/events.html)

Instead of `console.log();` the data, we can create an array with all the usernames, then loop through the array and and `write()` the data.

```js
const net = require('net')
// user
const users = [] // array to hold usernames
const server = net.createServer((socket) => {
  users.push(socket)
  console.log('Someone has Connected!')
  socket.setEncoding('utf8')
  socket.write('Welcome to the Chat Server!!!')
  socket.on('data', (data) => {
    console.log('data has come in from our users!')
    // console.log(data);
    // can use `forEach` to loop through the array and write the data to each user
    users.forEach((user) => {
      user.write(data)
    })
  })
})
//            PORT
server.listen(3001, () => {
  console.log('server is bound!')
})
```

# Building a Client

Client wants to communicate with the server.

We need to make a connection. A connection needs 2 things: a **port** and a **IP**.

Node.js [docs](https://nodejs.org/docs/latest-v16.x/api/net.html#netcreateconnection) on creating a client.

```js
// client
const net = require('net')
const credentials = { host: 'IP ADDRESS', port: 3001 }

const client = net.createConnection(credentials, () => {
  console.log('🍚 has Connected!')
})

// writting to the server, sending a message
const name = 'Curtis'
client.write(`${name} has connected 🤖`)

// when data comes back to me
// need to create an event listener for the data event
client.setEncoding('utf8')
client.on('data', (data) => {
  console.log('server sends you back!')
  console.log(data)
})
```

The **port** used is the port that the server is listening on.

Idea is that the **client** sends a command to the **server**.

## Modifying the Client

Let's modify the client to allow us to send a message to the server over and over.

```js
const net = require('net')

// add in process.stdin
const stdin = process.stdin

// can pass in a callback function
const credentials = { host: 'IP ADDRESS', port: 3001 }

const client = net.createConnection(credentials, () => {
  console.log('🍚 has Connected!')
})
const name = 'Curtis'

client.write(`${name} has connected 🤖`)

// when data comes back to me
// info back from server
client.setEncoding('utf8')
client.on('data', (data) => {
  console.log(data)
})

// some message after we press enter
stdin.on('data', (message) => {
  // we can now write as many messages as we want
  client.write(`${name}: ${message}`)
})
```

# Snake Assignment

Goal is to create a Snake server and listen for connections on a port.

Server has cloned from [snek-multiplayer](https://github.com/lighthouse-labs/snek-multiplayer) by [kvirani](https://github.com/kvirani).

## Connecting to the server

```js
// play.js
const net = require("net");

// establishes a connection with the game server
const connect = function() {
  const conn = net.createConnection({
    host: // 'ip address of server',
    port: // port on server
  });

  // interpret incoming data as text
  conn.setEncoding("utf8");

  return conn;
};

console.log("Connecting ...");
connect();
```

> We can verify that we are connected by looking at the console after we run the code.

Here we are...

- Using `net` to create a connection to the server. We use the `net.createConnection` to create an object named `conn`.
- The newly created object (`conn`) serves to represent the connection to the server. This object is packed full of useful methods that can be used to communicate with the server.

Read more on node.js `net.createConnection`: [here](https://nodejs.org/api/net.html#netcreateconnection)

### Snake Client

Can use `conn.write` to send a message to the server.

```js
const net = require('net')

// establishes a connection with the game server
const connect = function () {
  const conn = net.createConnection({
    host: '165.227.47.243',
    port: 50541,
  })

  // interpret incoming data as text
  conn.setEncoding('utf8')

  conn.on('data', (data) => {
    console.log(data)
  })

  conn.on('connect', () => {
    conn.write('Name: 401')
    // setInterval(() => {
    //   conn.write("Move: up");
    // }, 50);
    // setInterval(() => {
    //   conn.write("Move: up");
    // }, 100);
  })
}

module.exports = {
  connect,
}
```

Server Moves:

- "Move: up" - move up one square (unless facing down)
- "Move: down" - move down one square (unless facing up)
- "Move: left" - move left one square (unless facing right)
- "Move: right" - move left one square (unless facing left)

## Messages from Server

In order to handle messages from the server, we can use the `conn` object.

**Events** occur when we...

- `connect` to a server
- `close` a connection from a server
- `data` is received from a server

In order to react to these events, we must **listen for them!**

The code that listens for events is called a **event listener**.

The `.on` method is used to listen for an event. It takes two arguments: the event name and a callback function.

```js
conn.on('event name', functionThatDoesSomething)
```

You do not need a name for the callback function. You can pass in an anonymous function.

```js
conn.on('event name', () => {
  // do something
})
```

The "event name" has to match the name of the event that is being listened for. This name is defined by Node.js. For example, the `connect` event occurs when a connection is established.

```js
conn.on('connect', () => {
  // code that does something
  // when the connection is created
})
```

In our example, the `conn` object is an instance the `net.Socket` class.

List of events that can be listened to: [here](https://nodejs.org/api/net.html#class-netsocket)

Move Commands

```js
//input.js
// interface to handle user input from stdin
const handleUserInput = function (key) {
  if (key === '\u0003') {
    process.exit()
  }
  if (key === 'w') {
    console.log('Move: up')
  }
  if (key === 'a') {
    console.log('Move: left')
  }
  if (key === 's') {
    console.log('Move: down')
  }
  if (key === 'd') {
    console.log('Move: right')
  }
}

const setupInput = function () {
  const stdin = process.stdin
  stdin.setRawMode(true)
  stdin.setEncoding('utf8')
  stdin.resume()

  stdin.on('data', handleUserInput)

  return stdin
}

module.exports = { setupInput, handleUserInput }
```

## Sending Data from the Input Module to the Server

We need to have a connection object access the data from the keyboard.

We can dop this by passing the `conn` object returned by `connect()` to the `setupInput()` function.

```js
// Stores the active TCP connection object.
let connection

// interface to handle user input from stdin
const handleUserInput = function (key) {
  //...
}

const setupInput = function () {
  const stdin = process.stdin
  stdin.setRawMode(true)
  stdin.setEncoding('utf8')
  stdin.resume()

  stdin.on('data', handleUserInput)

  return stdin
}

module.exports = { setupInput, handleUserInput }
```

> `connection` will be in the outermost scope so it can be used by any function in the module.

Now we can pass the `conn` object to the `setupInput()` function.

```js
const setupInput = function (conn) {
  connection = conn
  const stdin = process.stdin
  stdin.setRawMode(true)
  stdin.setEncoding('utf8')
  stdin.resume()
  stdin.on('data', handleUserInput)

  return stdin
}
```

This allows us to interact with the server! The `connect()` function returns the `conn` object.

Recall:

- `connect()` returns the `conn` object, which can be used to send data to the server.
- the object `conn` is being passed to `setupInput()`.
- `setupInput()` places a references to that object in the `connection` variable.
- Data comes the keyboard detected by the `stdin` event handler.
- The `stdin` can interact with the `connection` object.

---

Full project can be found [here](https://github.com/Cwarcup/snake-client).

# HTTP Requestst
