import { setElementAttribute } from "tsx-dom-types";

import type { BaseProps, ComponentAttributes, ComponentChild, ComponentChildren, ComponentThis, FC } from "./types";
import { isInternalComponent } from "./internal";

function hasChildrenSet(children: ComponentChildren) {
    if (Array.isArray(children)) {
        return children.length > 0;
    }

    return children !== undefined;
}

function createDomElement(document: Document, ns: string | undefined, tag: string, attrs: ComponentAttributes) {
    const options = attrs.is ? { is: attrs.is as string } : undefined;

    if (ns) return document.createElementNS(ns, tag, options) as SVGElement;

    return document.createElement(tag, options);
}

const parentNamespace = Symbol("Parent Namespace");
function getNamespace(tag: string, thisArg: ComponentThis) {
    return tag === "svg" ? "http://www.w3.org/2000/svg" : (thisArg[parentNamespace] as string | undefined);
}

function setElementAttributes(element: HTMLElement | SVGElement, attrs: ComponentAttributes) {
    for (const name of Object.keys(attrs)) {
        setElementAttribute(element, name, attrs[name]);
    }
}

async function renderHtmlNode(
    tag: string,
    { children, ...attrs }: BaseProps,
    thisArg: ComponentThis,
    document: Document,
) {
    let finalTag = tag;
    let finalAttrs = attrs as ComponentAttributes;
    if ("tsxTag" in finalAttrs) {
        finalTag = finalAttrs.tsxTag as string;
        if (!finalAttrs.is && tag.includes("-")) {
            finalAttrs = { ...finalAttrs, is: tag };
        }
    }

    const ns = (finalAttrs.xmlns as string | undefined) ?? getNamespace(finalTag, thisArg);
    const el = createDomElement(document, ns, finalTag, finalAttrs);
    setElementAttributes(el, finalAttrs);

    if (el.innerHTML) {
        if (hasChildrenSet(children)) {
            console.error("Received both dangerouslySetInnerHTML and children. Children will be ignored!");
        }
    } else {
        const thisArgExtended = ns ? { ...thisArg, [parentNamespace]: ns } : thisArg;
        const fragment = await renderToDom(document, children, thisArgExtended);
        el.appendChild(fragment);
    }

    return el;
}

async function renderComponentNode(tag: FC<BaseProps>, props: BaseProps, thisArg: ComponentThis, document: Document) {
    const children = await tag.call(thisArg, props);

    return renderToDom(document, children, thisArg);
}

type DomChildResult = Text | HTMLElement | SVGElement | DocumentFragment;
type DomChildPromise = Promise<DomChildResult> | DomChildResult;
function childToDom(
    document: Document,
    child: ComponentChild | Promise<ComponentChildren>,
    thisArg: ComponentThis,
): DomChildPromise | undefined {
    if (typeof child === "string") {
        if (child) return document.createTextNode(child);
    } else if (typeof child === "number") {
        return document.createTextNode(child.toString());
    } else if (child && "then" in child) {
        // It's a promise
        return child.then((resolvedChildren) => renderToDom(document, resolvedChildren, thisArg));
    } else if (child) {
        const { tag, props } = child;

        if (typeof tag === "string") return renderHtmlNode(tag, props, thisArg, document);

        if (isInternalComponent(tag)) {
            // eslint-disable-next-line no-underscore-dangle
            return tag.__tsxInternal(props, thisArg, (newChildren, newThisArg) =>
                renderToDom(document, newChildren, newThisArg),
            );
        }
        return renderComponentNode(tag, props, thisArg, document);
    }
}

export async function renderToDom(document: Document, children: ComponentChildren, thisArg: ComponentThis) {
    const target = document.createDocumentFragment();

    const domChildren = await Promise.all(
        (Array.isArray(children) ? children.flat() : [children]).map((child) =>
            childToDom(document, child as ComponentChild | Promise<ComponentChildren>, thisArg),
        ),
    );

    for (const child of domChildren) {
        if (child) target.appendChild(child);
    }

    return target;
}
