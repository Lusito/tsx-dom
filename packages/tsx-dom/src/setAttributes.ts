import { ClassType, classnames } from "tsx-dom-types";

import { ComponentAttributes, RefType } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function transferKnownProperties(source: any, target: any) {
    for (const key of Object.keys(source)) {
        if (key in target) target[key] = source[key];
    }
}

/** "on" followed by an uppercase character. Not sure if there are any events with anything other than A-Z. Checking unicode just to be safe */
const eventAttributeName = /^on\p{Lu}/u;

export function setAttributes(element: JSX.Element, attrs: ComponentAttributes) {
    for (const name of Object.keys(attrs)) {
        // Ignore some debug props that might be added by bundlers
        if (name === "__source" || name === "__self" || name === "tsxTag") continue;

        const value = attrs[name];
        if (name === "class") {
            const finalValue = classnames(value as ClassType);
            if (finalValue) element.setAttribute(name, finalValue);
        } else if (name === "ref") {
            (value as RefType<any>).current = element;
        } else if (eventAttributeName.test(name)) {
            const finalName = name.replace(/Capture$/, "");
            const useCapture = name !== finalName;
            const eventName = finalName.toLowerCase().substring(2);
            element.addEventListener(eventName, value as EventListenerOrEventListenerObject, useCapture);
        } else if (name === "style" && typeof value !== "string") {
            // Special handler for style with a value of type CSSStyleDeclaration
            transferKnownProperties(value, element.style);
        } else if (name === "dangerouslySetInnerHTML") element.innerHTML = value as string;
        else if (value === true) element.setAttribute(name, name);
        else if (value || value === 0 || value === "") element.setAttribute(name, value.toString());
    }
}
