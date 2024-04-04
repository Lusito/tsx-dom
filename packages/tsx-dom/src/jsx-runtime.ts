import { setAttributes } from "./setAttributes";
import type { BaseProps, Component, ComponentAttributes } from "./types";
import { applyChildren, createDomElement, isClassConstuctor } from "./utils";

export function jsx(Tag: string | Component, props: BaseProps): JSX.Element {
    const { children, ...attrs } = props;
    if (typeof Tag === "function") {
        return isClassConstuctor(Tag) ? new Tag({ ...attrs, children }) : Tag({ ...attrs, children });
    }

    const element = createDomElement(Tag, attrs as ComponentAttributes);

    if (attrs) setAttributes(element, attrs as ComponentAttributes);

    applyChildren(element, [children]);
    return element;
}

export { jsx as jsxDEV, jsx as jsxs };
