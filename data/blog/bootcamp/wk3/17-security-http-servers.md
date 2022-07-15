---
title: Security with HTTP Servers
date: '2022-07-14'
tags: ['bcrypt', 'server']
images: ['/static/images/postImages/CRUD.jpg']
draft: true
summary: We will use the bcryptjs package to convert the passwords provided by users before we store them on our server.
---

## Hashing

- Is a one-way process which converts plain text into a hash.
- plain text + salt => hashing algo => 60 character hash

```
// password      salt     hash
    '123'    +   'abc'   => '$2b$10$3jZi.xQkvLgfBJLcQQ4uZu'
```

> You must use the exact same salt every time you hash a password.

Run the following command to install [bcryptjs](https://www.npmjs.com/package/bcryptjs):

```
npm install bcryptjs
```

> This will install the bcryptjs package. bcryptjs is a version of the bcrypt algorithm that is designed to be used in a Node.js environment.

Instead of storing passwords in plain text, we will use the bcryptjs package to hash the passwords.

```js
const bcrypt = require('bcryptjs')
const password = 'purple-monkey-dinosaur' // found in the req.body object
const hashedPassword = bcrypt.hashSync(password, 10)
```

```js
// take a look at bcrypt practice
```

> the salt returns a completely random string of characters. Every time you run the salt, you will get a different string.

- The hash is **always** 60 characters long.

### Async Version

Use `bcrpt.genSat()` to generate a salt. This will return a promise.

```js
// generate your salt
bcrypt
  .genSalt(10)
  .then((salt) => {
    // salt is a random string of characters
    console.log(salt)
    bcrypt.hash('some-password', salt).then((hash) => {
      console.log(hash)
    })
  })
  .catch((err) => {
    console.log(err)
  })
```

> This is a bad way of doing this! We will get into `.then` hell.

Preferred way:

```js
// generate your salt
bcrypt.genSalt(10)
  .then(salt => {
    // return the promise
    return bcrypt.hash("some-password", salt)
  })
  .then(hash => {
    console.log(hash);
  });
  .catch(err => {
    console.log(err);
  });
```

## Comparing Hashes

ADD NOTES ON COMPARING HASHES TO LOG IN

## Cookies and Sessions

- Encryption is a two-way process.

- change every instance of `req.cookie` to `req.session`

## Asymmetric Encryption

No longer has a single key to encrypt and decrypt.

Here we use a **public key** and **private** **key** to encrypt and decrypt.

On the backend, a company will use a **private key** to unscramble the data. The public key will be used to encrypt the data.
