# Supported Tags

## Head Tags

- All elements matching `html > body head` will be moved into `html > head`.
- Duplicates will be removed if not within the same (false) `head` element:
  - Tags: `title`, `base`, `meta`, `link`, `script` (with `src` attribute) and any tag with a matching `id` attribute
- Finally the false `head` elements will be removed.

## Body Tags

- All elements matching `html > body body` will be moved into `html > body`.
- Attributes from these false body tags will be transferred to `html > body`
  - Classes and styles will be appended, other attributes will replace the previous value.
- Finally the false `body` elements will be removed.

## HTML Tags

- Attributes from false `html` tags (matching `html html`) will be transferred to the root `html` element.
  - Classes and styles will be appended, other attributes will replace the previous value.
- Finally the false html elements will be removed.

## Portals and Destinations

Since it's all about transferring items from one place to another, here's a little bonus:

- All elements matching `html > body helmet-portal` will be moved to a respective `html > body helmet-destination`.
- For example, the `<helmet-portal to="my-target">` element will transfer its children to a respective `<helmet-destination id="my-target">` element.
- Duplicates will be removed if not within the same `helmet-portal` element:
  - Any tag with a matching id attribute
- If a matching `helmet-destination` element is not found, the children will stay at their original location.
- Both `<helmet-portal>` and `<helmet-destination>` elements will disappear in the result, leaving only their children behind.

### Usage with `tsx-dom(-ssr)`

If you want to use `<helmet-portal>` and `<helmet-destination>` with tsx-dom or tsx-dom-ssr, you'll need to tell typescript that these tags exist and what properties they accept.

For tsx-dom this looks like this:

```ts
import { CustomElementProps } from "tsx-dom";
import { HelmetPortalProps, HelmetDestinationProps } from "dom-helmet";

declare module "tsx-dom" {
  interface CustomElementsHTML {
    "helmet-portal": CustomElementProps<HelmetPortalProps, null>;
    "helmet-destination": CustomElementProps<HelmetDestinationProps, null>;
  }
}
```

Replace `tsx-dom` with `tsx-dom-ssr` if you use that it instead.
