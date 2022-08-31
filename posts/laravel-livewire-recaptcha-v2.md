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

Now I can reference them like so.

```php
config('services.recaptcha.key')
config('services.recaptcha.secret')
```

---

## Adding Google reCaptcha

We need to add the Google reCaptcha JavaScript code to our project. Inside the
layout add the following to the `<head>`.

```html
<script
  src="https://www.google.com/recaptcha/api.js?onload=handleRecaptchaLoad&render=explicit"
  async
  defer
></script>
```

Here we're declaring there's an `onload` even called `handleRecaptchaLoad` but
we need to handle that function, here's how we do that.

Add the following before the `</body>` tag.

```html
<script>
  let captchaIds = ['firstRecaptcha', 'secondRecaptcha', 'thirdRecaptcha', 'fourthRecaptcha']

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

**What?**

We have the `handleRecaptchaLoad` function which loops through the `captchaIds`
array and does the following.

- Checks an element exists with the `id`
- Initalises and renders a Google reCaptcha on that element
- Adds a callback to the function created through the Blade component

**Why?**

This allows for multiple Google reCaptcha components on the same page without
them interfering with eachother. If that isn't a requirement for your project
then don't worry, this approach still works.

There's also an event listener on the window listening for a custot event, when
this is triggered it will reset the Google reCaptcha components. This is
required when using Livewire as the page does not reload.

## Google reCaptcha Blade Component

Next, we need to add some markup for the Google reCaptcha to hook into, I've
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

**What?**

- Creating a unique function through the `id` prop
- Pushing that unique function to the `scripts` stack

If you haven't already make sure you add `@stack('scripts')` to your layout.

### Connecting to a Livewire Component

It's time to hook the Google reCaptcha component to Livewire. In this example
I'll be using a Livewire component called `Contact.php`.

First off, add the Blade component to the form within
`livewire/contact.blade.php`.

```html
<form>
  <x-form.recaptcha id="contactRecaptcha" />
</form>
```

Next, we need to add the state and methods to the Livewire component so it can
submit the form and track if the Google reCaptcha has been verified.

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

Notice the use of the `InteractsWithRecaptcha` trait, this isn't required but if
you're working with multiple Google reCaptcha components then it's recommended.
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

The main function `validateRecaptchaRequest` which is called from the Livewire
components `handleRecaptcha` function hits the Google reCaptcha endpoint to
verify the request.

It then gets the response and returns the `success` value which will be either
`true / false`.

On the Livewire component, this value is then used the the `recaptcha` state. If
it returns `false` then the validation will fail when the form is submitted via
the `submitForm` function and an error message will be shown, if it's `true`
then the form will submit.

When the form submits we are using the Livewire function `reset()` to reset the
Livewire components state and then calling the `resetRecaptchaComponent` on the
trait, this uses the Livewire `dispatchBrowserEvent` function to emit the event
`reset-google-recaptcha` to the window.

This is then listened for in the global JavaScript that was added to the layout
and resets all the Google reCaptcha components.
