# External Problems

Some things are just out of scope for this library. Here you'll find some ideas what to do when you get to the point.

## (Dev-) Server

tsx-dom-ssr doesn't provide a server and it never will. It's all about rendering the DOM.

You can easily use fastify, express.js or similar. With nx you can easily set up a monorepo just like this one.
It's even possible to easily set up simple hot reload functionality.

## Routing

It's currently not planned to support routing. Since this project is aimed at server-side-rendering,
routing will happen with your server mostly. You can easily do routing yourself by providing a context and using that context to selectively render things.

## Adding Styles

You can set inline-styles directly on the html elements in a css-in-js ish way.
I wouldn't recommend it though, since it drastically increases html size among other reasons.

My recommendation is to use CSS-Modules (rendered as style tags), see the tsx-dom-ssr-demo project.

- It increases the HTML size compared to linked styles, but:
- It improves page rendering.
- It only renders the styles actually used.
- It avoids naming conflicts.
- It works nicely with pre- & post-processors for webpack (for example scss).

If you want some css-in-js approach (like styled-components), you'll have to implement that yourself for now.
I'm open for suggestions, but that's currently not my focus on this project.

Another alternative that might work is going for [Tailwind](https://tailwindcss.com/). I haven't tried it yet, but I hear good things.

## 🗲 AMP-Mode

You want to create AMP compatible HTML?

By doing querySelector on the DOM-nodes after rendering, you could easily search for nodes that are not allowed
and then remove or replace them with an AMP version.

## React-Helmet Functionality

Since everything is rendered into DOM, one can easily query the DOM and modify it.
A simple implementation is provided in this monorepo with the [dom-helmet](https://lusito.github.io/tsx-dom/dom-helmet/index.html) library.

## Timeouts

You can use the (experimental) `AbortController` and a `setTimeout()`.
Error-boundaries can be used to catch the errors caused by the abort.

## Fast Page Transitions

Try [scatman](https://lusito.github.io/tsx-dom/scatman/index.html), [swup](https://github.com/swup/swup/), [@hotwired/turbo](https://turbo.hotwired.dev/) or [barba.js](https://barba.js.org/)

## Client-Side Code

Try using [custom-elements](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements) as shown with the project tsx-dom-ssr-demo.
You can use an SPA framework for the clientside code, but I strongly recommend to take a lightweight approach on client code.
Otherwise you might as well just use any of the existing SPA frameworks, that support SSR.
