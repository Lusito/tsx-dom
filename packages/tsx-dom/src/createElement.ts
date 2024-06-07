import { setAttributes } from "./setAttributes";
import type { ComponentAttributes, ComponentChild, FC, RefType } from "./types";
import { applyChildren, applyTsxTag, createDomElement } from "./utils";

export function createElement(
    tag: string | FC,
    attrs: null | ComponentAttributes,
    ...children: ComponentChild[]
): JSX.Element {
    if (typeof tag === "function") return tag({ ...attrs, children });

    const { finalTag, finalAttrs } = applyTsxTag(tag, attrs);
    const element = createDomElement(finalTag, finalAttrs);

    if (finalAttrs) setAttributes(element, finalAttrs);

    applyChildren(element, children);
    return element;
}

export const h = createElement;

export const createRef = <T>(): RefType<T> => ({ current: null });
