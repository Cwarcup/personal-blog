---
title: Reviewing a Rails App
date: '2022-08-29'
images: 'https://images.unsplash.com/photo-1495573258723-2c7be7a646ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80'
tags: ['Rails']
draft: false
summary: Some basic review tips for reviewing a Rails app.
---

## Rails vs Express

### Express

**Configuration**

- database, download the package, connect and pass credentials, integrate it.
- you have to configure everything
- routes can be named anything you want
- you have a lot of freedom

### Rails

**Configuration**

- follows the convention over configuration principle
  - files names
  - how to add a database
- is already done for you
- have to follow a set of rules created by Rails

## Rails MVC

- Models
- Views
- Controllers

Which one of these is the most important?

- controller -> is the backbone of the app

However, there is a hidden **most important** file: the `routes.rb` file.

## Routes

To see all your routes, run `rails routes` in your terminal.

- visit the route in your browser that does not exist
- in terminal `rails routes` or `rake routes`

This is the **starter** of your project

### Making a route

Can either _generate_ or _make a custom one_

`resources` will create all the routes for you

```rb
Rails.application.routes.draw do
	resources :posts   # adding this line will create all the routes for you
end

```

> This will create all the CRUD routes for you

Can see your routes a little easier by using `rails routes | grep urls`

```rb
Rails.application.routes.draw do
	resources :posts   # adding this line will create all the routes for you
	resources :urls, only: [:index, :show] # this will only create the index and show routes
end
```

This is very similar to the routes in express:

```js
const usersRoutes = require('./routes/users')
//...
app.use('/api/users', usersRoutes)
```

```bash
rails routes | grep urls
```

- these new routes are configured to use a specific controller
  - take a loop at the `Controller#Action` column when you run `rails routes`
    - the _action_ is the method in the **controller**
    - rails creates and defined this for you.

Example:

```rb
# config/routes.rb
  resources :urls, only: %i[index show]
```

We need a controller for this route:

```rb
# app/controllers/products_controller.rb
class UrlsController < ApplicationController
	def index
		@urls = Product.all
	end

	def show
		@url = Product.find(params[:id])
	end
end
```

## Controllers

Can run `rails g controller` to see all the options when making a controller

DO NOT MAKE A CONTROLLER MANUALLY. This takes too much time and is not worth it.

```bash
rails g controller urls
```

> Will make you a few files

Most importantly, this will make you a controller file

```rb
# app/controllers/urls_controller.rb
class UrlsController < ApplicationController
end
```

Remember in JavaScript, you'd do something like this:

```js
const app = require('express')()
const router = express.Router()

const index = (req, res) => {
  // some code
  templateVars = {
    // some data
  }

  return res.render('index', templateVars)
}

router.get('/', index)
router.get('/urls', index)
```

Back in our Rails app, we can do something similar:

```rb
class UrlsController < ApplicationController

	def index
		@urls = Url.all
	end

end
```

Sometimes you want to make a custom route:
You want more then just the default.

Instead of polluting your `routes.rb` file, you can make a custom route `config/routes.rb`:

```rb
Rails.application.routes.draw do
	resources :urls, only: %i[index show]

	get '/about', to: 'about#index'
end
```

You will need to make a view for this route: `app/views/about/index.html.erb`

### Passing data to the view

We use instance variables to pass data to the view

```rb
class UrlsController < ApplicationController

	def index
		@urls = Url.all
	end

end
```

> Use the `@` to make an instance variable. These can be used in the view

```erb
# app/views/urls/index.html.erb
<% @urls.each do |url| %>
	<%= url.shortURL %> -- <%= url.longURL %>
<% end %>
```

## Models

Is basically where all you communicate with your database will happen.

- allows you to write SQL queries with a lot less code
  - these are known as **Active Record** queries
- all models must be **singular**
  - Rails will automatically pluralize it for you

**Creating a model**:

```bash
rails g model users
```

This will make you a model file: `app/models/user.rb`

Additionally, it will create the `db/migrate` file for you. This file will create your table in your database.

- think of migrations as git commits for your database

## Seeds

## Migrations

- when we created a model, we also created a migration file

Migrations can be generated alone:

- possibly for a **bridge table** or **join table**

```bash
rails g migration AddUserToUrls
```

This will create a migration file for you: `db/migrate/20210829171200_add_user_to_urls.rb`

```rb
class AddUserToUrls < ActiveRecord::Migration[6.1]
	def change
		add_reference :urls, :user
	end
end
```

Then you can run `rails db:migrate` to run the migration

## Forms

Where do you need to go first?

Check your routes:

```bash
rails routes | grep urls
```

Lets say we want to make a new URL.

Therefore we will be making a `POST` request to the `/urls` route, using the `urls#create` action.

Make sure you have a view for this route: `app/views/urls/new.html.erb`

```rb
# urls_controller.rb
class UrlsController < ApplicationController

	def index
		@urls = Url.all
	end

	def new
	end

	def create
		@url = Url.new(url_params)
		@url.save
		redirect_to urls_path
	end

end
```

#### Form_for

- use [`form_for` to make a form](https://guides.rubyonrails.org/form_helpers.html#using-form-tag-and-form-for)

```erb
# urls/new.html.erb

<h1>Form for new URL</h1>

<%= form_for Url.new do |form| %>
	<p> Long URL: <%= form.text_field :longURL %> </p>
	<%= form.submit  'Submit!'%>
<% end %>
```

> this will setup the authentication token for you.

Back in JavaScript, we would do something like this:

```js
<form action="/urls" method="POST">
  <input type="text" name="longURL" />
  <button>Submit</button>
</form>
```

> This would not work out of the box in Rails. We need a some special authentication. It's best to use the `form_for` helper

Back in the `urls_controller.rb`, we can access the data from the form using the `url_params` method:

```rb
# urls_controller.rb
class UrlsController < ApplicationController

	def index
		@urls = Url.all
	end

	def new
	end

	def create
		@url = Url.new(url_params)
		@url.save
		redirect_to urls_path
	end

	private

	def url_params
		params.require(:url).permit(:longURL)
	end

end
```

### Sanitizing data

- in the controller, we can use the `url_params` method to sanitize our data
- it takes the `params` object and returns a new object with only the data we want

```rb
 private

 	def url_params
		params.require(:url).permit(:longURL)
	end
```

- the `permit` method determines what data we want to allow
  - any other data will be ignored

## Installing Packages

Will be installing the `securerandom` [package](https://ruby-doc.org/stdlib-2.5.1/libdoc/securerandom/rdoc/SecureRandom.html)

How do we install this?

- back in JavaScript, we would use `npm install`
- we can do the same thing in Rails

```bash
gem install securerandom
```

However, Rails is a lot weirder than NodeJS.

- we need to add this to our `Gemfile`:

```rb
gem 'securerandom'
```

Then we can run `bundle install` to install the package.

## Generators

`rails g` is the same as `rails generate`

Run `rails g --help` to see all the generators

Can be very handy to generate a lot of code for you

## Model Validations

- makes sure you don't save invalid data in your database
- use the `validates` method

- will most likely be using the `presence` validation and `length` validation

Go to your model file: `app/models/url.rb`

```rb
class Url < ApplicationRecord
	validates :longURL, presence: true
	validates :longURL, length: { maximum: 2000 }
end
```

## Rails API

Follow steps here: https://guides.rubyonrails.org/api_app.html#changing-an-existing-application

make sure you `render json: @urls` in your controller
