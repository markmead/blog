---
title: How to Export a CSV in Ruby on Rails
description: Find out how to export a CSV in Ruby on Rails for models.
date: 2021/11/15
tags: [ruby, rails]
---

Exporting a CSV in Ruby on Rails is a simple task, but what if you want it to be
filtered? For me, this was a speedbump in a recent project. Therefore, to avoid
that and maintain full steam ahead I have written up this blog.

This is specific to an application I was working on, but you can easily extract
the concepts and code to be used on any other Ruby on Rails application that
needs filtered CSV exporting.

The application I was working on had a `users` table and a `subscriptions`
table, the subscriptions table managed the user's subscription and allowed
queries to check if the user's subscription status was `subscribed`, `canceled`,
and `inactive`. This was all powered by the
[pay gem](https://github.com/pay-rails/pay) by Chris Oliver.

The application currently offered to filter users by the three subscription
statuses, but could not export the users with these filters.

So I needed to make a few changes:

## Model

I added the following method to generate the CSV based on parameters passed from
the controller:

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

The following scopes were already in use but are vital:

```ruby
scope :subscribed, -> { left_outer_joins(:subscriptions).where("subscriptions.status = ?", "active") }
scope :canceled, -> { left_outer_joins(:subscriptions).where("subscriptions.status = ?", "canceled") }
scope :inactive, -> { where(processor: nil) }
```

You will need to include `require 'csv'` at the top of the file.

If you are using the pay gem then note that the `status` method used in the
`attributes` array does not exist, I had to create that:

```ruby
def status
  subscription&.status
end
```

## View

I added a `link_to` that includes the current params:

```erb
<%= link_to("Download CSV", users_path(request.params.merge(format: :csv))) %>
```

There was already a form in place for the filtering:

```erb
<%= form_with(url: users_path, local: true, method: :get)) do |f| %>
  <%= f.select(:status, [['Subscribed', 'subscribed'], ['Canceled', 'canceled'], ['Inactive', 'inactive']], { selected: params[:status] }) %>

  <%= f.submit %>
<% end %>
```

## Controller

I updated the controllers `index` action to include a response for a CSV format
request:

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

This uses the scopes created in the user model to filter the `@users` instance
variable, if there are no params passed it will default to the first `@users`
declaration.

There's also a `csv_name` variable that's created to allow for better naming:

- `subscribed-users-2021-01-01.csv`
- `canceled-users-2021-01-01.csv`
- `inactive-users-2021-01-01.csv`

The `csv_name` variable might be better off in the user model, it's a personal
preference.
