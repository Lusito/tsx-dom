import { setAttributes } from "./setAttributes";
import type { BaseProps, ComponentAttributes, Component } from "./types";
import { applyChildren, createDomElement } from "./utils";

export function jsx(tag: string | Component, props: BaseProps): JSX.Element {
    if (typeof tag === "function") return tag(props);

    const { children, ...attrs } = props;
    const element = createDomElement(tag, attrs as ComponentAttributes);

    if (attrs) setAttributes(element, attrs as ComponentAttributes);

    applyChildren(element, [children]);
    return element;
}

export { jsx as jsxs, jsx as jsxDEV };
