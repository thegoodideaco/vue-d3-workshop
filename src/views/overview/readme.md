# Overview

This is an overview of how these two libraries work together

## Vue

Vue (pronounced `/vjuː/`, like view) is a **progressive framework** for building user interfaces. It is designed from the ground up to be incrementally adoptable, and can easily scale between a library and a framework depending on different use cases. It consists of an approachable core library that focuses on the view layer only, and an ecosystem of supporting libraries that helps you tackle complexity in large Single-Page Applications.

### Reactivity

Unline imperitive programming, this way of programming gives is enormous benefits. Mike Bostock explained this perfectly in his [recent keynote](https://youtu.be/aT4JvF7sglg?t=8m53s). When you have a reactive system, you spend less time needing to re-evaluate calculations, and more time managing the current state of things, while calculations are done for you.

#### Quick Example

```js
var a = 1;

var b = 2;

var c = a + b // 3

```

Now, if we change the value of `a` or `b`, does the value of `c` change? no, no it does not. Bummer...

But when things are _reactive_, this evaluation can be done for you automagically.

### SVG Template Rendering

Vue has a pretty cool way of rendering templated content. Instead of only allowing render functions that are placed within code, Vue offers template syntax that's almost indistinguishable from regular dom elements. In fact, a template can consist of just html, and Vue will handle it without a problem.

### Interactivity

Because of the nature in which Vue handles event listeners, we can utilize it's templating system to give us a clearer image of what is looking for user interaction. And because D3 has many utoilities surrounding SVG elements, Vue gives us a way to instantly manage the interactions.

### Ease of Use

Vue is not the only library out there that can do this. However, I feel that the amount of time it takes to actually create a reactive environment, that can leverage SVG elements and the nesting of them, gives Vue a leg up in this regard.

## D3

### What D3 is made out of

### What Vue replaces

### Data Analysis vs. Creative Mediums