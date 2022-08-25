import type { BaseProps, Component, ComponentChildren } from "./types";
import { createComponentNode, createHtmlElementNode, InternalComponent, internalComponent } from "./internal";

export const Fragment = internalComponent((props: BaseProps) => props.children);

export function jsx(tag: string | Component, props: BaseProps): ComponentChildren {
    // eslint-disable-next-line no-underscore-dangle
    if ((tag as InternalComponent).__tsxInternal === true) {
        return (tag as InternalComponent)(props);
    }

    if (typeof tag === "string") {
        return createHtmlElementNode(tag, props);
    }

    return createComponentNode(tag, props);
}

export { jsx as jsxs, jsx as jsxDEV };
