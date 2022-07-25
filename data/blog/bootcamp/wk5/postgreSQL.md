---
title: PostgreSQL
date: '2022-07-25'
tags: ['SQL', 'Postgres']
images: ['/static/images/postImages/atwena-goodman-PB4dNSELi_E-unsplash.jpg']
draft: true
summary:
---

A few weeks ago, we were making an app called "TinyApp", which let a user register and add new urls to their account. This worked great!!! But it had one big problem... When you shut downed the app, we lose ALL of our DATA!!!. That means the users that registered, and the new urls entered are gone gone gone!!

**How do we prevent this this from happening?**

- We can just never ever ever turn off the server ( and make sure it never crashes ) - which maybe impossible ( power surges do happen )

**Or we can use a database**

- A database is a structured set of data held in a computer, especially one that is accessible in various ways.
- You may say: "Well lets just store all the data into a JSON file and be done with it" but that also poses issues such as:
  - when do we re-read data from the file (efficiency)
  - when do we write to a file
  - How do we make sure data stays consistent ( multi editing or multi relations )

## SQL Intro

### RDBMS (Relational Database Management System) and SQL (Structured Query Language)

- Databases are a service (or another program) that we will be using to store our data
- We will be using PostgreSQL but there are others as well.
- Postgres is an SQL type of database which means we can:
  - access multiple records with a single command
  - store and organize our data in tables
  - join our data based on some sort of relationship

### Demo of SQL

1. Open a terminal
1. Clone the project
1. Login to your SQL server $ psql
1. Create a database to load the seed into # CREATE DATABASE w5d1;
1. Exit psql # \q
1. Load the seed SQL into the database $ psql -d w5d1 < seed.sql

### Logging into SQL - `psql`

```zsh
> psql
```

> `psql` is the command to login to SQL

- `psql` allows us to interact with the database from our terminal.

```zsh
psql
\c database_name -- to connect to db
\i
```

> You can also log into psql, then use the `-i` flag to navigate to the file you want to execute.

To leave the psql command-line shell we can simply type `\q`.

#### on Mac

Start PostgreSQL

```zsh
brew services start postgresql
```

Stop PostgreSQL

```zsh
brew services stop postgresql
```

If there is an error about trying to connect to a database named after your user, we can solve that problem by creating one with the following command: `createdb yourusername`.

## Creating a table

```sql
CREATE TABLE famous_people (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  birthdate DATE
);
```

Test data:

```sql
INSERT INTO famous_people (first_name, last_name, birthdate)
  VALUES ('Abraham', 'Lincoln', '1809-02-12');
INSERT INTO famous_people (first_name, last_name, birthdate)
  VALUES ('Mahatma', 'Gandhi', '1869-10-02');
INSERT INTO famous_people (first_name, last_name, birthdate)
  VALUES ('Paul', 'Rudd', '1969-04-06');
INSERT INTO famous_people (first_name, last_name, birthdate)
  VALUES ('Paul', 'Giamatti', '1967-06-06');
```

## Basic `SELECT`

- Select all columns for all rows in the famous_people table.

```sql
SELECT * FROM famous_people;
```

- Only return people with a birthday on or after `'1920-01-01'`.

```sql
SELECT * FROM famous_people WHERE birthdate >= '1920-01-01';
```

- Only return people with the first name 'Paul'.

```sql
SELECT * FROM famous_people WHERE first_name = 'Paul';
```

- Select the total number of people in the famous_people table.

```sql
SELECT count(*) FROM famous_people;
```
