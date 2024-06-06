# HTML Tags

## Preparations

Before you can write any JSX, you'll need a function to render it to HTML.
tsx-dom-ssr by itself only gives you a function `toDom`, which returns a DocumentFragment.

Here is a very simple render function to create HTML:

```ts
import { ComponentChildren, addAbortSignal, toDom } from "tsx-dom-ssr";

declare module "tsx-dom-ssr" {
  export interface ComponentThis {
    foo: string;
  }
}

export async function renderHTML(children: ComponentChildren) {
  const abortController = new AbortController();

  let dom: DocumentFragment;
  try {
    dom = await toDom(document, children, addAbortSignal({ foo: "bar" }, abortController));
  } catch (e) {
    if (!abortController.signal.aborted) abortController.abort();
    throw e;
  }

  // Since the dom might be a fragment or just a text node, we need a wrapper to render it
  const wrapper = document.createElement("div");
  wrapper.appendChild(dom);

  // Optional: We should also do a sanity check if we expect full HTML to be created
  if (
    wrapper.childNodes.length !== 1 ||
    wrapper.childNodes[0].nodeType !== 1 ||
    (wrapper.childNodes[0] as Element).tagName !== "HTML"
  ) {
    throw new Error("Expected one html node at the root level");
  }

  return `<!DOCTYPE html>${wrapper.innerHTML}`;
}
```

## Example

The `h` import is not needed if you use the new [JSX Transform](https://legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html)!

```tsx
// import { h } from "tsx-dom-ssr";

// jsx tags (<...>) always return ComponentChildren. These can be used as children or passed to a render function.
async function main() {
  const html = await renderHTML(
    <html>
      <head>
        <title>test</title>
      </head>
      <body>
        <img src="my/path.png" />
      </body>
    </html>,
  );
  console.log(html);
}
```

## Attributes and event handlers

Since this is a library for server side rendering, no event listeneres can be defined on the JSX. Frontend code needs to be written separately.

All Attributes will be set via `element.setAttribute()`. Passing `true` as a value is the same as passing the attribute name as value.

## Children

You can add as many children as you like. Even deeply nested arrays are allowed and promises as well.

```tsx
const danger = "Danger";
const someArray = ["Whoop", "Dee", "Doo", 0, 1, 2, ["nested", [<i>deeply</i>]]];
const promise = Promise.resolve("resolved");
const children = (
  <div>
    <img src="danger.png" />
    Will Robinson,
    {danger}
    <b>!!!</b>
    <p>{someArray}</p>
    <p>{promise}</p>
  </div>
);
```

As you can see in the example above, even variables can be inserted as children. Promises will be resolved before being inserted. Arrays will be expanded. Falsey values (except 0) will be ignored. ComponentChildren values will be appended as is, string or number values will become text-nodes.
