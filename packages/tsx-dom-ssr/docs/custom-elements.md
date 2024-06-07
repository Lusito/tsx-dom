# Custom Elements

In case you want to write custom elements, this describes how you can do that in tsx-dom-ssr.

## By Declaring JSX Types

We need to extend the JSX Types by using the `CustomElementProps` helper.

### Without Extending an Existing Element

Imagine you have the following frontend code somewhere:

```ts
class MyCustomElement extends HTMLElement {
  connectedCallback() {
    console.log("connected", this.getAttribute("logMessage"));
  }
  // ...
}

customElements.define("my-custom-element", MyCustomElement);
```

You'll need to define the types in your backend code before you can write the JSX for it:

```tsx
import { CustomElementProps } from "tsx-dom-ssr";

type MyCustomElementProps = {
  logMessage: string;
};

declare module "tsx-dom-ssr" {
  interface CustomElementsHTML {
    "my-custom-element": CustomElementProps<MyCustomElementProps, null>;
  }
}

const child = <my-custom-element logMessage="Hello there!" />;
```

### When Extending an Existing Element

Imagine you have frontend code, which extends an existing element:

```ts
class MyCustomSelect extends HTMLSelectElement {
  connectedCallback() {
    console.log("connected", this.getAttribute("logMessage"));
  }
  // ...
}

customElements.define("my-custom-element", MyCustomSelect, { extends: "select" });
```

You'll need to define the types in your backend code before you can write the JSX for it:

```tsx
import { CustomElementProps } from "tsx-dom-ssr";

type MyCustomSelectProps = {
    logMessage: string;
};

declare module "tsx-dom-ssr" {
    interface CustomElementsHTML {
        "my-custom-select": CustomElementProps<MyCustomSelectProps, "select">;
    }
}

const child = (
    <my-custom-select disabled logMessage="Hello there!">
        <option value="foo">Foo</option>
        <option value="bar">Bar</option>
    </my-custom-select>,
);
```

## The `is` Attribute vs `tsxTag`

Let's say you have a custom element `word-count`, but it should fall back to a p tag when the custom-element has not been registered (yet).
Normally, you would do it like this:

```html
<p is="word-count"></p>
```

This tells the browser it's a `p` tag, but execute the code for `word-count` on it, once it's defined.
This won't work properly with tsx-dom, as you will get no intellisense for the respective props of that custom element.

In order to solve this issue, we have the `tsxTag` attribute, which does the exact inverse:

```tsx
const child = <word-count tsxTag="p" />;
```

By doing this, you'll get the correct props while writing the JSX syntax, but the generated HTML will still be:

```html
<p is="word-count"></p>
```
