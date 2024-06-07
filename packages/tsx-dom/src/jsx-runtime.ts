import { setAttributes } from "./setAttributes";
import type { BaseProps, FC } from "./types";
import { applyChildren, createDomElement, applyTsxTag } from "./utils";

export function jsx(tag: string | FC, props: BaseProps): JSX.Element {
    if (typeof tag === "function") return tag(props);

    const { children, ...attrs } = props;
    const { finalTag, finalAttrs } = applyTsxTag(tag, attrs);
    const element = createDomElement(finalTag, finalAttrs);

    setAttributes(element, finalAttrs);

    applyChildren(element, [children]);
    return element;
}

export { jsx as jsxs, jsx as jsxDEV };
