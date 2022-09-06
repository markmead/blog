---
title: How to Use Google reCaptcha v2 with Livewire
description: How you can fix Livewire ignoring your localized routes.
date: 2022/5/25
tags: [laravel, livewire]
---

**Before you can write any code you'll need to be setup with Google reCaptcha.**

When you're setup you'll want to add the Google reCaptcha API key and secret to
the project, I've added mine in `config/services.php`.

```php
'recaptcha' => [
    'key' => env('RECAPTCHA_API_KEY'),
    'secret' => env('RECAPTCHA_SECRET_KEY'),
],
```

Now we can reference them like so.

```php
config('services.recaptcha.key')
config('services.recaptcha.secret')
```

---

## Initialising Google reCaptcha

We need to add the Google reCaptcha JavaScript code to our project. Inside the
layout add the following to the `<head>`.

```html
<script
  src="https://www.google.com/recaptcha/api.js?onload=handleRecaptchaLoad&render=explicit"
  async
  defer
></script>
```

Here we're declaring there's an `onload` event which triggers the `handleRecaptchaLoad` function.

Add the following before the `</body>` tag.

```html
<script>
  let captchaIds = ['recaptchaA', 'recaptchaB', 'recaptchaC', 'recaptchaD']

  function handleRecaptchaLoad() {
      captchaIds.forEach((captchaId) => {
          if (!document.getElementById(captchaId)) {
              return
          }

          grecaptcha.render(
              captchaId, {
                  'sitekey': '{{ config('services.recaptcha.key') }}',
                  'callback': `${captchaId}Submit`
              }
          )
      });
  };

    window.addEventListener('reset-google-recaptcha', () => {
        captchaIds.forEach((captchaId) => {
            if (!document.getElementById(captchaId)) {
                return
            }

            grecaptcha.reset(captchaId)
        });
    })
</script>
```

**What's Happening?**

The `handleRecaptchaLoad` function loops through the `captchaIds`
array and does the following.

- Checks an element exists with that `id`
- Initalises and renders a Google reCaptcha on that element
- Adds a callback to the function based on the `id`

This will create callback function name such as `recaptchaASubmit`.

**Why This Approach?**

This allows for multiple Google reCaptcha components on the same page without
them interfering with eachother.

It works fine with a single Google reCaptcha component as well, but if you want to remove the extra code, you do this.

```js
  function handleRecaptchaLoad() {
    grecaptcha.render(
        captchaId, {
            'sitekey': '{{ config('services.recaptcha.key') }}',
            'callback': 'recaptchaComponentSubmit'
        }
    )
  };

    window.addEventListener('reset-google-recaptcha', () => {
        grecaptcha.reset('recaptchaComponentSubmit')
    })
```

There's an event listener on the window which listens for a custom event `reset-google-recaptcha`, when
this is triggered it will reset the Google reCaptcha components. This is
required when using Livewire as the page does not reload.

## Google reCaptcha Blade Component

We need to add some markup for the Google reCaptcha to hook into, I've
done this as a Blade component.

```shell
@props(['id'])

@push('scripts')
    <script>
        function {{ $id }}Submit(captchaToken) {
            @this.handleRecaptcha(captchaToken)
        }
    </script>
@endpush

<div>
    <div id="{{ $id }}"
         wire:ignore></div>

    @error('recaptcha')
        {{ $message }}
    @enderror
</div>
```

**What's Happening?**

This component accepts a single prop of `id` and does the following:

- Creating a unique function through the `id` prop
- Pushing that unique function to the `scripts` stack

This unique function matches up to the callback functions declared in the `handleRecaptchaLoad` function.

**Talking to Livewire**

Through the use of `@this.handleRecaptcha(captchaToken)` we are passing the response from the Google reCaptcha (`captchaToken`) to Livewire.

_If you haven't already make sure you add `@stack('scripts')` to your layout._

### Connecting to a Livewire Component

We now need to hook the Google reCaptcha component to Livewire. In this example
I'll be using a Livewire component called `Contact.php`.

First, we need to add the Blade component to the form within
`livewire/contact.blade.php`.

```html
<form>
  <x-form.recaptcha id="contactRecaptcha" />
</form>
```

On the Livewire component it needs state and methods so it can track if the Google reCaptcha has been verified and handle submitting the form.

```php
class Contact extends Component
{
    use InteractsWithRecaptcha;

    public $recaptcha = false;

    protected $rules = [
        'recaptcha' => 'accepted',
    ];

    protected function messages()
    {
        return [
            'recaptcha.accepted' => 'reCaptcha is required.',
        ];
    }

    public function handleRecaptcha($captchaToken)
    {
        $this->recaptcha = $this->validateRecaptchaRequest($captchaToken);
    }

    public function submitForm()
    {
        $this->validate();

        $this->reset();

        $this->resetRecaptchaComponent();

        session()->flash('contact.success', 'Message sent!');
    }

    public function render()
    {
        return view('livewire.contact');
    }
}
```

We're using a custom trait called `InteractsWithRecaptcha`.

It's not required but if you're working with multiple Google reCaptcha components then it's recommended.

Here's what that looks like.

```php
trait InteractsWithRecaptcha
{
    public function validateRecaptchaRequest($captchaToken)
    {
        $captchaResponse = Http::asForm()->post('https://www.google.com/recaptcha/api/siteverify', [
            'secret' => config('services.recaptcha.secret'),
            'response' => $captchaToken,
        ])->json();

        return $captchaResponse['success'];
    }

    public function resetRecaptchaComponent()
    {
        $this->dispatchBrowserEvent('reset-google-recaptcha');
    }
}
```

In the `handleRecaptcha` function on the Livewire component we are calling `validateRecaptchaRequest` which hits the Google reCaptcha API endpoint to verify the request and return if it was a successful or not.

On the Livewire component, the returned value from the API becomes the `recaptcha` state. 

If it returns `false` then the validation will fail when the form is submitted, if it's `true`
then the form will submit.

When the form submits we are using the Livewire function `reset()` to reset the
Livewire components state, we are then calling the `resetRecaptchaComponent` on the
trait, which uses the Livewire `dispatchBrowserEvent` function to emit the event
`reset-google-recaptcha` to the DOM window.

When `reset-google-recaptcha` is triggered it resets the Google reCaptcha components.

---

And there we have it, a working Google reCaptcha with Livewire.

Hopefully this isn't too confusing, there's a lot of pieces talking to eachother spread across files, but once the logic has been added to the project it becomes a lot easier to follow.

