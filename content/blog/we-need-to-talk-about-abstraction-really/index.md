---
title: "We need to talk about Abstraction, Now!"
date: "2020-07-11 05:13"
description: "Put those jumble if-else, switch-case down! now!"
---

Aww yeah! just another "hundreds" days since the last post, I really do a GrEaT jOb on those  so-called "consistent-writing".

Well-- Things got f*cked up lately, and just redirect my "dark" energy to write about "abstract"-ion here, such a coincidence? I don't think so.

---

*What makes you write this time?*

Well, I've been going through my old code, And as you might expected.. **wHo WrItE ThIs CrAp!** are the very-first thing I said when I see it.

It's not that bad though, In fact the code have been generated lots of money, It's just that, some "giggly" feels on my guts that came from my _so-called_ _immature_-perfection.

That time.. The only thing I care is whether the code is works, or not, There's no aesthetics going on, so you can show off to your twitter handle with the [carbon.now.sh](http://carbon.now.sh) code snapshot, Like a pro.

I do talk much lately, to myself, in front of the mirror, to keep my sanity.

Well, being **1,700KM** apart from my family in this kind of situation really drain my sanity. I need to support myself in every kind of situation.

Let's talk about what did I do in this 3 months of burden, _mostly_.

First thing, I lost access to the gym, where I wish i did come 3 times a week, consistently, before this quarantine.

Lost my "barely-noticeable" muscle mass, gain 2,5KG of pure fats, too bad, it is what it is. Let's move on.

Lost my chance to be with my family on this year "HARI RAYA", which I ended up just looking on my dark screen of terminal all day, trying to distract myself from the tastiness of the _ketupat_ & _opor ayam_, and the most important is the _rendang_, the Indonesian rendang, not the _Negeri Sembilan_ rendang.

But, aside from my loss, I do learn lots of new things though, the things that I thought is really boring and doesn't have a real values on real life.

**The Music Theory**

What?! am I such a nerd?!!

I don't think so much about this before, because the society that shaped me till today always said that, just practice, don't learn theories!!!!

Just noodling around, playing some partial-classical-pieces that I haven't finished learning and I barely understand what is am I playing at this moment, It sucks, Really!

And the Music Theory open my eyes, bring more colors to my playing, to my life, my sad-life. I might talk about that on another posts, "hundreds"-days from now. HAHA.

And I do watch lots of so-called "basic fashion" to learn how to properly get dressed, to looks more like human, than a pile of _triglycerides_.

Ah, Crap! Just talking nonsense about the sadness of my lifetime that doesn't even matter on the scale of The Universe™.

---

### Let's talk about real thing.

Here the thing, The old code that I talked about is a "masterpiece" _that time_, that I quite proud about what did I acomplish on that project.

It's an e-commerce project that sells some distro t-shirt that produced by local merchant called "home-industry" on my village back on the Indonesia.

It does accept several payment methods, The classic bank-transfer, the e-wallet called "Go-Pay", and credit card.

The logic is really-really simple. Just

```php
<?php

class Checkout {

    .....

    public function pay(Request $request) {
        switch($request->payment_method) {
            case 'go-pay':
                return redirect()->away('https://this-is-the-go-pay-website.com/pay?blabla&amount=onemilliondollar');
                break;
            case 'bank-transfer':
                return redirect()->away('http://some-bank-transfer-processor.com/');
                break;
            case 'credit-card':
                return redirect()->away('http://some-cc-processor.com/');
                break;
            default:
                return redirect()->back()->withErrors(........);
        }
    }
}
```

 \* _not real code just an example_

Well, the code work of course, but come with bunch of switch-case sitting around, waiting for bugs to terrorize your codebase,

We surely can do better, don't we?

Some of you might think to separate it in a `Traits`, but trust me, it only brings more damage than the good.

This is where the abstraction come really handy, But please be careful with Abstraction, people tends to overuse it.

This resulting into building an abstraction, that extends on another abstractions, that yet, implements another abstractions, that extends another abstraction.

Let's make this as simple as possible, shall we.

Since I using Laravel, I will use the power of the [Laravel Service Container](https://laravel.com/docs/7.x/container) to build this kind of abstraction.

So here the case, We need to build multiple payment method, using different payment provider, so let's build the interface to acommodate this.

```php
<?php

namespace App\Contracts;

interface PaymentMethod {

    public function pay(Order $order);

}
```

It's obviouse that payment method is for `paying` an `order` so we create a `pay()` method that accepts `Order` instance that we can process next.

But wait, how does the payment method instance know what to do, at `pre`, & `post` payment? Let's add that methods signature to our interface.

```php
<?php

public function prePayment(Order $order);

public function postPayment(Order $order);
```

Nice! The Interface now have an ability to doing something before & after the payment completion.

This is the complete Interface

```php
<?php

namespace App\Contracts;

interface PaymentMethod {

    public function pay(Order $order);

    public function prePayment(Order $order);

    public function postPayment(Order $order);

}
```

So, the question is, how can that interface helps us to refactor the jumble bunch of switch-case?

Say hello to the `Registry`!

```php
<?php

namespace App\Registries;

use App\Contracts\PaymentMethod;

class PaymentMethodRegistry {

   /**
    * The registered payment methods.
    *
    * @var  array $paymentMethods
    */
    protected $paymentMethods = [];

    /**
    * Register new PaymentMethod instance.
    *
    * @param  string        $key
    * @param  PaymentMethod $paymentMethod
    * @param  bool          $override
    * @return void
    */
    public function register($key, PaymentMethod $paymentMethod, $override = false) {

        if( $this->has($key) ) {

            $this->paymentMethods[$key] = ($override)
                ? $paymentMethod
                : $this->paymentMethods[$key];
        }
        else
        {
            $this->paymentMethods[$key] = $paymentMethod;
        }

    }

    /**
    * Determine if the PaymentMethod with the given key exists.
    *
    * @param  string $key
    * @return bool
    */
    public function has($key) {
        return (bool) isset($this->paymentMethods[$key]);
    }

    /**
    * Get the PaymentMethod with its key.
    *
    * @param  string $key
    * @return PaymentMethod|null
    */
    public function get($key) {
        if( $this->has($key) ) return $this->paymentMethods[$key];
    }
}
```

Now each of the PaymentMethod can have it's own class, and do whatever they want with it!

```php
<?php

namespace App\PaymentMethods;

use App\Contracts\PaymentMethod;

class GopayPaymentMethod implements PaymentMethod {

    public function pay(Order $order) {
        // do something to process the payment
    }

    public function prePayment(Order $order) {
        // do something before the payment.
    }

    public function postPayment(Order $order) {
        // do something after the payment.
    }
}
```

And you might know register the payment method to the `Registry` on your ServiceProvider somewhere.

```php
<?php

namespace App\Providers;

use App\Registries\PaymentMethodRegistry;

class PaymentMethodServiceProvider {

    public function register() {
        app(PaymentMethodRegistry::class)->register('go-pay', new GopayPaymentMethod());

        // And registering the remaining payment method.
        app(PaymentMethodRegistry::class)->register('bank-transfer', new BankTransferPaymentMethod());
        app(PaymentMethodRegistry::class)->register('credit-card', new CreditCardPaymentMethod());
    }

}
```
That's basically all of it! Now you just need to change those bunch of switch-case code to this much simpler code.

```php
<?php

class Checkout {

    .....

    public function pay(Request $request) {
        if( ! app(PaymentMethodRegistry::class)->has($request->payment_method) )
            return redirect()->back()->withErrors(.......);

        // Processing the payment...
        app(PaymentMethodRegistry::class)->get($request->payment_method)->pay($order);

        // Giving back the payment response...
        return response(......);
    }

}
```

Much simpler and maintainable, isn't it?

Let's break down what's going on here.

The central point is the `PaymentMethodRegistry` where all of the actual replacement of `switch-case` happen, when the `get()` method of the `PaymentMethodRegistry` get called, it will return the implementation of corresponding payment method instance.

For example when you run code like `app(PaymentMethodRegistry::class)->get('go-pay')` it will return the instanceof `GopayPaymentMethod`, and since the `GopayPaymentMethod` implements the `PaymentMethod` interface, you now have access to all of those interface method signatures.

The other way to visualize it is like this
```php
<?php

$gopayPaymentMethod = app(PaymentMethodRegistry::class)->get('go-pay');

// pay the order using GopayPaymentMethod.
$gopayPaymentMethod->pay($order);

// or this way
$creditCardPaymentMethod = app(PaymentMethodRegistry::class)->get('credit-card');

// pay the order using CreditCardPaymentMethod.
$creditCardPaymentMethod->pay($order);
```

That's a hardcoded payment method key, but since the payment method key come from the `Request` object, we just need to validate the existence of the `PaymentMethod` implementation, and then call the `pay()` method of the implementation.

```php

if( app(PaymentMethodRegistry::class)->has($request->payment_method) ) {

    $paymentMethod = app(PaymentMethodRegistry::class)->get($request->payment_method);

    // The $paymentMethod can be anything, it can be Gopay, BankTransfer, or CreditCard.
    // but it doesn't matter, since it's implements the PaymentMethod interface,
    // we can confidently call the pay() method.
    $paymentMethod->pay($order);

}
```

That's why it's called an Abstraction, because the code doesn't necessarily need to know what is the actual implementation, of the object, it just need to validate that those certain object is an implementation of such an abstraction.

In this case, The `Checkout` class doesn't care about what is the actual payment method is, what does it care is only the object is implementing the `PaymentMethod` interface/abstraction or not.

That's why, In my Opinion, it's better this way, for the sake of maintainability & code aesthetics. HAHA.

Also, when something wrong about the certain payment method, you can just directly go to its class, for example the error-rate from the GopayPaymentMethod are raising up, so you need to figure it out fast what is wrong.

So you hit the `CTRL-P` on your editor and heading to the `GopayPaymentMethod` class directly, without needing to debug it one-by-one through abundance of switch-case.

That's it.

/fin
