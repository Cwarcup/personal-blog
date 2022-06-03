---
title: Introduction to Rails
date: '2022-06-03'
tags: ['ruby', 'rails', 'deploy', 'database']
draft: false
summary: 'Introduction to creating methods and some common array/hash methods.'
---

# MVC - Rails App Structure

Rails follows the **MVC** pattern. This creates a separation between the front end and the back end of an application.

## Models

Are the resources that are used to store data in the database (e.g. a user, a post, a comment). Models can be used to communicate with the tables in the database.

## Views

Is what the user sees. Views are the HTML that is displayed to the user. It is the visible layer in an app. Is typically composed of HTML, CSS and JavaScript. Examples include the homepage, the posts page, the comments page, the login page, the registration page, the admin page, etc. However, instead of suing HTML, we will begin by using **Embedded Ruby** (`erb`) to create views. These files will be named like so: `home.html.erb`, `posts.html.erb`, `comments.html.erb`, etc.

## Controllers

Are also invisible to the user, therefore they are technically 'backend'. Controllers are the glue that connects the models and views. They are the brains of the app. They are the middleman between the models and views. Examples include the `home_controller.rb`, `posts_controller.rb`, `comments_controller.rb`, etc.

The [file structure](https://www.tutorialspoint.com/ruby-on-rails/rails-directory-structure.htm) for a Rails app goes like this:

Have a directory named "**app**" − It organizes your application components. It's got subdirectories that hold the **view** (views and helpers), **controller** (controllers), and the backend business logic (**models**).

# Adding a new route to your Rails application

1. Add the following **route** to the `config/routes.rb` file:

```rb
Rails.application.routes.draw do
  root 'pages#home' # This is the homepage
  get 'about', to: 'pages#about' # new route here
end
```

2. Add a new **action** to the `pages_controller.rb` file:

```rb
class PagesController < ApplicationController
  def home
  end

  def about # new action here
  end
end
```

3. add a new **view** template to the `views` folder:
   - Create a new file named `about.html.erb`
   - Here is where you can add your HTML.

# Deploying a Rails Application

Deploy to production using Heroku.

- Need to create own database. Only the application code will be deployed.
- Production server needs to be ready to serve at all times.

Helpful instructions for deploying to Heroku: [here](https://devcenter.heroku.com/articles/getting-started-with-rails6)

1. login to heroku in terminal with `heroku login`.
2. run `heroku create` to create a new app. This will a new link to your app.
3. Go to your gemfile and update our database to use **postgres**. By default, Rails will use **sqlite**.

```gemfile
group :production do
  gem 'pg'
end
```

4. Find the line `gem 'sqlite3', '~> 1.4'` and add this to the following group:

```gemfile
group :development, :test do
  gem 'sqlite3', '~> 1.4' # add line here

  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
end
```

5. Run `bundle install --without production` to update your `gemfile.lock`.
6. Commit code.
7. Run `git push heroku main` to push to heroku.

Ran easily rename the app by running `heroku rename <new_name>`.

# Databases in Rails

Columns in a table are known as **attributes**.
Rows in a table are known as **records**.

| id  | title    | description                     | user_id |
| --- | -------- | ------------------------------- | ------- |
| 1   | Ruby     | Ruby is a programming language. | 1       |
| 2   | Rails    | Rails is a web framework.       | 1       |
| 3   | Postgres | Postgres is a database.         | 2       |
| 4   | SQLite   | SQLite is a database.           | 3       |

All databases need to be able to...**CRUD**

- Create tables
- Read records
- Update records
- Delete records

## SQL (Structured Query Language)

Is used to communicate with databases. There are slight various variations of SQL (Microsoft SQL, MySQL, PostgreSQL, SQLite, etc.), but they all use the same basic syntax.

## ORM (Object Relational Mapping)

Is a way to map Ruby objects to database tables. The database is just sitting there with data. An ORM comes into play by mapping the data in the database to Ruby objects.

Inside the `models` folder you will notice a file called `application_record.rb`. This is a special file that Rails uses to connect your models to the database. You'll see it uses the `ActiveRecord` module to connect to the database.

Essentially, this allows you to write Ruby code which gets translated to SQL queries, which interacts with the database using the `ActiveRecord` module.

## Scaffolding

Can easily [create](https://guides.rubyonrails.org/v3.2/getting_started.html) a database table for your model by using the `$ rails generate scaffold Post name:string title:string content:text` command.

```zsh
rails generate scaffold Articles title:string description:text
```

Can then run the `rails db:migrate` command to create the table in the database. Now if you look in the `db/migrate` folder you'll see a new migration file.

It also adds an `articles_controller.rb` file to the `controllers` folder, and `article.r`b model file to the `models` folder.

## Routes

Can easily see all routes in your application by running the `rails routes --expanded` command.

```zsh
--[ Route 1 ]-----------------------------------------------------------------------------------------------------------------------------------
Prefix            | articles
Verb              | GET
URI               | /articles(.:format)
Controller#Action | articles#index
--[ Route 2 ]-----------------------------------------------------------------------------------------------------------------------------------
Prefix            |
Verb              | POST
URI               | /articles(.:format)
Controller#Action | articles#create
--[ Route 3 ]-----------------------------------------------------------------------------------------------------------------------------------
Prefix            | new_article
Verb              | GET
URI               | /articles/new(.:format)
Controller#Action | articles#new
--[ Route 4 ]-----------------------------------------------------------------------------------------------------------------------------------
Prefix            | edit_article
Verb              | GET
URI               | /articles/:id/edit(.:format)
Controller#Action | articles#edit
--[ Route 5 ]-----------------------------------------------------------------------------------------------------------------------------------
Prefix            | article
Verb              | GET
URI               | /articles/:id(.:format)
Controller#Action | articles#show
--[ Route 6 ]-----------------------------------------------------------------------------------------------------------------------------------
Prefix            |
Verb              | PATCH
URI               | /articles/:id(.:format)
Controller#Action | articles#update
--[ Route 7 ]-----------------------------------------------------------------------------------------------------------------------------------
Prefix            |
Verb              | PUT
URI               | /articles/:id(.:format)
Controller#Action | articles#update
--[ Route 8 ]-----------------------------------------------------------------------------------------------------------------------------------
Prefix            |
Verb              | DELETE
URI               | /articles/:id(.:format)
Controller#Action | articles#destroy
--[ Route 9 ]-----------------------------------------------------------------------------------------------------------------------------------
Prefix            | root
Verb              | GET
URI               | /
Controller#Action | pages#home
```

Can go to `/articles` to create a new article.

# Databases in Rails

Columns in a table are known as **attributes**.
Rows in a table are known as **records**.

| id  | title    | description                     | user_id |
| --- | -------- | ------------------------------- | ------- |
| 1   | Ruby     | Ruby is a programming language. | 1       |
| 2   | Rails    | Rails is a web framework.       | 1       |
| 3   | Postgres | Postgres is a database.         | 2       |
| 4   | SQLite   | SQLite is a database.           | 3       |

All databases need to be able to...**CRUD**

- Create tables
- Read records
- Update records
- Delete records

## SQL (Structured Query Language)

Is used to communicate with databases. There are slight various variations of SQL (Microsoft SQL, MySQL, PostgreSQL, SQLite, etc.), but they all use the same basic syntax.

## ORM (Object Relational Mapping)

Is a way to map Ruby objects to database tables. The database is just sitting there with data. An ORM comes into play by mapping the data in the database to Ruby objects.

Inside the `models` folder you will notice a file called `application_record.rb`. This is a special file that Rails uses to connect your models to the database. You'll see it uses the `ActiveRecord` module to connect to the database.

Essentially, this allows you to write Ruby code which gets translated to SQL queries, which interacts with the database using the `ActiveRecord` module.

## Scaffolding

Can easily [create](https://guides.rubyonrails.org/v3.2/getting_started.html) a database table for your model by using the `$ rails generate scaffold Post name:string title:string content:text` command.

```zsh
rails generate scaffold Articles title:string description:text
```

Can then run the `rails db:migrate` command to create the table in the database. Now if you look in the `db/migrate` folder you'll see a new migration file.

It also adds an `articles_controller.rb` file to the `controllers` folder, and `article.r`b model file to the `models` folder.

## Routes

Can easily see all routes in your application by running the `rails routes --expanded` command.

```zsh
--[ Route 1 ]-----------------------------------------------------------------------------------------------------------------------------------
Prefix            | articles
Verb              | GET
URI               | /articles(.:format)
Controller#Action | articles#index
--[ Route 2 ]-----------------------------------------------------------------------------------------------------------------------------------
Prefix            |
Verb              | POST
URI               | /articles(.:format)
Controller#Action | articles#create
--[ Route 3 ]-----------------------------------------------------------------------------------------------------------------------------------
Prefix            | new_article
Verb              | GET
URI               | /articles/new(.:format)
Controller#Action | articles#new
--[ Route 4 ]-----------------------------------------------------------------------------------------------------------------------------------
Prefix            | edit_article
Verb              | GET
URI               | /articles/:id/edit(.:format)
Controller#Action | articles#edit
--[ Route 5 ]-----------------------------------------------------------------------------------------------------------------------------------
Prefix            | article
Verb              | GET
URI               | /articles/:id(.:format)
Controller#Action | articles#show
--[ Route 6 ]-----------------------------------------------------------------------------------------------------------------------------------
Prefix            |
Verb              | PATCH
URI               | /articles/:id(.:format)
Controller#Action | articles#update
--[ Route 7 ]-----------------------------------------------------------------------------------------------------------------------------------
Prefix            |
Verb              | PUT
URI               | /articles/:id(.:format)
Controller#Action | articles#update
--[ Route 8 ]-----------------------------------------------------------------------------------------------------------------------------------
Prefix            |
Verb              | DELETE
URI               | /articles/:id(.:format)
Controller#Action | articles#destroy
--[ Route 9 ]-----------------------------------------------------------------------------------------------------------------------------------
Prefix            | root
Verb              | GET
URI               | /
Controller#Action | pages#home
```

Can go to `/articles` to create a new article.

# Creating a database manually

Run: `rails generate migration create_articles` to create a new migration file. This will create a new table in the database. Open this file.

```rb
class CreateArticles < ActiveRecord::Migration[6.1]
  def change
    create_table :articles do |t|

      t.timestamps
    end
  end
end
```

Now we can add our columns to the table.

```rb
class CreateArticles < ActiveRecord::Migration[6.1]
  def change
    create_table :articles do |t|
      t.string :title
      t.timestamps
    end
  end
end
```

Now we can run the migration file. Run: `rails db:migrate`.

## Adding a column

Create a new migration file. Run: `rails generate migration add_column_to_articles title:string`. This will create a new file in the migrate folder.

```rb
class AddDescription < ActiveRecord::Migration[6.1]
  def change
    add_column :articles, :description, :text # add a column called `description` with a type of `text`
  end
end
```

Run the migration file. Run: `rails db:migrate` to create the table in the database.

## Creating a new model

Within the `models` folder, create a new file called `article.rb`.

```rb
class Article < ApplicationRecord
end
```

> Yes, this is really all you need.

## Adding a new item to the database

Can start the **rails console** by running `rails console`.

- Test the connection to the database: `Article.all`

1. Add a new article: `Article.create(title: "New Article")`

2. Can also add a new article by creating a **new object**:

```rb
article = Article.new
=> #<Article:0x00007fdd63d37870 id: nil, title: nil, created_at: nil, updated_at: nil, description: nil>
```

```rb
article.title = "second article"
=> "second article"

article.description = "description of second article"
=> "description of second article"

irb(main):007:0> article
=> #<Article:0x00007fdd63d37870 id: nil, title: "second article", created_at: nil, updated_at: nil, description: "description of second article">
```

Can save the article to the database: `article.save`

Can view this new article in the database: `Article.all`

```rb
[#<Article:0x00007fdd69829788
  id: 1,
  title: "first article",
  created_at: Fri, 03 Jun 2022 22:14:02.979125000 UTC +00:00,
  updated_at: Fri, 03 Jun 2022 22:14:02.979125000 UTC +00:00,
  description: "description of first article">,
 #<Article:0x00007fdd69829508
  id: 2,
  title: "second article",
  created_at: Fri, 03 Jun 2022 22:18:22.273693000 UTC +00:00,
  updated_at: Fri, 03 Jun 2022 22:18:22.273693000 UTC +00:00,
  description: "description of second article">]
```

1. run `article = Article.new(title: "third article", description: "description of third article")`. Still need to run `article.save` to save to the database.

# CRUD (Create, Read, Update, Delete) Operations

Can find an article by id: `Article.find(1)` if you know the id.

Can create a variable and assign it to an article: `article = Article.find(2)`. Now you can easily access this article by simply calling the variable.

## Updating an article

`article.description = "edited description of second article"`

Now if I run `article` you'll see the new description.

You can **delete** an article by using the destroy method. A sample sequence could be like below:

```rb
article = Article.find(id of article you want to delete)
article.destroy
```

# Validation

If a modal has nothing inside of it, like so:

```rb
class Article < ApplicationRecord
end
```

Users are able to create and save empty articles. This is not a good idea. We can add validation to the model to prevent this from happening.

Can add the following to ensure a title is present:

```rb
class Article < ApplicationRecord
  validates :title, presence: true
end
```

Now if I attempt to save an article without a title, it will not save.

```
irb(main):031:0> article = Article.new
   (0.1ms)  SELECT sqlite_version(*)
=> #<Article:0x00007fdd64a95030 id: nil, title: nil, created_at: nil, updated_at: nil, description: nil>
irb(main):032:0> article.save
=> false
```

You can see errors by running `article.errors.full_messages`

You can set a limit on the length of the title:

```rb
class Article < ApplicationRecord
  validates :title, presence: true, length: { minimum: 3, maximum: 50 }
  validates :description, presence: true, length: { minimum: 5, maximum: 500 }
end
```

More on validations here: https://guides.rubyonrails.org/active_record_validations.html
