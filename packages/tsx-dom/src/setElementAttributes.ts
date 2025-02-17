import { setElementAttribute } from "tsx-dom-types";

import { ComponentAttributes, RefType } from "./types";

const passiveTrueEvents = ["wheel", "mousewheel", "touchstart", "touchmove"];
/**
 * All browsers except safari fall back to true on some passive event listeners on the body element, so we make it consistent.
 * @see: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#using_passive_listeners
 */
function getPassiveFallback(element: JSX.Element, eventName: string) {
    return element.tagName === "BODY" && passiveTrueEvents.includes(eventName);
}

/**
 * "on" followed by an uppercase character.
 * Not sure if there are any events with anything other than A-Z. Checking unicode just to be safe
 */
const eventAttributeName = /^on\p{Lu}/u;

export function setElementAttributes(element: JSX.Element, attrs: ComponentAttributes) {
    for (const name of Object.keys(attrs)) {
        const value = attrs[name];
        if (name === "ref") {
            (value as RefType<any>).current = element;
        } else if (typeof value === "function") {
            if (eventAttributeName.test(name)) {
                const eventName = name.substring(2).toLowerCase();
                element.addEventListener(eventName, value as EventListener, {
                    capture: value.capture === true,
                    once: value.once === true,
                    passive: value.passive === true ? true : getPassiveFallback(element, eventName),
                });
            } else {
                console.error(
                    `The attribute '${name}' has been set to a function, but functions can only be set on event props (starting with 'on', followed by an uppercase character)!`,
                );
            }
        } else {
            setElementAttribute(element, name, value);
        }
    }
}
