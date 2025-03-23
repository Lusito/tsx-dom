import { classnames, ClassType, CSSProperties, ElementAttributeValue, getAdjustedAttributeName } from "tsx-dom-types";

import type { BaseProps, ComponentAttributes, ComponentChild, ComponentChildren, ComponentThis, FC } from "./types";
import { isInternalComponent } from "./internal";

const voidElements: Record<string, boolean | undefined> = {
    area: true,
    base: true,
    br: true,
    col: true,
    embed: true,
    hr: true,
    img: true,
    input: true,
    link: true,
    meta: true,
    param: true,
    source: true,
    track: true,
    wbr: true,
};

const escapeHTML = (text: string) =>
    text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");

const escapeAttributeValue = (text: string) => text.replaceAll('"', "&quot;");

function hasChildrenSet(children: ComponentChildren) {
    if (Array.isArray(children)) {
        return children.length > 0;
    }

    return children !== undefined;
}

const toKebabCase = (str: string) => str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

function propertyValueAsString(key: string, value: string | undefined) {
    if (value) {
        const name = toKebabCase(key);
        return `${name}: ${value}`;
    }
}

function styleObjectAsString(properties: CSSProperties) {
    return Object.entries(properties)
        .map(([key, value]) => propertyValueAsString(key, value))
        .filter((v) => v)
        .join("; ");
}

function attributeValueAsString(tag: string, name: string, value: ElementAttributeValue) {
    // Ignore some debug props that might be added by bundlers
    if (name === "__source" || name === "__self" || name === "tsxTag" || name === "dangerouslySetInnerHTML") return;

    if (name === "class") {
        const finalValue = classnames(value as ClassType);
        if (finalValue) return `${name}="${escapeAttributeValue(finalValue)}"`;
    } else if (name === "style" && typeof value !== "string") {
        // Special handler for style with a value of type CSSProperties
        return `style="${escapeAttributeValue(styleObjectAsString(value as CSSProperties))}"`;
    } else if (value === true) {
        return `${name}="${name}"`;
    } else if (value || value === 0 || value === "") {
        return `${getAdjustedAttributeName(tag, name)}="${value ? escapeAttributeValue(value.toString()) : value}"`;
    }
}

function attributesToString(tag: string, attrs: Record<string, ElementAttributeValue>) {
    return Object.entries(attrs)
        .map(([key, value]) => attributeValueAsString(tag, key, value))
        .filter((v) => v)
        .join(" ");
}

const isPromise = (val: ComponentChildren): val is Promise<ComponentChild | ComponentChildren[]> =>
    !!(val && typeof val === "object" && "then" in val);

function renderHtmlNode(tag: string, { children, ...attrs }: BaseProps, thisArg: ComponentThis) {
    let finalTag = tag;
    let finalAttrs = attrs as ComponentAttributes;
    if ("tsxTag" in finalAttrs) {
        finalTag = finalAttrs.tsxTag as string;
        if (!finalAttrs.is && tag.includes("-")) {
            finalAttrs = { ...finalAttrs, is: tag };
        }
    }

    const innerHTML =
        "dangerouslySetInnerHTML" in attrs &&
        typeof attrs.dangerouslySetInnerHTML === "string" &&
        attrs.dangerouslySetInnerHTML;

    let html = `<${finalTag}`;
    const strAttrs = attributesToString(finalTag, finalAttrs);
    if (strAttrs) html += ` ${strAttrs}>`;
    else html += ">";

    const isVoidElement = finalTag in voidElements;
    if (isVoidElement) {
        if (children || innerHTML) {
            console.error("Received dangerouslySetInnerHTML or children on a void element. Will be ignored!");
        }
        return html;
    }

    if (innerHTML) {
        html += innerHTML;
        if (hasChildrenSet(children)) {
            console.error("Received both dangerouslySetInnerHTML and children. Children will be ignored!");
        }
    } else {
        const res = renderToString(children, thisArg);
        if (typeof res !== "string") return res.then((resolved) => `${html}${resolved}</${finalTag}>`);

        html += res;
    }

    return `${html}</${finalTag}>`;
}

function renderComponentNode(tag: FC<BaseProps>, props: BaseProps, thisArg: ComponentThis) {
    const result = tag.call(thisArg, props);

    if (isPromise(result)) return result.then((children) => renderToString(children, thisArg));

    return renderToString(result, thisArg);
}

type StringChildPromise = Promise<string> | string;
function childToString(child: ComponentChild | Promise<ComponentChildren>, thisArg: ComponentThis): StringChildPromise {
    if (typeof child === "string") {
        if (child) return escapeHTML(child);
    } else if (typeof child === "number") {
        return child.toString();
    } else if (child && "then" in child) {
        // It's a promise
        return child.then((resolved) => renderToString(resolved, thisArg));
    } else if (child) {
        // It's a node
        const { tag, props } = child;

        if (typeof tag === "string") return renderHtmlNode(tag, props, thisArg);
        if (isInternalComponent(tag)) {
            // eslint-disable-next-line no-underscore-dangle
            return tag.__tsxInternal(props, thisArg, (newChildren, newThisArg) =>
                renderToString(newChildren, newThisArg),
            );
        }
        return renderComponentNode(tag, props, thisArg);
    }

    return "";
}

export function renderToString(children: ComponentChildren, thisArg: ComponentThis) {
    if (Array.isArray(children)) {
        return Promise.all(
            children.flatMap((child) => childToString(child as ComponentChild | Promise<ComponentChildren>, thisArg)),
        ).then((res) => res.join(""));
    }

    return childToString(children, thisArg);
}
