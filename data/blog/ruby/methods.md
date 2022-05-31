---
title: Methods in Ruby
date: '2022-05-31'
tags: ['ruby', 'methods']
draft: true
summary: Introduction to how methods work in Ruby.
---

# Methods in Ruby

Define a method by saying `def`.

```ruby
def my_method
  # do something
end
```

The **last** line of a **method** is the **return** value.

```ruby
def my_method
  # do something
  return "Hello"
end
```

# Branching in Ruby

Refers to if/else conditionals.

```ruby
if condition
  # do something
  else
  # do something else
end
```

Can have multiple conditions with `&&` and `||`:

```ruby
condition = true
another_condition = true

if condition && another_condition
  puts "hello"
else
  puts "goodbye"
end

=> "hello"

```

| Operator | Description | Example |
| -------- | ----------- | ------- |
| `&&`     | Logical AND | a && b  |
| `ll`     | Logical OR  | a ll b  |
| `!`      | Logical NOT | !a      |
| `and`    | Logical AND | a and b |
| `or`     | Logical OR  | a or b  |
| `not`    | Logical NOT | not a   |

## elsif

```ruby
name = 'Curtis'

if name == 'Curtis'
  puts "Welcome, Curtis"
elsif name == 'Bob'
  puts "Welcome, Bob"
else
  puts "Who are you?"
end
```

```rb
puts "Simple calculator"
25.times { print "-" }
puts ""
puts "Enter the first number"
num1 = gets.chomp.to_i
puts "Enter the operator"
op = gets.chomp # + - * /
puts "Enter the second number"
num2 = gets.chomp.to_i
operation = "#{num1} #{op} #{num2}"

if op == "+"
  puts "you have chosen to add"
  puts eval(operation)
elsif op == "-"
  puts "you have chosen to subtract"
  puts eval(operation)
elsif op == "*"
  puts "you ahve chosen to multiply"
  puts eval(operation)
elsif op == "/"
  puts "you have chosen to divide"
  puts eval(operation)
else
  puts "I dont know what you chose."
  puts eval(operation)
end
```

## case

```ruby
case name
when 'Curtis'
  puts "Welcome, Curtis"
when 'Bob'
  puts "Welcome, Bob"
else
  puts "Who are you?"
end
```
