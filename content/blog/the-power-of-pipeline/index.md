---
title: "The Power of Pipeline"
date: "2019-10-06 16:26"
description: "The secret of Illuminate(i)."
---

![Pipeline](./pipeline.jpg)
<p style="text-align: center;font-style: italic;font-size: 10px;">Image Copyright to <a href="https://asia.nikkei.com/Business/Business-deals/Australia-rejects-Hong-Kong-group-s-bid-for-pipeline-operator" target="_blank" >https://asia.nikkei.com</a> </p>


Beneath the Illuminate(i) Organization, there is a big secret buried. undocumented, never mentioned, and of course, it's totally secrets.

With the power that secrets brings, That is the right decision of Illuminate(i) leader to keep it secret, from us, from all of the worlds.

To keep the balance of the world, Those decisions have to be made. And it costs a huge sacrifications.

Wait.. This is not conspiracy article! 

![Technical Difficulties](./technical-difficulties.jpg)


<h4 style="text-align: center;">...</h4>


The Pipeline. That's the name.

It basically gives you the ability to pass an _object_ to be processed between several tasks in a fluent way.

It's useful when you need to process an object into several tasks, and only get the result after the object has been  passed all of the tasks.

Twitter, for instance, When someone posted a tweet, Twitter should process that tweet into several "tasks" and save the final tweet into database.

Such as, Converting plain link string into HTML tag so the link will be clickable, escaping potential _XSS_ string, trimming the tweet characters since Twitter only allow 255 characters on each tweet, etc. 

With Pipeline, You can achieve those kinds of tasks in a beautiful way!

----

On Laravel itself, Pipeline is used on several places, The most obvious is `Middleware`. 

Middleware is basically only stacks of classes that run inside a Pipeline to intercept HTTP request & performing some validations before its enters the Controller.

On the Laravel's HTTP Kernel class, You can see the stacks of default Middleware.


```php
/**
 * The application's global HTTP middleware stack.
 *
 * These middleware are run during every request to your application.
 *
 * @var array
 */
protected $middleware = [
    \App\Http\Middleware\TrustProxies::class,
    \App\Http\Middleware\CheckForMaintenanceMode::class,
    \Illuminate\Foundation\Http\Middleware\ValidatePostSize::class,
    \App\Http\Middleware\TrimStrings::class,
    \Illuminate\Foundation\Http\Middleware\ConvertEmptyStringsToNull::class,
];
```

And also you can chek the source code of Laravel's base HTTP Kernel at [Illuminate\Foundation\Http\Kernel](https://github.com/laravel/framework/blob/5.8/src/Illuminate/Foundation/Http/Kernel.php#L140-L152), to see how Laravel runs Middleware before dispatch the Request to the Controller.


```php{14-18}
/**
 * Send the given request through the middleware / router.
 * 
 * @param  \Illuminate\Http\Request  $request
 * @return \Illuminate\Http\Response
 */
protected function sendRequestThroughRouter($request)
{
    $this->app->instance('request', $request);

    Facade::clearResolvedInstance('request');

    $this->bootstrap();

    return (new Pipeline($this->app))
                ->send($request)
                ->through($this->app->shouldSkipMiddleware() ? [] : $this->middleware)
                ->then($this->dispatchToRouter());

}
```

On the Highlighted code above, you can see the Laravel use Pipeline to send the `Request` object through those Middleware stacks, Then finally dispatch the result to the Controller.

So, How actually the Pipeline works? Let's do some real world example, shall we..

----

Ok, Let's say you're building a platform such as Twitter, The user on your platform can post a tweet, sharing a <strike style="font-size: 13px;">porn</strike> funny cat video youtube link, and also doing some badwords.

Since your platform's community guidelines don't allow such actions, and you wanted to keep your platform safe from cyber-security & safe for kids, you need to filter tweet your user posted in.

So you might wrote code somthing like this
```php
/**
 * Post a Tweet!
 *
 * @param  Request $request
 * @return Response
 */
 public function postTweet(Request $request) {

    $tweet = $request->tweet;

    $pipes = [
        ConvertLinkToClickable::class,
        RemoveBadwords::class,
        EscapeStringToPreventXSS::class
    ];

    $pipeline = app(Pipeline::class)
                    ->send($tweet)
                    ->through($pipes)
                    ->then(function($finalTweet) {
                        $this->saveTweetToDatabase($finalTweet);
                    });

    return new Response("Tweet has been posted!");
 }
```

Yeah.. but.. how those Pipeline code looks like?

Alright, so here the explanations. The Pipeline expect an Passable object to proccess, in this case, the `tweet` is the Passable object.

You can pass any objects as a Passable, it can be primitive type such as `string` or `integer`, an Array, PHP's Objects, etc.

The `Closure` used to forward the Passable from current Pipe to the next Pipe, so Pipeline called it `Closure $next`.

And by default, Pipeline use `handle()` method for each pipe, so your pipe code is looks like this

```php
<?php 

namespace Acme\Pipelines;

use Closure;

class RemoveBadWords {

    /**
     * Handle the passable.
     * 
     * @param  mixed   $tweet
     * @param  Closure $next 
     */
     public function handle($tweet, Closure $next) {
         // doing your regex to finds the badwords and remove it!

         return $next($content);
     }
}
```

It looks like the code of Middleware right? It is because Middleware is a Pipe!

Anyway, if you doesn't like the `handle()` method, you can override it by using `via('methodName')` method of the Pipeline, `process` for example

```php{6}
// another code

$pipeline = app(Pipeline::class)
                ->send($tweet)
                ->through($pipes)
                ->via('process')
                ->then(function($finalTweet) {
                    $this->saveTweetToDatabase($finalTweet);
                });

return new Response("Tweet has been posted!");
```

Thus make your Pipe code looks like this

```php

/**
 * Process the passable.
 * 
 * @param  mixed   $tweet
 * @param  Closure $next 
 */
public function process($tweet, Closure $next) {
    // doing your regex to finds the badwords and remove it!

    return $next($content);
}
```

And if you wanted directly pass the result to a variable, you can use `thenReturn()` instead

```php{7}
// another code

$tweet = app(Pipeline::class)
            ->send($tweet)
            ->through($pipes)
            ->via('process')
            ->thenReturn();

return new Response("Tweet has been posted!");
```

So now, the `$tweet` variable become the final tweet value.

---

So that's it the Pipeline! It's actually lots of way to do this kind of things, But just for your information, The tools already exists. So you don't have to build it yourself!

Anyway, That's just a few examples on what the Pipeline able to do. And actually you can do more than that, Such as passing an array to append something later based on some conditions, etc.