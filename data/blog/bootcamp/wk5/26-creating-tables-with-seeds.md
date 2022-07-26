---
title: Create tables and insert data using seeds
date: '2022-07-25'
tags: ['sql', 'Postgres']
images: ['/static/images/postImages/regina-victorica-FH8hDSkq8J4-unsplash.jpg']
draft: false
summary: Simple steps on creating a table and inserting data using seeds.
---

Important commands:

- `CREATE TABLE` - creates a table
- `INSERT INTO` - inserts data into a table
- `\i or \include filename` - Reads input from the file filename and executes it as though it had been typed on the keyboard.
- `\dt` - Displays the table names in the current database.
- `\c` - Connects to a database.

See pqsl docs for more info: [here](https://www.postgresql.org/docs/current/app-psql.html)

## Create Table

Use the `CREATE TABLE` statement to create a table. This should be done in a separate `sql` file.

> new file named `teachers_assistance_requests.sql` within a directory called `migrations`

```sql


-- An assistance_request will have the following attributes:

-- id: A unique identifier
-- assignment_id: The id of the assignment the request was made from
-- student_id: The id of the student making the request
-- teacher_id: The id of the teacher responding to the request
-- created_at: The timestamp when the request was made
-- started_at: The timestamp when the assistance started
-- completed_at: The timestamp when the assistance was completed
-- student_feedback: Feedback about the student given by the teacher
-- teacher_feedback: Feedback about the teacher given by the student

CREATE TABLE assistance_requests (
  id SERIAL PRIMARY KEY NOT NULL,
  student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
  teacher_id INTEGER REFERENCES teachers(id) ON DELETE CASCADE,
  assignment_id INTEGER REFERENCES assignments(id) ON DELETE CASCADE,
  created_at TIMESTAMP,
  started_at TIMESTAMP,
  completed_at TIMESTAMP,
  student_feedback TEXT,
  teacher_feedback TEXT
);
```

## Run the `CREATE TABLE` statement

Within `psql`, type:

```
\i migrations/teachers_assistance_requests.sql
```

Enter `\dt` to see the table while in your `psql` session.

## Insert Data - Seeds

Can download a seed file by using the `wget` command.

```
wget http://bit.ly/2YZTyeN -O seeds/assistance_requests_seeds.sql
```

> This example downloads the content from the URL, and saves it to the file `seeds/assistance_requests_seeds.sql`

Recall, a seed just contains a bunch of data that you want to insert into a table.

```sql
INSERT INTO teachers (id, name, is_active, start_date, end_date) VALUES (1, 'Helmer Rodriguez', true, '2018-02-12T08:00:00.000Z', null);
INSERT INTO teachers (id, name, is_active, start_date, end_date) VALUES (2, 'Rosalyn Raynor', true, '2018-02-12T08:00:00.000Z', null);
INSERT INTO teachers (id, name, is_active, start_date, end_date) VALUES (3, 'Roberto Towne', false, '2018-02-12T08:00:00.000Z', '2018-08-11T07:00:00.000Z');
INSERT INTO teachers (id, name, is_active, start_date, end_date) VALUES (4, 'Waylon Boehm', true, '2018-03-12T07:00:00.000Z', null);
INSERT INTO teachers (id, name, is_active, start_date, end_date) VALUES (5, 'Georgiana Fahey', false, '2018-03-13T07:00:00.000Z', '2018-08-12T07:00:00.000Z');
INSERT INTO teachers (id, name, is_active, start_date, end_date) VALUES (6, 'Cheyanne Powlowski', true, '2018-04-09T07:00:00.000Z', null);
INSERT INTO teachers (id, name, is_active, start_date, end_date) VALUES (7, 'Talon Gottlieb', false, '2018-04-10T07:00:00.000Z', '2018-09-08T07:00:00.000Z');
```

Once you have the seed file, you can run it using the `\i` command.

```
\i seeds/assistance_requests_seeds.sql
```
