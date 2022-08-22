import { setAttributes } from "./setAttributes";
import type { ComponentAttributes, ComponentChild, Component } from "./types";
import { applyChildren, createDomElement } from "./utils";

export function createElement(
    tag: string | Component,
    attrs: null | ComponentAttributes,
    ...children: ComponentChild[]
): JSX.Element {
    if (typeof tag === "function") return tag({ ...attrs, children });

    const element = createDomElement(tag, attrs);

    if (attrs) setAttributes(element, attrs as ComponentAttributes);

    applyChildren(element, children);
    return element;
}

export const h = createElement;
