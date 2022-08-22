import { ComponentAttributes, ComponentChild } from "./types";

function applyChild(element: JSX.Element, child: ComponentChild) {
    if (child instanceof Element) element.appendChild(child);
    else if (typeof child === "string" || typeof child === "number")
        element.appendChild(document.createTextNode(child.toString()));
    else console.warn("Unknown type to append: ", child);
}

export function applyChildren(element: JSX.Element, children: ComponentChild[]) {
    for (const child of children) {
        if (!child && child !== 0) continue;

        if (Array.isArray(child)) applyChildren(element, child);
        else applyChild(element, child);
    }
}

export function createDomElement(tag: string, attrs: ComponentAttributes | null) {
    const options = attrs?.is ? { is: attrs.is as string } : undefined;

    if (attrs?.xmlns) return document.createElementNS(attrs.xmlns as string, tag, options) as SVGElement;

    return document.createElement(tag, options);
}
