---
title: Navigating a new Rails app
date: '2022-08-24'
tags: ['Rails', 'Ruby']
images: 'https://images.unsplash.com/photo-1445250079920-77131cc79ec5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1476&q=80'
draft: false
summary: You may get a project that you need to work on, and you need to know how to navigate the codebase.
---

On the page you are interested in, refresh it.

The logs in the terminal will show you the request and the controller action that is being called.

```bash
Started GET "/products/12" for 127.0.0.1 at 2022-08-23 16:09:17 -0700
Processing by ProductsController#show as HTML
  Parameters: {"id"=>"12"}
	.....

	....

```

You know that this was processed by the `ProductsController` controller and the `show` action.

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

You can use `raise` to see what is happening in the controller action. Keep in mind that `raise` will stop the execution of the code.

```rb
class ProductsController < ApplicationController

	def index
		@products = Product.all.order(created_at: :desc)
	end

	def show
		raise
		@product = Product.find params[:id]
	end

end
```

If we refresh the page we will see a `RuntimeError in ProductsController#show`

Use the `raise.inspect` method to see what is in the instance variable.

```rb
  def show
    @product = Product.find params[:id]
    raise @product.inspect
  end
```

```bash
RuntimeError #<Product id: 12, name: "Cliff Collard", description: "The Cliff Collard is a very rare, tiny plant and c...", image: "plante_12.jpg", price_cents: 7999, quantity: 23, created_at: "2022-08-23 21:28:22.360985000 +0000", updated_at: "2022-08-23 21:28:22.360985000 +0000", category_id: 3>

```

This tells use we are raining an instance of `Product` with the id of 12.

---

Back to our original question, where is the HTML template being rendered?

> so far we only know we have two instance variables being set with Active Record queries.

Back to our logs!

```bash
app/controllers/products_controller.rb:8:in `show'
Started GET "/products/12" for 127.0.0.1 at 2022-08-23 16:16:02 -0700
Processing by ProductsController#show as HTML
  Parameters: {"id"=>"12"}
  Product Load (4.5ms)  SELECT "products".* FROM "products" WHERE "products"."id" = $1 LIMIT $2  [["id", 12], ["LIMIT", 1]]
  ↳ app/controllers/products_controller.rb:7:in `show'
  Rendering layout layouts/application.html.erb
  Rendering products/show.html.erb within layouts/application   ???? we can see the view being rendered
  ...
	...

```

Lets open the `products/show.html.erb` file.

```erb
<section class="products-show">
  <header class="page-header">
    <h1><%= link_to @product.category.name, @product.category %> &raquo; <%= @product.name %></h1>
  </header>

  <article class="product-detail">
    <%= image_tag @product.image.url, class: 'main-img' %>
    <div>
      <h1><%= @product.name %></h1>
      <p><%= @product.description %></p>
      <div class="quantity">
        <span><%= @product.quantity %> in stock at </span>
        <span><%= @product.price %></span>
      </div>
      <div class="price">
        <%= button_to add_item_cart_path(product_id: @product.id), class: 'btn' , method: :post do %>
          <%= fa_icon "shopping-cart", text: 'Add' %>
        <% end %>
      </div>
    </div>
  </article>

</section>
```

if we add a `!` to the end of a tag, it should modify the HTML.

```erb
<div>
      <h1><%= @product.name %>!</h1>
		// ...
```

> returns html with an exclamation mark after the product name. "Cliff Collard!"

You can also add a `raise` inside of the view to see what is available to you.

```erb
    <%= raise @product.inspect %>
```

```bash
Showing /Users/curtis/code/jungle-rails/app/views/products/show.html.erb where line #9 raised:

#<Product id: 12, name: "Cliff Collard", description: "The Cliff Collard is a very rare, tiny plant and c...", image: "plante_12.jpg", price_cents: 7999, quantity: 23, created_at: "2022-08-23 21:28:22.360985000 +0000", updated_at: "2022-08-23 21:28:22.360985000 +0000", category_id: 3>
```

You cal also add `<%= debug @product %>` to the view to see what is available to you.

```erb
		<%= debug @product %>
```

```
--- !ruby/object:Product
concise_attributes:
- !ruby/object:ActiveModel::Attribute::FromDatabase
  name: id
  value_before_type_cast: 12
- !ruby/object:ActiveModel::Attribute::FromDatabase
  name: name
  value_before_type_cast: Cliff Collard
- !ruby/object:ActiveModel::Attribute::FromDatabase
  name: description
  value_before_type_cast: "The Cliff Collard is a very rare, tiny plant and can be
    found in damp places. It blooms twice a year, for 1 week.\n  It has wide, spear
    shaped leaves, which are usually lime green. It also grows quite large flowers,
    which can be silver, light brown and light red.\n  \n  These plants grow within
    short distances from each other, but it's fairly hard to control and maintain
    their growth.\n  They can be brewed as tea.\n  \n  As a defense mechanism the
    Cliff Collard grows thick thorns.\n  They rely on winds to carry their seeds away
    to reproduce. Once pollinated, they grow small, inedible fruits."
- !ruby/object:ActiveModel::Attribute::FromDatabase
  name: image
  value_before_type_cast: plante_12.jpg
- !ruby/object:ActiveModel::Attribute::FromDatabase
  name: price_cents
  value_before_type_cast: 7999
- !ruby/object:ActiveModel::Attribute::FromDatabase
  name: quantity
  value_before_type_cast: 23
- !ruby/object:ActiveModel::Attribute::FromDatabase
  name: created_at
  value_before_type_cast: 2022-08-23 21:28:22.360985000 Z
- !ruby/object:ActiveModel::Attribute::FromDatabase
  name: updated_at
  value_before_type_cast: 2022-08-23 21:28:22.360985000 Z
- !ruby/object:ActiveModel::Attribute::FromDatabase
  name: category_id
  value_before_type_cast: 3
new_record: false
active_record_yaml_version: 2
```

> is a yaml representation of the product object. A lot of this is not useful to us, but it is good to know what is available to us.

---

Use the find feature of VScode.
