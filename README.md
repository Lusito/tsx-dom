# Lightweight DOM Libraries

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/Lusito/tsx-dom/blob/master/LICENSE)

## Included Projects

- [tsx-dom](https://lusito.github.io/tsx-dom/tsx-dom/index.html)\
  A simple way to use tsx syntax to create native dom elements using `document.createElement`.
- [tsx-dom-ssr](https://lusito.github.io/tsx-dom/tsx-dom-ssr/index.html)\
  The same as above, but aimed at Server-Side-Rendering by allowing async data fetching.
- [tsx-dom-types](https://lusito.github.io/tsx-dom/tsx-dom/index.html)\
  This project is here, so that other projects like [tsx-dom](https://lusito.github.io/tsx-dom/tsx-dom/index.html) and [tsx-dom-ssr](https://lusito.github.io/tsx-dom/tsx-dom-ssr/index.html) can use the types independently.
- [dom-helmet](https://lusito.github.io/tsx-dom/dom-helmet/index.html)\
  This is a helper similar to [react-helmet](https://github.com/nfl/react-helmet).
  It can be used on a generated DOM tree to adjust the topmost `<head>`, `<body>` and `<html>` tags.
  This can be useful in server-side-rendering when component logic needs to adjust the `<head>`, `<body>` or `<html>` tag.
- [scatman](https://lusito.github.io/tsx-dom/scatman/index.html)\
  Lightning fast navigation on pages that are mostly static. Forked off of [swup](https://github.com/swup/swup), heavily refactored and ported to TypeScript.

## Demo Projects

- tsx-dom-demo\
  A simple To-Do list showing one way you might use [tsx-dom](https://lusito.github.io/tsx-dom/tsx-dom/index.html).
- tsx-dom-ssr-demo\
  A more complex demo showcasing [tsx-dom-ssr](https://lusito.github.io/tsx-dom/tsx-dom-ssr/index.html) with the [Rick and Morty API](https://rickandmortyapi.com/)

## Report Issues

Something not working quite as expected? Do you need a feature that has not been implemented yet? Check the [issue tracker](https://github.com/Lusito/tsx-dom/issues) and add a new one if your problem is not already listed. Please try to provide a detailed description of your problem, including the steps to reproduce it.

## Contribute

Awesome! If you would like to contribute with a new feature or submit a bugfix, fork this repo and send a pull request. Please, make sure all the unit tests are passing before submitting and add new ones in case you introduced new features.

## License

tsx-dom has been released under the [MIT](https://github.com/Lusito/tsx-dom/blob/master/LICENSE) license, meaning you
can use it free of charge, without strings attached in commercial and non-commercial projects. Credits are appreciated but not mandatory.
