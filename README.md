# tsx-dom Monorepo

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/Lusito/tsx-dom/blob/master/LICENSE)

## Included Projects

### [tsx-dom](https://github.com/Lusito/tsx-dom/tree/master/packages/tsx-dom)

A simple way to use tsx syntax to create native dom elements using document.createElement.

### [tsx-dom-ssr](https://github.com/Lusito/tsx-dom/tree/master/packages/tsx-dom-ssr)

A simple way to use tsx syntax to create native dom elements using document.createElement.
This library is mainly aimed at Server-Side-Rendering by allowing async data fetching.

### [tsx-dom-types](https://github.com/Lusito/tsx-dom/tree/master/packages/tsx-dom)

This project is here, so that other projects like tsx-dom can use the types independently.

### [dom-helmet](https://github.com/Lusito/tsx-dom/tree/master/packages/dom-helmet)

This is a helper similar to [react-helmet](https://github.com/nfl/react-helmet).

It can be used on a generated dom tree to adjust the topmost head, body and html tags.
This can be useful in server-side-rendering when component logic needs to adjust the head, body or html tag.

### [scatman](https://github.com/Lusito/tsx-dom/tree/master/packages/scatman)

Lightning fast navigation on mostly static pages. Forked off of [swup](https://github.com/swup/swup), heavily refactored and ported to TypeScript.

## Report issues

Something not working quite as expected? Do you need a feature that has not been implemented yet? Check the [issue tracker](https://github.com/Lusito/tsx-dom/issues) and add a new one if your problem is not already listed. Please try to provide a detailed description of your problem, including the steps to reproduce it.

## Contribute

Awesome! If you would like to contribute with a new feature or submit a bugfix, fork this repo and send a pull request. Please, make sure all the unit tests are passing before submitting and add new ones in case you introduced new features.

## License

tsx-dom has been released under the [MIT](https://github.com/Lusito/tsx-dom/blob/master/LICENSE) license, meaning you
can use it free of charge, without strings attached in commercial and non-commercial projects. Credits are appreciated but not mandatory.
