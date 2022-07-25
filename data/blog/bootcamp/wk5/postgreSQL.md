---
title: PostgreSQL
date: '2022-07-25'
tags: ['SQL', 'Postgres']
images: ['/static/images/postImages/atwena-goodman-PB4dNSELi_E-unsplash.jpg']
draft: false
summary: Intro to PostgreSQL
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
1. Login to your SQL server `$ psql`
1. Create a database to load the seed into `# CREATE DATABASE w5d1;`
1. Exit psql `# \q`
1. Load the seed SQL into the database `$ psql -d w5d1 < seed.sql`

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

## useful terminal commands for SQL

- `\dt` shows the date in a more readable format.
- `\conninfo` shows the connection info.

## WHERE cause with AND

- crafts a condition

```sql
SELECT question, answer FROM objectives WHERE type = 'performance' AND sort < 5;
```

## JOIN

![joins](https://i.pinimg.com/474x/d0/15/17/d01517fe8785f30f953b1a89f92abd9d.jpg)

```sql
SELECT day_description, question
FROM objectives
JOIN days ON objectives.day_id = days.id;
```

- want to be able to combine data from two separate tables.
- sometimes we want to do one query to get all the data we need.
- craft the `SELECT` statement to have the data from both tables.

Types of Join:

- `INNER JOIN` (default)
  - crafts a condition where data is found in both tables.
  - combines every row from both tables in which the condition is true. Through this equality, we can combine the data from both tables.

Syntax:

```sql
JOIN days ON objectives.day_id = days.id;
```

- `objectives` is a table name.
- `day_id` is a column name.

- `days` is a another table name.

Whenever `objectives.day_id` equals `days.id`, we can combine the data from both tables.

## having (... because you cannot use WHERE on an aggregate function)

- allows you to filter the results of a query.
  - it applies to the result of the grouping.
- with a where clause, we are filtering before we produce the results.
-

```sql
SELECT count(day_id)
FROM objectives
GROUP BY day_id
HAVING count(day_id) > 3;
```

## ORDER BY

```sql
SELECT day_description, question
FROM objectives
JOIN days ON objectives.day_id = days.id
ORDER BY day_id;
LIMIT 20
```

## Analysis with SQL

### GROUP BY

```sql
SELECT count(objectives.id), day_description
FROM objectives
JOIN days ON objectives.day_id = days.id
GROUP BY day_id;
```

## Data Manipulation with SQL

- INSERT
- UPDATE
- DELETE
- SELECT

## pg_dump

- can take a lot of the arguments
- `U database name -p PORT ` : to connect to db
- is a way of creating a backup of a database.

You can use `pg_dump` to create a backup of a database.

```zsh
pg_dump -U postgres -p 5432 -d w5d1 > w5d1.sql
```

`w5d1.sql` is the name of the file that will be created.

Can send this new file to someone else to restore the database. But if the table already exists you will get an error. So you need to drop the table first.

Can use `--clean` to drop the table before creating it and `--if-exists` to avoid the error.

```zsh
pg_dump -U postgres -p 5432 -d w5d1 --clean --if-exists > w5d1.sql
```

## Download seeds

- create a new folder in your project to hold the seed data.
- use the `wget` command to download the seed data.

````zsh
wget https://bit.ly/2Z0fN4t -O seeds/students.sql


Syntax:
```zsh
wget({url: url, dest: destination_folder_or_filename}, callback);
````

---

## Going ahead for projects

Each query will be written in it's own `.sql` file.

Before starting a new exercise, create a new directory that all of the query files can be stored in.

Because each query will be inside its own file, we can write all of the `SQL` code in our text editor.

We will then execute the query against our database using `\i filename.sql` from within our `psql` session.

1. Create a new directory in your project to hold the query files.
2. Create a new `.sql` file for each query.
3. In your `.sql` file, write the query.
4. Execute the query using `\i filename.sql` from within your `psql` session.
   1. Execute `psql` from, the `BootcampX` directory.
   2. Make sure you're using the `bootcampx` database `\c bootcampx`
   3. Run command `\i 0_selects/1_students_without_github.sql` to create the table

## Examples

```sql
CREATE TABLE cohorts (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  start_date DATE,
  end_date DATE
);

CREATE TABLE students (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(32),
  github VARCHAR(255),
  start_date DATE,
  end_date DATE,
  cohort_id INTEGER REFERENCES cohorts(id) ON DELETE CASCADE
);
```

> Starting tables

- Get all of the students that don't have an email or phone number.

```sql
SELECT name, id, cohort_id
FROM students
WHERE phone IS NULL
OR phone IS NULL
```

- Non Gmail Students and no phone number

```sql
SELECT name, email, id, cohort_id
FROM students
WHERE email NOT LIKE '%@gmail.com'
AND phone IS NULL
```

## Adding Tables to the Database

The next entities that we will be adding are `assignments` and a`ssignment_submissions`.

An `assignment` will have the following attributes:

- `id`: A unique identifier
- `name`: The name of the assignment
- `content`: The written content body of the assignment
- `day`: The day that the assignment appears on
- `chapter`: The order that the assignment will appear in the day.
- `duration`: The average time it takes a student to finish

An `assignment_submission` will have the following attributes:

- `id`: A unique identifier
- `assignment_id`: The id of the assignment
- `student_id`: The id of the student
- `duration`: The time it took the student to complete the assignment
- `submission_date`: The date is was submitted

A student will be able to submit an `assignment_submissions` for every single `assignment`. So a student will submit many `assignment_submissions` and an `assignment` will have many `assignment_submissions` associated with it.

![ERD](https://i.imgur.com/bgnDYX8.png)

## Tables

- can use the ERD to create tables for our entities.

```sql
CREATE TABLE assignments (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255),
  content TEXT,
  day INTEGER,
  chapter INTEGER,
  duration INTEGER
);

CREATE TABLE assignment_submissions (
  id SERIAL PRIMARY KEY NOT NULL,
  assignment_id INTEGER REFERENCES assignments(id) ON DELETE CASCADE,
  student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
  duration INTEGER,
  submission_date DATE
);
```

- From `psql`, type `\i migrations/assignments_submissions.sql`
- Now enter `\dt` into your `psql` session to make sure the two tables have been created.

```sql
                 List of relations
 Schema |          Name          | Type  |  Owner
--------+------------------------+-------+---------
 public | assignment_submissions | table | vagrant
 public | assignments            | table | vagrant
 public | cohorts                | table | vagrant
 public | students               | table | vagrant
```

Download the seeds:

```zsh
cd /Users/vagrant/BootcampX

wget http://bit.ly/2N1uWQy -O seeds/assignments_seeds.sql

wget http://bit.ly/33vpmMb -O seeds/assignment_submissions_seeds.sql
```

## Joining Tables

So far, we've only `SELECT`ed data from a single table, but in a real world database, things will rarely be this simple. We will usually need to `SELECT` data from multiple tables at the same time.

```sql
SELECT name, email, cohort_id
FROM students JOIN cohorts;
```

> So we want to select data from the `students` table and the `cohorts` table `JOIN`ed together. If these two tables are `JOIN`ed together, we can **select columns from either table**.

This query is starting to look like it might work, but we're missing one very important piece of information.

**How is the database supposed to JOIN the tables?**

How is the data in the students table related to the data in the cohorts table?

We need to use related columns to join the tables. In our case, we can join the `students.cohort_id` column to the `cohorts.id` column.

```sql
SELECT students.name as student_name, email,
 cohorts.name as cohort_name
FROM students
JOIN cohorts ON students.cohort_id = cohorts.id;
```

+-----------------------------------------------------------+ +-------------+
| students | | cohorts |
+-----------------------------------------------------------+ +-------------+
| name | email | cohort_id | | id | name |
+-----------------+-----------------------------+-----------| +-----+-------+
| Armand Hilll | lera_hahn@dickens.org | 1 | - | 1 | FEB12 |
| Stephanie Wolff | darius.homenick@tod.ca | 1 | - | 1 | FEB12 |
| Magdalena Rau | nedra.parisian@yahoo.com | 2 | - | 2 | MAR12 |
| Sally Bayer | kuhic.opal@wuckert.tv | 2 | - | 2 | MAR12 |
| Okey Jaskolski | mcdermott.jack@yahoo.com | 3 | - | 3 | APR09 |
| Hadley Corkery | adaline_gutkowski@green.org | | +-------------+
| Jeramie Volkman | lucile.lynch@abbie.tv | |
+-----------------------------------------------------------+

> Note: Every `JOIN` **must** also have an `ON`.

The order does not matter here, so we could also write the exact same query like this:

```sql
SELECT ...
FROM students JOIN cohorts ON students.cohort_id = cohorts.id;
```

OR

```sql
SELECT ...
FROM cohorts JOIN students ON students.cohort_id = cohorts.id;
```

## INNER JOIN

- `INNER JOIN` is a join that only returns rows that have matching values in both tables.
- Is the same as `JOIN` but only returns rows that have matching values in both tables.

For example: An `INNER JOIN` will only give us rows where there **is** a match between the two tables. Any students with a `cohort_id` of `NULL` will **not appear** in the results of this kind of join.

Additionally, if the **foreign key** is `NULL`, the row will not be included in the result of an `INNER JOIN`.

## OUTER JOIN

- There are times when we **do** want to include data where there **isn't a match**.
- In these cases, we have to use an `OUTER JOIN`.

```sql
SELECT students.name as student_name,
email,
cohorts.name as cohort_name
FROM students
OUTER JOIN cohorts ON cohorts.id = cohort_id;

-- ERROR:  syntax error at or near "OUTER"
```

> Why do we get an error? That is because there are 3 different types of `OUTER JOIN` and we need to specify which one we want to perform: `LEFT`, `RIGHT`, or `FULL`.

```sql
SELECT students.name as student_name, email, cohorts.name as cohort_name
FROM students LEFT OUTER JOIN cohorts ON cohorts.id = cohort_id;

SELECT students.name as student_name, email, cohorts.name as cohort_name
FROM students RIGHT OUTER JOIN cohorts ON cohorts.id = cohort_id;

SELECT students.name as student_name, email, cohorts.name as cohort_name
FROM students FULL OUTER JOIN cohorts ON cohorts.id = cohort_id;
```

> use `space bar` to advance to the next line.

```sql
1. FROM students LEFT OUTER JOIN cohorts ON cohorts.id = cohort_id;
2. FROM students RIGHT OUTER JOIN cohorts ON cohorts.id = cohort_id;
3. FROM students FULL OUTER JOIN cohorts ON cohorts.id = cohort_id;
```

1. The first query will return **all** `students` because `students` is to the `LEFT` of the word `JOIN`.
1. The second query will return **all** of the `cohorts` because `cohorts` is to the `RIGHT` of the word `JOIN`.
1. The third query will return **all rows from both tables**, even when there is **no match**.

### LEFT and RIGHT JOIN

- can omit the key `OUTER` when using `LEFT` or `RIGHT`

We could also rewrite any `RIGHT JOIN` as a `LEFT JOIN`, just by changing the order of the tables.

So the following two queries would produce identical results:

```sql
1. FROM students LEFT JOIN cohorts ON cohorts.id = cohort_id;
2. FROM cohorts RIGHT JOIN students ON cohorts.id = cohort_id;
```

## A Visual Explanation of SQL Joins

See article [here](https://blog.codinghorror.com/a-visual-explanation-of-sql-joins/) for a more in-depth explanation of SQL joins by Coding Horror.

Summary:

Imagine a table:

```sql
table A        table B
id name       id  name
-- ----       --  ----
1  Pirate     1   Rutabaga
2  Monkey     2   Pirate
3  Ninja      3   Darth Vader
4  Spaghetti  4   Ninja
```

### Inner Join

```sql
SELECT * FROM TableA
INNER JOIN TableB
ON TableA.name = TableB.name


id  name       id   name
-- ----       --   ----
1   Pirate     2    Pirate

3   Ninja      4    Ninja
```

![inner join](https://blog.codinghorror.com/content/images/uploads/2007/10/6a0120a85dcdae970b012877702708970c-pi.png)

- Records must be present in both tables for the join to succeed.

### Full Join

```sql
SELECT * FROM TableA
FULL OUTER JOIN TableB
ON TableA.name = TableB.name


id    name       id    name
--   ----       --    ----
1     Pirate     2     Pirate

2     Monkey     null  null

3     Ninja      4     Ninja

4     Spaghetti  null  null

null  null       1     Rutabaga

null  null       3     Darth Vader
```

![full join](https://blog.codinghorror.com/content/images/uploads/2007/10/6a0120a85dcdae970b012877702725970c-pi.png)

- Records can be present in either table for the join to succeed.\
- If no match is found, the row will be `NULL`.

### Left Join

```sql
SELECT * FROM TableA
LEFT OUTER JOIN TableB
ON TableA.name = TableB.name

id  name       id    name
--  ----       --    ----
1   Pirate     2     Pirate
2   Monkey     null  null
3   Ninja      4     Ninja
4   Spaghetti  null  null
```

![left join](https://blog.codinghorror.com/content/images/uploads/2007/10/6a0120a85dcdae970b01287770273e970c-pi.png)

- Complete set of records from TableA will be returned.
- If there are matching records in TableB, the matching records will be returned.
- If no match is found, the row will be `NULL`.

### Excluding Records from a Join

#### Data set is NOT inside of one table

```sql
SELECT * FROM TableA
LEFT OUTER JOIN TableB
ON TableA.name = TableB.name
WHERE TableB.id IS null


id  name       id     name
--  ----       --     ----
2   Monkey     null   null

4   Spaghetti  null   null
```

![not inside](https://blog.codinghorror.com/content/images/uploads/2007/10/6a0120a85dcdae970b012877702754970c-pi.png)

- Can exclude all overlapping records from one table by using a `WHERE` clause.

#### Exclude any common records from a join

```sql
SELECT * FROM TableA
FULL OUTER JOIN TableB
ON TableA.name = TableB.name
WHERE TableA.id IS null
OR TableB.id IS null


id    name       id    name
--   ----       --    ----
2     Monkey     null  null

4     Spaghetti  null  null

null  null       1     Rutabaga

null  null       3     Darth Vader
```

![not common](https://blog.codinghorror.com/content/images/uploads/2007/10/6a0120a85dcdae970b012877702769970c-pi.png)
