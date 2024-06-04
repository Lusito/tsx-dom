# Usage

```ts
import { domHelmet } from "dom-helmet";

// domHelmet expects 3 dom-nodes, which will be modified in-place:
domHelmet({
    html: ...,
    head: ...,
    body: ...,
});
```

## Example

This:

```html
<html class="initial">
  <head>
    <title>Initial Title</title>
    <meta charset="utf-8" />
  </head>
  <body class="initial">
    <div>
      <html class="html-more"></html>
      <head>
        <title>Changed Title</title>
        <meta charset="utf-16" />
      </head>
      <body class="body-more">
        <div>Some Dialog</div>
      </body>
      Some Content
    </div>
  </body>
</html>
```

Will turn into this:

```html
<html class="initial html-more">
  <head>
    <title>Changed Title</title>
    <meta charset="utf-16" />
  </head>
  <body class="initial body-more">
    <div>Some Content</div>
    <div>Some Dialog</div>
  </body>
</html>
```
