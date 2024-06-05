# Components

## Functional Components

Similar to React, you can have functional components with properties:

```tsx
import { h, BaseProps } from "tsx-dom";

interface ButtonProps {
  text: string;
}

export function Button({ text }: ImageButtonProps) {
  return <button class="my-button">{text}</button>;
}

document.body.appendChild(<Button text="Click me" />);
```

## Custom Elements

In case you want to write custom elements, there are multiple ways you can do that in tsx-dom.

### defineCustomElements

The simplest is with the `defineCustomElements` helper. `defineCustomElements` works just like `customElements.define`.
The only difference is, that it returns a functional component you can use in your JSX:

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

### Declaring JSX Types

Another way is to stay pure and write the HTML as you normally would:

```tsx
import { HTMLComponentProps } from "tsx-dom";
import type { HTMLAttributes } from "tsx-dom-types";

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
    "my-custom-element": MyCustomElementProps & HTMLAttributes & HTMLComponentProps;
  }
}

document.body.appendChild(<my-custom-element logMessage="Hello there!" />);
```

### Declaring JSX Types When Extending

In case you are extending an existing element, you can use the CustomElementProps helper:

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
  <my-custom-select logMessage="Hello there!">
    <option value="foo">Foo</option>
    <option value="bar">Bar</option>
  </my-custom-select>,
);
```
