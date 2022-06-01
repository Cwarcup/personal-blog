---
title: First Ruby Projects
date: '2022-06-01'
tags: ['ruby', 'projects']
draft: false
summary: First application of Ruby.
---

# Authenticator Application

The program will take an input from a user and compare it to a list of passwords.
If the password is correct, the program will display a message saying so.
If the password is incorrect, the program will display a message saying the credentials are incorrect and ask the user to try again.

If the user attempts to enter the wrong password three times, the program will display a message saying the account is locked and ask the user to contact the administrator.

Uses use a hash to store usernames and passwords. Hash is called `users`. Uses a While loop check the number of times a user has tried to login.

Starting data:

```rb
users = [
  { username: "Curtis", password: "password1"},
  { username: "Fred", password: "password2"},
  { username: "Joe", password: "password3"},
  { username: "Sally", password: "password4"},
  { username: "Bill", password: "password5"}
]
```

Possible solution:

```ruby
users = [
  { username: "Curtis", password: "password1"},
  { username: "Fred", password: "password2"},
  { username: "Joe", password: "password3"},
  { username: "Sally", password: "password4"},
  { username: "Bill", password: "password5"}
]

# method to get user input and assign it to a variable.
def get_input(word)
  print "#{word}:"
  result = gets.chomp
end

# method to search through the users array
def auth_user(username_input, password_input, arr_of_users, attempts)
  arr_of_users.each do |user|
    if (username_input == user[:username] &&  password_input == user[:password])
      return puts "Success! You have logged in as #{username_input}"
    end
  end
  "Wrong username or password. Try again. You have attempted to log in #{attempts} times."
end

puts "Welcome to the authenticator"
25.times { print "-" }
puts
puts "Please enter username and password"

attempts = 1;
while attempts < 4
  username = get_input("username")
  password = get_input("password")

  authentication = auth_user(username, password, users, attempts)
  puts authentication
  puts "Press n to quit or any other key to continue: "
  input = gets.chomp.downcase
  break if input == "n"
  attempts += 1 #increment on each loop
end
puts "You have exceeded the number of attempts." if attempts == 4
```

# Project #2

1. Create a dictionary (hash) with 10 city names, where the city name (key) will be a string, and the area code would be the value.

2. Display the city names to the user for cities which are available in the dictionary

3. Get input from the user on the city name (hint: use gets.chomp method)

4. Display area code based on user's city choice

5. Loop - keep the program running and prompt the user for new city names to lookup

6. Complete the two methods to lookup city names and to find area code based on city names

7. Please post your code to the Q & A/discussions area for the video

```rb
dial_book = {
  "newyork" => "212",
  "newbrunswick" => "732",
  "edison" => "908",
  "plainsboro" => "609",
  "sanfrancisco" => "301",
  "miami" => "305",
  "paloalto" => "650",
  "evanston" => "847",
  "orlando" => "407",
  "lancaster" => "717"
}

# Get city names from the hash
def get_city_names(somehash)
  somehash.keys
end

# Get area code based on given hash and key
def get_area_code(somehash, key)
  somehash[key]
end

get_area_code(dial_book, "newyork")

# Execution flow
loop do
  puts "Do you want to lookup an area code based on a city name?(Y/N)"
  answer = gets.chomp.downcase
  break if answer != "y"
  puts "What city are you looking for?"
  puts get_city_names(dial_book)
  city = gets.chomp.downcase.gsub(/\s+/, "")

  if dial_book.include?(city)
    puts "The area code you are looking for is #{get_area_code(dial_book, city)}"
  else
    puts "You entered an invalid city name"
  end
end
```
