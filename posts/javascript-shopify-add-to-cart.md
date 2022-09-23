---
title: How to Add to the Shopify Cart with Vanilla JS
description: Use vanilla JS to add to the Shopify cart without a page refresh.
date: 2021/12/10
tags: [javascript, shopify]
---

So you have a Shopify store, it's fast, making sales but then the client asks...

> Can we allow customers to add to cart from the collection page?

Panic. But don't, it's a simple addition that we can do with vanilla JavaScript.

Here's the function we can use.

```js
function addToCart(id, quantity = 1) {
  let cartData = {
    id: id,
    quantity: quantity,
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
```

What is this doing? Not a lot...

- Takes in data
- Converts data to a JavaScript object
- Send that data to Shopify API endpoint
- Handle response and error

It's a very simple JavaScript function, the complexity is what to do based on
the response but that is up to you and the needs of your project.

> How do I call that function?

Great question, here's some HTML. It's a form in the style of what you might
find on a Shopify store.

```html
<form id="ProductForm">
  <div>
    <label for="ProductQty"> Quantity </label>

    <input type="number" id="ProductQty" />
  </div>

  <div>
    <label for="ProductId"> Quantity </label>

    <input
      type="hidden"
      id="ProductId"
      value="{{ product.selected_or_first_available_variant.id }}"
    />
  </div>

  <button type="submit"> Add to Cart </button>
</form>
```

You can then write the following JavaScript to take the data from the form and
send it to the function we created earlier.

```js
let formEl = document.getElementById('ProductForm')
let formQty = document.getElementyById('ProductQty').value
let formVariant = document
  .getElementById('ProductId')
  .getAttribute('data-variant-id')

submitButton.addEventListener('click', (event) => {
  event.preventDefault()

  addToCart(formVariant, formQty)
})
```

It's now all connected up, submit the form and the product will be added to the
cart via JavaScript 🚀

---

## Using Aysnc Await

It's also possible to use `async` `await`, here's how that could look.

```js
async function addToCart(id, quantity = 1) {
  let cartData = {
    id: id,
    quantity: 1,
  }

  let { response } = await fetch('/cart/add.js', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cartData),
  })

  if (response.ok) {
    // 🚀
  } else {
    // 🫠
  }
}
```
