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
