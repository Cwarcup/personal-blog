---
title: Database Migrations
date: '2022-08-25'
tags: ['Migrations', 'Rails']
images: 'https://miro.medium.com/max/1162/1*XtnQecMR5LsS8iWrN_tMWw.jpeg'
draft: false
summary: Understanding database migrations in a Rails application.
---

Database migrations are files that contain code that help progress our database schema forward. As you create new features, you will be needing to add new tables, columns, and other database objects. You will also need to remove tables, columns, and other database objects.

Migrations are a way to keep track of these changes and to make sure that all developers have the same database schema.

ActiveRecord comes with a built-in migration system that allows us to create and modify database tables and columns.

## Creating a Migration

- Migrations are located in the `db/migrate` directory (of a Rails app)
- each new migration creates a new file in the `db/migrate` directory
  - the name is the timestamp of when the migration was created
- See docs here: https://guides.rubyonrails.org/active_record_migrations.html#creating-a-table

Inside of one of these migration files, we can write code that will modify our database schema.

Example:

```rb
class CreateProducts < ActiveRecord::Migration[6.1]
  def change
    create_table :products do |t|    # create a new table called `products`
      t.string :name                    # add a column called `name` of type `string`
      t.text :description
      t.string :image
      t.integer :price_cents
      t.integer :quantity

      t.timestamps
    end
  end
end
```

- everything in the block is a column
  - this specifies all the columns that we want to add to our `products` table
- `id` is not in here because it is automatically added by ActiveRecord

## Running Migrations

- we want to run a `create database` migration

Use the command:

```zsh
bin/rake db:migrate
```

> Tells Rails we want to run the migrations

## Creating a Migration

Use Rails command line to create a migration:

```zsh
bin/rails generate migration new_column_name
```

Example:

```zsh
bin/rails generate migration add_user
```

This will create a new migration file in the `db/migrate` directory.

```rb
# db/migrate/20210824150000_add_user.rb
class AddUser < ActiveRecord::Migration[6.1]
  def change
  end
end
```

We can now add new columns to our database:

```rb
# db/migrate/20210824150000_add_user.rb
class AddUser < ActiveRecord::Migration[6.1]
  def change
    add_column :products, :user_id, :integer
  end
  end
end
```

> this example is adding a column called `user_id` to the `products` table

```rb
add_column(table_name, column_name, type, **options)
```

- syntax for this can be found here: https://guides.rubyonrails.org/v6.1/active_record_migrations.html#creating-a-migration
- also have other methods like `create_table`
  - see [here](https://api.rubyonrails.org/v6.1.6.1/classes/ActiveRecord/ConnectionAdapters/SchemaStatements.html#method-i-create_table)

Then run the migration:

```zsh
bin/rake db:migrate
```

This will run and update our database schema!

```rb
# db/schema.rb
ActiveRecord::Schema.define(version: 2021_08_24_150000) do

  create_table "products", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.string "image"
    t.integer "price_cents"
    t.integer "quantity"
    t.integer "user_id" # this is the new column
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

end
```

## Rolling Back Migrations

- Maybe we made a mistake and want to undo a migration

This is where `rollback` comes in handy!

```zsh
bin/rake db:rollback
```

- This will undo the **last** migration that was run
  - you can run this multiple times to undo multiple migrations

## Benefits of Migrations

- Database changes become part of the code
- ActiveRecord and Rails use Ruby code to modify the database
- The history is kept in the `db/migrate` directory
- makes changes easier
  - can push an update to the database schema to all developers
- easy to deploy changes in production
