import { classnames, ClassType } from "./classnames";
import { CSSProperties } from "./HTMLElementAttributes";

function transferKnownProperties(source: any, target: any) {
    for (const key of Object.keys(source)) {
        if (key in target) target[key] = source[key];
    }
}

/** Some attributes need a different Name when using setAttribute */
function getAdjustedAttributeName(tagName: string, attributeName: string) {
    if (tagName === "FORM" && attributeName === "acceptCharset") return "accept-charset";
    if (tagName === "META" && attributeName === "httpEquiv") return "http-equiv";
    return attributeName;
}

export type ElementAttributeValue = string | number | boolean | undefined | null | CSSProperties;

export function setElementAttribute(element: HTMLElement | SVGElement, name: string, value: ElementAttributeValue) {
    // Ignore some debug props that might be added by bundlers
    if (name === "__source" || name === "__self" || name === "tsxTag") return;

    if (name === "class") {
        const finalValue = classnames(value as ClassType);
        if (finalValue) element.setAttribute(name, finalValue);
    } else if (name === "style" && typeof value !== "string") {
        // Special handler for style with a value of type CSSStyleDeclaration
        transferKnownProperties(value, element.style);
    } else if (name === "dangerouslySetInnerHTML") {
        element.innerHTML = value as string;
    } else if (value === true) {
        element.setAttribute(name, name);
    } else if (value || value === 0 || value === "") {
        element.setAttribute(getAdjustedAttributeName(element.tagName, name), value.toString());
    }
}
