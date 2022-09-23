---
title: How to Add to the Shopify Cart with Vanilla JS
description: Use vanilla JS to add to the Shopify cart without a page refresh.
date: 2021/12/10
tags: [javascript, shopify]
---

Here we are creating an add to cart function that accepts an `id` and a
`quantity` which we will pass on form submit.

```js
function addToCart(variantId, quantity = 1) {
  let cartData = { id: variantId, quantity: quantity }

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
```

Here's a faked product form in Shopify that we will base our work on:

```html
<form>
  <div>
    <label for="quantity"> Quantity </label>

    <input type="number" id="quantity" name="quantity" />
  </div>

  <button
    type="submit"
    id="submit"
    data-variant-id="{{ product.selected_or_first_available_variant.id }}"
  >
    Add to Cart
  </button>
</form>
```

You can then write the following JavaScript to grab the data needed and then
pass it through to the function on form submit.

It's possible and probably better to listen to the form submit, but this seems
to be the more common approach.

```js
let quantityInput = document.getElementyById('quantity')
let submitButton = document.getElementById('submit')

let variantId = submitButton.getAttribute('data-variant-id')
let quantity = quantityInput.value

submitButton.addEventListener('click', (event) => {
  event.preventDefault()

  addToCart(variantId, quantity)
})
```

This will grab all the information needed from the form and pass that to the
`addToCart` function.

It also triggers `event.preventDefault()` so the form doesn't submit as we are
using `type="submit"` on the button. The reason for this is so that with
JavaScript disabled the product form will still work.

---

It's also possible to use async/await... 👀

## Aysnc Await Shopify Cart

```js
async function getCart() {
  let { response } = await fetch('/cart.js')
  let { data } = response
}

async function addToCart() {
  let cartData = { id: variant.id, quantity: 1 }

  let { response } = await fetch('/cart/add.js', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cartData),
  })

  response.ok && getCart()
}

async function removeFromCart() {
  let cartData = { line: index, quantity: 0 }

  let { response } = await fetch('/cart/change.js', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cartData),
  })

  response.ok && getCart()
}
```
