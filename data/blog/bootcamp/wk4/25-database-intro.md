---
title: Relational Databases Introduction - SQL
date: '2022-07-23'
tags: ['SQL', 'database']
images: ['/static/images/postImages/sunder-muthukumaran-n7eJHQwefeI-unsplash.jpg']
draft: true
summary: intro to SQL and common queries
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

## More Complex Queries with AND/OR

Se [Khan Academy](https://www.khanacademy.org/computing/computer-programming/sql/more-advanced-sql-queries/pt/more-complex-queries-with-andor).

When you create a table, you can set to primary key to `AUTOINCREMENT`. This means that the primary key will be automatically incremented when a new row is inserted.

```sql
CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT);
```

| id  | name |
| --- | ---- |
| 1   | Bob  |
| 2   | Jim  |
| 3   | Jim  |

> This way, the id will be automatically incremented.

### AND

- allows you to combine two or more conditions together.
- takes precedence over `OR` if they are in the same condition.

```sql
SELECT * FROM exercise_logs WHERE calories > 50 AND minutes < 30;
```

### OR

- returns rows that meet ANY of the conditions.
- allows you to

```sql
SELECT * FROM exercise_logs WHERE calories > 50 OR heart_rate < 100;
```

##### AND / OR examples

```sql
CREATE TABLE songs (
    id INTEGER PRIMARY KEY,
    title TEXT,
    artist TEXT,
    mood TEXT,
    duration INTEGER,
    released INTEGER);

INSERT INTO songs (title, artist, mood, duration, released) VALUES ("Bohemian Rhapsody", "Queen", "epic", 60, 1975);
INSERT INTO songs (title, artist, mood, duration, released) VALUES ("Let it go", "Idina Menzel", "epic", 227, 2013);
INSERT INTO songs (title, artist, mood, duration, released) VALUES ("I will survive", "Gloria Gaynor", "epic", 198, 1978);
INSERT INTO songs (title, artist, mood, duration, released) VALUES ("Twist and Shout", "The Beatles", "happy", 152, 1963);
INSERT INTO songs (title, artist, mood, duration, released) VALUES ("La Bamba", "Ritchie Valens", "happy", 166, 1958);
INSERT INTO songs (title, artist, mood, duration, released) VALUES ("I will always love you", "Whitney Houston", "epic", 273, 1992);
INSERT INTO songs (title, artist, mood, duration, released) VALUES ("Sweet Caroline", "Neil Diamond", "happy", 201, 1969);
INSERT INTO songs (title, artist, mood, duration, released) VALUES ("Call me maybe", "Carly Rae Jepsen", "happy", 193, 2011);

    -- select all titles
SELECT title from songs;

-- Add another SELECT that uses OR to show the titles of the songs that have an 'epic' mood or a release date after 1990.
select title from songs where mood = 'epic' or released > 1990;

-- Add another SELECT that uses AND to show the titles of songs that are 'epic', and released after 1990, and less than 4 minutes long.
select title from songs where mood = 'epic' and released > 1990 and duration < 4;
```

### Querying `IN`

- You could use the multiple `OR` queries to filter a certain condition. However, theres a better way to do this.

Use the `IN` operator to filter a certain condition.

```sql
-- using OR to filter a condition
SELECT * FROM exercise_logs WHERE type = "biking" OR type = "hiking" OR type = "tree climbing" OR type = "rowing";

-- using IN to filter a condition
SELECT * FROM exercise_logs WHERE type IN ("biking", "hiking");
```

> Both result in the same thing, however the `IN` operator is easier to read.

You can do the inverse of the `IN` operator by using `NOT IN`.

```sql
SELECT * FROM exercise_logs WHERE type NOT IN ("biking", "hiking")
```

You cas use the `IN` operator directly with another `SELECT` query.

```sql
SELECT * FROM exercise_logs WHERE type IN (
    SELECT type FROM drs_favorites);       -- this is known as a subquery
```

> the subquery will always pull data from the `drs_favorites` table. Therefore, if the `drs_favorites` table changes, the query will still work.

### LIKE Operator

If we use `WHERE` to filter a table, we are only selecting rows that **exactly match** the condition.

```sql
SELECT * FROM exercise_logs WHERE type IN (
    SELECT type FROM drs_favorites WHERE reason = "Increases cardiovascular health");
```

We can get an **inexact** match by using the `LIKE` operator.

```sql
SELECT * FROM exercise_logs WHERE type IN (
    SELECT type FROM drs_favorites WHERE reason LIKE "%cardiovascular%");
```

###### Examples

```sql
CREATE TABLE artists (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    country TEXT,
    genre TEXT);

INSERT INTO artists (name, country, genre)
    VALUES ("Taylor Swift", "US", "Pop");
INSERT INTO artists (name, country, genre)
    VALUES ("Led Zeppelin", "US", "Hard rock");
INSERT INTO artists (name, country, genre)
    VALUES ("ABBA", "Sweden", "Disco");
INSERT INTO artists (name, country, genre)
    VALUES ("Queen", "UK", "Rock");
INSERT INTO artists (name, country, genre)
    VALUES ("Celine Dion", "Canada", "Pop");
INSERT INTO artists (name, country, genre)
    VALUES ("Meatloaf", "US", "Hard rock");
INSERT INTO artists (name, country, genre)
    VALUES ("Garth Brooks", "US", "Country");
INSERT INTO artists (name, country, genre)
    VALUES ("Shania Twain", "Canada", "Country");
INSERT INTO artists (name, country, genre)
    VALUES ("Rihanna", "US", "Pop");
INSERT INTO artists (name, country, genre)
    VALUES ("Guns N' Roses", "US", "Hard rock");
INSERT INTO artists (name, country, genre)
    VALUES ("Gloria Estefan", "US", "Pop");
INSERT INTO artists (name, country, genre)
    VALUES ("Bob Marley", "Jamaica", "Reggae");

CREATE TABLE songs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    artist TEXT,
    title TEXT);

INSERT INTO songs (artist, title)
    VALUES ("Taylor Swift", "Shake it off");
INSERT INTO songs (artist, title)
    VALUES ("Rihanna", "Stay");
INSERT INTO songs (artist, title)
    VALUES ("Celine Dion", "My heart will go on");
INSERT INTO songs (artist, title)
    VALUES ("Celine Dion", "A new day has come");
INSERT INTO songs (artist, title)
    VALUES ("Shania Twain", "Party for two");
INSERT INTO songs (artist, title)
    VALUES ("Gloria Estefan", "Conga");
INSERT INTO songs (artist, title)
    VALUES ("Led Zeppelin", "Stairway to heaven");
INSERT INTO songs (artist, title)
    VALUES ("ABBA", "Mamma mia");
INSERT INTO songs (artist, title)
    VALUES ("Queen", "Bicycle Race");
INSERT INTO songs (artist, title)
    VALUES ("Queen", "Bohemian Rhapsody");
INSERT INTO songs (artist, title)
    VALUES ("Guns N' Roses", "Don't cry");


-- select the title of all the songs by the artist named 'Queen'.
select title from songs where artist = "Queen";

-- Now you'll make a 'Pop' playlist. In preparation, select the name of all of the artists from the 'Pop' genre.
-- (Tip: Make sure you type it 'Pop', SQL considers that different from 'pop'.)
select name from artists where genre = "Pop";

-- To finish creating the 'Pop' playlist, add another query that will select the title of all the songs from the 'Pop' artists. It should use IN on a nested subquery that's based on your previous query.

select title from songs where artist in (select name from artists where genre = "Pop");
```

## Restricting grouped results with `HAVING`

Khan Academy [here](https://www.khanacademy.org/computing/computer-programming/sql/more-advanced-sql-queries/pt/restricting-grouped-results-with-having).

Lets say we want to see how many calories we burn for a given activity.

w3schools having [here](https://www.w3schools.com/sql/sql_having.asp).

```sql
CREATE TABLE exercise_logs
    (id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT,
    minutes INTEGER,
    calories INTEGER,
    heart_rate INTEGER);

INSERT INTO exercise_logs(type, minutes, calories, heart_rate) VALUES ("biking", 30, 115, 110);
INSERT INTO exercise_logs(type, minutes, calories, heart_rate) VALUES ("biking", 10, 45, 105);
INSERT INTO exercise_logs(type, minutes, calories, heart_rate) VALUES ("dancing", 15, 200, 120);
INSERT INTO exercise_logs(type, minutes, calories, heart_rate) VALUES ("dancing", 15, 165, 120);
INSERT INTO exercise_logs(type, minutes, calories, heart_rate) VALUES ("tree climbing", 30, 70, 90);
INSERT INTO exercise_logs(type, minutes, calories, heart_rate) VALUES ("tree climbing", 25, 72, 80);
INSERT INTO exercise_logs(type, minutes, calories, heart_rate) VALUES ("rowing", 30, 70, 90);
INSERT INTO exercise_logs(type, minutes, calories, heart_rate) VALUES ("hiking", 60, 80, 85);

SELECT * FROM exercise_logs;

SELECT type, SUM(calories) FROM exercise_logs GROUP BY type;
```

| type          | SUM(calories) |
| ------------- | ------------- |
| biking        | 165           |
| dancing       | 345           |
| tree climbing | 72            |
| rowing        | 70            |
| hiking        | 80            |

> we can change the `SUM(calories)` to something more meaningful by using the `AS` keyword.

```sql
SELECT type, SUM(calories) AS total_calories FROM exercise_logs GROUP BY type;
```

| type          | total_calories |
| ------------- | -------------- |
| biking        | 165            |
| dancing       | 345            |
| tree climbing | 72             |
| rowing        | 70             |
| hiking        | 80             |

We can also use the `HAVING` keyword to restrict the results. When we use `HAVING` we are applying the condition to the grouped results, not the individual rows.

For example, what if we wanted to list all the exercises that burned more than 150 calories?

```sql
SELECT type, SUM(calories) AS total_calories FROM exercise_logs
    GROUP BY type
    HAVING total_calories > 150
    ;
```

> If we used `WHERE`, we would not get the same result. We would not look at the grouped results (sum(calories)) but rather the individual rows.

| type    | total_calories |
| ------- | -------------- |
| biking  | 160            |
| dancing | 365            |

Another example:

```sql
SELECT type, AVG(calories) AS avg_calories FROM exercise_logs
    GROUP BY type
    HAVING avg_calories > 70
    ;
```

| type          | avg_calories |
| ------------- | ------------ |
| biking        | 80           |
| dancing       | 182.5        |
| hiking        | 80           |
| tree climbing | 71           |

What if wanted to see all the exercise where we logged that activity more than twice?

```sql
SELECT type FROM exercise_logs GROUP BY type HAVING COUNT(*) >= 2
```

### Examples using HAVING

```sql
CREATE TABLE books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    author TEXT,
    title TEXT,
    words INTEGER);

INSERT INTO books (author, title, words)
    VALUES ("J.K. Rowling", "Harry Potter and the Philosopher's Stone", 79944);
INSERT INTO books (author, title, words)
    VALUES ("J.K. Rowling", "Harry Potter and the Chamber of Secrets", 85141);
INSERT INTO books (author, title, words)
    VALUES ("J.K. Rowling", "Harry Potter and the Prisoner of Azkaban", 107253);
INSERT INTO books (author, title, words)
    VALUES ("J.K. Rowling", "Harry Potter and the Goblet of Fire", 190637);
INSERT INTO books (author, title, words)
    VALUES ("J.K. Rowling", "Harry Potter and the Order of the Phoenix", 257045);
INSERT INTO books (author, title, words)
    VALUES ("J.K. Rowling", "Harry Potter and the Half-Blood Prince", 168923);
INSERT INTO books (author, title, words)
    VALUES ("J.K. Rowling", "Harry Potter and the Deathly Hallows", 197651);

INSERT INTO books (author, title, words)
    VALUES ("Stephenie Meyer", "Twilight", 118501);
INSERT INTO books (author, title, words)
    VALUES ("Stephenie Meyer", "New Moon", 132807);
INSERT INTO books (author, title, words)
    VALUES ("Stephenie Meyer", "Eclipse", 147930);
INSERT INTO books (author, title, words)
    VALUES ("Stephenie Meyer", "Breaking Dawn", 192196);

INSERT INTO books (author, title, words)
    VALUES ("J.R.R. Tolkien", "The Hobbit", 95022);
INSERT INTO books (author, title, words)
    VALUES ("J.R.R. Tolkien", "Fellowship of the Ring", 177227);
INSERT INTO books (author, title, words)
    VALUES ("J.R.R. Tolkien", "Two Towers", 143436);
INSERT INTO books (author, title, words)
    VALUES ("J.R.R. Tolkien", "Return of the King", 134462);

 -- We've created a database of a few popular authors and their books, with word counts for each book.

 -- In this first step, select all the authors who have written more than 1 million words, using GROUP BY and HAVING. Your results table should include the 'author' and their total word count as a 'total_words' column
select author, sum(words) as 'total_words' from books group by author having sum(words) > 1000000;

-- Now select all the authors that write more than an average of 150,000 words per book. Your results table should include the 'author' and average words as an 'avg_words' column.
select author, AVG(words) as avg_words
from 'books'
group by author
having avg_words > 150000;

```

## Calculating results with CASE

You can use most math operators in your queries, but there are a few special cases where you need to use a `CASE` statement.

How would you determine if `heart_rate` was between `50-90%` of `max_heart_rate`?

```sql
SELECT COUNT(*) FROM exercise_logs WHERE
    heart_rate >= ROUND(0.50 * (220-30))
    AND  heart_rate <= ROUND(0.90 * (220-30));
```

But what about the other logs of the HR data? How would we create a summary of data with various HR zones?

This is where the `CASE` statement comes in.

```sql
/* CASE */
SELECT type, heart_rate,
   CASE
       WHEN heart_rate > 220-30 THEN "above max"
       WHEN heart_rate > ROUND(0.90 * (220-30)) THEN "above target"
       WHEN heart_rate > ROUND(0.50 * (220-30)) THEN "within target"
       ELSE "below target"
   END as "hr_zone"
FROM exercise_logs;
```

| type          | heart_rate | hr_zone       |
| ------------- | ---------- | ------------- |
| biking        | 110        | within target |
| biking        | 105        | within target |
| dancing       | 120        | within target |
| dancing       | 120        | within target |
| tree_climbing | 90         | below target  |
| tree_climbing | 80         | below target  |
| rowing        | 90         | below target  |
| hiking        | 85         | below target  |

Can also use the `CASE` statement to create a summary of the data.

```sql
SELECT COUNT(*),
    CASE
        WHEN heart_rate > 220-30 THEN "above max"
        WHEN heart_rate > ROUND(0.90 * (220-30)) THEN "above target"
        WHEN heart_rate > ROUND(0.50 * (220-30)) THEN "within target"
        ELSE "below target"
    END as "hr_zone"
FROM exercise_logs
GROUP BY hr_zone;
```

| COUNT(\*) | hr_zone       |
| --------- | ------------- |
| 4         | below target  |
| 4         | within target |

#### Exmaples:

```sql
CREATE TABLE student_grades (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    number_grade INTEGER,
    fraction_completed REAL);

INSERT INTO student_grades (name, number_grade, fraction_completed)
    VALUES ("Winston", 90, 0.805);
INSERT INTO student_grades (name, number_grade, fraction_completed)
    VALUES ("Winnefer", 95, 0.901);
INSERT INTO student_grades (name, number_grade, fraction_completed)
    VALUES ("Winsteen", 85, 0.906);
INSERT INTO student_grades (name, number_grade, fraction_completed)
    VALUES ("Wincifer", 66, 0.7054);
INSERT INTO student_grades (name, number_grade, fraction_completed)
    VALUES ("Winster", 76, 0.5013);
INSERT INTO student_grades (name, number_grade, fraction_completed)
    VALUES ("Winstonia", 82, 0.9045);

select name,
number_grade,
round(fraction_completed*100, 0) as percent_completed
from student_grades;
```

| name      | number_grade | percent_completed |
| --------- | ------------ | ----------------- |
| Winston   | 90           | 81                |
| Winnefer  | 95           | 90                |
| Winsteen  | 85           | 91                |
| Wincifer  | 66           | 71                |
| Winster   | 76           | 50                |
| Winstonia | 82           | 90                |

```sql
-- The goal is a table that shows how many students have earned which letter_grade. You can output the letter_grade by using CASE with the number_grade column, outputting 'A' for grades > 90, 'B' for grades > 80, 'C' for grades > 70, and 'F' otherwise. Then you can use COUNT with GROUP BY to show the number of students with each of those grades.

select count(*),
    case
        when number_grade > 90 then "A"
        when number_grade > 80 then "B"
        when number_grade > 70 then "C"
        else "F"
    end as "letter_grade"
from student_grades
group by "letter_grade";
```
