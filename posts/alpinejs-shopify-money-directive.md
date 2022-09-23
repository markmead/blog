---
title: Alpine JS Directive to Render Money in Shopify
description: How to render money in Shopify with Alpine JS.
date: 2022/08/05
tags: [javascript, shopify]
---

If you're working with the Shopify API and Alpine JS then there might be times
you write some HTML like this:

```html
<p x-text="$store.variant.selected.price"></p>
```

This is getting the `variant` store from Alpine JS and returning the `price` of
the `selected` object.

For reference, the store might look something like this:

```js
Alpine.store('variant', {
  selected: null,
})
```

When using the Alpine JS directive `x-text` you can no longer use the Liquid
filters like `price | money` or `price | money_with_currency` which is a shame
as they provide an easy to use and read way of using the currency in Shopify.

Welcome... 🥁

## Alpine JS Shopify Money Directive

We can replicate this in Alpine JS with a custom directive:

I've created an Alpine JS directive called `x-money` that converts an integer
into a formatted price.

[Alpine JS Money](https://github.com/markmead/alpinejs-money)

There are options you can pass but in the context of Shopify we can use the
`.shopify` modifier which will look for the `window.Shopify` object.

```html
<p x-money.shopify="$store.variant.selected.price"></p>
```

And it's as easy as that.
