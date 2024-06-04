# Supported Tags

## Head Tags

- All elements matching `html > body head` will be moved into `html > head`.
- Duplicates will be removed if not within the same (false) head element:
  - Tags: title, base, meta, link, script (with src attribute) and any tag with an id attribute
- Finally the false head elements will be removed.

## Body Tags

- All elements matching `html > body body` will be moved into `html > body`.
- Attributes from these false body tags will be transferred to `html > body`
  - Classes and styles will be appended, other attributes will replace the previous value.
- Finally the false body elements will be removed.

## HTML Tags

- Attributes from false html tags (matching `html html`) will be transferred to the root `html` element.
  - Classes and styles will be appended, other attributes will replace the previous value.
- Finally the false html elements will be removed.
