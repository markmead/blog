---
title: How to Add to the Shopify Cart with Alpine JS
description: Use Alpine JS to add to the Shopify cart without a page refresh.
date: 2022/04/10
tags: [alpinejs, javascript, shopify]
---

This is the approach I take when using Alpine JS with Shopify, is it the
easiest? No. However, it provides the most flexibility and ability to scale the
frontend of your Shopify store to use more JavaScript.

You can also read the JavaScript approach.

[How to Add to the Shopify Cart with Vanilla JS](/posts/javascript-shopify-add-to-cart)

Let's write some code. I'll assume you have Alpine JS installed.

```js
Alpine.store('cart', {
  data: [],

  add() {
    let variant = Alpine.store('variant').selected
    let quantity = Alpine.store('quantity').count

    if (! variant) return

    let cartData = {
      id: variant.id,
      quantity: quantity
      }

    fetch('/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cartData),
    })
      .then((response) => {
        if (response.ok) {
          // 🚀
        } else {
          // 🫠
        }
      })
      .catch((error) => {
        // 🫠
      })
  }
}

Alpine.store('variant', {
  selected: null,

  set (variant) {
    this.selected = variant
  }
})

Alpine.store('quantity', {
  count: 1,

  set (quantity) {
    this.count = quantity
  }
})
```

You might be thinking...

> What?

And yes, it is quite a lot for what we're doing but remember, this approach
offers flexibility.

Let's break it down.

### Cart Store

This is the main store, it has two important pieces:

- Holds the shopify cart data

This can be accessed with `$store.cart.data` in HTML and
Alpine.store('cart').data` in a JavaScript.

- Has the add to cart function

There is one thing left out of this example, the function that fetches the
Shopify cart data and saves it to the Alpine JS store. That would look like
this.

```js
get() {
  fetch('/cart.js')
    .then((response) => response.json())
    .then((data) => (this.data = data))
    .catch((error) => console.error(error))
}
```

Therefore, when the `add()` function is called we can call
`Alpine.store('cart').get()` to update the store Shopify cart data.

### Variant Store

This tracks the currently selected variant.

We can then use the store to get information about the variant from, it can even
be used for functionality such as changing images when a variant is selected on
the product page.

### Quantity Store

This is the one store that could be ignored. However, it offers an easier way to
get the chosen quantity from the product form.

Here's some HTML to show how it can be used.

```html
<form x-on:submit.prevent="$store.cart.add()">
  <div>
    <label for="ProductQty"> Quantity </label>

    <input type="number" id="ProductQty" x-model="$store.quantity.count" />
  </div>

  <button type="submit"> Add to Cart </button>
</form>
```

If the `add()` function doesn't get called you can add the following.

```html
<script>
  function addToCart() {
    Alpine.store('cart').add()
  }
</script>
```

And then call `addToCart` in the `x-on:submit`.

---

And there we have it, Alpine JS powered Shopify add to cart with some extra
features to offer extended flexibility to the frontend of the store.
