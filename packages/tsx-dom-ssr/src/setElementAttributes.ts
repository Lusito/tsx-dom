import { setElementAttribute } from "tsx-dom-types";

import { ComponentAttributes } from "./types";

export function setElementAttributes(element: HTMLElement | SVGElement, attrs: ComponentAttributes) {
    for (const name of Object.keys(attrs)) {
        setElementAttribute(element, name, attrs[name]);
    }
}
