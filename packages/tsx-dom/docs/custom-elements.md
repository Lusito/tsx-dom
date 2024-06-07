# Custom Elements

In case you want to write custom elements, there are multiple ways you can do that in tsx-dom.

## By Using defineCustomElements

The simplest is with the `defineCustomElements` helper. `defineCustomElements` works just like `customElements.define`.
The only difference is, that it returns a functional component you can use in your JSX.

### Without Extending an Existing Element

```tsx
import { defineCustomElement } from "tsx-dom";

type MyCustomElementProps = {
  logMessage: string;
};

export const MyCustomElement = defineCustomElement<MyCustomElementProps>(
  "my-custom-element",
  class extends HTMLElement {
    connectedCallback() {
      console.log("connected", this.getAttribute("logMessage"));
    }
    // ...
  },
);

document.body.appendChild(<MyCustomElement logMessage="Hello there!" />);
```

### When Extending an Existing Element

```tsx
import { defineCustomElement } from "tsx-dom";

type MyCustomSelectProps = {
  logMessage: string;
};

export const MyCustomSelect = defineCustomElement<MyCustomSelectProps, "select">(
  "my-custom-select",
  class extends HTMLSelectElement {
    connectedCallback() {
      console.log("connected", this.getAttribute("logMessage"));
    }
    // ...
  },
  { extends: "select" },
);

document.body.appendChild(<MyCustomSelect disabled logMessage="Hello there!" />);
```

## By Declaring JSX Types

The above only works if you write the custom element code yourself.
If you use an existing custom-element, you can use the method below.

You can write the HTML as you normally would:

```tsx
document.body.appendChild(<my-custom-element logMessage="Hello there!" />);
```

In order to do that, we need to extend the JSX Types by using the `CustomElementProps` helper.

### Without Extending an Existing Element

```tsx
import { CustomElementProps } from "tsx-dom";

class MyCustomElement extends HTMLElement {
  connectedCallback() {
    console.log("connected", this.getAttribute("logMessage"));
  }
  // ...
}

customElements.define("my-custom-element", MyCustomElement);

type MyCustomElementProps = {
  logMessage: string;
};

declare module "tsx-dom" {
  interface CustomElementsHTML {
    "my-custom-element": CustomElementProps<MyCustomElementProps, null>;
  }
}

document.body.appendChild(<my-custom-element logMessage="Hello there!" />);
```

### When Extending an Existing Element

```tsx
import { CustomElementProps } from "tsx-dom";

class MyCustomSelect extends HTMLSelectElement {
  connectedCallback() {
    console.log("connected", this.getAttribute("logMessage"));
  }
  // ...
}

customElements.define("my-custom-element", MyCustomSelect, { extends: "select" });

type MyCustomSelectProps = {
  logMessage: string;
};

declare module "tsx-dom" {
  interface CustomElementsHTML {
    "my-custom-select": CustomElementProps<MyCustomSelectProps, "select">;
  }
}

document.body.appendChild(
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
const element = <word-count tsxTag="p" />;
```

By doing this, you'll get the correct props while writing the JSX syntax, but the generated HTML will still be:

```html
<p is="word-count"></p>
```
