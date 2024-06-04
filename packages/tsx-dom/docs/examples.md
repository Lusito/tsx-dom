# Examples

## Plain DOM Elements

```TypeScript
// This import is required
import { h } from "tsx-dom";

// jsx tags (<...>) always return an HTMLElement, so cast it to whatever type you need
const myImg = <img src="my/path.png" onClick={() => console.log("click")} /> as HTMLImageElement;

// Use it like any element created with document.createElement(...);
document.body.appendChild(myImg);
```
