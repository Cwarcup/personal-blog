---
title: Introduction to strings and numbers in Ruby
date: '2022-05-31'
tags: ['ruby', 'strings']
draft: false
summary: Introduction to how strings work in Ruby. Includes examples of string interpolation, concatenation, methods and getting user input.
---

# Strings in Ruby

Use double or single quotes to define strings.

- single quotes: wont be able to do string interpolation.

```rb
first_name = 'Curtis '
last_name = 'W'

puts first_name + last_name
# => Curtis W
```

## String interpolation

- `#{}` is used to interpolate a string.
- only works when you use double quotes `" "`.

```rb
puts "Hello #{first_name}#{last_name}"
# => Hello Curtis W

puts 'Hello #{first_name}#{last_name}'
# => Hello #{first_name}#{last_name} NOT what we wanted.
```

## String methods

How do you determine if something is a string? We use the `.class` method.

```rb
puts 'Hello'.class
# => String

first_name = 'Curtis '
last_name = 'W'

full_name = "#{first_name} #{last_name}"
puts full_name.length
# => 9

p full_name.empty?
# => false
```

How do you replace a word in a string?

- use the `gsub` [method](https://ruby-doc.org/core-2.5.3/String.html#method-i-gsub).

```rb
sentence = "Welcome to the jungle"

puts sentence.gsub('jungle', 'forest')
# => Welcome to the forest

```

### Useful string methods

- `.upcase`: converts a string to **uppercase**.
- `.chars`: returns an **array** of characters.

```rb
p 'Hello'.chars
# => ["H", "e", "l", "l", "o"]
```

- `.reverse`: **reverses** a string.
- `.length` or `.size`: returns the **length** of a string.
- `.count`: returns the **number** of times a character appears in a string.

```rb
p 'Hello'.count('l')
# => 2
```

- `.include?`: returns **true** if a string includes a character.

```rb
"hEllo wOrlD".include?("w")
# => true
"hEllo wOrlD".include?("1")
# => false
```

- `.split`: splits a string into an **array** of substrings.

```rb
p "1,2,3,4,5".split(',')
# => ["1", "2", "3", "4", "5"]
```

## Variable Assignment

- `=` is used to assign a value to a variable.

Take a look at the following example:

```rb
name = "Curtis"
new_name = name
name = "Oh no! CHANGED!"

puts new_name # => "Curtis"
puts name # => "Oh no! CHANGED!"
```

> The variable `new_name` is assigned the value of `name`. It passes this value in memory. Therefore, when we reassign `name`, it will NOT change the value of `new_name`.

## Escaping characters

- `\` is used to escape characters.

```rb
puts 'Curtis said 'Hello, world!'' # => will throw an error. We have quotes inside quotes. We need to escape them.

puts 'Curtis said \'Hello, world!\'' # => Curtis said 'Hello, world!'
```

- `\n` is used to create a new line.
- `\t` is used to represent a tab.
- `\b` is used to represent a backspace.
- `\s` is used to represent a space.

# Getting input from users

How do we get input from users? We primarily use the `gets` or `gets.chomp` methods.

- `gets.chomp`: gets input from the user. Returns a **string**.

```rb
puts "What is your fist name?"
name = gets.chomp
puts "Hello #{name}, nice to meet you!"

# => What is your fist name?
# => Curtis
# => Hello Curtis, nice to meet you!
```

Another example:

```rb
puts "Enter a number to multiply by 2"
number = gets.chomp.to_i # converts the input to an integer.
puts "Your number multiplied by 2 is #{number * 2}"
# => Your number multiplied by 2 is 10

#######
puts "What is your first name?"
first = gets.chomp

puts "what is your last name?"
last = gets.chomp

def full_name_length(first, last)
  puts "name is #{first.length + last.length} characters long"
end

full_name_length(first, last)
# => name is 8 characters long
```

# Numbers in Ruby

Can enter a repl by typing `irb` in the terminal.

```ruby
> 1 + 1
=> 2

> 10 / 4
=> 2

# However, we are missing the decimal. To fix this, we can use the `.to_f` method.
> 10.to_f / 4
=> 2.5

# Or could add the decimal to the number.
> 10.0 / 4
=> 2.5
```

`.to_f` is a method that converts a number to a float.

Doing the same thing with **variables**:

```rb
x = 5
y = 10
puts y / x
=> 2
```

Can have a string multiplied by a number:

```rb
puts "I am a line"
puts "-" * 10
puts "I am below the line"

=>
# I am a line
# ----------
# I am below the line
```

> Creates a line of dashes.

Can do something very similar with the `.times` method.

```rb
5.times { puts "hi" }

=>  hi
    hi
    hi
    hi
    hi

3.times { puts rand(10)} # Random number between 0 and 9.
 => 3
    5
    7
```

## Convert string to integer

If the string can be converted to a number, we can use the `.to_i` method.

```rb
puts "5".to_i
=> 5
```

If you convert a string that **cannot** be converted to a number, it will return `0`.

Example calculation:

```rb
puts "Simple calculator"
25.times { print "-" }
puts
puts "Enter the first number"
num1 = gets.chomp.to_i
puts "Enter the second number"
num2 = gets.chomp.to_i
puts "The first number multiplied by the second number is #{num1 * num2}"

=>
# Simple calculator
# -------------------------
# Enter the first number
# 5
# Enter the second number
# 10
# The first number multiplied by the second number is 50
```

Can use any operator:

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
puts eval(operation).to_s
```
