---
title: Implementing new features with Rails with EDD
date: '2022-08-26'
tags: ['Migrations', 'Rails']
images: 'https://images.unsplash.com/photo-1589652717521-10c0d092dea9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
draft: false
summary: Implementing new features with Rails with error-driven development.
---

Error Driven Development (EDD) is a way to implement new features in a Rails application. We will be implementing a storewide sales feature in our Rails application.

## Implementing Storewide Sales

- admins can create sales
- marks everything on sale by `x`% amount.
- should be able to create sales date ranges

Example: Everything is 20% off from 2022-08-25 to 2022-08-31

### Where do you start?

- use an EDD approach

- Ability for admins to create sale records

  - name
  - percent_off
  - starts_on (date)
  - ends_on (date)

- once a sale is active, display it on the products#index page and affect the price of the product

## Making a new route

In the `config/routes.rb` file, we will add a new route:

```rb
  namespace :admin do
    root to: 'dashboard#index'
    resources :products, except: %i[edit update show]
    resources :categories, except: %i[edit update show]

		#new
		resources :sales, only: [:index]
	end
```

use `bin/rake routes` to see the new route.

Will see a new route:

```zsh
admin_sales GET    /admin/sales(.:format)          admin/sales#index
```

- we have a route, but need a controller and view
  - controller will be `admin/sales_controller.rb`
  - could use `bin/rails g controller admin/sales` to generate the controller

## Creating the controller

```
bin/rails g controller <name_name_of_controller>
```

Use `bin/rails g controller admin/sales` to generate the controller.

- creates the controller and the view

We now need an action! We have an empty controller.

## Creating the action

- we need to create an action in the controller
  - we will create an `index` action
  - this will be the action that will render the view

Recall, actions are methods on the class.

```rb
class Admin::SalesController < ApplicationController
	def index
	end
end
```

Next thing the action needs to do is... - possibly get some data from the database - **needs** to render a **view**

```rb
class Admin::SalesController < ApplicationController
	def index
		# render :index     # this is implicit
	end
end
```

> But the view `index.html.erb` does not exist yet!

## Creating the view

- we need to create the view
  - `app/views/admin/sales/index.html.erb`

```erb
<h1>Admin Sales</h1>
```

> Should see this on the page if we visit `localhost:3000/admin/sales`

Can use a view that is similar to the `products#index` view.

```erb
<section class="admin-products-index">

  <header class="page-header">
    <h1>Admin &raquo; All Sales</h1>
  </header>

  <div class="well">
    <%= link_to '+ New Sale', [:new, :admin, :sale], class: 'btn btn-info' %>
  </div>

  <div class="panel panel-default Sales">

    <table class="table table-bordered">
      <thead>
        <tr>
          <th colspan="2">Name</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Status</th>
          <th>Percent Off</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <%= render @sales %>  # need to create this instance in our controller
      </tbody>
    </table>

  </div>

</section>
```

- will fail on the `render @sales` line
  - we need to create the `@sales` instance variable in the controller
- also fail on the `link_to` line
  - we need to create the `new_admin_sale_path` route (does not exist yet)
  - essentially using `[:new, :admin, :sale]` to generate the path `new_admin_sale_path`

---

To make the route `new_admin_sale_path` work, we need to add a new route to the `config/routes.rb` file:

```rb
	namespace :admin do
		root to: 'dashboard#index'
		resources :products, except: %i[edit update show]
		resources :categories, except: %i[edit update show]
		resources :sales, only: [:index, :new]    # add :new here
	end
```

This creates the route `new_admin_sale_path` and the controller action `new` in the `admin/sales_controller.rb` file.

```
admin_sales GET    /admin/sales(.:format)          admin/sales#index
new_admin_sale GET    /admin/sales/new(.:format)      admin/sales#new
```

> now the button should render fine.

---

Soling the issue with `<%= render @sales %>`

- need to create the `@sales` instance variable in the controller
  - we will use the `Sale` model to get the data from the database
    - **need** to create this model first
  - we will use the `Sale.all` method to get all the sales from the database

## Creating the model and migration

```
bin/rails g model <name_of_model> <attribute_1>:<type> <attribute_2>:<type> ...
```

- we need to create the `Sale` model
  - `bin/rails g model Sale name:string percent_off:integer starts_on:date ends_on:date`
  - this will create the migration file and the model file
  - we will need to run the migration to create the table in the database

```rb
class Admin::SalesController < ApplicationController
	def index
		@sales = Sale.all
	end
end
```

Running `bin/rails g model Sale name:string percent_off:integer starts_on:date ends_on:date` will create the migration file and the model file.

```rb
class CreateSales < ActiveRecord::Migration[6.1]
	def change
		create_table :sales do |t|
			t.string :name
			t.integer :percent_off
			t.date :starts_on
			t.date :ends_on

			t.timestamps
		end
	end
end
```

## Running the migration

```
bin/rake db:migrate
```

- this will create the table in the database
- the controller should be able to run `Sale.all` now

At this point, we do not have any errors. We also need some data in the database for the view to render in the sales table.

## Creating some data

You may assume you need a form in order to create a new sale. But we can use the rails console to create some data.

```
bin/rails c
```

- allows you to interact with your database
- use ActiveRecord to create some data
- see [rails docs for more active record methods](https://guides.rubyonrails.org/active_record_querying.html#retrieving-objects-from-the-database) or [here for v6.0](https://guides.rubyonrails.org/v6.0/active_record_querying.html)

```irb
Sale.create!(name: "X-mas Sale!", percent_off: 20, starts_on: 'Dec 5, 2022', ends_on: 'Dec 25, 2022')
```

- uses ActiveRecord to `create` a new record in the database
- is taking a **hash** of attributes
  - takes in **one** argument (the entire hash)

## Creating the `_sale.html.erb` partial

- we need to create the `_sale.html.erb` partial
  - `app/views/admin/sales/_sale.html.erb`

```erb
<tr>
	<td><%= sale.name %></td>
	<td><%= sale.percent_off %></td>
	<td><%= sale.starts_on %></td>
	<td><%= sale.ends_on %></td>
	<td><%= sale.status %></td>
	<td><%= sale.percent_off %></td>
	<td>
		<%= link_to 'Edit', [:edit, :admin, sale], class: 'btn btn-info' %>
		<%= link_to 'Delete', [:admin, sale], method: :delete, data: { confirm: 'Are you sure?' }, class: 'btn btn-danger' %>
	</td>
</tr>
```

- `sales` is a local variable
  - we need to pass in the local variable to the partial
  - we can do this in the `render` method

### How passing partials works `render @sales`

```erb
<%= render @sales %>
```

- this is going through the _array-like object_ `@sales`

Is similar to:

```erb
<% @sales.each do |s| %>
	<%= render 'sale', sale: s %>
<% end %>
```

> rendering sale partial for each sale in the array-like object. This would technically work, but we can use the `render` method to do this for us.

- if you wanted to do something with the data before rendering the partial, you could do it in the controller

```rb
class Admin::SalesController < ApplicationController
	def index
		@sales = Sale.all
		@sales.each do |sale|
			sale.status = 'active'
		end
	end
end
```

## Updating the `index` view - dynamically rendering a partial

- we want to show the status of the sale as 'Active', 'Finished', or 'Upcoming'
  - we need to add a method to the `Sale` model to do this
  - we can use the `status` method in the partial

```erb
<% if sale.ends_on < Date.current %>
	<span> class="label label-danger">Finished</span>
	<% end %>
```

> but we have no way of testing this.

Back in out rails console, we can test this out (`bin/rails c`)

- You can use a cool method called `30.days.ago` to get a date 30 days ago

```irb
Sale.create!(name: "March Sale!", percent_off: 20, starts_on: 30.days.ago, ends_on: 20.days.ago)
```

Update our view to show the status of the sale

```erb
<% if sale.ends_on < Date.current %>
	<span> class="label label-danger">Finished</span>
<% elsif sale.starts_on > Date.current %>
	<span> class="label label-warning">Upcoming</span>
<% end %>
```

Need a 3rd sale, that is active

```irb
Sale.create!(name: "Active Sale!", percent_off: 20, starts_on: 10.days.ago, ends_on: 10.days.from_now)
```

Update our view to show the status of the sale

```erb
<% if sale.ends_on < Date.current %>
	<span> class="label label-danger">Finished</span>
<% elsif sale.starts_on > Date.current %>
	<span> class="label label-warning">Upcoming</span>
<% else %>
	<span> class="label label-success">Active</span>
<% end %>
```

The issue with this code is it is not very DRY. We are repeating ourselves. We can use a method in the model to do this for us.

Each of these `if` statement in the **view** is determining _business logic_. A view should not be responsible for business logic. We should move this to the **model**.

We could do something like this:

````erb
```erb
<% if sale.finished? %>
	<span> class="label label-danger">Finished</span>
<% elsif sale.starts_on > Date.current %>
	<span> class="label label-warning">Upcoming</span>
<% else %>
	<span> class="label label-success">Active</span>
<% end %>
````

When we add `<% if sale.finished? %>`, the view is not doing any business logic, it is just asking the model if the sale is finished. The model is responsible for determining if the sale is finished.

## Adding a method to the `Sale` model (`finished?`)

```rb
class Sale < ApplicationRecord
	def finished?
		ends_on < Date.current
	end

	def upcoming?
		starts_on > Date.current
	end

	def active?
		!finished? && !upcoming?
	end
end
```

- we are not explicitly returning `true` or `false`
  - Ruby will return the last line of code
  - Ruby will return `true` if the last line of code is truthy
  - Ruby will return `false` if the last line of code is falsy

## Updating the `index` view - for the user/client side

- we have implemented some labels on the admin side to show if an item is on/off sale
- we need to implement the same labels on the user side

We need to be able to...

- display if an item is on sale
- display it on any page
- update the prices with the sale price

---

Within the `views/layouts/application.html.erb` file, we can add a banner above our main `yield` statement

> Recall, this `yield`

```erb
<main class="container">

		# place code here that you want to appear in all your layouts

		<%= yield %>
</main>
```

```erb
<main class="container">

	<% if active_sale? %>
		<p class="alert alert-info">
			There's an active <%= "Back to school" %> sale going on!
			Everything is <%= "20%" %> off!
		</p>
	<% end %>

		<%= yield %>
</main>
```

When we run this we get an error saying `undefined method 'active_sale?' for #<#<Class:0x00007f9b0b0b0e00>:0x00007f9b0b0b0d60>`

This is because the `active_sale?` method is not defined.

We can do this by creating a **helper method**.

## Creating a helper method

- is found in the `app.helpers` folder
- will be a **module**

Add a method but do not add logic in it yet:

```rb
module SalesHelper
	def active_sale?
	end
end
```

If we run the page we don't get an error. Let's add some logic to this method.

We want to see if there is an active sale:

```rb
module SalesHelper
	def active_sale?
		Sale.where("starts_on <= ? AND ends_on => ?", Date.current, Date.current).any?
	end
end
```

> here we are using an SQL query to find any sales that are active

---

Lets break down this query:

- we use `?` to represent a variable
  - these are passed in as arguments to the method

Basically does this:

```rb
Sale.where("starts_on <= Date.current AND ends_on => Date.current")
```

See more in the [Rails Guide](https://guides.rubyonrails.org/v6.0/active_record_querying.html#array-conditions)

We are still doing a lot of business logic here. We can move this to the model.

## Moving the `active_sale?` method to the `Sale` model with class methods

- class methods can be added by using `self.`
- add in the logic from the helper method
- here we are adding an ActiveRecord **scope**

```rb
class Sale < ApplicationRecord

	# Active record scope method
	def self.active
		where("starts_on <= ? AND ends_on => ?", Date.current, Date.current)
	end

	def finished?
		ends_on < Date.current
	end

	def upcoming?
		starts_on > Date.current
	end

	def active?
		!finished? && !upcoming?
	end
end
```

Could also be done by using a lambda:

```rb
class Sale < ApplicationRecord

	# Active record scope method
	scope :active, -> { where("starts_on <= ? AND ends_on => ?", Date.current, Date.current) }

	#...rest of the methods
end
```

Back in our helper we can now call the `active` method:

```rb
module SalesHelper
	def active_sale?
		Sale.active.any?
	end
end
```

> Much cleaner!

## General steps

- routing
  - `config/routes.rb`
- controller
  - `bin/rails g controller <name_name_of_controller>`
- action (method inside the controller)
  - `def index; end`
- view
  - `app/views/<name_name_of_controller>/<name_of_action>.html.erb`
- model (only if we need to access data from the database)
  - `bin/rails g model <name_of_model>`

Enter rails console

```
bin/rails c
```

> Similar to irb
