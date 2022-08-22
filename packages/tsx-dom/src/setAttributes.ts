import { ComponentAttributes } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function transferKnownProperties(source: any, target: any) {
    for (const key of Object.keys(source)) {
        if (key in target) target[key] = source[key];
    }
}

export function setAttributes(element: JSX.Element, attrs: ComponentAttributes) {
    for (const name of Object.keys(attrs)) {
        // Ignore some debug props that might be added by bundlers
        if (name === "__source" || name === "__self") continue;

        const value = attrs[name];
        if (name.startsWith("on")) {
            const finalName = name.replace(/Capture$/, "");
            const useCapture = name !== finalName;
            const eventName = finalName.toLowerCase().substring(2);
            element.addEventListener(eventName, value as EventListenerOrEventListenerObject, useCapture);
        } else if (name === "style" && typeof value !== "string") {
            // Special handler for style with a value of type CSSStyleDeclaration
            transferKnownProperties(value, element.style);
        } else if (name === "dangerouslySetInnerHTML") element.innerHTML = value as string;
        else if (value === true) element.setAttribute(name, name);
        else if (value || value === 0) element.setAttribute(name, value.toString());
    }
}
