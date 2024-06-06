# HTML Tags

## Example

The `h` import is not needed if you use the new [JSX Transform](https://legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html)!

```tsx
// import { h } from "tsx-dom";

// jsx tags (<...>) always return an HTMLElement, so cast it to whatever type you need
const myImg = (<img src="my/path.png" onClick={() => console.log("click")} />) as HTMLImageElement;

// Use it like any element created with document.createElement(...);
document.body.appendChild(myImg);
```

## Attributes and event handlers

Attributes on plain dom starting with a lowercase "on" and followed by an uppercase character will be added as event listeners. If the attribute ends with "Capture", then the capture parameter will be set to true. For example `onClickCapture={fn}` will result in `element.addEventListener("click", fn, true)`.

Other attributes will be set via `element.setAttribute()`. Passing `true` as a value is the same as passing the attribute name as value.

## Children

You can add as many children as you like. Even deeply nested arrays are allowed.

```tsx
const danger = "Danger";
const someArray = ["Whoop", "Dee", "Doo", 0, 1, 2, ["nested", [<i>deeply</i>]]];
const el = (
  <div>
    <img src="danger.png" />
    Will Robinson,
    {danger}
    <b>!!!</b>
    <p>{someArray}</p>
  </div>
);
```

As you can see in the example above, even variables can be inserted as children. Arrays will be expanded. Falsey values (except 0) will be ignored. HTMLElement values will be appended as is, string or number values will become text-nodes.
