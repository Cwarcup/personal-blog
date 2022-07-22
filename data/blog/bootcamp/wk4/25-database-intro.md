---
title: Relational Databases Introduction
date: '2022-07-23'
tags: ['Relational Databases']
images: ['/static/images/postImages/algorithms-in-programming.jpg']
draft: true
summary: introduction to time complexity of algorithms.
---

Databases are a way to store data in a computer. A database is make up of tables and rows. Imagine a spreadsheet like on Google Sheets.

## Rationale for Relational Databases

- Information should be group by categories.
- When making a table, the name should be **plural**
  - For example, if you are making a table to store a bunch of information about your users, call it `users`.

## Primary and Foreign Keys

### Primary Key (PK)

- Is the most **important** part of a table.
- Represents the **first key** for any row in a table.
- It is a **unique** identifier for a row.

**Students**

| student_id | (PK) name           | email            |
| ---------- | ------------------- | ---------------- |
| 0001       | Jimbo Bojangles     | jboboj@gmail.com |
| 0002       | Bobbert Wiggins     | bowigg@gmail.com |
| 0003       | Cassandra Camembert | cassca@gmail.com |

> Here our primary key is `student_id`.

We can use the primary key in other tables to reference the primary key in the table we are currently in.

**Projects**

| type | student (FK) | first_partner (FK) | second_partner (FK) | url                                | accepted |
| ---- | ------------ | ------------------ | ------------------- | ---------------------------------- | -------- |
| map  | 0001         | 0002               | 0003                | https://github.com/jimbobo/mm      | True     |
| map  | 0002         | 0001               | 0003                | https://github.com/bigbobbert/mm   | True     |
| map  | 0003         | 0001               | 0002                | https://github.com/casslycassie/mm | True     |

> Notice, our `student_id` is being used in a different table!

Outside of their home table, they’re no longer called primary keys. Instead, since they’re on foreign ground, they’re called **foreign keys (FK)**.

### Foreign Key (FK)

- Foreign Keys (FKs) are the values that we use to **trace our routes between tables**.

## Entity-Relationship Diagrams

To better understand how the tables in a relational database are connected to each other, we can use an ERD, or Entity Relationship Diagram. This is a kind of diagram that shows each table as a box. It links those boxes together indicating what kind of relationship they have with each other, such as one-to-many or one-to-one.

- Entity
  - will become a table in the database.
- Attribute
  - will become a column in the table.
  - describe data of an individual entity.
- Primary Keys / Identifiers
  - used to identify an entity.
  - must be unique.
  - makes it so that no two rows can have the same value.
- Relationship
  - describes how two entities are related to each other.
- Cardinality
  - represents how many entities are related to each other.
  - minimum tells us the fewest number of entities that can be related to each other.
  - opposite for maximum.
  - often represented with crows-feet notation.

cows-feet notation:
![crows-feet](https://www.testingdocs.com/wp-content/uploads/Cardinality-Symbols-Database.png)

## SQL

```sql
-- creating a table
CREATE TABLE books (id INTEGER PRIMARY KEY, name TEXT, rating INTEGER);

-- inserting into a row
INSERT INTO books VALUES (1, 'book 1', 5);
INSERT INTO books VALUES (2, 'book 2', 7);
INSERT INTO books VALUES (3, 'book 13', 10);

-- retrieving a row
-- SELECT rowName FROM tableName
SELECT * FROM books;
```

- Will return all rows in the table.
- Often not in an order you want
- Can change the order of the rows with `ORDER BY`

```sql
CREATE TABLE groceries (id INTEGER PRIMARY KEY, name TEXT, quantity INTEGER, aisle INTEGER);

INSERT INTO groceries VALUES (1, "Bananas", 4, 7);
INSERT INTO groceries VALUES(2, "Peanut Butter", 1, 2);
INSERT INTO groceries VALUES(3, "Dark Chocolate Bars", 2, 2);
INSERT INTO groceries VALUES(4, "Ice cream", 1, 12);
INSERT INTO groceries VALUES(5, "Cherries", 6, 2);
INSERT INTO groceries VALUES(6, "Chocolate syrup", 1, 4);

SELECT * FROM groceries WHERE aisle > 5 ORDER BY aisle;
```

### SELECT

```sql
SELECT name, population -- only select the name and population columns
  FROM world -- select from the world table
 WHERE population BETWEEN 1000000 AND 1250000
 -- only select rows with population betweeen 1000000 and 1250000
```

```sql
SELECT name FROM world
 WHERE name LIKE '%a' OR name LIKE '%l'
```

> `%a` means select all rows that end in `a`

Code that shows the population density of China, Australia, Nigeria and France:

```sql
SELECT name, population/area
  FROM world
 WHERE name IN ('China', 'Nigeria', 'France', 'Australia')
```

Gives the name of countries **beginning** with U:

```sql
SELECT name
  FROM world
 WHERE name LIKE 'U%'
```

Code which shows just the population of United Kingdom:

```sql
SELECT population
  FROM world
 WHERE name = 'United Kingdom'
```
