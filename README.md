# tsx-dom

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/Lusito/tsx-dom/blob/master/LICENSE)
[![Build Status](https://travis-ci.org/Lusito/tsx-dom.svg?branch=master)](https://travis-ci.org/Lusito/tsx-dom)
[![Code Coverage](https://coveralls.io/repos/github/Lusito/tsx-dom/badge.svg?branch=master)](https://coveralls.io/github/Lusito/tsx-dom)

A simple way to use tsx syntax to create native dom elements using document.createElement.
This project has taken definitions from [preact](https://github.com/developit/preact) from Jason Miller as a starting point.

#### Why?

I work on a couple of web-extensions. These extensions have no server side, so creating a UI needs to be done with HTML or JavaScript. Since React and the likes add to the size of the project and are not as performant as I need them to be (especially on older mobile devices), I needed a different approach to split the UI into components to keep it managable.
Also using innerHTML and the likes should be forbidden, since it's not allowed in the mozilla review processes.

This project allows you to create a UI using react-like components, without including react.

### Installation via NPM

```npm install tsx-dom --save```

Enable TSX parsing in your tsconfig.json:

```json
{
  "compilerOptions": {
    "jsx": "react",
    "jsxFactory": "h",
    ...
```

### Plain dom elements
```TypeScript
// This import is required
import { h } from "tsx-dom";

// jsx tags (<...>) always return an HTMLElement, so cast it to whatever type you need
const myImg = <img src="my/path.png" onClick={() => console.log("click")} /> as HTMLImageElement;

// Use it like any element created with document.createElement(...);
document.body.appendChild(myImg);
```

#### Attributes and event handlers

Attributes on plain dom starting with a lowercase "on" will be added as event listeners. If the attribute ends with "Capture", then the capture parameter will be set to true. For example `onClickCapture={fn}` will result in `element.addEventListener("click", fn, true)`.

Other attributes will be set via `element.setAttribute()`. Passing `true` as a value is the same as passing the attribute name as value.

### Functional components

Just like in react, functional components can be used when they are written in UpperCamelCase.
If you define an interface for the props, the props will be type checked.

```TypeScript
import { h } from "tsx-dom";

interface ImageButtonProps {
    src: string;
    label: string;
}

export function ImageButton({ src, label }: ImageButtonProps) {
    return <button><img src={src} /> {label}</button>;
}

document.body.appendChild(<ImageButton src="danger.png" label="Will Robinson"/>);
```

### Children

Functional Components can of course have children, so you could write the above like this:

```TypeScript
import { h, BaseProps } from "tsx-dom";

interface ImageButtonProps extends BaseProps {
    src: string;
}

export function ImageButton({ src, children }: ImageButtonProps) {
    return <button><img src={src} /> {children}</button>;
}

document.body.appendChild(<ImageButton src="danger.png">Will Robinson</ImageButton>);
```

### Types of children

In dom elements and Functional components, you can add as many children as you like.

```TypeScript
const danger = "Danger"; // Try: ["Whoop", "Dee", "Doo", 0, 1, 2]
const el = <div>
    <img src="danger.png" />
    Will Robinson,
    {danger}
    <b>!!!</b>
</div>;
```

As you can see in the example above, even variables can be inserted as children. Arrays will be expanded. Falsey values (except 0) will be ignored. HTMLElement values will be appended as is, string or number values will become text-nodes.

### Report issues

Something not working quite as expected? Do you need a feature that has not been implemented yet? Check the [issue tracker](https://github.com/Lusito/tsx-dom/issues) and add a new one if your problem is not already listed. Please try to provide a detailed description of your problem, including the steps to reproduce it.

### Contribute

Awesome! If you would like to contribute with a new feature or submit a bugfix, fork this repo and send a pull request. Please, make sure all the unit tests are passing before submitting and add new ones in case you introduced new features.

### License

tsx-dom has been released under the [MIT](https://github.com/Lusito/tsx-dom/blob/master/LICENSE) license, meaning you
can use it free of charge, without strings attached in commercial and non-commercial projects. Credits are appreciated but not mandatory.
