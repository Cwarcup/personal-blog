---
title: Add, edit, and update articles in the database
date: '2022-06-05'
tags: ['ruby', 'rails']
images: ['/static/images/postImages/tobias-fischer-PkbZahEG2Ng-unsplash.jpg']
draft: false
summary: How to add, edit and updates new items to a database in Ruby on Rails.
---

# Forms to build a new item in the database - Ruby on Rails

You will need to add the new and create actions in the articles_controller.rb file like below:

```rb
def new
end

def create
end
```

You will also need to create a view template for the new view. So, in the 'app/views/articles' folder create a new file called new.html.erb and fill it in like below:

```rb
<h1>Create a new article</h1>

<%= form_with scope: :article, url: articles_path, local: true do |f| %>
  <p>
    <%= f.label :title %><br/>
    <%= f.text_field :title %>
  </p>
  <p>
    <%= f.label :description %><br/>
    <%= f.text_area :description %>
  </p>
  <p>
    <%= f.submit %>
  </p>
<% end %>
```

## Create Action - Saving a new article to the database

```rb

class ArticlesController < ApplicationController

  def show
    @article = Article.find(params[:id])
  end

  def index
    @articles = Article.all
  end

  def new
  end

  def create
    @article = Article.new(params.require(:article).permit(:title, :description))
    @article.save
    redirect_to @article
  end

end
```

Now we can save a new article to the database by going to the new page and submitting the form. However, if we do not fill in the form correctly, the data will not save. Recall, we have added a validation in the model to ensure that the title and description are not blank.

```rb
class Article < ApplicationRecord
  validates :title, presence: true, length: { minimum: 3, maximum: 50 }
  validates :description, presence: true, length: { minimum: 5, maximum: 500 }
end
```

### How can we create a validation error message?

At the moment we have no indication the user why the validation failed. We can add a message to the error message like below:

```rb
  def create
    @article = Article.new(params.require(:article).permit(:title, :description))
    if @article.save
      redirect_to @article
    else
      render 'new' # render the new template again if it failed
    end
  end
```

Must also create a new `Article` in the 'new' view template like below:

```rb
  def new
    @article = Article.new
  end
```

If we do not do this, we get the following error: `undefined method 'errors' for nil:NilClass`. This is because the @article variable is not initialized in the 'new' view template.

#### flash[]

Can be used to display messages to the user.

```rb
  def create
    @article = Article.new(params.require(:article).permit(:title, :description))
    if @article.save
      flash[:notice] = "Article was successfully created"
      redirect_to @article
    else
      render 'new'
    end
  end
```

Within the application.rb file, add the following line:

```rb
  <body>
    <% flash.each do |name, msg| %>
      <%= msg %>
    <% end %>
    <%= yield %>
  </body>
```

Now both the validation message and the flash message will be displayed.

# Edit an existing article
