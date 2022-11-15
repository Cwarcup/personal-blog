---
title: 'PostgreSQL: Introduction'
date: '2022-11-15'
tags: ['postgresql', 'psql']
images: '/static/images/individualBlogPostImages/learning-go.jpg'
draft: true
summary: 'PostgreSQL is a powerful, open source object-relational database system. It has more than 15 years of active development and a proven architecture that has earned it a strong reputation for reliability, data integrity, and correctness.'
---

<TOCInline toc={props.toc} toHeading={3} indentDepth={3} />

# Introduction

I wasn't feeling great about my SQL skills, so I decided to dig a bit deeper into PostgreSQL. This post is a summary of what I learned and will be a good reference for me in the future.

## Database Design Process

There are a few steps to designing a database:

- What kind of _things_ are we storing?
- What _properties_ do those things have?
- What _type_ of data is each property?

For example, if we had a city database, we might have a table called `cities` with the following columns:

| Steps                   | Example                   |              |
| ----------------------- | ------------------------- | ------------ |
| _things_ we are storing | cities                    | table name   |
| _properties_            | name, population, country | column names |
| _type_ of data          | string, integer, string   | column types |

## Basic SQL Commands

### CREATE TABLE

Used to create a new table.

```sql
CREATE TABLE table_name (
  column_name1 data_type,
  column_name2 data_type,
  column_name3 data_type
);

-- CREATE TABLE cities (
--   name VARCHAR(50),
--   country VARCHAR(50),
--   population VARCHAR(50),
--   area INTEGER
--   );
```

`CREATE TABLE` is known as a **keyword**, and `cities` is known as an **identifier**. Identifiers are case-insensitive, so `cities` and `CITIES` are the same.

### INSERT INTO TABLE

Used to insert data into a table.

```sql
INSERT INTO table_name (column1, column2, column3)
VALUES (value1, value2, value3);

-- INSERT INTO cities (name, country, population, area)
-- VALUES ('New York', 'USA', '8,623,000', 302.6);
```

We must specify the columns we want to insert data into, and the order of the values must match the order of the columns. **Order matters!**

We can also insert multiple rows at once:

```sql
INSERT INTO table_name (column1, column2, column3)
VALUES (value1, value2, value3),
       (value1, value2, value3),
       (value1, value2, value3);
```

### SELECT FROM TABLE

Used to select data from a table.

We can use the `*` wildcard to select all columns:

```sql
SELECT * FROM table_name;
```

We can also select specific columns:

```sql
SELECT column1, column2 FROM table_name;
```

### Calculated Columns

Sometime we need to transform or calculate data when we select it. We can do this with **calculated columns**.

```sql
SELECT column1, column2, column3 * 2 FROM table_name;
```

Example, if we wanted to calculate the population density of each city, we could do this:

```sql
SELECT name, population / area AS density FROM cities;

-- name       | density
-- -----------+---------
-- New York   | 28
-- Los Angeles|  8
-- Chicago    | 11
-- Houston    |  1
```

### String Operations and Functions

| Operator      | Description   |
| ------------- | ------------- |
| `\|\|`        | Concatenation |
| `LOWER()`     | Lowercase     |
| `UPPER()`     | Uppercase     |
| `LENGTH()`    | Length        |
| `SUBSTRING()` | Substring     |

You can do something like this to join two columns together:

```sql
select name || ', ' || country as location FROM cities;
-- or
select concat(name, ', ', country) as location  FROM cities;
```

### Filtering with WHERE

Sometimes we need to filter some data.

```sql
select name, area FROM cities WHERE area > 100;
```

```sql
select
    name,
    manufacturer
from
    phones
where
    name = "Apple" OR name = "Samsung";
```

Can also be written like this:

```sql
select
    name,
    manufacturer
from
    phones
where
    name in ("Apple", "Samsung");
```

#### Calculations with WHERE

```sql
select
    name,
    population / area as density
from
    cities
where
    population / area > 100;
```

### Updating Rows

#### UPDATE

```sql
UPDATE
  table_name
SET
  column1 = value1,
  column2 = value2
WHERE
  condition;
```

We use the `SET` keyword to specify the columns we want to update, and the `WHERE` keyword to specify the rows we want to update.

In a real example, we might want to update the population of a city:

```sql
UPDATE
  cities
SET
  population = 8623000
WHERE
  name = 'New York';
```

#### DELETE

```sql
DELETE FROM table_name WHERE condition;
```

In a real example, we might want to delete a city:

```sql
DELETE FROM cities WHERE name = 'New York';
```

Keep in mind that a columns may have a duplicate value.

## Database Design

For this example we are going to create a database for a photo-sharing app. We have a few tables:

- `users`
- `photos`
- `comments`
- `likes`

How do we know what tables should we make?

- Do a Google search "like system schema".
- Think about what type of resources exists in your app. Create a separate table for each resource.
- Determine the relationships between the resources.

### One-to-Many Relationships

Think of a `user` and a `photo`. A user can have many photos, but a photo can only have one user.

A photo has _one_ user. A user has _many_ photos. You should be able to read this sentence in both directions.

A comment has _one_ user. A user has _many_ comments. A comment has _one_ photo. A photo has _many_ comments.

### One-to-One Relationships

Think of a `user` and a `profile`. A user can have one profile, and a profile can only have one user.

A profile has _one_ user. A user has _one_ profile.

Examples:

- A boat has one captain.
- A car has one driver.
- A company has one CEO.
- A country has one president.
- A person has one driver's license.

### Many-to-Many Relationships

Examples:

- A student has many classes. A class has many students.
- A task has many engineers. An engineer has many tasks.
- A movie has many actors. An actor has many movies.

## Primary Keys and Foreign Keys

We use these to establish relationships between tables. We use the `id` column to identify a row. Every table we create will have a **primary key**.

A primary key is a column that uniquely identifies a row in a table. We use the `id` column to identify a row. Every table we create will have a **primary key**.

A foreign key is a column that references a primary key in another table.

---

Take our `comments`, `photos` and `user`. We know that a `user` has many `photos` and a `photo` has many `comments`. We also know that a `comment` has one `user` and one `photo`.

For the `comments` table, we need to add a `user_id` column and a `photo_id` column. These are foreign keys. They reference the primary keys in the `users` and `photos` tables.

```sql
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    photo_id INTEGER REFERENCES photos(id),
    text TEXT
);
```

If we have a _one-to-many_ relationship, the foreign key will be in the _many_ table.

### Creating a Primary Key

Use the `SERIAL` data type. This is a special data type that automatically generates a unique number for each row. We also need to add `PRIMARY KEY` to the end of the column definition.

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT,
    email TEXT
);
```

### Creating a Foreign Key

We use the `REFERENCES` keyword to create a foreign key. We need to specify the table name and the column name.

```sql
CREATE TABLE photos (
    id SERIAL PRIMARY KEY,
    url TEXT,
    user_id INTEGER REFERENCES users(id),
);
```

We use the `REFERENCES` and add the **table** name and the **column** name.

### ON DELETE options

When we delete a row from a table, we can specify what happens to the rows in other tables that reference it.

- `ON DELETE CASCADE` - Delete the rows in the other table that reference it.
- `ON DELETE SET NULL` - Set the foreign key column to `NULL`.
- `ON DELETE RESTRICT` - Don't allow the row to be deleted.

```sql
CREATE TABLE photos (
    id SERIAL PRIMARY KEY,
    url TEXT,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);
```

> We need to specify the `ON DELETE` option when we create the table.

## Queries with Joins and Aggregates

| **Joins**                                                                  |
| -------------------------------------------------------------------------- |
| Produces values by **merging** together rows from different related tables |
| Use a `JOIN` keyword                                                       |
| Used most often when selecting data from multiple tables                   |

| **Aggregates**                                                               |
| ---------------------------------------------------------------------------- |
| Looks at many rows and produces a single value                               |
| Words like "most", "average", "least" are signs you need to use an aggregate |

Example: Here is the schema for a photo-sharing app.

```sql
CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  username VARCHAR(50)
);

CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
  url VARCHAR(200),
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  contents VARCHAR(240),
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  photo_id INTEGER REFERENCES photos(id) ON DELETE CASCADE
);
```

### JOIN

```sql
select
  contents,
  username,
  comments.id as comment_id
from
  comments
  join users on users.id = comments.user_id;
```

- Table order beteween `FROM` and `JOIN` _sometimes_ makes a difference.
- We must give context if column names collide.
  - Sometimes we have columns with the same name in different tables.
  - When this occurs, we need to specify the table name before the column name.
  - `comments.id as comment_id`
  - We can rename the column using `AS`.

## GROUP BY
