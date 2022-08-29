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

##

First, we need to add the Google reCaptcha JavaScript code to our project.
Inside the layout add the following to the `<head>`.

```html
<script
  src="https://www.google.com/recaptcha/api.js?onload=handleRecaptchaLoad&render=explicit"
  async
  defer
></script>
```

Here we're declaring there's an `onload` even called `handleRecaptchaLoad`.

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

**What's happening here?**

- Creating a unique function through the `id` prop
- Pushing that unique function to the `scripts` stack

If you haven't already make sure you add `@stack('scripts')` to your layout.

We need to handle the `handleRecaptchaLoad` function. Here's how we do that.

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

**What is this doing?**

First, we have the `handleRecaptchaLoad` function which loops through the
`captchaIds` and does the following.

- Checks an element exists with the `id`
- Initalises and renders a Google reCaptcha on that element
- Adds a callback to the function created through the Blade component

Why this approach?

This allows for multiple Google reCaptcha components on the same page without
them interfering with eachother. If that isn't a requirement for your project
then don't worry, this approach still works.

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
            'state.accepted' => 'reCaptcha is required.',
        ];
    }

    public function handleRecaptcha($captchaToken)
    {
        $this->state['recaptcha'] = $this->validateRecaptchaRequest($captchaToken);
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
