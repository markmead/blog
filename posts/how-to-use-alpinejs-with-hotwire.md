---
title: How to Use Alpine JS with Hotwire
description: There are some issues with Alpine JS + Hotwire, let's fix that.
date: 2021/11/10
tags: [ruby, rails, alpinejs]
---

There's some new spice in Ruby on Rails... [Hotwire ⚡️](https://hotwire.dev/)
which replaces Turbolinks with Turbo.

## What's the Difference Between Turbo and Turbolinks?

It's a simple transformation, Turbo works with links and forms but Turbolinks
only works with links.

## How Does Turbo Break Alpine JS?

In Alpine JS there's the `x-show` and `x-if` directives that allow you to show
and hide HTML elements and content, this is broken when using Tubo.

Thankfully, [SimoTod on GitHub](https://github.com/SimoTo) has created the
JavaScript package `alpine-turbo-drive-adapter` that solves the problem.

You can easily install this with a RailsBytes that I created:

`rails app:template LOCATION='https://railsbytes.com/script/zPds4M'`

Just copy and paste the above into your terminal and everything you need to make
Alpine JS work with Turbo will be installed and set up.

[AlpineJS with Turbo RailsByte](https://railsbytes.com/templates/zPds4M)
