---
title: How to Get Product Data from Shopify with Alpine JS
description: Learn how you can use Alpine JS to fetch product data in Shopify.
date: 2021/12/30
tags: [alpinejs, javascript, shopify]
---

In this post we will go over two methods of getting product data from the
Shopify API with Alpine JS.

If you've been using Dawn, the new open-source theme from Shopify that makes use
of Shopify 2.0, you may have seen the following code.

```html
<script type="application/json">
  {{ product | json }}
</script>
```

This will render the product data as JSON which we can then get via JavaScript.

```js
JSON.parse(document.querySelector('[type="application/json"]').textContent)
```

This approach works great and is a new concept to me, so thanks Shopify 🙌

The next step with this process is getting the data into Alpine JS, for that we
can use `Alpine.data()`.

```html
<div x-data="product">
  <h1>Product Title</h1>

  <p x-text="variant.title"></p>

  <p x-money="variant.price"></p>

  <form>
    <input type="text" name="id" x-model="variant.id" />

    <button type="submit">Add to Cart</button>
  </form>

  <script type="application/json">
    {{ product | json }}
  </script>
</div>

<script>
  document.addEventListener('alpine:init', () => {
    Alpine.data('product', () => ({
      data: '',
      variant: '',

      init() {
        this.data = JSON.parse(
          document.querySelector('[type="application/json"]').textContent
        )

        this.activeVariant()
        this.listenForChange()
      },

      activeVariant() {
        const variantId = this.getVariantParam()

        this.variant = variantId
          ? this.data.variants.find((variant) => variant.id === variantId)
          : this.data.variants[0]
      },

      listenForChange() {
        document.addEventListener('change', () => {
          this.activeVariant()
        })
      },

      getVariantParam() {
        const params = new URLSearchParams(window.location.search)
        const variantId = Number(params.get('variant'))

        return variantId
      },
    }))
  })
</script>
```

`x-money` is an custom Alpine JS directive that replicates the `| money` filter.
Check it out here [Alpine JS Money](https://github.com/markmead/alpinejs-money).

First off, everything happens in the `init()` function from Alpine JS.

```js
init() {
  this.data = JSON.parse(
    document.getElementById('productData').textContent
  )

  this.activeVariant()
  this.listenForChange()
}
```

First, we are setting the `data` variable value to be the JSON product data that
we can get from Liquid.

Then there's the two functions; `activeVariant()` and `listenForChange()`.

Here's what they're doing.

**`activeVariant()`**

This function calls another function `getVariantParam()` which returns the
variant param from the URL, this value is then set to a local variable of
`variantId`.

If then checks the variants array in the `data` object for a match based on the
`variantId`, if no match was found it defaults to the first variant in the
variants array. It then sets the `variant` variable to the variant that's
returned.

_The variants array is included within `{{ product | json }}`_

**`listenForChange()`**

This sets up a `change` event listener on the document that calls
`activeVariant()`, which allows us keep the `variant` variable up to date with
user changes in the product form.

## Get Shopify Product Data with Async/Await

This is an alternative approach that uses the Shopify API and doesn't require
many changes. It's worth noting that if you've added the following then you
should be OK to remove it.

```html
<script type="application/json">
  {{ product | json }}
</script>
```

_Please do not remove this if you are using Dawn, or it was already in your
theme._

Using the Shopify API for this is as simple as updating the way we get the JSON
product data in the `init()` function.

Here's the new function.

```js
async init() {
  const res = await fetch('/products/{{ product.handle }}.js')
  const data = await res.json()

  this.data = data

  this.activeVariant()
  this.listenForChange()
}
```

This is using the Shopify API endpoint for the current product and gets the
`data` from the response. Then we set the `data` variable to the data that is
returned.

From there it's business as usual.

Which way is better? That's a personal choice. Personally, I prefer the first
method of using `{{ product | json }}` as it's the approach Shopify have taken
with Dawn and once explained, I believe it's easier to understand.

With the new Dawn theme, it ships with JavaScript that handles what's included
in the basic example in this post. However, if you wanted to extend that then
you have to start editing the base JavaScript that Shopify has shipped with
Dawn.

This isn't a huge issue and in fact is a great way to learn more about the Dawn
theme, but you can easily run into complications. Therefore, I believe it's
better to run Alpine JS alongside the Dawn JavaScript and gradually replace what
it.
