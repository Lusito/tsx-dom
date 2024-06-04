## Server

tsx-dom-ssr doesn't provide a server and it never will. It's all about rendering the dom.

You can easily use express.js or similar. With nx you can easily set up a monorepo just like this one.
It's even possible to easily set up simple hot reload functionality.

## Routing

It's currently not planned to support routing. Since this project is aimed at server-side-rendering,
routing will happen with your server mostly. You can easily do routing yourself by providing a context and using that context to selectively render things.

## CSS-Modules, CSS-in-JS, Styled-Components, Etc.

You can set inline-styles directly on the html elements in a css-in-js ish way.
I wouldn't recommend it though, since it drastically increases html size among other reasons.

My recommendation is to use CSS-Modules (rendered as style tags), see the tsx-dom-ssr-demo project.

- It increases the HTML size compared to linked styles, but:
- It improves page rendering.
- It only renders the styles actually used.
- It avoids naming conflicts.
- It works nicely pre- & post-processors for webpack (for example scss).

If you want some css-in-js approach (like styled-components), you'll have to implement that yourself for now.
I'm open for suggestions, but that's currently not my focus on this project.

## 🗲AMP-Mode

You want to create AMP compatible HTML?

By doing querySelector on the dom-nodes after rendering, you could easily search for nodes that are not allowed
and then remove or replace them with an AMP version.

## React-Helmet Functionality

Since everything is rendered into dom, one can easily query the dom and modify it.
A simple implementation is provided in this monorepo with the dom-helmet library.

## Timeouts

You can use the (experimental) AbortController and a setTimeout().
Error-boundaries can be used to catch the errors caused by the abort.

## Fast Page Transitions

Try scatman, swup, @hotwired/turbo or barba.js

## Client-Side Code

Try using custom-elements as shown with the project tsx-dom-ssr-demo.
You can use an SPA framework for the clientside code, but I strongly recommend to take a lightweight approach on client code.
Otherwise you might as well just use any of the existing SPA frameworks, that support SSR.
