---
title: How to Add to the Shopify Cart with Alpine JS
description: Use Alpine JS to add to the Shopify cart without a page refresh.
date: 2021/12/10
tags: [alpinejs, javascript, shopify]
---

This uses the v3 version of Alpine JS and makes use of the built-in store.

I highly recommend this approach as the store can be used for other parts of the
website.

```js
import Alpine from 'alpinejs'

window.Alpine = Alpine

Alpine.store('cart', {
  data: [],

  add() {
    let variant = Alpine.store('variant').selected
    let quantity = Alpine.store('quantity').count

    if (!variant) return

    let cartData = { id: variant.id, quantity: quantity }

    fetch('/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cartData),
    })
      .then((response) => {
        if (response.ok) {
        }
      })
      .catch((error) => console.error(error))
  }
}

Alpine.store('variant', {
  selected: null,

  set(variant) {
    this.selected = variant
  }
})

Alpine.store('quantity', {
  count: 1,

  set(quantity) {
    this.count = quantity
  }
})
```

So why are we using three stores to manage a simple add to cart?

### Cart Store

This not only holds the add to cart function, but it also holds all the store
data in its `data` variable which can be accessed with `$store.cart.data` in
HTML or with `Alpine.store('cart').data` in a JavaScript.

The function to set the value of this variable is not shown in this example, but
here is how it would look:

```js
get() {
  fetch('/cart.js')
    .then((response) => response.json())
    .then((data) => (this.data = data))
    .catch((error) => console.error(error))
}
```

So when we add to cart we could use `Alpine.store('cart').get()` to update that
variable.

### Variant Store

This is an important one as it tracks the currently selected variant in its
`selected` variable.

We can then use this variable to show information about the currently selected
variant in the HTML, a common example would be to update the product image.

You can find out more about managing the current variant with the Alpine JS
store on the following post:

### Quantity Store

This one could easily be seen as pointless and in truth, it probably is.

However, it means I'm not having to grab the quantity input value and then pass
it through to a function in the store. This might not sound bad, but it can
cause confusion on where these values are coming from.

Here's a faked product form in Shopify that we will base our work on:

```html
<form>
  <div>
    <label for="quantity"> Quantity </label>

    <input
      type="number"
      id="quantity"
      name="quantity"
      x-model="$store.quantity.count"
    />
  </div>

  <button type="submit" id="submit" @click.prevent="addToCart">
    Add to Cart
  </button>
</form>

<script>
  function addToCart() {
    Alpine.store('cart').add()
  }
</script>
```

And that's it. There's no need for some JavaScript other than what we have added
in the Alpine JS stores.

You can probably even remove the `<script>` tag and use
`@click.prevent="$store.cart.add()"` but that's entirely up to you.
