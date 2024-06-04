# dom-helmet

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/Lusito/tsx-dom/blob/master/LICENSE)

This is a helper similar to [react-helmet](https://github.com/nfl/react-helmet).

It can be used on a generated dom tree to adjust the topmost head, body and html tags.
This can be useful in server-side-rendering when component logic needs to adjust the head, body or html tag.

## Installation via NPM

`npm i dom-helmet`

## Usage

```ts
import { domHelmet } from "dom-helmet";

// domHelmet expects 3 dom-nodes, which will be modified in-place:
domHelmet({
    html: ...,
    head: ...,
    body: ...,
});
```

## Example

This:

```html
<html class="initial">
  <head>
    <title>Initial Title</title>
    <meta charset="utf-8" />
  </head>
  <body class="initial">
    <div>
      <html class="html-more"></html>
      <head>
        <title>Changed Title</title>
        <meta charset="utf-16" />
      </head>
      <body class="body-more">
        <div>Some Dialog</div>
      </body>
      Some Content
    </div>
  </body>
</html>
```

Will turn into this:

```html
<html class="initial html-more">
  <head>
    <title>Changed Title</title>
    <meta charset="utf-16" />
  </head>
  <body class="initial body-more">
    <div>Some Content</div>
    <div>Some Dialog</div>
  </body>
</html>
```

## Head Tags

- All children of `html > body head` elements will be moved into `html > head`.
- Duplicates will be removed if not within the same (false) head element:
  - Tags: title, base, meta, link, script (with src attribute) and any tag with an id attribute
- Finally the false head elements will be removed.

## Body Tags

- All children of `html > body body` elements will be moved into `html > body`.
- Attributes from these false body tags will be transferred to `html > body`
  - Classes and styles will be appended, other attributes will replace the previous value.
- Finally the false body elements will be removed.

## HTML Tags

- Attributes from false html tags (`html html`) will be transferred to the root `html` element.
  - Classes and styles will be appended, other attributes will replace the previous value.
- Finally the false html elements will be removed.

## Report issues

Something not working quite as expected? Do you need a feature that has not been implemented yet? Check the [issue tracker](https://github.com/Lusito/tsx-dom/issues) and add a new one if your problem is not already listed. Please try to provide a detailed description of your problem, including the steps to reproduce it.

## Contribute

Awesome! If you would like to contribute with a new feature or submit a bugfix, fork this repo and send a pull request. Please, make sure all the unit tests are passing before submitting and add new ones in case you introduced new features.

## License

dom-helmet has been released under the [MIT](https://github.com/Lusito/tsx-dom/blob/master/LICENSE) license, meaning you
can use it free of charge, without strings attached in commercial and non-commercial projects. Credits are appreciated but not mandatory.
