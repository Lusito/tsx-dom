import { setAttributes } from "./setAttributes";
import type { Component, ComponentAttributes, ComponentChild } from "./types";
import { applyChildren, createDomElement, isClassConstuctor } from "./utils";

export function createElement(
    Tag: string | Component,
    attrs: null | ComponentAttributes,
    ...children: ComponentChild[]
): JSX.Element {
    if (typeof Tag === "function") {
        return isClassConstuctor(Tag) ? new Tag({ ...attrs, children }) : Tag({ ...attrs, children });
    }

    const element = createDomElement(Tag, attrs);

    if (attrs) setAttributes(element, attrs as ComponentAttributes);

    applyChildren(element, children);
    return element;
}

export const h = createElement;
