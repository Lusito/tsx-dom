"use strict";
/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * License: MIT
 * @author Santo Pfingsten
 * @see https://github.com/Lusito/tsx-dom
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.h = void 0;
function applyChild(element, child) {
    if (child instanceof HTMLElement || child instanceof SVGElement)
        element.appendChild(child);
    else if (typeof child === "string" || typeof child === "number")
        element.appendChild(document.createTextNode(child.toString()));
    else
        console.warn("Unknown type to append: ", child);
}
function applyChildren(element, children) {
    for (const child of children) {
        if (!child && child !== 0)
            continue;
        if (Array.isArray(child))
            applyChildren(element, child);
        else
            applyChild(element, child);
    }
}
function transferKnownProperties(source, target) {
    for (const key of Object.keys(source)) {
        if (Object.prototype.hasOwnProperty.call(target, key))
            target[key] = source[key];
    }
}
function h(tag, attrs, ...children) {
    if (typeof tag === "function")
        return tag(Object.assign(Object.assign({}, attrs), { children }));
    let element;
    if (attrs === null || attrs === void 0 ? void 0 : attrs.xmlns) {
        element = document.createElementNS(attrs.xmlns, tag);
    }
    else
        element = document.createElement(tag);
    if (attrs) {
        // Special handler for style with a value of type JSX.StyleAttributes
        if (attrs.style && typeof attrs.style !== "string") {
            transferKnownProperties(attrs.style, element.style);
            delete attrs.style;
        }
        for (const name of Object.keys(attrs)) {
            const value = attrs[name];
            if (name === "dangerouslySetInnerHTML" && typeof value === 'string') {
                element.innerHTML = value;
            }
            else if (name.startsWith("on")) {
                const finalName = name.replace(/Capture$/, "");
                const useCapture = name !== finalName;
                const eventName = finalName.toLowerCase().substring(2);
                element.addEventListener(eventName, value, useCapture);
            }
            else if (value === true)
                element.setAttribute(name, name);
            else if (value || value === 0)
                element.setAttribute(name, value.toString());
        }
    }
    applyChildren(element, children);
    return element;
}
exports.h = h;
//# sourceMappingURL=index.js.map