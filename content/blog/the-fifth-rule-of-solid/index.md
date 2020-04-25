---
title: "The Fifth Rule of SOLID"
date: "2020-04-25 19:04"
description: "Is that even a thing?"
---

Ahh, It's good to be back to having the vibe to write..

By the way, today is a good day though, watching the &frac13; of sunset from my room while waiting to break the fast. <span style="font-size: 5px"> I didn't fast though, shhhh..</span>

The sunlight passing through the window of my room, building the siluet of my shadow, the orange color reach the floor bend the light, make the whole room feels warm & comfort.

![Sunlight passing through window.](./kristijan-arsov-m30-rEqPCAQ-unsplash.jpg)

<p style="text-align: center;font-size: 10px"><a href="https://unsplash.com/@aarsoph?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge" target="_blank">Photo by Kristijan Arsov on Unsplash</a></p>

Yes, it's only &frac13;, the rest is covered by _under construction_ building.

Alright, where were we,

Oh yeah, the **5th** rule of the SOLID.

If you haven't already know what SOLID is, below is the good articles to read

- [https://hackernoon.com/solid-principles-simple-and-easy-explanation-f57d86c47a7f](https://hackernoon.com/solid-principles-simple-and-easy-explanation-f57d86c47a7f)
- [https://scotch.io/bar-talk/s-o-l-i-d-the-first-five-principles-of-object-oriented-design#toc-interface-segregation-principle](https://scotch.io/bar-talk/s-o-l-i-d-the-first-five-principles-of-object-oriented-design#toc-interface-segregation-principle)

---

What I'am gonna talk about right now is the 5TH rule of SOLID the **D** (Dependency Inversion Principle).

> High-level modules should not depend on low-level modules. Both should depend on abstractions.
> Abstractions should not depend on details. Details should depend on abstractions.

Ohh dude! what those words even means!

Yeah, I don't understand either when I first read those "DESCRIPTIONS" about what the Dependency Inversion is.

Although the description seems very scary, but the idea is actually very simple though, That make me think  why do they make such "DESCRIPTION" that no one is barely understand 🤦.

If you read the article above by Hackernoon, that there's common misunderstanding about the Dependency Inversion is the another way to say the Dependency Injection are not the same, It's  true!

I often heard someone saying it, But it is not the same, It's totally different though.

Yes, I know.. the fact that Dependency Inversion is **USING** the Dependency Injection, but it's different!

Here's what Dependency Injection looks like

```php
<?php

class UserController extends Controller {

    public function __construct(UserRepository $userRepository) {
        //
    }
}
```

And this is what the Dependency Inversion looks like

```php
<?php

class UserController extends Controller {

    public function __construct(UserRepository $userRepository) {
        //
    }
}
```

Yes! That's exactly the same code, but the concept behind it is different.

When you _inject_ the `UserRepository` into the `UserController` constructor, that's what called the Dependency Injection, You inject dependencies on the class constructor.

But the `UserRepository` itself is the thing that should be the Dependency Inversion!

Chad: What do you mean dude!

Me: Ehhh, let me finish this first, Chad! <span style="font-size: 5px;">what a pathetic!</span>

As I already mention that the `Dependency Inversion` is **USING** the `Dependency Injection` that is what I mean!

The `Dependency Inversion` is injected using `Dependency Injection` to the `UserController` class!

I know it's bad reference haha. but please don't leave yet! let me explain what's going on here.

---

Alright!

Here the thing, the `UserController` class, does not necessarily know about `where` the User Data on the `UserRepository` is coming from.

It might from the MySQL database, the GraphQL API, the 3rd party AD, LDAP, etc, doesn't matter.

The `UserController` only needs to know about how to retrieve it from the `Abstractions`, yes the `UserRepository` is the abstraction on the Dependency Inversion world.

Chad: But what is the `Abstraction` then?

I prefer calling the Abstraction as a `Contract`, The Contract between the `Data Source` like MySQL, GraphQL, etc & the Application itself.

Imagine this scenario

MySQL: _Hey, you know what App, The user data will be stored in my body, hahaha, now you need to find a way how to retrieve it from my body_ 😈

Application: _Don't underestimate me you dork! You need to sign this contract first before you can entering me_ 📝

MySQL: W..what?!

Contract: _Behold! This is the contract  you need to sign MySQL!_

```php
<?php

interface UserRepository {

    public function find($id);

    public function get();

    public function create(array $data);

    public function update($id, array $data);

    public function delete($id);
}
```

Dev: _Ah shit! here we go again.._

The dawn has come, the MySQL sign the contract, and this what it looks like.

```php
<?php

use Contracts\UserRepository;

class MySQLUserRepository implements UserRepository {

    public function find($id) {
        $query = "SELECT * FROM users WHERE......";
    }

    public function get() {
        $query = "SELECT * FROM users.....";
    }

    public function create(array $data) {
        $query = "INSERT INTO users (......)";
    }

    public function update($id, array $data) {
        $query = "UPDATE users SET ......";
    }

    public function delete($id) {
        $query = "DELETE FROM users ......";
    }
}
```

That's what Dependency Inversion in a nutshell. But wait, that's all but only the surface! hahaha!

And now is the Dev job to tell the Dependency Injection engine to do `when` the `UserController` needs `UserRepository`, give them `MySQLUserRepository`.

Maybe :

```php
<?php

// This code is somehow the entry point on the Application,
// that's considered the right place to boot the Dependency Injection

$di = new FakeDependencyInjectionEngine();

// Tell the DI to do exactly when the UserRepository is needed,
// give the MySQLUserRepository implementation instead
$di->when(UserRepository::class)->isNeeded()->give(MySQLUserRepository::class);

$di->boot();
```

So now, when the `UserController`

```php
<?php

use Contracts\UserRepository;

class UserController extends Controller {

    public function __construct(UserRepository $userRepository) {
        // What is UserRepository? I don't care!

        $this->userRepository = $userRepository; // MySQLUserRepository instance.
    }
}
```

And that's what it means by "High-level modules should not depend on low-level modules", the `UserController` is the high-level module, while the `MySQLUserRepository` is the low-level module.

The `UserController` indeed depends on `MySQLUserRepository` repository to retrieve the user data, but, It's not directly inject the `MySQLUserRepository` into its constructor.

The Class inject the `abstraction` or `contract` instead, which in this case is the `UserRepository`.

But what the benefit of doing such thing?! Isn't it just waste of time?

Indeed, but not entirely wasting your time. It will save your ass in the future!

Imagine this scena.. okay! I stop you right there! I'm done with the conversational things, but here the thing.

Hey it's 2030, everything is `SomeNewHighPowerfullDBEngine` now, is MySQL still a thing?

And then your client tell your boss that their website is very slow due to bottleneck on the Single-master-slave READ MySQL node, and the uptime checker always alert you every 1 hour that the website goes down.

Your boss come to you, yes you Developer!

And your boss said "_Why don't we move to the new `SomeNewHighPowerfullDBEngine`_" yet! Everybody does that!

> I GIVE YOU 3 DAYS TO COMPLETE THE TASK

And the Project Manager said "_There is no way that we can rewrite all the queries on the entire codebase in 3 days, what do we do!_"

Luckily, your dev team has been implemented the SOLI**D**, so the migration doesn't necessarily that hard.

And then you start the implementation of the `SomeNewHighPowerfullDBEngine`.

```php
<?php

use Contracts\UserRepository;

class SomeNewHighPowerfullDBEngineUserRepository implements UserRepository {

    public function find($id) {
        $query = "THIS QUERY DOES NOT EVEN MAKE SENSE YET SINCE THE DB ENGINE STILL CLASSIFIED BECAUSE ITS STILL 2020";
    }

    public function get() {
        $query = "THIS QUERY DOES NOT EVEN MAKE SENSE YET SINCE THE DB ENGINE STILL CLASSIFIED BECAUSE ITS STILL 2020";
    }

    public function create(array $data) {
        $query = "THIS QUERY DOES NOT EVEN MAKE SENSE YET SINCE THE DB ENGINE STILL CLASSIFIED BECAUSE ITS STILL 2020";
    }

    public function update($id, array $data) {
        $query = "THIS QUERY DOES NOT EVEN MAKE SENSE YET SINCE THE DB ENGINE STILL CLASSIFIED BECAUSE ITS STILL 2020";
    }

    public function delete($id) {
        $query = "THIS QUERY DOES NOT EVEN MAKE SENSE YET SINCE THE DB ENGINE STILL CLASSIFIED BECAUSE ITS STILL 2020";
    }
    }
}
```

Oh great! you sucessfully sign the  `SomeNewHighPowerfullDBEngine` contract!

Oh yes, we need to register it to the Dependency Injection engine

```php
<?php

// This code is somehow the entry point on the Application,
// that's considered the right place to boot the Dependency Injection

$di = new FakeDependencyInjectionEngine();

// Tell the DI to do exactly when the UserRepository is needed,
// give the MySQLUserRepository implementation instead
$di->when(UserRepository::class)->isNeeded()->give(SomeNewHighPowerfullDBEngineUserRepository::class);

$di->boot();
```

Great! now every class in your Application that requires `UserRepository` on their constructor will receive the `SomeNewHighPowerfullDBEngineUserRepository` instance, instead of `MySQLUserRepository`.

What a great day! You don't need to rewrite the entire class constructor to change the `MySQLUserRepository` to `SomeNewHighPowerfullDBEngineUserRepository`, you just need to change the Dependency Injection engine behaviour.

Your dev team happy, your boss happy, your client happy, you get pay ris-- nvm.

And that's it! You officially implented the Dependency Inversion! Congratulations!

---

All of codes in this post is fake. They are no working codes, it just used to explain the thing.

Anyway, if you looking for a great PHP Dependency Injection library here's some:

- [https://github.com/PHP-DI/PHP-DI](https://github.com/PHP-DI/PHP-DI)
- [https://github.com/auraphp/Aura.Di](https://github.com/auraphp/Aura.Di)
- [https://github.com/symfony/dependency-injection](https://github.com/symfony/dependency-injection)

If you're using Laravel, it shipped with the powerfull Dependency Injection, so you doesn't need 3rd party library, its in the box.

Talking about Laravel, Laravel has lots of Dependency Inversion components on it, almost everything is based on the `Abstraction` or `Contracts`, you can find the list on the Laravel documentation page [https://laravel.com/docs/7.x/contracts](https://laravel.com/docs/7.x/contracts).

Anyway, Thank you very much for reading this article. Love you ❤️
