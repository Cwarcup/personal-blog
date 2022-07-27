---
title: SQL from our Apps and Data Types in Postgres
date: '2022-07-27'
tags: ['SQL', 'data types', 'Postgres']
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

## Data Types

- Whenever we create a table in our database, we specify the data type for each column. This is called **data typing**.

```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY
);
```

we must choose from one of the following ten numeric types:

- `SMALLINT`
- `INTEGER`
- `BIGINT`
- `DECIMAL`
- `NUMERIC`
- `REAL`
- `DOUBLE`
- `SMALLSERIAL`
- `SERIAL`
- `BIGSERIAL`

Overview of Postgres Data Types: [here](https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-data-types/)

[Postgres Numeric Data Types](https://www.postgresql.org/docs/11/datatype-numeric.html)

Actions include:

- [Add a column](https://www.postgresqltutorial.com/postgresql-add-column/)
- [Drop a column](https://www.postgresqltutorial.com/postgresql-drop-column/)
- [Change the data type of a column](https://www.postgresqltutorial.com/postgresql-change-column-type/)
- [Rename a column](https://www.postgresqltutorial.com/postgresql-rename-column/)
- [Rename a table](https://www.postgresqltutorial.com/postgresql-rename-table/)
- Set a default value for the column.
- Add a constraint to a column.

## Altering a Table

If we already table in our database but need to edit our initial schema, we have a few options:

- Add or remove a column.
- Change an existing column type.
- Add or remove an index

Postgres ALTER TABLE command: [here](https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-alter-table/)

```sql
ALTER TABLE table_name action;
```

For example:

```sql
ALTER TABLE users
ADD COLUMN name VARCHAR(255),
ADD COLUMN  birth_year SMALLINT,
ADD COLUMN  member_since TIMESTAMP;
```

> NOTE: run `\d users` to see the new columns

## Removing a Table

- be careful when removing a table.

```sql
DROP TABLE users;
```

`CASCADE` will make sure that all records from other tables that depend on this table will also be deleted.

```sql
DROP TABLE users CASCADE;
```

To avoid any SQL errors, it's good to make sure the table **exists** before dropping it.

```sql
DROP TABLE IF EXISTS users CASCADE;
```

## NULL

- used when we want to add a row and don't want to specify a value for a column.
- if we insert data but don't specify a value for a column, the column will be set to `NULL`.
- empty spaces in the table represent `NULL` values.

```sql
Select * from users;

--  id | name | birth_year | member_since
-- ----+------+------------+--------------
--   1 |      |       2019 |
-- (1 row)
```

If we do not want `NULL` values, we can this in the DBMS:

```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  birth_year SMALLINT NOT NULL,
  member_since TIMESTAMP NOT NULL
);
```

## Default Values

```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  birth_year SMALLINT NOT NULL,
  member_since TIMESTAMP NOT NULL DEFAULT Now() -- default value for `member_since`
);
```

Can alter our table by setting a default value for a column:

```sql
ALTER TABLE users
ALTER COLUMN member_since
SET DEFAULT Now();
```

```
                        Table "public.users"
    Column    |            Type             |       Modifiers
--------------+-----------------------------+------------------------
 id           | integer                     | not null
 name         | character varying(255)      | not null
 birth_year   | smallint                    | not null
 member_since | timestamp without time zone | not null default now()
```

## Auto Increment / Serial

- we can set the id's type to be `SERIAL`.
- sets the column to be a `NOT NULL INTEGER` that's value will **automatically** increment.

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  birth_year SMALLINT NOT NULL,
  member_since TIMESTAMP NOT NULL DEFAULT Now()
);
```

Because `SERIAL` is not a real type, just a convenience for creating a unique `INTEGER` column, we can't simply update the type to `SERIAL` after the table has been created. In practice, we would set the type as `SERIAL` from the very start.

We would need to drop out table then create it again with the new type:

```sql
drop table if exists users cascade;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  birth_year SMALLINT NOT NULL,
  member_since TIMESTAMP NOT NULL DEFAULT Now()
);

INSERT INTO users (name, birth_year)
VALUES ('Curtis Warcup', 1994),
('Susan Hudson', 2000),
('Malloy Jenkins', 1000);

SELECT * FROM users;

--  id |      name      | birth_year |        member_since
-- ----+----------------+------------+----------------------------
--   1 | Curtis Warcup  |       1994 | 2022-07-27 02:13:33.386241
--   2 | Susan Hudson   |       2000 | 2022-07-27 02:13:33.386241
--   3 | Malloy Jenkins |       1000 | 2022-07-27 02:13:33.386241
```

## Foreign Keys

We will make a table for a users pets. A user can have multiple pets. The pets table will have a column for the user id. This column will be a **foreign key** column because it references a primary key in the users table.

```sql
CREATE TABLE pets (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  owner_id INTEGER NOT NULL REFERENCES users(id)
);
```

Adding some pets to our users table with a foreign key:

```sql
INSERT INTO pets (name, owner_id)
VALUES ('Gilligan', 1);

INSERT INTO pets (name, owner_id)
VALUES ('Buddy', 99); -- owner_id is not in the users table
-- error: foreign key constraint fails
```

> We can't have a foreign key point to an item in the user table that does not exist. Unless we already have 99 users, there would be no user with an ID of 99.

what should happen if a **user gets deleted**. If a pet needs an owner, and that owner gets deleted from our database, what should happen to the pet?

```sql
DELETE FROM users WHERE id = 1;
```

> results in an error: foreign key constraint fails. `Key (id)=(1) is still referenced from table "pets".`

### ON DELETE CASCADE

To tell the database to delete a pet every time its owner is deleted, we can create our table like this:

```sql
CREATE TABLE pets (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  owner_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
);
```

## Quick Reference

- Primary key column:
  - Use the name `id` and then `SERIAL PRIMARY KEY`.
- Foreign key columns:
  - Add `_id` to the singular name of the column you are referencing.
  - If the primary key is `SERIAL`, then the foreign key should be `INTEGER`.
  - You also should create the foreign key with `REFERENCES table_name(id) ON DELETE CASCADE`.
- Names, emails, usernames and passwords can all be stored as `VARCHAR(255)`. Students to cohorts would be `cohort_id`. The type would be `INTEGER` .
- Dates would use the `DATE` type. If we needed [date and time](https://www.postgresql.org/docs/current/static/datatype-datetime.html), use `TIMESTAMP`.
- Numbers:
  - We will use `INTEGER` to represent most [numbers](https://www.postgresql.org/docs/current/datatype-numeric.html). There are other sizes of integers as well.
  - **SMALLINT** -32,768 to 32,767 (thirty-two thousand)
  - **INTEGER** -2,147,483,648 to 2,147,483,647 (two billion)
  - **BIGINT** -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807 (nine quintillion)
  - **SERIAL** 1 to 2,147,483,647 (auto incrementing)
- Dates, Phone Numbers & Currency
  - Become familiar with the [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date formatting standard.
    - The string '2018-02-12' uses this format to represent 'February 12th, 2018'.
    - Year, month and then day.
    - Dates should be stored consistently. Apply timezones and formatting when displayed to the user.
  - Store phone numbers as `VARCHAR`, there are so many possible formats.
    - The number `214 748 3647` hits our INTEGER limit.
  - Store currency as an integer representing cents.
    - Use a `BIGINT` if you need values over $21 million dollars.

## `INSERT` Data

[SQL INERT query](https://www.tutorialspoint.com/sql/sql-insert-query.htm)

```sql
INSERT INTO TABLE_NAME (column1, column2, column3,...columnN)
VALUES (value1, value2, value3,...valueN);

INSERT INTO users (name, birth_year)
VALUES ('Hana Ito', 1990);

INSERT INTO users (name, birth_year)
VALUES ('Gilly Poo', 2016);

-- can do multiple rows at once
INSERT INTO pets (name, owner_id)
VALUES
  ('Gilligan', 4),
  ('Buddy', 4);
```

## `DELETE`

[SQL - DELETE Query](https://www.tutorialspoint.com/sql/sql-delete-query.htm)

> **Warning**: Always include a `WHERE` clause when **deleting**.

```sql
DELETE FROM table_name
WHERE [condition];
```

## `UPDATE`

[SQL - UPDATE Query](https://www.tutorialspoint.com/sql/sql-update-query.htm)

- `UPDATE` Query is used to **modify** the existing records in a table.
- use the `WHERE` clause with the `UPDATE` query to update the selected rows, otherwise **all the rows would be affected**.

```sql
UPDATE table_name
SET column1 = value1
WHERE [condition];

-- Let's say that a student has changed their name part way through the program. We could update more than one column at a time for the user with an id of 3.

UPDATE students
SET name='Callisto Caiazzo', email='ccaiazzo@gmail.com', github='callcazz'
WHERE id = 3;

UPDATE pets
SET owner_id = 5
WHERE id = 2;
```

### Useful Links

- ["SQL is demon spawn"](https://youtu.be/Hh6CbrDr0Lk)
- [node-postgres](https://node-postgres.com/)
- [Postgres Numeric Data Types](https://www.postgresql.org/docs/11/datatype-numeric.html)
- [Little Bobby Tables](https://xkcd.com/327/)
- [SQL Injection](https://en.wikipedia.org/wiki/SQL_injection)
