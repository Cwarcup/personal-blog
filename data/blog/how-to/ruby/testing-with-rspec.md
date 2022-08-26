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

- use `describe` to _describe_ a method or class

```rb
# inside spec/example_spec.rb
describe 'some method' do
	# some code
end
```

- Similar to other testing frameworks, we can use `it` to _describe_ a test

```rb
describe Hash do
	it 'should do something cool' do
		Hash.new.should == {}
	end
end
```

Run your test with `rspec`:

```bash
 rspec example_spec.rb
```

You should see something like this in your terminal as a result:

```bash
Finished in 0.11021 seconds
1 example, 0 failures
```

## Setting up Tests

- We can use `before` to run some code before each test.
  - Use this to set up **state** before the test runs.

```rb
describe Hash do
  before do
    @hash = Hash.new({:hello => 'world'})
  end

  it "should return a blank instance" do
    Hash.new.should == {}
  end

  it "hash the correct information in a key" do
    @hash[:hello].should == 'world'
  end
end
```

> This code will create the `@hash` variable before each test runs.

When using the `describe` method, we can pass in a string or a class.

- use the `#` symbol to describe a **class** method
- use the `.` symbol to describe an **instance** method.

```rb
describe MyClass do
  describe ".class_method_1" do
  end

  describe "#instance_method_1" do
  end
end
```

### `context` method

We also have access to the `context` method, which is similar to `describe`, but is used to describe a **context**. We can use `context` to describe a **state**. It allows us to group similar tests together.

```rb
describe Hash do
	context "when empty" do
		before do
			@hash = Hash.new
		end

		it "should return a blank instance" do
			Hash.new.should == {}
		end
	end

	context "when not empty" do
		before do
			@hash = Hash.new({:hello => 'world'})
		end

		it "hash the correct information in a key" do
			@hash[:hello].should == 'world'
		end
	end
end
```

## Repetitive Tests

If we have similar tests, that use the same setup, we can use the `let` method to create a variable that can be used in multiple tests.

```rb
describe Burger do
  describe "#apply_ketchup" do
    context "with ketchup" do
      let(:burger) { Burger.new(:ketchup => true) }
      before  { burger.apply_ketchup }

      it "sets the ketchup flag to true" do
        burger.has_ketchup_on_it?.should be_true
      end
    end

    context "without ketchup" do
      let(:burger) { Burger.new(:ketchup => false) }
      before  { burger.apply_ketchup }

      it "sets the ketchup flag to false" do
        burger.has_ketchup_on_it?.should be_false
      end
    end
  end
end
```

---

Beware that it uses the old should syntax instead of the newer expect syntax.
