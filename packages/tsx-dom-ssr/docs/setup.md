# Setup

## Install via NPM

```bash
npm i tsx-dom-ssr
```

Enable TSX parsing in your tsconfig.json:

```json
{
  "compilerOptions": {
    "jsx": "react",
    "jsxFactory": "h",
    // ...
  },
  // ...
}
```

Or with the new JSX Transform:

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "tsx-dom-ssr",
    // ...
  },
  // ...
}
```

Examples on how to use it will follow.