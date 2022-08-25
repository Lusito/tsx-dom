import type { ComponentChildren, ComponentThis, VNode } from "./types";

function toDomRecursive(
    document: Document,
    children: ComponentChildren,
    thisArg: ComponentThis,
    result: Array<ReturnType<VNode>>
) {
    if (Array.isArray(children)) {
        for (const child of children) toDomRecursive(document, child, thisArg, result);
    } else if (typeof children === "string") {
        if (children) result.push(Promise.resolve(document.createTextNode(children)));
    } else if (typeof children === "number") {
        result.push(Promise.resolve(document.createTextNode(children.toString())));
    } else if (typeof children === "function") {
        // It's a VNode
        result.push(children(document, thisArg));
    } else if (children) {
        // It's a promise
        result.push(children.then((resolved) => toDom(document, resolved, thisArg)));
    }

    return result;
}

export async function toDom(document: Document, children: ComponentChildren, thisArg: ComponentThis) {
    const target = document.createDocumentFragment();

    const domChildren = await Promise.all(toDomRecursive(document, children, thisArg, []));
    for (const child of domChildren) {
        target.appendChild(child);
    }

    return target;
}

export async function renderToString(document: Document, children: ComponentChildren, thisArg: ComponentThis) {
    const fragment = await toDom(document, children, thisArg);
    const wrapper = document.createElement("div");
    wrapper.appendChild(fragment);

    return wrapper.innerHTML;
}
