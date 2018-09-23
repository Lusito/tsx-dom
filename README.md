# tsx-dom

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/Lusito/tsx-dom/blob/master/LICENSE)

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

Example code:
```TypeScript
// This import is required
import { h } from "../../../lib/noreact";

// jsx tags (<...>) always return an HTMLElement, so cast it to whatever type you need
const myImg = <img src="my/path.png" onClick={() => console.log("click")} /> as HTMLImageElement;

// Use it like any element created with document.createElement(...);
document.body.appendChild(myImg);
```


### Report isssues

Something not working quite as expected? Do you need a feature that has not been implemented yet? Check the [issue tracker](https://github.com/Lusito/tsx-dom/issues) and add a new one if your problem is not already listed. Please try to provide a detailed description of your problem, including the steps to reproduce it.

### Contribute

Awesome! If you would like to contribute with a new feature or submit a bugfix, fork this repo and send a pull request. Please, make sure all the unit tests are passing before submitting and add new ones in case you introduced new features.

### License

tsx-dom has been released under the [MIT](https://github.com/Lusito/tsx-dom/blob/master/LICENSE) license, meaning you
can use it free of charge, without strings attached in commercial and non-commercial projects. Credits are appreciated but not mandatory.
