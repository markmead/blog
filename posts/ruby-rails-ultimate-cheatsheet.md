---
title: The Ultimate Ruby on Rails Cheatsheet
description: How you can fix Livewire ignoring your localized routes.
date: 2021/10/20
tags: [ruby, ruby on rails]
---

# The Ultimate Ruby on Rails

Cheat Sheet & Code Snippets

## General

### Create a Rails Application

```shell
rails new my-app
```

### See the Options Available for Creating a Rails Application

```shell
rails new --help
```

### Start Rails Server

```shell
rails s
```

### Start Rails Console

```shell
rails c
```

### Start Rails Console without Database Saving

This stops changes from saving while in the `rails console`

```shell
rails c --sandbox
```

### View and Search Rails Routes in the Browser

```shell
localhost:3000/rails/info/routes
```

### View Application Information in the Browser

```shell
http://localhost:3000/rails/info/properties
```

## Bundle

### Install Ruby Gems in Gemfile

```shell
bundle install
```

### Install Ruby Gem

```shell
bundle add devise
```

### Update ALL Ruby Gems

```shell
bundle update
```

### Update Ruby Gem

```shell
bundle update devise
```

### Remove Ruby Gem

```ruby
bundle remove devise
```

### Execute Bundle Command in Context of Application Gemfile

```ruby
bundle exec ...
```

## Generators

### Create Controller

Creates a `controllers/pages_controller.rb` with the `home` and `about` action
with view files

```shell
rails g controller pages home about
```

### Create Migration

Creates the migration to add the column `publish_date (date)` to the `projects`
table

```shell
rails g migration add_publish_date_to_projects publish_date:date
```

### Create Model

Creates a `models/project.rb` file and a migration to create the `projects`
table with the columns `title (string)` and `body (text)`

```shell
rails g model project title body:text
```

### Create Scaffold

Does everything that `rails g controller` and `rails g model` would do

```shell
rails g scaffold projects title body:text
```

### Create Rake Task

Creates a `lib/rake/projects.rake` file that includes the `trim_title` method,
you can call this method with `rake projects:trim_title`

```shell
rails g task projects trim_title
```

### Create Mailer

Creates a `mailers/user_mailer.rb` file with a `thanks_for_joining` action with
corresponding view files; `views/user_mailer/thanks_for_joining.txt.erb` and
`views/user_mailer/thanks_for_joining.html.erb`

```shell
rails g mailer user thanks_for_joining
```

## Destroy

Think of destroy as the opposite of generate. It'll figure out what generate
did, and undo it

### Destroy Controller

```shell
rails d controller Pages
```

### Delete Model

```shell
rails d model Article
```

### Delete Scaffold

```shell
rails d scaffold Projects
```

### Delete Mailer

```shell
rails d mailer User
```

## Database

### Create the Database

```shell
rails db:create
```

### Drop the Database

```shell
rails db:drop
```

### Migrate the Database

```shell
rails db:migrate
```

### Get Statuses of All Database Migrations

```shell
rails db:migrate:status
```

### Rollback Last Database Migration

```shell
rails db:rollback
```

### Rollback Multiple Database Migrations

```shell
rails db:rollback STEP=5
```

### Redo Database Migration

This does the following; rollback and migration the database

```shell
rails db:migrate:redo
```

Runs `db:rollback` and `db:migrate`

### Seed the Database

Runs the `db/seeds.rb` file

```shell
rails db:seed
```

### Reset the Database

This does the following; drops, create, migrates and seeds the database

```shell
rails db:reset
```

### Change Database to PostgresQL

```shell
rails db:system:change --to=postgresql
```

### Rest Database Table ID Count

```ruby
ActiveRecord::Base.connection.reset_pk_sequence!('table_name')
```

### Reset ALL Database Tables ID Count

```ruby
ActiveRecord::Base.connection.tables.each do |t|
  ActiveRecord::Base.connection.reset_pk_sequence!(t)
end
```

### Populate a New Table in a Database Migration

```ruby
class CreatePostCategories < ActiveRecord::Migration[5.0]
	def up
		t.integer :id
        t.string :name

        t.timestamps
	end

	PostCategory.reset_column_information

	%w[news blog insight guide].each do |category|
        PostCategory.create(name: category)
    end

	def down
        drop_table :post_categories
    end
end
```

### Reset Cached Information in Table Columns

```ruby
PostCategory.reset_column_information
```

## Routes

### Set Root

```ruby
root to: 'pages#home'
```

### Create a Route

Creates an `/about` path that maps to the `controller/pages_controller.rb`
`about` action

```ruby
get 'about', to: 'pages#about'
```

Map the `/about` route to the `PagesController` `about` action (creates a
`about_path` helper)

### Create a Route with a Named Route Helper

Reference the `/about` path with `about_us_path`

```ruby
get 'about', to: 'pages#about', as: 'about_us'
```

Same as the above but this time the helper is `about_us_path`

### CRUD Routes

This creates the full CRUD routes; `index`, `show`, `new`, `create`, `edit`,
`update` and `destroy`

```ruby
resources :projects
```

### CRUD Routes (Only)

This only creates the `index` and `show` action routes

```ruby
resources :projects, only: %i[index show]
```

### CRUD Routes (Except)

This creates all except the `index` and `show` action routes

```ruby
resources :projects, except: %i[index show]
```

### Non ID Resource

Use this when the resource doesn't need an `ID` lookup, in this example the
route `/profile` would be the `show` action route

This creates all the CRUD routes, minus the `index` action route

```ruby
resource :profile
```

### Prefix URL and Controller

This will create routes like `admin/projects` which map to the controller
`controller/admin/projects_controller.rb` and the views would be located at
`views/admin/projects`

```ruby
namespace :admin do
	resources :projects
end
```

### Prefix URL without Changing Controller

This will create routes like `admin/projects` but the controller would be still
be `controller/projects_controller.rb` and the views will be located at
`views/projects`

```ruby
scope :admin do
	resources :projects
end
```

### Create Route for Object

This will create the route `projects/search`

```ruby
resources :projects do
	collection do
		get "search"
	end
end
```

### Create Route for Individual Records

This will create the route `projects/:id/complete`

```ruby
resources :projects do
	member do
		put "complete"
	end
end
```

### Add 301 Redirect

```ruby
get 'about', to: redirect('about-us')
```

[301 Moved Permanently - HTTP | MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/301)

### Add 308 Redirect

```ruby
get 'about', to: redirect('about-us')
```

[308 Permanent Redirect - HTTP | MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/308)

## Controllers

### Run Code Before Action

```ruby
before_action :authenticate_user
```

### Run Code Before Action on Specific Actions

```ruby
before_action :authenticate_user, only: %i[create update destroy]
```

### Redirect Back with Fallback Location

```ruby
redirect_back(fallback_location: root_path)
```

## Models

### Validate Presence of Attribute

```ruby
validates :title, **presence**: true
```

### Validate Formatting of Email

```ruby
validates :email, **format**: URI::MailTo::EMAIL_REGEXP
```

### Validate Attribute Value is Unique

```ruby
validates :title, **uniqueness**: true
```

### Validate Attribute Length is Within a Range

```ruby
validates :title, length: { minimum: 60, maximum: 120 }
```

### Set a CONST Variable

This can then be referenced as `Model::COUNTRIES` where `Model` is the class
name

```ruby
COUNTRIES = %w[England France Germany
```

### Create a Scope

This allows you to call `Project.live`

You can also use methods, but scopes are recommend when they can be used

```ruby
scope :live, -> { where(draft: false) }
```

### Set Default Scope (NOT Recommended)

```ruby
default_scope { order(created_at :desc) }
```

### Callback Method on Action

This runs the `set_publish_date` method before the record is created

```ruby
before_create :set_publish_date

private

def set_publish_date
	self.publish_date = Date.today
end
```

There are a lot of different call back methods, you can see the full list here:

[Active Record Callbacks - Ruby on Rails Guides](https://guides.rubyonrails.org/active_record_callbacks.html)

_Be careful when when using `update` in a callback as it can cause an infinite
loop, to avoid this use `update_columns`_

### Query TRUE/FALSE on Boolean Column

Attributes that are stored as a `boolean` can be queried if `TRUE` or `FALSE` by
appending "?"

```ruby
@project.live?

@user.admin?

@product.published?
```

### Setup Nested Attributes

```ruby
has_many :tags

accepts_nested_attributes_for :tags
```

### Prevent Record Creation if ALL Nested Attributes are Blank

```ruby
has_many :tags

accepts_nested_attributes_for :tags, reject_if: :all_blank
```

### Allow Records from Nested Attributes to be Destroy

```ruby
has_many :tags

accepts_nested_attributes_for :tags, allow_destroy: true
```

### Delegate Attributes to Model in a Relationship (Law of Demeter)

The "Law of Demeter" is the process of chaining method calls across objects

**The Problem**

```ruby
post.user.name
post.user.email
```

**Fix #1 - Model Methods**

This works, but you could cause the model from growing out of control

```ruby
# models/post.rb

def user_name
	user.username
end

def user_email
	user.email
end
```

**Fix #2 - Delegate**

It's a nice idea to pass `allow_nil: true` so `nil` is returned if the data is
not available

```ruby
# models/user.rb

delegate :name, :email, to: :post, allow_nil: true
```

You can then do:

```ruby
post.user_name
post.user_email
```

### Deleting Records without Callbacks (Fast but Risky)

This is the fastest way to delete records, but it skips callbacks

```ruby
Post.first.delete
Post.delete_all
```

### Deleting Records with Callbacks (Slow but Safe)

This is the slower way to delete records, but it doesn't skip callbacks and
isn't that slow

```ruby
Post.first.destroy
Post.destroy_all
```

## ActiveRecord

### Return All Records of Object

```ruby
Project.all
```

### Find Record by ID

```ruby
Project.find(10)
```

### Find Record by ID (Won't Crash if NIL)

```ruby
Project.find_by(id: 10)
```

### Find Record by ID (ID from Params)

```ruby
Project.find(params[:id])
```

### Find Records by Attribute Value

```ruby
Project.find_by(title: 'Hello')
```

### Return Records Matching the Query

This accepts multiple column/value combinations

```ruby
Project.where(draft: false)
```

### Return Records NOT Matching the Query

This accepts multiple column/value combinations

```ruby
Project.where.not(draft: false)
```

### Return Number of Records in Database Table

```ruby
Project.count
```

### Find the First, Second, Third, Fourth, Fifth, Forty Second and Last Record

```ruby
Project.first
Project.second
Project.third
Project.fourth
Project.fifth
Project.forty_two
...
Project.last
```

["Accessing the Reddit" with Ruby on Rails](https://www.reddit.com/r/ruby/comments/823os/rails_core_has_a_method_for_accessing_the_reddit/)

### Exclude Current Record from Query

```ruby
Project.where(live: true).without(self)
```

## ActiveStorage

### Add File Attachment to Model

```ruby
has_one_attached :image
```

### Check if File Attachment is Present

```ruby
@post.image.attached?
```

### Delete a File Attachment from Active Storage

```ruby
@post.image.purge
```

## ActionText

### Add ActionText to Model

```ruby
has_rich_text :body
```

### Convert ActionText Content to Plain Text

This is useful for truncating to create an excerpt

```ruby
body.to_plain_text
```

### Expose ActionText Content on Model

This will allow you to query the content in SQL, useful for searching

```ruby
has_one :action_text_rich_text, class_name: 'ActionText::RichText', as: :record

def self.search(query)
	joins(:action_text_rich_text)
		.where('action_text_rich_texts.body LIKE :query', query: "%#{query}%")
end
```

This will search the database for records where `body` is similar to the value
of `query`

## Views

### Render Data

```erb
<%= @project.title %>
```

### Render HTML Data

```erb
<%== @project.title %>
```

### Render Data

```erb
<%= @project.title %>
```

### Set Variable/Prop

```erb
<% background_color = "#000" %>
```

### Assign Variable/Prop

```erb
<% bg_color = local_assigns.fetch(:background_color)
```

### Assign Variable/Prop with Default Value

```erb
<% bg_color = local_assigns.fetch(:background_color, "#000")
```

### Render Page Content

```erb
<%= yield %>
```

### Render Content from Views into Layout

Add a `<%= yield(...) %>` helper layout file:
`views/layouts/application.html.erb`

```erb
<%= yield(:head) %>
```

Pass content into a `<%= content_for(...) %>` with matching name to the helper
`yield`

```erb
<% content_for(:head) do %>
    <meta name="turbolinks-visit-control" content="reload" />
<% end %>
```

### Link to Page

`<a href="/about">About</a>`

```erb
<%= link_to("About", about_path) %>
```

### Link to Page with HTML Attributes

`<a href="/about" class="button">About</a>`

```erb
<%= link_to("About", about_path, class: "button") %>
```

Same as the above but with HTML attributes included

### Link to Record

`<a href="/projects/10">Project title</a>`

```erb
<%= link_to(@project.title, project_path(@project)) %>
```

### Link to Record (Short)

`<a href="/projects/10">Project title</a>`

```erb
<%= link_to(@project.title, @project) %>
```

### Delete Record (Link)

```erb
<%= link_to("Delete", @project, method: :delete) %>
```

### Delete Record (Form - Recommended)

```erb
<%= button_to("Delete", @project, method: :delete) %>
```

### Back Link

```erb
<%= link_to("Back", :back) %>
```

### Create Object Link with Array (Admin)

`<a href="admin/projects/">Projects</a>`

```erb
<%= link_to("Projects", [:admin, :projects]) %>
```

This is the equivalent of:

```erb
<%= link_to("Project", admin_projects_path) %>
```

### Create Record Show Link with Array (Admin)

`<a href="admin/projects/10">Project</a>`

```erb
<%= link_to("Project", [:admin, @project]) %>
```

This is the equivalent of:

```erb
<%= link_to("Project", admin_project_path(project)) %>
```

### Create Record Edit Link with Array (Edit/Admin)

`<a href="admin/projects/10/edit">Edit</a>`

```erb
<%= link_to("Edit", [:edit, :admin, @project]) %>
```

This is the equivalent of:

```erb
<%= link_to("Edit", edit_admin_project_path(project)) %>
```

### Create Email Link

`<a href="mailto:john@doe.com">john@doe.com</a>`

```erb
<%= mail_to("john@doe.com") %>
```

### Create Email Link with Link Text

`<a href="mailto:john@doe.com">Email me</a>`

```erb
<%= mail_to("john@doe.com", "Email me") %>
```

### Render Partial

```erb
<%= render "shared/header" %>
```

### Render Partial with Variables/Props

```erb
<%= render("shared/header, title: "Hello World!") %>
```

### Loop Through Object

```erb
<% @projects.each do |project| %>
    <%= project.title %>
<% end %>
```

### Render Collection

```erb
<%= render(@projects) %>
```

This is the equivalent of:

```erb
<% @projects.each do |project| %>
    <%= render("project", project: project)
<% end %>
```

### Conditional Render (IF)

```erb
<% if @project.draft? %>
    <span>Draft</span>
<% end %>
```

### Conditional Render (Inline IF)

```erb
<%= render("download") if @project.download? %>
```

### Conditional Render (IF/ELSE)

```erb
<% if @project.draft? %>
    <span>Draft</span>
<% else %>
    <span>Live</span>
<% end %>
```

### Conditional Render (IF/ELSIF/ELSE)

```erb
<% if @project.draft? %>
    <span>Draft</span>
<% elsif @project.scheduled? %>
    <span>Scheduled</span>
<% else %>
    <span>Live</span>
<% end %>
```

Conditional rendering based on the value of `@project.draft?` and
`@project.scheduled?`

### Alternate CSS Classes in Loop

```erb
<% @projects.each do |project| %>
	<div class="<%= cycle("odd-class", "even-class") -%>">
		<%= project.title %>
	</div>
<% end %>
```

### Pluralize Word

This will render "1 project" or "2 projects"

```erb
<%= pluralize(@projects.count, 'project') %>
```

Change "project" to "projects" if `@projects.count > 1`

### Pluralize Word with Specific Plural Word

This will render "1 person" or "2 users"

```erb
<%= pluralize(@users.count, 'person', plural: 'users') %>
```

### Truncate Text

```erb
<%= truncate("...")
```

### Truncate Text at Specific Length

```erb
<%= truncate("...", length: 50)
```

### Truncate HTML

This will render the HTML tags as a string

```erb
<%= truncate("<div>...</div>", escape: false)
```

### Created HTML ID from Record

This will create `project_10`

```ruby
dom_id(@project)
```

### Created HTML ID from Record with Prefix

This will create `edit_project_10`

```ruby
dom_id(@project, :edit)
```

## Flash Messages

### Add More Flash Types

`controllers/application_controller.rb`

```ruby
add_flash_types :error, :success
```

### Render Flash Message

```erb
<div class="alert alert-notice" role="alert">
    <%= flash[:notice] %>
</div>

<div class="alert alert-alert" role="alert">
    <%= flash[:alert] %>
</div>
```

### Render Flash Messages with Dynamic Class

```erb
<% flash.each do |type, message| %>
    <div class="alert alert-<%= type %>" role="alert"> <%= message %> </div>
<% end %>
```

## Caching

### Fragment Caching

```erb
<%= @projects.each do |project| %>
    <% cache(project) %>
        ...
    <% end %>
<% end %>
```

### Collection Caching

```erb
<%= render(partial: "project", collection: @projects, cached: true) %>
```

[Fragment and Collection Caching in Ruby on Rails](https://www.learnrubyonrails.com/blogs/rails-fragment-collection-caching/)

## Forms

### Render Form Partial

`views/projects/_form.html.erb`

You should use this on the `new` and `edit` views to keep them DRY

```erb
<%= render("form", project: @project) %>
```

### Form with Model

```erb
<%= form_with(model: project) do |form| %>
    <%= form.label(:title) %>
    <%= form.text_field(:title) %>
    <%= form.submit %>
<% end %>
```

### Non-Remote Form

This will stop the form submitting with JavaScript

```erb
<%= form_with(..., local: true) do |form| %>
    ...
<% end %>
```

[Working with JavaScript in Rails - Ruby on Rails Guides](https://guides.rubyonrails.org/working_with_javascript_in_rails.html#remote-elements)

### Search Form

```erb
<%= form_with(url: search_path, method: :get, local: true) do |form| %>
    <%= form.label(:q, "Search") %>
    <%= form.search_field(:q, placeholder: "Search...") %>
    <%= form.submit("Search") %>
<% end %>
```

### Namespace Form URL

This will create the URL `admin/projects`

```erb
<%= form_with(model: [:admin, project]) do |form| %>
    ...
<% end %>
```

### Form Select

Data supplied from a `CONST` variable on the `User` model

```erb
<%= form.select(:country, User::COUNTRIES) %>
```

### Form Select with Prompt Option

```erb
<%= form.select(:country, User::COUNTRIES, inlude_blank: "Select country") %>
```

### Form Select with HTML Attributes

```erb
<%= form.select(:country, User::COUNTRIES, {}, { class: "form-control" }) %>
```

### Created a Nested Form

```erb
<%= form.fields_for(:projects) do |project_fields| %>
    <%= render "project/form", form: project_fields %>
<% end %>
```

### Remove Generated ID from Nested Form

```erb
<%= form.fields_for(:projects, include_id: false) do |project_fields| %>
    <%= render "project/form", form: project_fields %>
<% end %>
```

### Showing Form Errors in the View

Base HTML to use for form errors:

```erb
<div role="alert">
  <h2> There's <%= pluralize(errors.count, 'error') %> to fix </h2>

  <ul>
    <% errors.full_messages.each do |error| %>
        <li><%= error %></li>
    <% end %>
  </ul>
</div>
```

The error message here will render like:

```shell
Name can't be blank
Email is invalid
```

Render this with:

```erb
<%= render("components/form/errors", errors: MODEL.errors) %>
```

## Mailer

### Email Address with Name

This will create the following string `John Doe <johndoe@email.com>`

If now name is passed it will return the email address only

```ruby
ActionMailer::Base.email_address_with_name(@user.email, @user.name)
```

## Cookies & Sessions

### Create Session Cookie

Session cookies will be removed once the session is over (page closes)

```ruby
session[:user_id] = current_user.id
```

### Delete Session Cookie

```ruby
session.delete(:user_id)
```

### Create Cookie

```ruby
cookies[:user_id] = current_user.id
```

### Delete Cookie

```ruby
cookies.delete(:user_id)
```

### Signed Cookie

```ruby
cookies.signed[:user_id] = current_user.id
```

### Encrypted Cookie

```ruby
cookies.encrypted[:user_id] = current_user.id
```

### Set Cookie Expiration Date

```ruby
cookies[:seen_newsletter_popup] = {
    value: "true",
    expires: 10.days
}
```

### Permanent Cookie

This cookie will last 20 years

```ruby
cookies.permanent[:seen_newsletter_popup] = "true"
```

[Demystifying Cookie Security in Ruby on Rails 6](https://dev.to/ayushn21/demystifying-cookie-security-in-rails-6-1j2f)

## Strings

### Return Length of String

```ruby
"Hello World".size # 11

"Hello World".length # 11
```

### Check if String Includes Text

```ruby
"Hello World".includes?("Hello") # true

"Hello World".includes?("Goodbye") # true
```

### Replace Part of a String

```ruby
"Hello World".gsub("Hello", "Goodbye") # Goodbye World
```

### Split String into Array

```ruby
"Hello World".split # ["Hello", "World"]

"Simon, Jay, William".split(",") # ["Simon", " Jay", " William"]
```

### String Interpolation

```ruby
name = "Simon"

"Hello #{name}"
```

## Arrays

### Return Length of Array

```ruby
["Hello", "World"].size # 2

["Hello", "World"].length # 2

["Hello", "World"].count # 2
```

### Push to Array

```ruby
["Hello", "World"] << "Goodbye" # ["Hello", "World", "Goodbye"]

["Hello", "World"].push("Goodbye") # ["Hello", "World", "Goodbye"]
```

### Combine Arrays

```ruby
["Hi", "Hello"].concat(["Bye", "See Ya"]) # ["Hi", "Hello", "Bye", "See Ya"]

["Hi", "Hello"] + ["Bye", "See Ya"] # ["Hi", "Hello", "Bye", "See Ya"]
```

### Remove from Array

```ruby
["Hello", "World"].delete("Hello") # World

["Hello", "World"].delete_at(1) # World
```

### Remove All from Array

```ruby
["Hello", "World"].clear # []
```

### Check if Array Includes Text

```ruby
["Hello", "World"].includes?("Hello") # true

["Hello", "World"].includes?("Goodbye") # true
```

### Reverse Array

```ruby
["Hello", "World"].reverse # ["World", "Hello"]
```

### Shuffle the Array

Return a random order of the array

```ruby
["Simon", "Jay", "William"].shuffle
```

### Sample the Array

Return a random item from the array

```ruby
["Simon", "Jay", "William"].sample
```

### Remove Duplicate Items from Array

```ruby
["A", "A", "B", "C", "C"].uniq # ["A", "B", "C"]
```

### Flatten Array

```ruby
[["Hi", "Hello"], ["Bye", "See Ya"]].flatten # ["Hi", "Hello", "Bye", "See Ya"]
```

### Join Array Items (String)

```ruby
["Simon", "Jay", "William"].join(", ") # Simon, Jay, William
```

### Array Items to Sentence (String)

```ruby
["Simon", "Jay", "William"].to_sentence # Simon, Jay, and William
```

## Other

### Symbol to Proc

**Capitalize Each Item in Array**

```ruby
["hello", "world"].map(&:capitalize) # ["Hello", "World"]
```

### Find Current Controller Name

```ruby
controller.controller_name
```

### Find Current Controller Action Name

```ruby
controller.action_name
```

### Remove Empty Values from Array

Returns a new array with empty values removed

```ruby
["Hello", "", "World", nil].reject(&:blank?)

# ["Hello", "World"]
```

### Create Array of Strings

You can use `%W` if you need interpolation

```ruby
# Old
["Rails", "Tailwind", "HTML", "Stimulus"]

# New
%w[Rails Tailwind HTML Stimulus]
```

_You can only use `%w` and `%W` on single words as the array splits on
whitespace_

### Create Array of Symbols

You can use `%I` if you need interpolation

```ruby
# Old
[:new, :edit, :create, :update, :destroy]

# New
%i[new edit create update destroy]
```

_You can only use `%i` and `%I` on single words as the array splits on
whitespace_

### Calculate Sum of Values

```ruby
[10, 10, 20].sum
```

### Do Block

```ruby
Post.all.each do |post|
  post.title
end
```

### Single Line Do Blocks

```ruby
Post.all.each{ |post| post.save }
```

### Create a Method

```ruby
def do_something
end
```

### Create Method with Arguments

```ruby
def do_something(name)
end
```

### Create Method with Default Argument

```ruby
def do_something(name = "User")
end
```

### Create a Class

```ruby
class Person
end
```

### Create a Class that Accepts Arguments

```ruby
class Person
	attr_reader :name

	def initialize(name:)
		@name = name
	end
end

person = Person.new(name: "Simon")
```

### If/Else Statement

```ruby
number = 20

if number > 10
	"Greater than 10"
else
	"Less than 10"
end
```

### If/Elsif/Else Statement

```ruby
number = 20

if number > 15
	"Greater than 15"
elsif number > 10
	"Greater than 10"
else
	"Less than 10"
end
```

### Case/Switch Statement

```ruby
number = 20

case number
when > 15
	"Greater than 15"
when > 10
	"Greater than 10"
else
	"Less than 10"
end
```

## PG Search (Gem)

`bundle add pg_search`

### Search Against Single Attribute on Model

```ruby
include PgSearch::Model

pg_search_scope :search, against: :title
```

### Search Against Multiple Attributes on Model

```ruby
include PgSearch::Model

pg_search_scope :search, against: %i[title subtitle body]
```

### Search Against Action Text Data

Replace `body` with the name of your column using Action Text

```ruby
include PgSearch::Model

pg_search_scope :search, associated_against: { rich_text_body: :body }
```

## Web Console (Gem)

Installed by default

### View Interactive Rails Console in the Browser

```ruby
class ProjectsController < ApplicationController
	def index
		@projects = Project.all

		console
	end
end
```

Or you can use it in ERB like so.

```erb
<h1>All Projects</h1>

<%= console %>
```

## Friendly ID (Gem)

`bundle add friendly_id`

### Use Single Attribute

```ruby
class Project < ApplicationRecord
	extend FriendlyId
	friendly_id :title, use: [:slugged, :finders]
end
```

### Fallback to Multiple Attributes

If `title` is not unique fallback to `title-company`

```ruby
class Project < ApplicationRecord
	extend FriendlyId
	friendly_id :slug_candidates, use: [:slugged, :finders]

	def slug_candidates
		[:title, [:title, :company]]
	end
end
```

### Better Find

This removes the need to use `friendly.find`

```ruby
use: [:slugged, :finders]
```

## Stripe (Gem)

`bundle add stripe`

### Setup Stripe

`config/initializers/stripe.rb`

```ruby
Rails.configuration.stripe = {
  publishable_key: ENV["STRIPE_PUBLISHABLE_KEY"],
  secret_key: ENV["STRIPE_SECRET_KEY"],
}

Stripe.api_key = Rails.configuration.stripe[:secret_key]
```

`views/layouts/application.html.erb`

```erb
<%= javascript_include_tag "https://js.stripe.com/v3/" %>
```

### Stripe Checkout

`config/routes.rb`

```ruby
scope "checkout" do
	post "create", to: "checkout#create", as: :checkout_create
	get "cancel", to: "checkout#cancel", as: :checkout_cancel
	get "success", to: "checkout#success", as: :checkout_success
end
```

`controllers/checkouts_controller.rb`

```ruby
class CheckoutController < ApplicationController
  def create
    @session = Stripe::Checkout::Session.create(
      payment_method_types: %w[card],
      line_items: [
        {
          name: params[:name],
          description: params[:description],
          amount: params[:amount],
          currency: "gbp",
          quantity: params[:quantity],
        },
      ],
      success_url: checkout_success_url,
      cancel_url: checkout_cancel_url,
    )

    respond_to do |format|
      format.js
    end
  end

  def success; end

  def cancel; end
end
```

`views/checkount/create.js.erb`

```ruby
const stripe = Stripe("<%= ENV['STRIPE_PUBLISHABLE_KEY'] %>")

stripe.redirectToCheckout({
  sessionId: "<%= @session.id %>"
})
```

`views/products/product.html.erb`

```erb
<%= form_with(url: checkout_create_path, local: false) do |form| %>
    <%= form.hidden_field :name, value: @product.title %>
    <%= form.hidden_field :description, value: @product.description %>
    <%= form.hidden_field :amount, value: @product.price * 100 %> <%= form.number_field :quantity, value: 1 %>
    <%= form.submit %>
<% end %>
```

## Code Snippets

### Rails Based Body Class

Set a unique class to the `<body>` tag, created from the current controller and
action names

```ruby
def page_class
  "#{controller.controller_name}-#{controller.action_name}"
end
```

And then in your layout file you can do this.

```erb
<body class="<%= page_class %>">
```

[Using the Controller to Create Page Class Names in Ruby on Rails](https://www.learnrubyonrails.com/blogs/rails-controller-class-names-page/)

### Better Email Link

Removes the need to pass the email twice when using HTML attributes

```ruby
def email_to(email, **object)
  link_to(email, "mailto:#{email}", **object)
end
```

### Better Phone Link

Removes the need to pass the email twice when using HTML attributes

```ruby
def tel_to(number, **object)
  link_to(number, "tel:#{number}", **object)
end
```

As of Rails `v6.1.3.1` there is a `phone_to` helper
