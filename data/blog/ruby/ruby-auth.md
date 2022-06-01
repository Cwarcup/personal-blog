---
title: Sample .md file
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
