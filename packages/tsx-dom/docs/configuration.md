# Configuration

## Limiting Types

By default, support for HTML and SVG Elements is enabled. You can limit this
(for example to do less casting or to prevent certain tags from being used)
by creating a `d.ts` file (e.g. `tsx-dom-config.d.ts`), in your source folder with this content:

```ts
import "tsx-dom";

declare module "tsx-dom" {
  export interface TsxConfig {
    // Set one of these to false to disable support for them
    svg: false;
    // html: false;
  }
}
```

A configuration like this will just limit the possible types. It does not affect the code in any way.
