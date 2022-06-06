---
title: Showing Articles from a table in Rails
date: '2022-06-05'
tags: ['ruby', 'rails']
draft: false
summary: Showing article items from a table generated in Ruby on Rails using a route and a view. We also look at how to show a listing page of the various articles in our database.
---

# How to display items from a database

So we have a database of articles. But how do we display them?

Start by creating a route to the `articles` controller. Add the following to the `config/routes.rb` file:

```rb
  resources :articles'
```

When we go to a like 'http://127.0.0.1:3000/articles/1', we can access the article using the **params** harsh (it's a hash data structure).

We can call this within the controller:

```rb
class ArticlesController < ApplicationController
  def show
    article = Article.find(params[:id])
  end
end
```

In order to make the `article` variable available to the view, we need to add it to the `@` symbol, making it an **instance variable**.

```rb
class ArticlesController < ApplicationController
  def show
    @article = Article.find(params[:id])
  end
end
```

Now we have a variable that we can use in the view.

In order to display the articles, we need to add a `<%=` tag to the view.

```rb
<h1>Showing article details</h1>

<p><strong>Title: </strong>
  <%= @article.title %>
</p>
<p><strong>Description: </strong>
  <%= @article.description %>
</p>
```

# byebug

**[byebug](https://github.com/deivid-rodriguez/byebug)** is a Ruby **debugger** that allows you to step through your code and see what's happening. You can add the `byebug` command to your code and it will stop at the point where you put it.

```rb

class ArticlesController < ApplicationController
  def show
    byebug # stops here
    @article = Article.find(params[:id])
  end
end
```

Now in your rails console, you can step through the code and see what's happening.

```rb
Started GET "/articles/2" for 127.0.0.1 at 2022-06-06 09:43:44 -0700
Processing by ArticlesController#show as HTML
  Parameters: {"id"=>"2"}

[1, 7] in /Users/curtisw/ruby/projects/test_app/app/controllers/articles_controller.rb
   1:
   2: class ArticlesController < ApplicationController
   3:   def show
   4:     byebug
=> 5:     @article = Article.find(params[:id])
   6:   end
   7: end
(byebug) params ### can see the params hash
#<ActionController::Parameters {"controller"=>"articles", "action"=>"show", "id"=>"2"} permitted: false>
(byebug) params[:id]
"2"
```

> type `continue` to continue.

# Building a list of items from a database

We want to be able to go to a page that shows a list of articles. For example, going to 'http://localhost:3000/articles' would show a list of articles.
