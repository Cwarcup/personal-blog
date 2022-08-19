---
title: Intro to Ruby
date: '2022-08-19'
tags: ['Ruby']
images: 'https://res.cloudinary.com/practicaldev/image/fetch/s--CnvKphAJ--/c_imagga_scale,f_auto,fl_progressive,h_500,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/i/i5dm7hap45ice8wwigi7.png'
draft: false
summary: Ruby waws created by Yukihiro Matsumoto (Matz) in 1995. It is a dynamic, open source programming language with a focus on simplicity and productivity. It has an elegant syntax that is natural to read and easy to write.
---

- Is built as a back end only language
- Rails is a framework that is built on top of Ruby
  - came out in 2005 and took over the web development world until 2015 when React came out
- Is a purely synchronous language
  - everything happens in order
  - no async/await
  - if you have a long running process, it will block the rest of the code from running

## Comments and Printing to Standard Out

```rb
# single line comment

=begin
multi-line
comment
=end
```

## Printing to Standard Out

- `puts` is most commonly used.

  - similar to `console.log` in JS

- `p` also returns the type of the object

```rb
# print something to the console
print "something" # no new line
puts "something else" # new line
p "also works" # returns the value printed

arr = [1, 2, 3]
p arr # [1, 2, 3]
```

## Variables

- no variable declaration process
  - no `let`, `const`, `var`
- variables are assigned using the `=` operator

- can declare a **constant** value by using a capital letter
  - `FIRST_NAME = "John"`
    - can overwrite the value of a constant, but will get a warning

```rb
# variables don't need to be declared (no const or let)
# and they don't need semicolons
name = 'Alice'

# Ruby is dynamically typed
name = 7
name = true

# nil is equivalent to JS null
# there is no undefined or null in Ruby
name = nil

# Constants in Ruby are capitalized
Name = 'Alice'
# Hungarian notation!
NAME = 'Alice'
```

## Casting Values

`==` and `===` are the same in ruby

```rb
# we don't have == to just check value regardless of type
puts 2 == '2' # false

# === works the same as == for the most part
puts 2 === '2' # false

# casting values
num = "4"
puts num.to_i # 4
other_num = 5
puts other_num.to_s # "5"
```

To find out the type of a variable, use `.class`

```rb
puts 2.class # Integer
```

## String Concatenation

```rb
# string concatenation
puts first_name + " " + last_name
# string interpolation
puts "#{first_name} #{last_name}"
# interpolation only works with double quotes
puts '#{first_name} #{last_name}'
```

## Conditionals

- `()` are optional
- `unless` is the opposite of `if`
  - similar to `if !== "something"`
  - could be written as `unless something == "something"`
- all commands in ruby are single words
  - `elsif` is `else if`

```rb
# if..else and comparison
# > < >= <= == !=
if (num > 2)
  puts "larger than two"
else
  puts "must be smaller"
end

# we also have else if, not spelt right though
if (first_name == "John" && last_name == "Stamos")
  puts "great name"
elsif (first_name == "Ada" || last_name == "Lovelace")
  puts "also good"
else
  puts "name could be improved"
end

# unless inverts the condition
unless (first_name == "John")
  puts "choose a better name"
else
  puts "you chose well"
end

# single line if statement
hour = 7
puts "good evening" if hour > 5 # outputs string

# also works with unless
sunny = false
puts "wear rain jacket" unless sunny # outputs string

# ternary
num = 7
puts num < 10 ? "single digits" : "multiple digits"

sunny = false
puts sunny == true ? "wear sunglasses" : "wear rain jacket"

```

## Loops

```rb
# loop
i = 0
loop do
  i += 1
  puts i

  # exit the loop
  break if i > 5 # prints 1 through 6
end

# while
i = 0
while i < 5 do # prints 1 through 5
  i += 1
  puts i
end

# until
i = 0
until i > 5 do # prints 1 through 6
  i += 1
  puts i
end

# for..in === for..of ¯\_(ツ)_/¯
names = ['Alice', 'Bob', 'Carol', 'Dean']
for name in names do
  puts "Hello #{name}!"
end

# each === forEach
names.each do |name|
  puts "Goodbye #{name}!"
end

# select === filter
list = [1, 2, 3, 4, 5]
list.select do |num|
  num >= 3
end

# ranges
(5..10).each do |num|
  puts num # prints 5 through 10
end

# times
10.times { puts "hello world" }
```

- whatever you want to accept as input/argument, we accept it between the `| |`'s

```rb
dogs = ["Fido", "Spot", "Rex"]

dogs.each do |dog|
	puts "Hello #{dog}"
end
```

## Methods

- Ruby uses implicit return, returning the last line of code in the method if there is no explicit return
- Methods are not first-class citizens in Ruby as they are in JS (eg. we cannot pass them around as callbacks)
- Special methods end in `?` or `!`
  - `?` methods return a boolean value
  - `!` methods perform some kind of mutation

```rb
# writing our own methods
def say_hello name # starts with a definition
  puts "hello #{name}, nice to meet you"
end

# invoke with or without parens
say_hello "Bob"
say_hello("Bob")

# calling a method with too many/too few arguments will result in an error
say_hello("Bob", "Hoskins")

# methods in ruby have implicit return
def full_name(first_name, last_name)
  first_name + " " + last_name
end
puts full_name('Ada', 'Lovelace') # "Ada Lovelace"

# arguments are passed by value
def change_it(val)
  val = 5
end
num = 10
puts num # 10
change_it(num)
puts num # 10
```

## Hashes

- Hashes are collections of key/value pairs in Ruby (similar to objects in JS)

You can NOT `user.username` in Ruby, you must use `user[:username]`

```rb
# hash creation
user = {
  "username" => "johns",
  "password" => "1234",
  "logged_in" => false
}
puts user
# access properties with square brackets
puts user["logged_in"] # false

# symbols are often used as keys for hashes
user = {
  :username => "adal",
  :password => "5678",
  :logged_in => true
}
puts user[:logged_in] # true

# and even better short-hand
user = {
  username: "bobh",
  password: "password",
  logged_in: true
}
puts user[:username] # "bobh"

# what about dynamic keys?
my_key = 'username'
user[my_key] # nil
# convert the string to a symbol
user[my_key.to_sym] # 'bobh'
```

- a symbol is much more efficient than a string
  - create this by adding a `:` before the string

## Blocks

- Blocks define a chuck of code to be executed
- They can be defined with `do..end` or `{}`

```rb
dogs = ["Odie", "Lassie", "Dioji"]

dogs.each do |dog|
  # inside a block
  puts dog
end

dogs.each { |dog|
  # also inside a block
  puts dog
}
```

`Proc.new` is a way to create a block. It is a way to create a block that can be passed around as an argument.

```rb
dogs = ["Odie", "Lassie", "Dioji"]

my_proc = Proc.new do | dog |
	puts dog
end

dogs.each &my_proc

# or

users = ["Ada", "Bob", "Carol"]

users.each &my_proc
```

## Lambdas

- Lambdas are blocks stored in memory
- This functionality is similar to how callbacks work in JS
- Is a special type of proc that cares about how many args get passed to it.

```rb
# lambda creation
do_thing = lambda { |dog| puts dog } # lambda keyword
say_something = -> { puts "I'm giving up on you" } # lambda literal

# use & to convert a lambda to a block
dogs.each &do_thing

# defining a method that takes a lambda
def my_method(&block)
  block.call # .call to invoke the block
end

# invoke the method and pass the stored lambda
my_method &say_something # w/o parens
my_method(&say_something) # w/ parens
```

## Classes

- You declare a class in Ruby with the `class` keyword.
  - make sure you add the `end` keyword at the end of the class

```rb
class Car
end
```

## initialize

- `initialize` is a special method in classes that is called when a class object is created with .new
- `initialize` methods are used to set the initial state of an object.

```rb
class Car
 def initialize (color, year, model)
   @color = color
   @year = year
   @model = model
 end
end

my_car = Car.new("red", 2007, "matrix")
```

## Accessor && Readers

- You can set **default** read and write methods for instance variables with accessor and readers.

```rb
class Car
 attr_accessor :color # creates a getter and setter for color
 attr_reader :year # creates a getter for year
 attr_writer :model # creates a setter for model
 def initialize (color, year, model)
   @color = color
   @year = year
   @model = model
 end
end
```

Same as

```rb
class Car
 def initialize (color, year, model)
   @color = color
   @year = year
   @model = model
 end

 def color
   @color
 end

 def color=(value)
   @color = value
 end

 def year
   @year
 end

 def model=(value)
   @model = value
 end
end
```

## Blocks and Yield

- Good stack overflow answer: [blocks and yields in ruby](http://stackoverflow.com/questions/3066703/blocks-and-yields-in-ruby)

- Blocks are actually very similar to methods.
- Blocks are a way to pass a chunk of code to a method.

```rb
def print_result
  result_from_block = yield
  puts result_from_block
end

# This will print out the number 9 to the console
print_result { 3 * 3 }
```

```rb
# Check this out: blocks have access to variables outside of their definition
shopping_list = [:milk, :eggs, :cheese]

print_result do
  # select one at random
  important_item = shopping_list.sample
  "I hope I don't forget #{important_item}!"
end
```

### Blocks === Callbacks?

- By now you likely appreciate that passing in a block into a Ruby method is **much like passing a callback function** into a JavaScript function. The syntax is different of course but the pattern is quite similar.

> Ruby also has `Procs` and `Lambdas` which are even more like callbacks than blocks are. They are more powerful but less commonly used/needed.
