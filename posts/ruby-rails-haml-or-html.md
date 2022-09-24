---
title: HAML vs HTML for Ruby on Rails
description: Here are my thoughts on HAML vs HTML, with some helpful notes.
date: 2022/02/20
tags: [ruby, rails]
---

_This is an old post that I have updated, I no longer use Ruby on Rails._

Why would you want to use HAML when ERB is so great? In short, HAML is a faster
way to write HTML... But does that make it better?

Let's look at some examples.

## Speed Test

**HTML**

```html
<section class="banner">
  <h1 class="banner__title">Title</h1>

  <a href="/about" class="button primary"> Link </a>
</section>
```

**HAML**

```haml
%section.banner
  %h1.banner__title Title

  %a.button.primary(href="/about") Link
```

I can confirm that the HAML example to less time to write.

Uf you're interested in writing code fast, HAML might be the solution for you.

## Readability Test

**HTML**

```html
<div
  data-controller="map"
  data-map-initial-lat-value="123456"
  data-map-initial-long-value="654321"
>
  <iframe></iframe>
</div>
```

**HAML**

```haml
%div{ data: { controller: "map", map_initial_lat_value: "123456", map_initial_long_value: "654321" } }
  %iframe
```

I think it's clear that HTML wins this one, the HAML code is difficult to read.

## Readability Test (Tailwind CSS)

With the popularity of Tailwind CSS this test seems important.

**HAML**

```haml
%section.bg-gray-900
  .max-w-5xl.mx-auto.px-4.py-24(class="sm:px-6 lg:px-8")
    %h1.text-4xl.font-bold.tracking-wide.uppercase.text-center.text-white(class="sm:text-6xl")
      Hello World
```

I'm not bothering with a HTML example for this one, it's obvious that the HAML
code is difficult to read and that a HTML version would be better.

## My Thoughts

I wouldn't use HAML.

I've used it on a few projects in the past and they were never fun to come back
to a month down the line and the code becomes incredibly messy, especially when
using Tailwind CSS.

It's also worth considering the impact of using HAML when onboarding new
developers, it's safe to assume most developers would have used HTML, but how
many have used HAML?

---

However, if you want to use HAML here are some handy notes.

## How to Use HAML in Ruby on Rails

Simply change `.html.erb` to `.html.haml`, and you're set.

However, if you need to convert an existing Ruby on Rails application to HAML
you can use [haml-rails](https://rubygems.org/gems/haml-rails). This will
convert all `.html.erb` files to `.html.haml`.

Additionally, it will set the default view file template to HAML, meaning Ruby
on Rails generators like `rails g scaffold` will create `.html.haml` files.

## How to Write HAML

### Comments

```haml
/ Single line comment

/
  Multi
  line
  comment

-# Comment that won't show up in the HTML
```

### HTML Tags

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

### Ruby on Rails

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

And there we have it, that's HAML. You might be thinking...

> Wait, is that it?

And if you are, then great, HAML clicks for you, but if you aren't thinking that
then don't worry, HTML is more popular.
