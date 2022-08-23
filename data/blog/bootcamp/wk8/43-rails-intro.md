---
title: Introduction to Rails
date: '2022-08-23'
tags: ['Active Record', 'Rails', 'Ruby']
images: 'https://rubyonrails.org/assets/images/opengraph.png'
draft: false
summary: Introduction to Ruby on Rails, a web application framework that includes everything needed to create database-backed web applications according to the Model-View-Controller (MVC) pattern.
---

# Introduction to Rails

## Starting the Rails Server

```
bin/rails server
```

## Routes

- `config/routes.rb` is where you define the routes for your application
- written in Ruby

- Controllers are Ruby classes
  - their methods are called actions
- Views are templates that are rendered in the browser
  - they are written in HTML and ERB (Embedded Ruby)

### Adding a Route

- add a route to `config/routes.rb`

```rb
Rails.application.routes.draw do
  get "/articles", to: "articles#index"
end
```

- makes a `GET` request to `/articles`
- mapped to the `index` action in the `ArticlesController`

Create a new controller with the following command:

```
bin/rails generate controller Articles
```

> Will generate a controller called `ArticlesController` in `app/controllers/articles_controller.rb`

The most important new file is the **controller** file: `app/controllers/articles_controller.rb`

```rb
class ArticlesController < ApplicationController
	def index
	end
end
```

- starts with an empty `index` action
  - it does **not** render any views.

> views are located in the `app/views` directory

- the `index` action will render the `index.html.erb` view

```erb
<h1> This is there you create your articles </h1>

```

If you go to `localhost:3000/articles` you will see the view rendered in the browser.

## Homepage and Root Route

Inside of the `config/routes.rb` file, add the following:

```rb
Rails.application.routes.draw do
  root 'articles#index'   # this is the home page

  get 'articles', to: 'articles#index'
end

```

> Homepage is the root route

## MVC (Model View Controller)

- is a design pattern for web applications
  - divides responsibilities into three distinct areas

### Generating a Modal

- is a ruby class
- represents data
- can interact with databases through Active Record

To create a new modal, run the following command:

```
bin/rails generate model Article title:string body:text
```

- model name is `Article`
  - is always **singular**
- represents a single data record

> To help remember this convention, think of how you would call the model's constructor: we want to write `Article.new(...)`, **not** `Articles.new(...)`.

- creates multiple new files
  - most important is the migration file:
    - `(db/migrate/<timestamp>_create_articles.rb)`
    - model file (`app/models/article.rb)`

### Database Migrations

- are a way to make changes to the database schema

inside of the `db/migrate/<timestamp>_create_articles.rb` file:

```rb
class CreateArticles < ActiveRecord::Migration[6.0]
  def change
    create_table :articles do |t|
      t.string :title
      t.text :body

      t.timestamps
    end
  end
end
```

- `create_table` is a method that creates a new table in the database

  - the table name is the **plural** of the model name
  - by default adds an `id` column as the primary key
  - anything else you add to the block will be a column in the table

- `t.string :title` creates a column called `title` of type `string`
- `t.text :body` creates a column called `body` of type `text`

These were automatically added by the generator because we added `title:string` and `body:text` to the command.

```
bin/rails generate model Article title:string body:text
```

- `t.timestamps` creates two columns: `created_at` and `updated_at`
  - these are automatically managed by Active Record

Running the migration command will create the table in the database:

```
bin/rails db:migrate
```

## Using a Model to Interact with the Database

- use `irb` to play around with the model

```
bin/rails console
```

- create a new article

```rb
article = Article.new(title: "Hello Rails", body: "I am on Rails!")
```

> we have only initialized the object in memory, not saved it to the database

- to **save** the object to the database, we need to call the `save` method

```rb
article.save
```

- find a specific article

```rb
article = Article.find(1)
```

```
#<Article:0x000000011554d358
 id: 1,
 title: "Hello Rails",
 body: "I am on Rails!",
 created_at: Tue, 23 Aug 2022 17:18:53.511886000 UTC +00:00,
 updated_at: Tue, 23 Aug 2022 17:18:53.511886000 UTC +00:00>
```

- returns a `ActiveRecord::Relation` object
  - essentially an array of objects

### Showing a List of Articles

back in the `app/controllers/articles_controller.rb` file:

```rb
class ArticlesController < ApplicationController
  def index
    @articles = Article.all     # creates an instance variable
  end
end
```

> this is a **controller instance variable**

- can access this _controller instance variable_ in the view

Inside of the `app/views/articles/index.html.erb` file:

```erb
<h1>Articles</h1>

<ul>
  <% @articles.each do |article| %>
    <li>
      <%= article.title %>
    </li>
  <% end %>
</ul>
```

### ERB

- is a templating language

- two types of tags:
  - `<% %>` for code
    - evaluates the code but does not render it
  - `<%= %>` for output
    - evaluates the code and renders it
    - returns the value of the last line of code

## Summary of what we have done

- The browser makes a request: `GET` http://localhost:3000.
- Our Rails application receives this request.
- The Rails router maps the root route to the **index** **action** of `ArticlesController`.
- The index action uses the `Article` model to fetch all articles in the database.
- Rails automatically renders the `app/views/articles/index.html.erb` **view**.
- The ERB code in the view is evaluated to output HTML.
- The server sends a response containing the HTML back to the browser.

# CRUD

## SHowing a Single Article

- add a new route to the `config/routes.rb` file:

```rb
Rails.application.routes.draw do
	root 'articles#index'

	get 'articles', to: 'articles#index'
	get 'articles/:id', to: 'articles#show', as: 'article'  # new route
end
```

- something extra in its path: `:id`

  - designates a _route parameter_
  - `GET http://localhost:3000/articles/1`

- can access this value in the controller:
  - uses `params[:id]` to access the value

```rb
class ArticlesController < ApplicationController
  def index
    @articles = Article.all
  end

  def show
    @article = Article.find(params[:id])
  end
end
```

- the returned value is stored in the `@article` instance variable
  - can access this in the view
- by default, the `show` action will render the `app/views/articles/show.html.erb` view
  - must create this file

```erb
<!-- app/views/articles/show.html.erb -->
<h1><%= @article.title %></h1>

<p><%= @article.body %></p>
```

> Now we can see the article when we visit http://localhost:3000/articles/1

We can also create a link to the article from the index page like so:

```erb
<h1>Articles</h1>

<ul>
	<% @articles.each do |article| %>
		<li>
			<a href="/articles/<%= article.id %>">
				<%= article.title %>
			</a>
		</li>
		<% end %>
</ul>
```

# More on Routing - `resources`

Whenever we have such a combination of routes, controller actions, and views that work together to perform CRUD operations on an entity, we call that entity a **resource**.

For example, in our application, we would say an article is a resource.

- `resource` method maps all the standard RESTful routes to the controller actions

Instead of having this:

```rb
Rails.application.routes.draw do
  root 'articles#index'

  get '/articles', to: 'articles#index'
  get '/articles/:id', to: 'articles#show'
end
```

We can just have this:

```rb
Rails.application.routes.draw do
  root "articles#index"

  resources :articles
end
```

- can inspect routes with `bin/rails routes`

```
bin/rails routes

      Prefix Verb   URI Pattern                  Controller#Action
        root GET    /                            articles#index
    articles GET    /articles(.:format)          articles#index
 new_article GET    /articles/new(.:format)      articles#new
     article GET    /articles/:id(.:format)      articles#show
             POST   /articles(.:format)          articles#create
edit_article GET    /articles/:id/edit(.:format) articles#edit
             PATCH  /articles/:id(.:format)      articles#update
             DELETE /articles/:id(.:format)      articles#destroy
```

- he values in the "Prefix" column above plus a suffix of `_url` or `_path` form the names of these helpers.

Example:

- `article_path` is a helper that returns the path to the article with the given id
- we know this because the URI patter is `/articles/:id`

- we can update our `index.html.erb` file to use this helper:

From this:

```erb
<ul>
	<% @articles.each do |article| %>
		<li>
			<a href="/articles/<%= article.id %>">
				<%= article.title %>
			</a>
		</li>
		<% end %>
</ul>
```

To this:

```erb
<h1>Articles</h1>

<ul>
  <% @articles.each do |article| %>
    <li>
      <a href="<%= article_path(article) %>">
        <%= article.title %>
      </a>
    </li>
  <% end %>
</ul>
```

Can also use the `link_to` helper:

- The `link_to` helper renders a link with its first argument as the **link's text** and its second argument as the **link's destination**.

```erb
<h1>Articles</h1>

<ul>
  <% @articles.each do |article| %>
    <li>
      <%= link_to article.title, article %>
    </li>
  <% end %>
</ul>
```

## Creating a New Article

- use the `new` and `create` actions to create a new article
- done in the `ArticlesController`

```rb
# app/controllers/articles_controller.rb

class ArticlesController < ApplicationController
  def index
    @articles = Article.all
  end

  def show
    @article = Article.find(params[:id])
  end

  def new
    @article = Article.new
  end

  def create
    @article = Article.new(title: "...", body: "...")

    if @article.save
      redirect_to @article
    else
      render :new
    end
  end
end
```

- `new` action creates a new article object
  - this is an **empty** article object
  - we will use this to render a form
- `create` action creates a new article object with the data from the form

Read more here: https://guides.rubyonrails.org/v6.1/getting_started.html#creating-a-new-article

### Using a Form to Create a New Article

- Rails has a built in _form builder_

- start by creating a new article form in `app/views/articles/new.html.erb`

```erb
<h1>New Article</h1>

<%= form_with model: @article do |form| %>
  <div>
    <%= form.label :title %><br>
    <%= form.text_field :title %>
  </div>

  <div>
    <%= form.label :body %><br>
    <%= form.text_area :body %>
  </div>

  <div>
    <%= form.submit %>
  </div>
<% end %>

```

- `form_with` [is a helper method to create a form](https://api.rubyonrails.org/v6.1.6.1/classes/ActionView/Helpers/FormHelper.html#method-i-form_with)
  - have access to other methods
    - `label`
    - `text_field`
    - `text_area`

The resulting output would like this:

```erb
<form action="/articles" accept-charset="UTF-8" method="post">
  <input type="hidden" name="authenticity_token" value="...">

  <div>
    <label for="article_title">Title</label><br>
    <input type="text" name="article[title]" id="article_title">
  </div>

  <div>
    <label for="article_body">Body</label><br>
    <textarea name="article[body]" id="article_body"></textarea>
  </div>

  <div>
    <input type="submit" name="commit" value="Create Article" data-disable-with="Create Article">
  </div>
</form>

```

## Using Strong Parameters

- we can use the `params` hash to access the data from the form
- the `create` action can access the data from the form with `params[:article]`
  - if we want to access the title, we can do `params[:article][:title]`
  - if we want to access the body, we can do `params[:article][:body]`
- we can use the `params` hash to create a new article object
  - we can NOT pass the pass the `param` object like so
    - `Article.new(params[:article])`
    - NOT SAFE
    - need to use **strong parameters**

Add strong parameters by creating a private method in the `ArticlesController`

`article_params` that filters `params`. And let's change `create` to use it:

```rb
class ArticlesController < ApplicationController
  def index
    @articles = Article.all
  end

  def show
    @article = Article.find(params[:id])
  end

  def new
    @article = Article.new
  end

  def create
    @article = Article.new(article_params) ## new

    if @article.save
      redirect_to @article
    else
      render :new
    end
  end

  private
    def article_params              ## new
      params.require(:article).permit(:title, :body)
    end
end
```

### Validations and Displaying Error Messages

- we can add validations to our model
  - are essentially rules that must be followed for the data to be valid
  - if any validator fails, the data is invalid and will not be saved to the database
    - error messages are added to the `errors` object
- done in `app/models/article.rb`

```rb
class Article < ApplicationRecord
	validates :title, presence: true
	validates :body, presence: true, length: { minimum: 10 }
end
```

We can add some conditional logic in our `view/articles/new.html.erb` to display the error messages:

```erb
    <% @article.errors.full_messages_for(:body).each do |message| %>
      <div><%= message %></div>
    <% end %>
```

- `full_messages_for` returns an array of error messages for the given attribute

# Updating an Article

- user requests a form to edit
- user submits the new form
- if no errors, resource is updated
- if errors, display the error message

- done by the **controllers** `edit` and `update` actions

Inside `app/controllers/articles_controller.rb`:

```rb
class ArticlesController < ApplicationController
  def index
    @articles = Article.all
  end

  ## show method to display a single article
  ## by default, the `show` action will render the `app/views/articles/show.html.erb` view
  def show
    @article = Article.find(params[:id])
  end

  ## creating a new article

  def new
    @article = Article.new
  end

  def create
    @article = Article.new(article_params)

    if @article.save
      redirect_to @article
    else
      render :new
    end
  end

  ### add edit and update methods  here ###

  ## By default, the edit action will render app/views/articles/edit.html.erb.
  def edit
    @article = Article.find(params[:id])
  end

  def update
    @article = Article.find(params[:id])

    if @article.update(article_params)
      redirect_to @article
    else
      render :edit
    end
  end

  private

  ## strong params
  ## `params` is a method that returns an instance of `ActionController::Parameters`
  ## ensures that only the parameters we want are passed to the model
  ## pass this to the `create` and `update` methods
  def article_params
    params.require(:article).permit(:title, :body)
  end
end
```

- By default, the edit action will render app/views/articles/edit.html.erb.

## Using Partials to Share View Code

- `edit` and `new` views have a lot of similar code
  - the code is actually the same because we use `form_with` to create the form

Create a partial:

- `app/views/articles/_form.html.erb`

```erb
<%= form_with model: article do |form| %>
  <div>
    <%= form.label :title %><br>
    <%= form.text_field :title %>
    <% article.errors.full_messages_for(:title).each do |message| %>
      <div><%= message %></div>
    <% end %>
  </div>

  <div>
    <%= form.label :body %><br>
    <%= form.text_area :body %><br>
    <% article.errors.full_messages_for(:body).each do |message| %>
      <div><%= message %></div>
    <% end %>
  </div>

  <div>
    <%= form.submit %>
  </div>
<% end %>

```

- is the same form as `new.html.erb`
  - except `@article` is replaced with `article`
    - because partials are shared, we do not want to use instance variables
    - instead, we pass a **local variable**

Need to update our `new.html.erb` and `edit.html.erb` views to use the partial:

```erb
<h1>New Article</h1>

<%= render "form", article: @article %>
```

```erb
<h1>Edit Article</h1>

<%= render "form", article: @article %>
```

## Deleting an Article

- only require a route and a controller action
- the `resources` method in `config/routes.rb` will automatically create the route for us
  - `DELETE /articles/:id` requests to the `destroy` action of `ArticlesController`.

Inside `app/controllers/articles_controller.rb`:

```rb
class ArticlesController < ApplicationController
  def index
    @articles = Article.all
  end

  ## show method to display a single article
  ## by default, the `show` action will render the `app/views/articles/show.html.erb` view
  def show
    @article = Article.find(params[:id])
  end

  ## creating a new article

  def new
    @article = Article.new
  end

  def create
    @article = Article.new(article_params)

    if @article.save
      redirect_to @article
    else
      render :new
    end
  end

  ### add edit and update methods  here ###

  ## By default, the edit action will render app/views/articles/edit.html.erb.
  def edit
    @article = Article.find(params[:id])
  end

  def update
    @article = Article.find(params[:id])

    if @article.update(article_params)
      redirect_to @article
    else
      render :edit
    end
  end

  ## add destroy method here
  ## remember, automatically created by `resources :articles` in `config/routes.rb`
  def destroy
    @article = Article.find(params[:id])
    @article.destroy

    redirect_to root_path
  end

  private

  ## strong params
  ## `params` is a method that returns an instance of `ActionController::Parameters`
  ## ensures that only the parameters we want are passed to the model
  ## pass this to the `create` and `update` methods
  def article_params
    params.require(:article).permit(:title, :body)
  end
end
```

Can add a link to destroy an article in `app/views/articles/show.html.erb`:

```erb
<h1><%= @article.title %></h1>

<p><%= @article.body %></p>

<ul>
  <li><%= link_to "Edit", edit_article_path(@article) %></li>
  <li><%= link_to "Destroy", article_path(@article),
                  method: :delete,
                  data: { confirm: "Are you sure?" } %></li>
</ul>
```

The `method: :delete` option causes the link to make a `DELETE` request instead of a `GET` request.

The `data: { confirm: "Are you sure?" }` option adds a confirmation to appear.
