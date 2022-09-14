---
title: Introduction to RSpec and Testing in Ruby
date: '2022-08-27'
images: 'https://techtechmedia.com/wp-content/uploads/2021/02/Brian-4-min.png'
tags: ['Rspec']
draft: false
summary: Some handy tips and tricks for getting started with RSpec and testing in Ruby.
---

RSpec is a testing framework for Ruby. It is the most popular testing framework for Ruby, and is used in conjunction with the Ruby on Rails framework. Let's take a look at how to get started with RSpec.

## Basics of RSpec

Install the RSpec gem:

```bash
gem install rspec
```

- It's convention to put all your tests in a `spec` folder.

## Writing Tests

### `Describe` Blocks

- use `describe` to _describe_ a method or class
  - `describe` tells Rspec what code you're testing
  - you'll see these messages when you run your tests
  - the actual test code goes inside the `describe` block between the `do` and `end`

```rb
# inside spec/example_spec.rb
describe 'some class' do
	# some code
end
```

### `It` Method

- Similar to other testing frameworks, we can use `it` to _describe_ a test
- `it` is a **single** test
- we can have multiple `it` blocks inside a `describe` block
- `it` accepts a `String` as an argument
  - the string should describe what the test is doing (e.g. "returns true when given a positive number")

```rb
require_relative 'boat'

describe Boat do
  it 'should create boats' do
    expect(Boat.new).to be_a Boat
  end
end
```

### Running a test

Run your test with `rspec`:

```bash
 rspec example_spec.rb
```

You should see something like this in your terminal as a result:

```bash
.

Finished in 0.00144 seconds (files took 0.06003 seconds to load)
1 example, 0 failures
```

### `Expect` Method

- `expect` is used to _expect_ a result from a test
- it marks an **assertion** that we expect to be true

```rb
describe Boat do
  it 'should create boats' do
    expect(Boat.new).to be_a Boat
  end

  it 'should have a name' do
    expect(Boat.new.name).to eq 'Boaty McBoatface'
  end
end
```

### `to` Method

- use the `to` method to complete the assertion (e.g. `expect(Boat.new).to be_a Boat`)
- after `to` we can use a **matcher** to check for a specific result

### Matchers

- Matchers are used to check for specific results

Common matchers:

- `eq` - checks for equality
- `be_a` - checks for a specific class
- `be_empty` - checks for an empty array
- `be_truthy` - checks for a truthy value
- `be_falsey` - checks for a falsy value
- `include` - checks if an array includes a specific value

## Test-Driven Development

Let's add some methods on our Boat class and write some tests for them.

We are going to write our **tests** first, then write the code to make the tests pass.

```rb
describe Boat do
  it 'should create boats' do
    expect(Boat.new).to be_a Boat
  end
  describe '#allowed_aboard?' do   # describe block inside a describe block
  end
end
```

It is valid to nest `describe` blocks inside other `describe` blocks. This is useful for grouping tests together.

Notice the `#` before `allowed_aboard?`. This is a convention to indicate that we are testing an **instance method**.

Let's finish the test for the `allowed_aboard?` method:

```rb
describe Boat do
  it 'should create boats' do
    expect(Boat.new).to be_a Boat
  end
  describe '#allowed_aboard?' do
    it 'returns true if inventory includes a life jacket' do
      a_boat = Boat.new
      allowed = a_boat.allowed_aboard?(['life jacket', 'sun glasses'])
      expect(allowed).to be true
    end
  end
end
```

- the `allowed_aboard?` method takes an array of inventory as an argument
- returns `true` if the inventory includes a `life jacket`.
- use the `to` matcher to check if the result is `true`

> If we run this test we will get the following error:

```bash
rspec boat_spec.rb
.F

Failures:

  1) Boat#allowed_aboard? returns true if inventory includes a life jacket
     Failure/Error: allowed = a_boat.allowed_aboard?(['life jacket', 'sun glasses'])

     NoMethodError:
       undefined method `allowed_aboard?' for #<Boat:0x000000010298e420>

             allowed = a_boat.allowed_aboard?(['life jacket', 'sun glasses'])
                             ^^^^^^^^^^^^^^^^
     # ./boat_spec.rb:10:in `block (3 levels) in <top (required)>'

Finished in 0.00158 seconds (files took 0.06525 seconds to load)
2 examples, 1 failure

Failed examples:

rspec ./boat_spec.rb:8 # Boat#allowed_aboard? returns true if inventory includes a life jacket
```

This tells us:

- we have an `undefined method` called `allowed_aboard?` for the `Boat` class

Let's write the code to make this test pass:

```rb
class Boat
  def allowed_aboard?(inventory)
    inventory.include?('life jacket')
  end
end
```

We should also test out the `false` case:

```rb
describe Boat do
  it 'should create boats' do
    expect(Boat.new).to be_a Boat
  end
  describe '#allowed_aboard?' do
    it 'returns true if inventory includes a life jacket' do
      a_boat = Boat.new
      allowed = a_boat.allowed_aboard?(['life jacket', 'sun glasses'])
      expect(allowed).to be true
    end
    it 'returns false if inventory does not include a life jacket' do
      a_boat = Boat.new
      allowed = a_boat.allowed_aboard?(['sun glasses'])
      expect(allowed).to be false
    end
  end
end
```

## Setting up a project for RSpec

```rb
group :development, :test do
  gem 'rspec-rails', '~> 5.1'
  gem 'net-smtp', require: false
  # ...
end
```

- Add the `rspec-rails` gem to your `Gemfile`
- Add the `net-smtp` gem to your `Gemfile`
- if you have a current `/spec` folder, remove it `rm -rf spec`
