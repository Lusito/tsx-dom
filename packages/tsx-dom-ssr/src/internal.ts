import { setElementAttributes } from "./setElementAttributes";
import { toDom } from "./domUtils";
import type { BaseProps, FC, ComponentAttributes, ComponentChildren, VNode, ComponentThis } from "./types";

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

export function createHtmlElementNode(tag: string, { children, ...attrs }: BaseProps): VNode {
    return async (document, thisArg) => {
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
            const fragment = await toDom(document, children, thisArgExtended);
            el.appendChild(fragment);
        }

        return el;
    };
}

export function createComponentNode(tag: FC<BaseProps>, props: BaseProps): ComponentChildren {
    return async (document, thisArg) => {
        const children = await tag.call(thisArg, props);

        return toDom(document, children, thisArg);
    };
}

export type InternalComponent<T = BaseProps> = ((props: T) => ComponentChildren) & {
    __tsxInternal: boolean;
};

export function internalComponent<T>(comp: FC<T>): InternalComponent<T> {
    return Object.assign(comp, { __tsxInternal: true });
}
