---
title: Methods, Arrays and Hashes in Ruby
date: '2022-06-01'
tags: ['ruby', 'methods', 'arrays', 'Hashes']
draft: false
summary: Introduction to creating methods and some common array/hash methods.
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

# Arrays in Ruby

Can easily create an array with a given **range**.

```rb
p range = (1..10) #=> 1..10
p range.to_a # => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
p range.class # => Range

range = (1..10).to_a
range.reverse!
p range # => [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
```

Can also create ranges for letters:

```rb
letters = ("a".."z").to_a
p letters
# => ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

p letters.shuffle
#  => ["s", "k", "r", "w", "h", "c", "p", "l", "z", "a", "v", "n", "u", "j", "e", "i", "o", "y", "b", "q", "t", "d", "m", "g", "x", "f"]
```

## Adding elements to an array

### Add to the end of an array

Uses the **<<** operator.

```rb
letters = ["a", "b", "c"]
letters << "d" # => ["a", "b", "c", "d"]
```

### Add to the beginning of an array

Uses the **unshift** operator.

```rb
letters = ["a", "b", "c"]
letters.unshift("d") # => ["d", "a", "b", "c"]
```

### Add to the middle of an array

Uses the **insert** operator.

`insert(index, obj)`

```rb
letters = ["a", "b", "c"]
letters.insert(1, "d") # => ["a", "d", "b", "c"]
```

## Getting the last element of an array

Uses the **`.last`** method:

```rb
p letters.last # => "d"
```

## Getting the first element of an array

```rb
p letters.first # => "a"
```

## Getting the middle element of an array

Use the index.

```rb
p letters[1] # => "b"
```

## get unique elements of an array

Uses the **`.uniq`** method:

```rb
letters = ["a", "b", "c"]
letters << "d"
letters.unshift("x")
letters.unshift("x")
p letters # ["x", "x", "a", "b", "c", "d"]
p letters.uniq # ["x", "a", "b", "c", "d"]
```

## .split

Can be used on a long string to split it into an array of words.

```rb
letters = "a-b-c-d-e"
p letters.split("-") # => ["a", "b", "c", "d", "e"]
```

## %w()

A notation to write an array of strings separated by spaces instead of commas and without quotes around them.

```rb
p %w(a b c d e) # => ["a", "b", "c", "d", "e"]

p %w[ a b c d e] # => ["a", "b", "c", "d", "e"]
```

## Iterating Over an Array

### .each

Commonly use the **`.each`** method:

```rb
letters = ["a", "b", "c"]
letters.each do |item|
  puts item
end

# => a
# => b
# => c
```

Ruby likes to put a block of code in curly braces and do this in one line.
This is called a **block**.

```rb
%w(banana orange apple).each { |word| puts word + " is yummy" }
# => banana is yummy
# => orange is yummy
# => apple is yummy

# can also add methods to the block. Here we use the **.capitalize** method.
%w(banana orange apple).each { |word| puts word.capitalize + " is yummy" }
# => Banana is yummy
# => Orange is yummy
# => Apple is yummy
```

### .select

Works on booleans. Returns an array of elements that are true.

For example, create an array with only odd numbers from 1 to 100:

```rb
arr = (1..100).to_a.shuffle
p arr.select { |num| num.odd? }
# => [35, 71, 81, 83, 49, 91, 77, 89, 21, 37, 25, 87, 1, 93, 85, 95, 97, 55, 43, 57, 59, 19, 29, 11, 39, 99, 51, 41, 65, 63, 23, 45, 79, 15, 73, 31, 7, 69, 27, 53, 13, 61, 9, 67, 47, 3, 5, 33, 75, 17]
```

## Common methods when working with stacks and queues

Common methods include **`.push`** and **`.pop`**.

`.push` adds an element to the end of an array.
`.pop` removes the last element of an array and return that element.

```rb
letters = ["a", "b", "c"]
last = letters.pop
p last # => "c"
p letters # => ["a", "b"]
```

# Hashes / Dictionaries in Ruby

Take for form like so:

```rb
sample_hash = {
  "key" => "value",
  "key2" => "value2"
}

my_details = {
  "name" => "Curtis",
  "age" => "25",
  "hobbies" => ["coding", "badminton", "keyboards"]
}
```

## Accessing a value associated with a key

It's very common to have a **key** that is a **string** and a **value** that is an **array**.

```rb
sample_hash["key"] # => "value"

my_details["name"] # => "Curtis"
my_details["hobbies"] # => ["coding", "badminton", "keyboards"]
my_details['hobbies'][1] # => "badminton"
```

However, **Rails** takes a different approach to this. In Rails, the key is a **symbol** and the value is an **object**.

Symbols is a **unique identifier** that is used to access the value.

```rb
another_hash = {
  a: 1,
  b: 2,
  c: 3,
  d: ['Curtis', 'Fred', 'Joe']

}

p another_hash # => {:a=>1, :b=>2, :c=>3}
```

> Syntax is slightly different. `a`, `b`, and `c` are **symbols**. They have a `:` before them, indicating they are a symbol.

Accessing items is the same as accessing a value associated with a key.

```rb
another_hash[:a] # => 1
another_hash[:b] # => 2
another_hash[:c] # => 3

another_hash[:d][0] # => "Curtis"
```

## Getting keys and values

Getting keys and values can be done with `keys` and `values` methods.

```rb

another_hash = {
  a: 1,
  b: 2,
  c: 3,
  d: ['Curtis', 'Fred', 'Joe']
}

p another_hash.keys
# => [:a, :b, :c, :d]

p another_hash.values
$ => [1, 2, 3, ["Curtis", "Fred", "Joe"]]

another_hash.each do |key, value|
  puts "the class for key is #{key.class} and value is #{value.class}"
end

# => the class for key is Symbol and value is Integer
# the class for key is Symbol and value is Integer
# the class for key is Symbol and value is Integer
# the class for key is Symbol and value is Array

my_details = {
  "name" => "Curtis",
  "age" => "25",
  "hobbies" => ["coding", "badminton", "keyboards"]
}

my_details.each do |key, value|
  puts "the class for key is #{key.class} and value is #{value.class}"
end
# => the class for key is String and value is String
# the class for key is String and value is String
# the class for key is String and value is Array
```

## Adding an element to a hash

Remember, ordering of a hash is not important.

**Adding** a new element to a hash is done with the `[]=` method.

```rb
another_hash[:e] = "Apple"
p another_hash
# => {:a=>1, :b=>2, :c=>3, :d=>["Curtis", "Fred", "Joe"], :e=>"Apple"}
```

Can use the same method to edit an existing element.

```rb
another_hash[:e] = "Orange"
p another_hash
# => {:a=>1, :b=>2, :c=>3, :d=>["Curtis", "Fred", "Joe"], :e=>"Orange"}

# can iterate through a hash
puts another_hash.select { | k, v | v.is_a?(Numeric) }
# => {:a=>1, :b=>2, :c=>3}
```

## Deleting an element from a hash

Can use the `.delete` method to delete an element from a hash.

```rb
my_details = {
  "name" => "Curtis",
  "age" => "25",
  "hobbies" => ["coding", "badminton", "keyboards"]
}

my_details.each { | k, v | my_details.delete(k) if v.is_a?(String) }
p my_details
# =>
#   {
#   "hobbies" => ["coding", "badminton", "keyboards"]
#   }
```
