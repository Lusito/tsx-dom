# Components

## Functional Components

Similar to React, you can have functional components with properties:

```tsx
interface ButtonProps {
  text: string;
}

function Button({ text }: ButtonProps) {
  return <button class="my-button">{text}</button>;
}

document.body.appendChild(<Button text="Click me" />);
```

## With Children

Of course, you can also pass down children:

```tsx
import { BaseProps } from "tsx-dom";

interface ButtonProps extends BaseProps {
  variant: "primary" | "secondary";
}

function Button({ variant, children }: ButtonProps) {
  return <button class={`my-button my-button-${variant}`}>{children}</button>;
}

document.body.appendChild(<Button variant="primary">Click Me</Button>);
```

## Arrow Functions

Of course, you can also use arrow functions. There's a type `FC` to help with that:

```tsx
import { BaseProps, FC } from "tsx-dom";

interface ButtonProps extends BaseProps {
  variant: "primary" | "secondary";
}

const Button: FC<ButtonProps> = ({ variant, children }) => (
  <button class={`my-button my-button-${variant}`}>{children}</button>
);

document.body.appendChild(<Button variant="primary">Click Me</Button>);
```
