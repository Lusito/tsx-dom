import { setAttributes } from "./setAttributes";
import type { BaseProps, FC } from "./types";
import { applyChildren, createDomElement } from "./utils";

export function jsx(tag: string | FC, props: BaseProps): JSX.Element {
    if (typeof tag === "function") return tag(props);

    const { children, ...attrs } = props;
    const element = createDomElement(tag, attrs);

    if (attrs) setAttributes(element, attrs);

    applyChildren(element, [children]);
    return element;
}

export { jsx as jsxs, jsx as jsxDEV };
