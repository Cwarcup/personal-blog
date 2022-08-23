---
title: ERB Templates Introduction
date: '2022-08-24'
tags: ['ERB', 'Rails', 'Ruby']
images: 'https://cdn.hackernoon.com/images/ho3s3ylr.jpg'
draft: false
summary: Similar to ESJ, ERB is a templating language that allows you to embed Ruby code in HTML.
---

We can render partials from within other templates by using the `render` method.

```erb
  <div class="products">
    <%= render @products %>
  </div>
```

In the same folder (`/products`) we have the partial `_product.html.erb`:

```erb
<article>
  <%= link_to product_path(product) do %>
    <%= image_tag product.image.thumb.url , alt: product.name %>
    <h1>
      <span><%= product.name %></span>
      <span><%= humanized_money_with_symbol product.price %></span>
    </h1>
  <% end%>
  <div>
    <%= button_to add_item_cart_path(product_id: product.id), class: 'btn' ,
    method: :post do %>
      <%= fa_icon "shopping-cart", text: 'Add' %>
    <% end %>
  </div>
</article>

```

We see when we make a GET request to `/products/12` so see the request is processed by `ProductsController#show` and the `show.html.erb` template is rendered.

```bash
Started GET "/products/12" for 127.0.0.1 at 2022-08-23 15:35:10 -0700
Processing by ProductsController#show as HTML
	...
```

```ruby
class ProductsController < ApplicationController

  def index
    @products = Product.all.order(created_at: :desc)
  end

  def show
    @product = Product.find params[:id]   # this is the action being referenced
		# render: show 												# this is implicit
  end

end
```

> This implicit part means that `render: show` will render the name of that action as a template

Therefore, Rails will look in the `views/products` folder for a file called `show.html.erb` and render it

Any instance variables that are set in the controller will be available in the view.

```rb
class ProductsController < ApplicationController

  def index
    @products = Product.all.order(created_at: :desc)
  end

  def show
    @product = Product.find params[:id]
		@some_message = "Hello World"
		@instance_variable = "I'm an instance variable"
  end

end
```

You can **access** this in the `show` template by using the `@` symbol.

```erb
<h1><%= @some_message %></h1>
<p><%= @instance_variable %></p>

<h1><%= @product.name %></h1>
<p><%= @product.description %></p>
```

---

By default, Rails will render actions within a layout template.

These are containing the HTML that make up the entire page. This makes it so we do not need to repeat the same HTML for every page.

The method to pay attention to is the `yield` method. This is where the content of the page will be rendered.

```erb
<!DOCTYPE html>
<html>
<head>
  <title>Jungle</title>
  <%= stylesheet_link_tag    'application', media: 'all', 'data-turbolinks-track' => true %>
  <%= javascript_include_tag 'application', 'data-turbolinks-track' => true %>
  <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,600;0,700;0,800;0,900;1,600;1,700;1,800;1,900&family=Source+Sans+Pro:ital,wght@0,300;0,400;0,600;0,700;0,900;1,300;1,400;1,600;1,700;1,900&display=swap" rel="stylesheet">
  <%= csrf_meta_tags %>
</head>
<body>

  <%= render 'layouts/top_nav' %>

  <main class="container">
    <%= yield %>          <!-- this is where the content of the page will be rendered -->
  </main>

  <%= yield :end_of_body %>

  <footer class="py-3 my-4">
    <ul class="nav justify-content-center border-bottom pb-3 mb-3">
      <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">FAQ</a></li>
      <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Help</a></li>
      <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">About</a></li>
    </ul>
    <p class="text-center text-muted">© 2021 Jungle, Inc</p>
  </footer>
</body>
</html>
```

- pretend that all the stuff in the `yield` is the content coming from the `show.html.erb` template

---

You can pass in local variables into additional partials you are rendering.

Within the `application.html.erb` layout, we are rendering the `top_nav` partial.

```erb
 <%= render 'layouts/top_nav' %>
```

We can pass in a local variable called `products` to `@product` in the `top_nav` partial.

```erb
<%= render 'layouts/top_nav', product: @product %>
```

In the `top_nav` partial, we can access the `@product` variable by using the `products` local variable.

```erb
<div>
	<h1><%= product.name %></h1>
	<p><%= product.description %></p>
</div>
```

---

In the end, we are writing Ruby code in the erb files.

What is the render method actually doing?

- we are calling a method!

```erb
<%= render('layouts/top_nav', product: @product, msg: "Hello") %>
```

You might think the render method has **three** arguments here, but it actually has **two**.

The first argument is the name of the partial we want to render. The second argument is a hash of local variables we want to pass into the partial.

- `layouts/top_nav` is the name of the partial
- `product: @product, msg: "Hello"` is the hash of local variables
  - these are key-value pairs of a hash (similar to objects in JS)
