---
title: How to Export a CSV in Ruby on Rails
description: Find out how to export a CSV in Ruby on Rails for models.
date: 2022/02/15
tags: [ruby, rails]
---

_This is an old post that I have updated, I no longer use Ruby on Rails._

Exporting a CSV in Ruby on Rails is a simple task, but what if you want to
filter the data? OK, it's probably still easy for a lot of you, but for me this
was a speedbump in a project I worked on.

But before we begin, what is this project?

It's a subscription website powered by
[Pay Rails](https://github.com/pay-rails/pay) which comes with a `Subscription`
model that belongs to a `User` model.

In the CMS you can view users and filter them by their subscription status.

- Subscribed
- Canceled
- Inactive

However, you cannot export the results. Let's add that now.

First we need to make some changes.

## User Model

I added `require 'csv'` to the top of the file.

And I added this method to generate the CSV based on parameters passed from the
controller.

```ruby
def self.to_csv(records = [])
  attributes = %w[email full_name status]

  CSV.generate(headers: true) do |csv|
    csv << attributes

    records.each do |user|
      csv << attributes.map { |attr| user.send(attr) }
    end
  end
end
```

There is no such thing as `status` on the `User` model, therefore I made a
method which looks like this:

```ruby
def status
  subscription&.status
end
```

Here are the the scopes used for the filtering.

```ruby
scope :subscribed, -> { left_outer_joins(:subscriptions).where("subscriptions.status = ?", "active") }
scope :canceled, -> { left_outer_joins(:subscriptions).where("subscriptions.status = ?", "canceled") }
scope :inactive, -> { where(processor: nil) }
```

## View

I added a `link_to` that includes the current page params:

```erb
<%= link_to("Download CSV", users_path(request.params.merge(format: :csv))) %>
```

Here is the form used for the filtering.

```erb
<%= form_with(url: users_path, local: true, method: :get)) do |f| %>
  <%= f.select(:status, [['Subscribed', 'subscribed'], ['Canceled', 'canceled'], ['Inactive', 'inactive']], { selected: params[:status] }) %>

  <%= f.submit %>
<% end %>
```

## Controller

I updated the controllers `index` action to include a response for a CSV format.

```ruby
def index
  @users = User.order(created_at: :desc)

  @users = @users.subscribed if params[:status] == 'subscribed'
  @users = @users.canceled if params[:status] == 'canceled'
  @users = @users.inactive if params[:status] == 'inactive'

  csv_name = [(params[:status].present? ? params[:status] : 'all'), 'users', Date.today].compact.join('-')

  respond_to do |format|
    format.html
    format.csv { send_data User.to_csv(@users), filename: "#{csv_name}.csv" }
  end
end
```

This uses the scopes created in the `User` model to filter the `@users` instance
variable, if there are no params passed it defaults to the first `@users`
declaration which returns all the users.

There's a `csv_name` variable that's created to allow for better naming:

- `subscribed-users-2021-01-01.csv`
- `canceled-users-2021-01-01.csv`
- `inactive-users-2021-01-01.csv`

And that's all I had to do, it was quite easy in the end and it _apparently_
added a lot of value for the client, I'm not too sure how but it isn't my place
to argue.
