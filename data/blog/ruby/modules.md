---
title: Getting to know classes, modules and mixins
date: '2022-06-02'
tags: ['ruby']
images:
  [
    'https://images.unsplash.com/photo-1522252234503-e356532cafd5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1325&q=80',
  ]
draft: false
summary: Basic understanding of creating modules, requiring modules, and using bcrypt to hash passwords. Also includes a mixin to add a `.create_hash_digest` method to classes.
---

# MD5 - bcrypt

Is a popular hashing algorithm that is used to encrypt passwords.

bcrypt uses the MD5 algorithm to encrypt passwords.

Have to install the bcrypt gem: `gem install bcrypt`

Can use the bcrypt gem to encrypt a password:

```ruby
require 'bcrypt'

my_password = BCrypt::Password.create("my password")
  #=> "$2a$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYTa"

my_password == "my password"     #=> true
my_password == "not my password" #=> false

puts my_password = BCrypt::Password.new("$2a$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYTa")
my_password == "my password"     #=> true
my_password == "not my password" #=> false
```

When you run bcrypt to create a new password, it will return a string that looks like this:

```ruby
"$2a$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYTa"
```

You can run `BCrypt::Password.new($2a$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYTa)` and compare it to your password. This allows you to check if the password is correct while you're not storing the password in plain text.

```rb
require 'bcrypt'

puts my_password = BCrypt::Password.create("passw0rd")
# $2a$12$u0nSmbGfUmhmOawXeBFR4OsJ/8KgN.7mZthTSzbi0ATuTaI4.tlm2

puts my_password == "passw0rd" # true

my_password_new = BCrypt::Password.new("$2a$12$u0nSmbGfUmhmOawXeBFR4OsJ/8KgN.7mZthTSzbi0ATuTaI4.tlm2")

puts my_password_new == "passw0rd" # true
```

> Basic methodology goes like so: Take a string created by `BCrypt::Password.create("passw0rd")` and run it through `BCrypt::Password.new("$2a$12$u0nSmbGfUmhmOawXeBFR4OsJ/8KgN.7mZthTSzbi0ATuTaI4.tlm2")` to see if it matches.

The only way to know if the password is correct is to run the password through the `BCrypt::Password.new` method. You must know the actual **string** that is returned by the `BCrypt::Password.create` method.

Why is the useful? Well, if you're using a database, you can store the encrypted password in the database and then compare the encrypted password to the encrypted password that you get from the database. If they match, then the password is correct.

```rb
require 'bcrypt'

def create_hash_digest(password)
  BCrypt::Password.create(password)
end

new_pass = create_hash_digest('password1')
puts new_pass == "password1" # true
puts new_pass == "password2" # false
```

Can do this on a larger data set to hash user passwords:

```rb
require 'bcrypt'

users = [
  { username: "Curtis", password: "password1"},
  { username: "Fred", password: "password2"},
  { username: "Joe", password: "password3"},
  { username: "Sally", password: "password4"},
  { username: "Bill", password: "password5"}
]

def create_hash_digest(password)
  BCrypt::Password.create(password)
end

def verify_hash_digest(password)
  BCrypt::Password.new(password)
end

def create_secure_users(list_of_users)
  list_of_users.each do |user_record|
    user_record[:password] = create_hash_digest(user_record[:password])
  end
  list_of_users
end

puts create_secure_users(users)
# {:username=>"Curtis", :password=>"$2a$12$GqqHlrRmuFY3HMDSTOJJX.0.r3Qs8hmWYoPk63S3pyObxjrCQjyCy"}
# {:username=>"Fred", :password=>"$2a$12$h5LiyYVH2uMocQ6g9qXKEuAO6T6V0krjTHSoxjlsyYeWxskW16Liu"}
# {:username=>"Joe", :password=>"$2a$12$bL0ycxfEmFHziW8npc5sUOFq1sllKrYEM8p7eh2LTWOykNdpNZADW"}
# {:username=>"Sally", :password=>"$2a$12$ud/5dTopwAFD0L9Ss/H2su97pyI/TmD/8txJD5eJFBdI9NnNhe/vi"}
# {:username=>"Bill", :password=>"$2a$12$yVvzyexTaGsO0IIYvbWE8O6naZDXKs/eKNIVSy65zT1NsYerrpBri"}
```

# Creating a module

Recall that we previously created a `class` called "Student":

```rb
class Student
  attr_accessor :first_name, :last_name, :email, :username, :password # must allow access to instance variables

  @first_name
  @last_name
  @email
  @username
  @password

  def initialize(first_name, last_name, email, username, password)
    @first_name = first_name
    @last_name = last_name
    @email = email
    @username = username
    @password = password
  end

  def to_s
    "first name: #{@first_name}, last name: #{@last_name}, email: #{@email}, username: #{@username}, password: #{@password}"
  end
end
```

How can we incorporate bcrypt into our `Student` class? We can create a module called `BCrypt` and then include it in our `Student` class.

1. First, create a function to test if a password is correct:

```rb
require 'bcrypt'

users = [
  { username: "Curtis", password: "password1"},
  { username: "Fred", password: "password2"},
  { username: "Joe", password: "password3"},
  { username: "Sally", password: "password4"},
  { username: "Bill", password: "password5"}
]

def create_hash_digest(password)
  BCrypt::Password.create(password)
end

def verify_hash_digest(password)
  BCrypt::Password.new(password)
end

def create_secure_users(list_of_users)
  list_of_users.each do |user_record|
    user_record[:password] = create_hash_digest(user_record[:password])
  end
  list_of_users
end

# takes a list of users and returns a list of new_users with the hashed passwords
new_users = create_secure_users(users)
puts new_users

def authenticate_user(username, password, list_of_users)
  list_of_users.each do |user_record|
    # compare username to username passed in AND compare the password passed in
    if user_record[:username] == username && verify_hash_digest(user_record[:password]) == password
      return user_record
    end

  end
  # if not found
  "Credentials were not correct"
end

# run the test to see if hashed passwords match
p authenticate_user("Curtis", "password1", new_users)
# => {:username=>"Curtis", :password=>"$2a$12$GqqHlrRmuFY3HMDSTOJJX.0.r3Qs8hmWYoPk63S3pyObxjrCQjyCy"}

p authenticate_user("Curtis", "incorrect password", new_users)
# => "Credentials were not correct"

```

2. Convert the code above into a **module**.

```rb
module Crud # add module name
  require 'bcrypt'
  puts "Module crud activated"

  def self.create_hash_digest(password) # must add self. to make it a class method
    BCrypt::Password.create(password)
  end

  def self.verify_hash_digest(password)  # must add self. to make it a class method
    BCrypt::Password.new(password)
  end

  def self.create_secure_users(list_of_users)  # must add self. to make it a class method
    list_of_users.each do |user_record|
      user_record[:password] = create_hash_digest(user_record[:password])
    end
    list_of_users
  end

  def self.authenticate_user(username, password, list_of_users)  # must add self. to make it a class method
    list_of_users.each do |user_record|
      # compare username to username passed in AND compare the password passed in
      if user_record[:username] == username && verify_hash_digest(user_record[:password]) == password
        return user_record
      end

    end
    # if not found
    "Credentials were not correct"
  end

end
```

How do you incorporate the module into your `Student` class?

If your module is in the **same directory** as your main ruby file, you can use the keyword `require_relative 'module_name'` to load the module.

```rb
require_relative 'crud'
```

The other option is to use the keyword `require 'module_name'` to load the module.

If the module is in a **different directory** from your main ruby file, you can use the keyword `require 'module_name'` to load the module **but** need to specify the full path to the module. This is known as the **load path**.

```rb
$LOAD_PATH << 'path/to/module'
require 'crud'
```

In my main ruby file, I can use the keyword `require 'crud'` to load the module.

```rb
require_relative 'crud'

users = [
  { username: "Curtis", password: "password1"},
  { username: "Fred", password: "password2"},
  { username: "Joe", password: "password3"},
  { username: "Sally", password: "password4"},
  { username: "Bill", password: "password5"}
]

hashed_users = Crud.create_secure_users(users)
puts hashed_users

# Module crud activated
# {:username=>"Curtis", :password=>"$2a$12$xiJ2eIyyCLg6HQnr2f54EuoVsodv/PAWJFXiNkWyr4e/aYplxiYqS"}
# {:username=>"Fred", :password=>"$2a$12$nbuk6d6NHpwr7qmlGaFoXe58eU.pAePRP31z0ZCNTLlRNCiICYaM2"}
# {:username=>"Joe", :password=>"$2a$12$yNv1LlqsemOcfiNv.CIfQuFzngSbcs2f2h9M4s1586xJrRCAKRcE."}
# {:username=>"Sally", :password=>"$2a$12$qsaTxn6ZKAkmgMlseG8QcOQ5E5pzFxP.0WpSzcTBtGBmGfVKbsqUq"}
# {:username=>"Bill", :password=>"$2a$12$cQqimIrMZQUCF.2yBryIvub6HiDoGG09pqViPBpABWT4RHck8v.pG"}

p Crud.authenticate_user("Curtis", "password1", hashed_users)
# {:username=>"Curtis", :password=>"$2a$12$e5RHUYNtEw5mggF6/etHa.q3ulr8kDvniHc.QNC8FpHQ7/oUlxyE6"}

```

# Creating a module

Recall that we previously created a `class` called "Student":

```rb
class Student
  attr_accessor :first_name, :last_name, :email, :username, :password # must allow access to instance variables

  @first_name
  @last_name
  @email
  @username
  @password

  def initialize(first_name, last_name, email, username, password)
    @first_name = first_name
    @last_name = last_name
    @email = email
    @username = username
    @password = password
  end

  def to_s
    "first name: #{@first_name}, last name: #{@last_name}, email: #{@email}, username: #{@username}, password: #{@password}"
  end
end
```

How can we incorporate bcrypt into our `Student` class? We can create a module called `BCrypt` and then include it in our `Student` class.

1. First, create a function to test if a password is correct:

```rb
require 'bcrypt'

users = [
  { username: "Curtis", password: "password1"},
  { username: "Fred", password: "password2"},
  { username: "Joe", password: "password3"},
  { username: "Sally", password: "password4"},
  { username: "Bill", password: "password5"}
]

def create_hash_digest(password)
  BCrypt::Password.create(password)
end

def verify_hash_digest(password)
  BCrypt::Password.new(password)
end

def create_secure_users(list_of_users)
  list_of_users.each do |user_record|
    user_record[:password] = create_hash_digest(user_record[:password])
  end
  list_of_users
end

# takes a list of users and returns a list of new_users with the hashed passwords
new_users = create_secure_users(users)
puts new_users

def authenticate_user(username, password, list_of_users)
  list_of_users.each do |user_record|
    # compare username to username passed in AND compare the password passed in
    if user_record[:username] == username && verify_hash_digest(user_record[:password]) == password
      return user_record
    end

  end
  # if not found
  "Credentials were not correct"
end

# run the test to see if hashed passwords match
p authenticate_user("Curtis", "password1", new_users)
# => {:username=>"Curtis", :password=>"$2a$12$GqqHlrRmuFY3HMDSTOJJX.0.r3Qs8hmWYoPk63S3pyObxjrCQjyCy"}

p authenticate_user("Curtis", "incorrect password", new_users)
# => "Credentials were not correct"

```

2. Convert the code above into a **module**.

```rb
module Crud # add module name
  require 'bcrypt'
  puts "Module crud activated"

  def self.create_hash_digest(password) # must add self. to make it a class method
    BCrypt::Password.create(password)
  end

  def self.verify_hash_digest(password)  # must add self. to make it a class method
    BCrypt::Password.new(password)
  end

  def self.create_secure_users(list_of_users)  # must add self. to make it a class method
    list_of_users.each do |user_record|
      user_record[:password] = create_hash_digest(user_record[:password])
    end
    list_of_users
  end

  def self.authenticate_user(username, password, list_of_users)  # must add self. to make it a class method
    list_of_users.each do |user_record|
      # compare username to username passed in AND compare the password passed in
      if user_record[:username] == username && verify_hash_digest(user_record[:password]) == password
        return user_record
      end

    end
    # if not found
    "Credentials were not correct"
  end

end
```

# How to include a module in a class

How do you incorporate the module into your `Student` class?

If your module is in the **same directory** as your main ruby file, you can use the keyword `require_relative 'module_name'` to load the module.

```rb
require_relative 'crud'
```

The other option is to use the keyword `require 'module_name'` to load the module.

If the module is in a **different directory** from your main ruby file, you can use the keyword `require 'module_name'` to load the module **but** need to specify the full path to the module. This is known as the **load path**.

```rb
$LOAD_PATH << 'path/to/module'
require 'crud'
```

In my main ruby file, I can use the keyword `require 'crud'` to load the module.

```rb
require_relative 'crud'

users = [
  { username: "Curtis", password: "password1"},
  { username: "Fred", password: "password2"},
  { username: "Joe", password: "password3"},
  { username: "Sally", password: "password4"},
  { username: "Bill", password: "password5"}
]

hashed_users = Crud.create_secure_users(users)
puts hashed_users

# Module crud activated
# {:username=>"Curtis", :password=>"$2a$12$xiJ2eIyyCLg6HQnr2f54EuoVsodv/PAWJFXiNkWyr4e/aYplxiYqS"}
# {:username=>"Fred", :password=>"$2a$12$nbuk6d6NHpwr7qmlGaFoXe58eU.pAePRP31z0ZCNTLlRNCiICYaM2"}
# {:username=>"Joe", :password=>"$2a$12$yNv1LlqsemOcfiNv.CIfQuFzngSbcs2f2h9M4s1586xJrRCAKRcE."}
# {:username=>"Sally", :password=>"$2a$12$qsaTxn6ZKAkmgMlseG8QcOQ5E5pzFxP.0WpSzcTBtGBmGfVKbsqUq"}
# {:username=>"Bill", :password=>"$2a$12$cQqimIrMZQUCF.2yBryIvub6HiDoGG09pqViPBpABWT4RHck8v.pG"}

p Crud.authenticate_user("Curtis", "password1", hashed_users)
# {:username=>"Curtis", :password=>"$2a$12$e5RHUYNtEw5mggF6/etHa.q3ulr8kDvniHc.QNC8FpHQ7/oUlxyE6"}

```

# Creating an instance method in a module

Previously we used the keyword `self` to access class methods.

```rb
module Crud
  def self.create_hash_digest(password)
    BCrypt::Password.create(password)
  end
end
```

However, in order to access this method in another file we needed to call the module name.

```rb
hashed_users = Crud.create_secure_users(users)
```

We will be converting the module into a class. To have a class have access to a module?

Recall, our student class looks like the following:

```rb
class Student
  attr_accessor :first_name, :last_name, :email, :username, :password # must allow access to instance variables

  @first_name
  @last_name
  @email
  @username
  @password

  def initialize(first_name, last_name, email, username, password)
    @first_name = first_name
    @last_name = last_name
    @email = email
    @username = username
    @password = password
  end

  def to_s
    "first name: #{@first_name}, last name: #{@last_name}, email: #{@email}, username: #{@username}, password: #{@password}"
  end
end
```

Need to include the module **inside** our class.

1. inside of the module, remove the `self` keyword, making it a class method.
2. inside the class, add the module name as an argument to the class method.

```rb
class Student
  include Crud
  #...
end
```

We can now call the module method from the class.

```rb
# create the hashed users
curtis = Student.new("Curtis", "W", "Cwarcup", "cwarcup@gmail.com", "passw0rd")
# create the hashed password
hashed_password = curtis.create_hash_digest(curtis.password)

p hashed_password
# => "$2a$12$/vEMmqJQE9mAMAccEoqzVOL5jYaL7Kkl0TLBfxkJ3NrzYWX7iv7fW"
```

We can now mix in our methods from a module into our class. This increases the capacity of what you can do with objects.
