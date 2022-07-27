---
title: SQL from our Apps
date: '2022-07-27'
tags: ['SQL', 'databases']
images: ['/static/images/postImages/erd.jpg']
draft: true
summary: How to interact with a postgres database from our apps. We will be using node-postgres (pg) node package to interact with the database.
---

## node-postgres

npm link [here:](https://www.npmjs.com/package/pg)

Documentation: [here](https://node-postgres.com/)

In order to connect with our database, we pass configuration options to the `pg` client:

```js
const pg = require('pg')

const config = {
  user: '<user name>',
  password: '<password>',
  database: '<db>',
  host: '<host>',
}

const client = new pg.Client(config)
```

Tell the client to connect to the database:

```js
client.connect()
```

We can execute SQL queries using the `query` method:

```js
client.query('SELECT * FROM <table>').then((result) => console.log(result))
```

> **NOTE**: When using callbacks instead of promises: `pg` uses "error first" callbacks meaning that the first argument will always be the error (if any) or null and the second argument will be the return value from our query.

## SQL Syntax Review

BREAD!

### Browse

```sql
SELECT * FROM <table>;
```

### Read

```sql
SELECT * FROM <table> WHERE id = <id>;
```

### Edit

```sql
UPDATE <table> SET <column> = <value> WHERE id = <id>;
```

### Add

```sql
INSERT INTO <table> (<column1>, <column2>) VALUES (<value1>, <value2>);
```

### Delete

```sql
DELETE FROM <table> WHERE id = <id>;
```

## Sanitization

We always want to sanitize any user-defined parameters in our SQL before running the query to prevent possible [SQL injections](https://en.wikipedia.org/wiki/SQL_injection).

In `pg`, we use [prepared statements](https://en.wikipedia.org/wiki/Prepared_statement) and pass an array of values as the second argument to `client.query()`:

```js
client
  .query('SELECT * FROM <table> WHERE id = $1', [<id>])
  .then((result) => console.log(result));
```

In the above example, the `id` from the array will be interpolated into the SQL query wherever `$1` appears.

## Environment Variables - Protecting Data

- We use environment variables to inject sensitive data into our application at **runtime** rather than at **compile time**.
- environment variables are specified when an application starts and are available to all the code in the application.

```
# environment variables are specified before the application is started

PORT=3000 node server.js

# this PORT variable is accessible using process.env.PORT
```

Can use the `process.env` object to access environment variables:

```js
console.log(process.env.PORT)
// prints 3000
```

We can also use a package called [dotenv](https://www.npmjs.com/package/dotenv) to load environment variables from a .env file:

```zsh
npm i dotenv
```

> inside of the `.env` file

```
PORT=3000
GOOGLE_API_KEY=123456789
```

> inside `server.js`

```js
require('dotenv').config()

console.log(process.env.PORT) // 3000
console.log(process.env.GOOGLE_API_KEY) // 123456789
```

### Useful Links

- ["SQL is demon spawn"](https://youtu.be/Hh6CbrDr0Lk)
- [node-postgres](https://node-postgres.com/)
- [Postgres Numeric Data Types](https://www.postgresql.org/docs/11/datatype-numeric.html)
- [Little Bobby Tables](https://xkcd.com/327/)
- [SQL Injection](https://en.wikipedia.org/wiki/SQL_injection)
