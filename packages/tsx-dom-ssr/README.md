# tsx-dom-ssr

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/Lusito/tsx-dom/blob/master/LICENSE)

A simple way to use tsx syntax to do async server-side-rendering.

## Installation via NPM

```npm i tsx-dom-ssr```

Enable TSX parsing in your tsconfig.json:

```json
{
  "compilerOptions": {
    "jsx": "react",
    "jsxFactory": "h",
    ...
```

Or with the new JSX Transform:

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "tsx-dom-ssr",
    ...
  },
```

Examples on how to use it will follow.

## Configuration

By default, support for HTML and SVG Elements is enabled. You can limit this (to prevent certain tags from being used)
by creating a `d.ts` file (e.g. `tsx-dom-ssr-config.d.ts`), in your source folder with this content:

```ts
import 'tsx-dom-ssr';

declare module "tsx-dom-ssr" {
    export interface TsxConfig {
        // Set one of these to false to disable support for them
        svg: false;
        // html: false;
    }
}
```

Setting any of these to false will just limit the possible types. It does not affect the code in any way.

## Report issues

Something not working quite as expected? Do you need a feature that has not been implemented yet? Check the [issue tracker](https://github.com/Lusito/tsx-dom/issues) and add a new one if your problem is not already listed. Please try to provide a detailed description of your problem, including the steps to reproduce it.

## Contribute

Awesome! If you would like to contribute with a new feature or submit a bugfix, fork this repo and send a pull request. Please, make sure all the unit tests are passing before submitting and add new ones in case you introduced new features.

## License

tsx-dom-ssr has been released under the [MIT](https://github.com/Lusito/tsx-dom/blob/master/LICENSE) license, meaning you
can use it free of charge, without strings attached in commercial and non-commercial projects. Credits are appreciated but not mandatory.
