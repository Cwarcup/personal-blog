---
title: Introduction to Ruby on Rails
date: '2022-08-26'
images: 'https://rubyonrails.org/assets/images/opengraph.png'
tags: ['Rails']
draft: false
summary: Some handy tips and tricks for getting started with Ruby on Rails.
---

## Generators

```
rails generate
```

All Rails console utilities have help text. As with most \*nix utilities, you can try adding `--help` or `-h` to the end, for example `bin/rails server --help`.

- will tell you all the things Rails can generate for you.
- converntion is to make the name of the model singular and the name of the table plural.

```bash
rails generate controller Cats
```

- we can now go to `localhost:3000/cats` and see the controller in action (it will generate an error)

## Routes

- can see all the routes for an associated controller by running:

```bash
rake routes | grep cats

#  returns
#  cats GET    /cats(.:format)          cats#index
#       POST   /cats(.:format)          cats#create
#  new_cat GET    /cats/new(.:format)      cats#new
# edit_cat GET    /cats/:id/edit(.:format) cats#edit

```

- this will show us all the routes for the cats controller.

## Controller

- is most similar to the `routes.js` file in Express.
- the methods in here are similar to `app('get', '/cats')` in Express.

```rb
class ProductsController < ApplicationController

	#  javascript example
	# const index = (req, res) => {
		#  templateVars = {};
		# res.render('cats/index', templateVars);
	# }

  def index
    @products = Product.all.order(created_at: :desc)
  end

  def show
    @product = Product.find params[:id]
  end
end
```

Whenever a method is called in a controller, it will look for a corresponding view in the `views` folder.

For example, if we call `index` in the `cats_controller.rb` file, it will look for a corresponding view in the `views/cats` folder.

---

If you want a variable to be shared between a **view** and a **controller**, you can use an **instance variable** (prefixed with `@`).

```rb
class CatsController < ApplicationController
	def index
		@cats = Cat.all
	end
end
```

````erb
<h1>Cats</h1>
	<% @cats %>

``

## Custom Routes

```rb
Rails.application.routes.draw do
	get '/cats', to: 'cats#index'
	get '/cats/:id', to: 'cats#show'

	# custom route
	get '/bananas', to 'bananas#index'
end
````

These `to` values are the controller and method that will be called. Recall the result of `rake routes | grep cats`:

```bash
#  cats GET    /cats(.:format)          cats#index
#       POST   /cats(.:format)          cats#create
#  new_cat GET    /cats/new(.:format)      cats#new
# edit_cat GET    /cats/:id/edit(.:format) cats#edit
```

You can use this method `get '/cats/:id', to: 'cats#show'` to create a custom routes without having to create a controller method. Sometimes we don't need all the other routes that Rails creates for us.

## Models

- use a generator to create a model

```bash
rails generate model owners name:string age:integer
```

## Migrations

Running a migration will create a table in the database.

```bash
rails db:migrate
```

What if you ran a migration, but then realized you made a mistake? You can roll back the migration with:

```bash
rails db:rollback
```

- `rollback` will undo the last migration that was run.
  - deleting the table and all the data in it.

But if you already pushed to `main`, it may be best to create a new migration to undo the changes.

```bash
rails generate migration remove_age_from_owners
```

## Schema File

- is automatically generated when you run a migration.
- never ever edit this file directly.

## Reusing Controllers

You can use the `params` hash to access the query string parameters.

```rb
class CatsController < ApplicationController
	def index
		@owner = nill

		if params[:owner_id]  # if there is an owner_id exists, do something
			@owner = Owner.find params[:owner_id]    # select from the Owner table where the id is equal to the owner_id
		end

		@cats = Cat.all
	end
end
```

- this allows you to use the `@owner` variable in the view! (if it exists)

In your view:

```erb
<% if @owner %>
	<h1><%= @owner.name %>'s Cats</h1>
<% else %>
	<h1>All the Cats</h1>
	<% @cats.each do |cat| %>
		<p><%= cat.name %></p>
	<% end %>
<% end %>
```

Here we are using ONE controller to handle two different paths!

---

How would you get the specific cat for a specific owner?

We need to add an association between the two tables.

Within the `Owner` model:

```rb
class Owner < ApplicationRecord
	has_many :cats
end
```

> Now active record knows that the `Owner` model has many `cats`. This will add a method to the `Owner` model called `cats`.

In the CatsController:

```rb
class CatsController < ApplicationController
	def index
		@owner = nill

		if params[:owner_id]
			@owner = Owner.find params[:owner_id]
			@cats = @owner.cats   # this will now work!
		else
			@cats = Cat.all
		end
	end
end
```

# Namespaces

- allows you to group controllers together.
- the idea is sometimes you have routes that are public... and routes that are private.
  - the private routes are for users that are logged in.
  - this is where namespaces come in.

Within the `routes.rb` file:

```rb
Rails.application.routes.draw do
	namespace :admin do
		resources :cats
	end
end
```

## Eager Loading

- is a way to load all the associated data for a model.

See more [here](https://guides.rubyonrails.org/active_record_querying.html#eager-loading-associations)
