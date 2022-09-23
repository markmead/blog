---
title: Jumpstart JavaScript - Variables
description:
  Beginner friendly overview of how to declare variables in JavaScript.
date: 2022/02/005
tags: [javascript]
---

## Which One Should I Use?

Start out using `const` for every variable and then switch to `let` when the
variable needs to be re-assigned.

Avoid using `var` as it doesn't have block scope.

## Const Overview

Use `const` when you don't want the variable to be re-assigned.

```js
const name = 'John'

name = 'Jane'
```

This will error as the `name` variable cannot be re-assigned.

However, it still allows for mutation on arrays and objects.

```js
// Array
const people = ['John', 'Jane']

people.push('Jim')

// Object
const person = {
  name: 'John',
  age: 20,
}

person.name = 'Jim'
```

Both of these will work and update the variable as it's being mutated, not
re-assigned.

[Understanding Immutability in JavaScript - Kingsley Silas](https://css-tricks.com/understanding-immutability-in-javascript/)

## Let Overview

Use `let` when you want to re-assign the variable.

```js
let name = 'John'

name = 'Jane'
```

The `name` variable will now be "Jane".

## Var Overview

> Avoid using `var` whenever possible as it lacks block scoping.

## What is Block Scope?

In short, a block is defined by curly brackets (`{}`).

The most common of these are functions, if statements and loops.

```js
function addPerson() {}

if (true) {
}

for (let person of people) {
}
```

When using `var` it doesn't have block scoping.

```js
var name = 'John'

function addPerson() {
  name = 'Jane'
}

console.log(name)
```

The `name` variable will now be "Jane" as it was re-assigned in the function.
This is problematic as it becomes difficult to understand where the change
happens.

However, when using `let` or `const` this is not the case.

```js
let name = 'John'

function addPerson() {
  name = 'Jane'
}

console.log(name)
```

The `name` variable will remain as "John".

This scoping allows for the variable names to be reused.

```js
let name = 'John'

function addPerson() {
  let name = 'Jane'

  console.log(name)
}

console.log(name)

addPerson()
```

This is absolutely fine and will result in "John" and "Jane" being logged to the
console.
