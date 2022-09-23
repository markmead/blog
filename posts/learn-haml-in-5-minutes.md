---
title: Learn HAML in 5 Minutes
description: Get started with HAML quickly and write beautiful markup.
date: 2021/11/15
tags: [ruby, rails]
---

In short, HAML is a faster way to write HTML and is very common in Ruby on Rails
applications.

## How Does HAML Compare to HTML

Review the following example and ask yourself, what's easier to read?

I can confirm that the HAML example took less time to write.

**HTML**

```html
<section class="banner">
  <h1 class="banner__title">Hello World!</h1>

  <a href="/about" class="button primary"> Find out more </a>
</section>
```

**HAML**

```haml
%section.banner
  %h1.banner__title Hello World!

  %a.button.primary(href="/about") Find out more
```

If you believe the HTML example is easier to read then that's fine, personally,
I use HTML instead of HAML for reasons I will explain at the end of this blog
post.

But HAML is slimmer, faster to write, and gives you more time to focus on Ruby
on Rails code rather than HTML.

## How to Use HAML in Ruby on Rails

It's easy to use HAML in Ruby on Rails, simply change `.html.erb` to
`.html.haml`, and you're set.

If you need to convert an existing Ruby on Rails application to HAML you can use
[haml-rails](https://rubygems.org/gems/haml-rails) to automatically convert your
`.html.erb` files to `.html.haml` from the terminal.

It will also set the default view file template to HAML, meaning Ruby on Rails
generators like `rails g scaffold` will create `.html.haml` files.

## How to Write HAML

### Comments in HAML

```haml
/ Single line comment

/
  Multi
  line
  comment

-# Comment that won't show up in the HTML
```

### HTML Tags in HAML

```haml
/ <div> tag
%div

/ <div> tag with a class
.test

/ <section> tag with an id and a class
%section.test#test

/ <a> tag with HTML attributes
%a(href="/" target="_blank" data-turbo="false")
%a{ href: "/", target: "_blank", data: { turbo: false } }

/ <h1> tag with single line of content
%h1 Hello World

/ <p> tag with multi line of content
%p
  Hello world, how are you today? I'm doing just fine, especially when I'm writing HAML.

/ <h1> tag with <br> inside it
%h1
  Hello
  %br/
  World

/ <h1> tag with a non-HTML element inside it
%h1
  Hello
  \-
  World
```

### Writing Ruby on Rails Code in HAML

```haml
/ Variable with default attribute
- bg_color = local_assigns.fetch(:bg_color, "#000")

/ Dynamic content
%h1= @project.title

/ Dynamic content with static content
%p Written by #{@project.author_name}

/ HTML content (usually from a WYSIWYG)
%div
  != @project.body

/ Loop
- @project.tags.each do |tag|
  %span= tag

/ Conditional content (if/else)
- if @project.author_image?
  = image_tag(@project.author_image)
- else
  = image_pack_tag("default-author.png")

/ Partial
= render("comments/form", project_id: @project.id)

/ Form
= form_with(model: @project, local: true) do |f|
  = f.text_field(:title)
  = f.button("Save project", class: "button success")

/ Link
= link_to("View project", project_path(project), class: "link")
```

## Why I Don't Use HAML

There are a few reasons why I don't use HAML...

### Onboarding Developers

I'd say most developers would have used HTML but how many have used HAML? This
causes issues with onboarding developers as it's another skill they have to
learn.

### Readability Issues with Multiple HTML Attributes

**HAML**

```haml
%div{ data: { controller: "map", map_initial_lat_value: "123", map_initial_long_value: "456" } }
  %iframe
```

**HTML**

```html
<div
  data-controller="map"
  data-map-initial-lat-value="123"
  data-map-initial-long-value="456"
>
  <iframe></iframe>
</div>
```

### Readability Issues with Tailwind CSS

```haml
%section.bg-gray-900
  .max-w-5xl.mx-auto.px-4.py-24(class="sm:px-6 lg:px-8")
    %h1.text-4xl.font-bold.tracking-wide.uppercase.text-center.text-white(class="sm:text-6xl")
      Hello World
```

This is awful.
