---
title: Data Flow in MVC
date: '2022-08-23'
tags: ['MVC', 'Rails', 'Ruby']
images: 'https://www.codingexercises.com/img/2019-12-18/mvc-in-ruby-on-rails.png'
draft: false
summary: Article explores how Rails implements the MVC pattern.
---

The Model-View-Controller (MVC) is a architectural pattern. Although Rails was not the first the use an MVC web framework, it was very popular.

Michael Hartl's [tutorial-style book](https://www.railstutorial.org/book/beginning#sec-mvc) is a popular choice for learning Rails.

## Model View Controller (MVC)

read: [MVC](https://www.railstutorial.org/book/beginning#sec-mvc)

- MVC enforces the separation of data (user information) from the presentation (HTML) and the logic (Ruby code)

```
./app
|
|
├── models
│   ├── application_record.rb
│   └─── article.rb
|
├── controllers
│   ├── application_controller.rb
│   └─── articles_controller.rb
│  
│  
└── views
    ├── articles
    │   ├── _form.html.erb
    │   ├── edit.html.erb
    │   ├── index.html.erb
    │   ├── new.html.erb
    │   └── show.html.erb
    └── layouts
        ├── application.html.erb
        ├── mailer.html.erb
        └── mailer.text.erb
```

![mvc](https://softcover.s3.amazonaws.com/636/ruby_on_rails_tutorial_7th_edition/images/figures/mvc_schematic.png)

- browser sends a request to the server
- passed to the Rails **controller**
  - has multiple options from here
    - render a **view** (template converted to HTML) -> send to browser
    - interact with the **model** (database)
      - most common for dynamic sties
      - model is a Ruby class (object) that represents a table in the database
    - after interacting with the model, the controller renders a view

## MVC in Action

- illustration of how the different pieces in MVC work together to handle an HTTP request.

article here: [MVC in Action](https://www.railstutorial.org/book/toy_app#sec-mvc_in_action)

![mvc in action](https://softcover.s3.amazonaws.com/636/ruby_on_rails_tutorial_7th_edition/images/figures/mvc_detailed.png)

1. The browser issues a request for the '/users' URL.
1. Rails routes '/users' to the `index` action in the **Users controller**.
1. The `index` action asks the User **model** to retrieve all users (`User.all`).
1. The User **model** pulls all the users from the database.
1. The User model returns the list of users to the controller.
1. The controller captures the users in the `@users` variable, which is passed to the `index` view.
1. The view uses embedded Ruby to render the page as HTML.
1. The controller passes the HTML back to the browser.

### Routes

- Rails routes are defined in the `config/routes.rb` file

```rb
Rails.application.routes.draw do
  resources :users
  root 'users#index'   # this is the root route `users` is the controller and `index` is the action
end
```

### Controllers

- is a collection of related _actions_

Rails automatically creates a ton of pages for you.

| URL           | Action | Purpose                     |
| ------------- | ------ | --------------------------- |
| /users        | index  | page to list all users      |
| /users/1      | show   | page to show user with id 1 |
| /users/new    | new    | page to make a new user     |
| /users/1/edit | edit   | page to edit user with id 1 |

> The correspondence between pages and URLs for the Users resource.

The URLs correspond to the controller and action.

In `app/controllers/users_controller.rb`

```rb
class UsersController < ApplicationController

  def index
		### some method
  end

  def show
		### some method
  end

  def new
		### some method
  end

  def edit
		### some method
  end

  def create
		### some method
  end

  def update
		### some method
  end

  def destroy
		### some method
  end
end
```

There are some additional actions in the controller that are not in the table above. - `create` - `update` - `destroy`

> This is because they are RESTful actions. They are used to modify the database.

### Models

- Rails uses Active Record to interact with the database
- the `index` action in the `UsersController` uses the `User` model to retrieve all users from the database

```rb
class ArticlesController < ApplicationController
  def index
    @articles = Article.all
  end
end
```

> uses ActiveRecord to retrieve all articles from the database and store them in an instance variable `@articles`

Once a **instance variable** is defined, it is available to the **view**.

- ALL instance variables in Rails start with `@`
- they are available to the view
  - `index.html.erb` uses the `@articles` instance variable to display the list of articles
  - `show.html.erb` uses the `@article` instance variable to display the article

> view for users index

```erb
app/views/users/index.html.erb
<p style="color: green"><%= notice %></p>

<h1>Users</h1>

<div id="users">
  <% @users.each do |user| %>
    <%= render user %>
    <p>
      <%= link_to "Show this user", user %>
    </p>
  <% end %>
</div>

<%= link_to "New user", new_user_path %>
```

### Views

- converts its contents into HTML
- gets returned by the controller to the browser

## KV Video on MVC

Model => Database => ActiveRecord
View => ERB Templates => HTML
Controller => Project Manager

The controller is the one dealing with the user. It interacts with the model and the view.

![mvc](https://miro.medium.com/max/666/1*eDPWR3lYGm1ogbef2beyHA.png)

- view produces the thing the user sees
- controller makes it all happen
  - it uses the model and view as it needs
  - then sends the response to the browser

Another big component of MVC is the router. It takes the URL and decides which controller and action to use.

---

In the `routes`, we have the `resources :users` line. This line tells Rails to create all the routes for the `users` resource.

It says there should be an endpoint for the `index` and `shows`

```rb
  resources :products, only: [:index, :show]
```

We have a more explicit line:

```rb
  root to: 'products#index'
```

- `products` is the controller
- `index` is the action

> this is saying, if there's a request to the root of the site, use the `products` controller and the `index` action.

```rb
get '/' => 'products#index'
```

> but this is the same thing and not very common.

---

According the the log stack, we know we make a GET request to the `ProductsController#index`

In the `products_controller.rb` file, we have the `index` action.

```rb
class ProductsController < ApplicationController

  def index
    @products = Product.all.order(created_at: :desc)
  end

  def show
    @product = Product.find params[:id]
  end

end
```

The `index` `action takes over and does the following:

```rb
@products = Product.all.order(created_at: :desc)
```

- it knows it needs to get all the products from the database
- then render the `index.html.erb` view
  - this part is implicit

```rb
def index
  @products = Product.all.order(created_at: :desc)
  render :index # this is implicit
end
```
