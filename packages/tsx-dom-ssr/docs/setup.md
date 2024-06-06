# Setup

## Install via NPM

```bash
npm i tsx-dom-ssr
```

You will additionally need some kind of DOM environment if you are running tsx-dom-ssr using node. You can use [jsdom](https://github.com/jsdom/jsdom) or [happy-dom](https://github.com/capricorn86/happy-dom) for example.

## TypeScript Configuration

Enable TSX parsing in your tsconfig.json:

```json
{
  "compilerOptions": {
    "jsx": "react",
    "jsxFactory": "h"
    // ...
  }
  // ...
}
```

Or with the new JSX Transform:

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "tsx-dom-ssr"
    // ...
  }
  // ...
}
```

Examples on how to use it will follow.
