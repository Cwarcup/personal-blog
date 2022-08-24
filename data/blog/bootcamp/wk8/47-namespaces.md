---
title: Namespaces in Ruby and Rails
date: '2022-08-24'
tags: ['namespaces', 'Ruby']
images: 'https://blog.carbonfive.com/wp-content/uploads/2021/10/Matt-Brictson-Interview-Ruby-on-Rails.png'
draft: false
summary: 'Namespaces are a way to organize your code in a way that makes it easier to find and understand. In this post, we’ll look at how to use namespaces in Ruby and Rails.'
---

## Namespaces in Ruby

Namespacing is a way to group related things together. In Ruby on Rails, it's a way to group controllers, models, and views together. It's a way to organize your code and make it easier to find things.

Modules server as a namespace.

- allows classes or modules with conflicting names to exist in the same program

We use the `::` operator to access a constant defined in a module.

```ruby
module Perimeter
  class Array
    def initialize
      @size = 400
    end
  end
end

some_arr = Perimeter::Array.new

p some_arr.class # => Perimeter::Array
```

But what if we don't namespace our `Array` class?

```rb
class Array
	def initialize
		@size = 400
	end
end

our_array = Array.new

p outer_array.class

# => Array
```

> Different from the example above, this is not a good idea. It's better to namespace your classes.

Doing this simply extends the `Array` class _globally_ throughout the program, which is dangerous and of course not our intended behaviour.

The idea of namespaces is import when you're working with libraries. If you're using a library that has a class called `Array`, and you also have a class called `Array`, you'll get a conflict. You can't have two classes with the same name.

Let's say we had two libraries, `Gym` and `Dojo`. We would want to wrap our classes in a module to avoid conflicts.

```rb
module Gym
  class Push
    def up
      40
    end
  end
end
require "gym"

module Dojo
  class Push
    def up
      30
    end
  end
end
require "dojo"

dojo_push = Dojo::Push.new
p dojo_push.up # => 30

gym_push = Gym::Push.new
p gym_push.up # => 40
```

## Constant Lookup

- we used the `::` operator to access a constant defined in a module
- you can scope constants to a module, not just classes

```rb
module Dojo
  A = 4
  module Kata
  	B = 8
    module Roulette
      class ScopeIn
        def push
          15
        end
      end
    end
  end
end

A = 16
B = 23
C = 42

puts "A - #{A}"
 # => A - 16
puts "Dojo::A - #{Dojo::A}"
# => Dojo::A - 4

puts "B - #{B}"
# => B - 23
puts "Dojo::Kata::B - #{Dojo::Kata::B}"
 # => Dojo::Kata::B - 8

puts "C - #{C}"
 # => C - 42
puts "Dojo::Kata::Roulette::ScopeIn.new.push - #{Dojo::Kata::Roulette::ScopeIn.new.push}"
 # => Dojo::Kata::Roulette::ScopeIn.new.push - 15
```

- Constant `A` is scoped within `Dojo` and accessing it via `::` works as expected.
- Same for constant `B` which is nested further inside `Kata`.
- Class `ScopeIn` is nested even deeper inside `Roulette` which has a method returning `15`.

We can nest constant lookup!
We are not limited to **classes**! We also have access to **modules**, and we can nest **constant** lookup.

## Namespacing in Rails

- Rails uses namespaces in **routing**.
- same concept, but is used for HTTP path and **controller naming**

See rails docs for more: https://guides.rubyonrails.org/routing.html#controller-namespaces-and-routing

```rb
namespace :admin do
  resources :articles, :comments
end
```

- You can route to a controller group (like the `admin` namespace) by using the `namespace` method

This will create a number of routes for each of the controllers in the `admin` namespace. It will also create a route helper for each of the controllers.

For the `Admin::ArticlesController`, the routes will be:

| HTTP Verb | Path                     | Controller#Action      | Named Route Helper           |
| --------- | ------------------------ | ---------------------- | ---------------------------- |
| GET       | /admin/articles          | admin/articles#index   | admin_articles_path          |
| GET       | /admin/articles/new      | admin/articles#new     | new_admin_article_path       |
| POST      | /admin/articles          | admin/articles#create  | admin_articles_path          |
| GET       | /admin/articles/:id      | admin/articles#show    | admin_article_path(:id)      |
| GET       | /admin/articles/:id/edit | admin/articles#edit    | edit_admin_article_path(:id) |
| PATCH/PUT | /admin/articles/:id      | admin/articles#update  | admin_article_path(:id)      |
| DELETE    | /admin/articles/:id      | admin/articles#destroy | admin_article_path(:id)      |

If instead you want to route `/articles` (without the prefix /admin) to `Admin::ArticlesController`, you can specify the module with a scope block:

```rb
scope module: 'admin' do
  resources :articles, :comments
end

# or

resources :articles, module: 'admin'
```

If instead you want to route `/admin/articles` to `ArticlesController` (without the `Admin::` module prefix), you can specify the path with a scope block:

```rb
scope '/admin' do
  resources :articles, :comments
end
```

Or for a single route:

```rb
resources :articles, path: '/admin/articles'
```
