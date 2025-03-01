# Passing Props Deeply

You might be interested in passing down properties without prop-drilling. Prop-drilling - in short - is having to pass props from a parent component to its child and then to a grandchild and so on.

To avoid this issue, there are two concepts available in tsx-dom-ssr:

## `ComponentThis`

The `ComponentThis` interface allows you to pass props straight from your render-function.

As can be seen in [Preparations](./html-tags.md), you can define your own `ComponentThis` interface like this:

```ts
declare module "tsx-dom-ssr" {
  export interface ComponentThis {
    foo: string;
  }
}
```

Then, from within a component, you can access it using `this`:

```tsx
function MyComponent(this: ComponentThis) {
  const foo = this.foo;
  return <div>{foo}</div>;
}
```

This is great if you want to pass down something global from top to all child nodes without changes.

Note, that you can not use this with arrow functions, as they override `this`!

## `createContext`

`createContext` is similar to react context in that it allows you to specify providers locally and even override them for some children.

First, define your context like this:

```ts
import { createContext } from "tsx-dom-ssr";

export const SomeNumber = createContext({ fallback: 10, description: "Some Number Context" });
```

Then, add a provider wherever you need it:

```tsx
import { SomeNumber } from "../contexts/SomeNumber";

const MyParent = () => (
  <div>
    <SomeNumber.Provider value={7}>
      <Child />
    </SomeNumber.Provider>
    <SomeNumber.Provider value={42}>
      <OtherChild />
    </SomeNumber.Provider>
  </div>
);
```

Finally, use the value in your component:

```tsx
function MyGrandChild(this: ComponentThis) {
  const someNumber = SomeNumber.for(this);
  return <div>{someNumber}</div>;
}
```

You can even override the value for a sub-tree:

```tsx
function MyGrandChild(this: ComponentThis) {
    const someNumber = SomeNumber.for(this);
    return (
        <>
            <div>{someNumber}</div>;
            <SomeNumber.Provider value={someNumber + 20}>
                <SomeSubTree />
            </SomeNumber.Provider>
        </>
}
```
