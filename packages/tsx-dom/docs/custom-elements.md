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

Another way is to stay pure and write the HTML as you normally would:

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
