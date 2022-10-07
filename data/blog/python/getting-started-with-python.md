---
title: Getting Started with Python
date: '2022-10-06'
tags: ['Python', 'Basics']
images: 'https://miro.medium.com/max/1400/1*RJMxLdTHqVBSijKmOO5MAg.jpeg'
draft: true
summary: Basics of Python
---

# Basics of Python

### Math

```python
print(round(2.9))  # 3
print(abs(-2.9))  # absolute value
```

### Variables

```python
iq = 190
user_age = iq / 4

print(user_age, "age")  # 47.5 age
```

### Constants

Are represented by all capital letters

```python
PI = 3.14
```

### Strings

```python
print("Hello World")  # Hello World
print("Hello" + " World")  # Hello World
print("hello" * 3)  # hellohellohello
print("hello"[0])  # h
print("Hello" + str(3))  # Hello3
```

### Escape Sequences

- we use \ to escape a character
- `\n` - new line
- `\t` - tab
- `\\` - backslash
- `\"` - double quote

```python
weather = "It\'s \"kind of\" sunny"
print(weather)  # It's "kind of" sunny
```

### Formatted Strings

We want to be able to display strings with variables in them. We can do this by adding an `f` before the string and then adding curly braces around the variable name.

```python
name = "John"
age = 55
print(f"Hi {name}. You are {age} years old.")  # Hi John. You are 55 years old.

# or

print("Hi {}. You are {} years old.".format(name, age))
```

### String Indexes

String is memory are stored as a sequence of characters. We can access each character by using an index. The first character has an index of 0.

```python
selfish = "me me me"
print(selfish[0])  # m
print(selfish[1])  # e
print(selfish[2])  # space
```

We can also use a range of indexes to get a substring.

```python
selfish = "me me me"
print(selfish[0:2])  # me
print(selfish[0:5])  # me me
print(selfish[0:])  # me me me

numbers = "0123456789"
print(numbers[0:])  # 0123456789
print(numbers[::2])  # 02468 # every second number
print(numbers[:5])  # 01234 # up to firth index
```

You can use negative indexes to start from the end of the string.

```python
numbers = "0123456789"
print(numbers[-1])  # 9
print(numbers[-2])  # 8

## reverse a string
print(numbers[::-1])  # 9876543210
```

This works like so: `string[start:end:step]`

- if there is no start index, it will start at the beginning
- if there is no end index, it will go to the end
- if there is no step, it will go by 1
- if there is no start or end index, it will go by 1 (default behaviour)

### Immutability

Is the concept of not being able to change a string. We can't change a character in a string. We can only create a new string. You can not reassign part of a string.

For example, you can't do this:

```python
greeting = "Hello"
greeting[0] = "J"  # TypeError: 'str' object does not support item assignment
```

You can only do this:

```python
greeting = "Hello"
greeting = "J" + greeting[1:]
print(greeting)  # Jello
```

### Built-in Functions and Methods

List of built in functions: https://docs.python.org/3/library/functions.html

For example, `len()` is a built-in function that returns the length of a string.

Tell us how many characters are in a string.

```python
greeting = "Hello"
print(len(greeting))  # 5

numbers = "123456789"
print(len(numbers)) # 9
```

**Methods** have a dot after the variable name. They are functions that are built into the variable type.

List of string methods: https://www.w3schools.com/python/python_ref_string.asp

We can use the `upper()` method to convert a string to uppercase.

```python
quote = 'to be or not to be'
print(quote.upper())
# TO BE OR NOT TO BE
```

Running these methods will **NOT** mutate the original string. They will return a new string. Howerver, we can reassign the variable to the new string.

```python
quote = 'to be or not to be'
print(quote.upper())
# TO BE OR NOT TO BE

print(quote)
# to be or not to be

quote2 = quote.upper()
print(quote2)
# TO BE OR NOT TO BE
```

### Lists

Are similar to arrays in other languages. They are a collection of items.

- They are mutable.
- are denoted by square brackets `[]`
- can access items by using the index

```python
friends = ["Kevin", "Karen", "Jim", "Oscar", "Toby"]
print(friends[0])  # Kevin
print(friends[1])  # Karen
```

### Matrix

A matrix is a 2D list. It is a list of lists.

```python
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

print(matrix[0][1])  # 2
```

We can access the values in the matrix by using the indexes.

### List Methods

List of list methods: https://www.w3schools.com/python/python_ref_list.asp

We can use methods like `reverse()` to reverse a list.

```python
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

matrix.reverse()

new_matrix = matrix

print(new_matrix)
# [[7, 8, 9], [4, 5, 6], [1, 2, 3]]
```
