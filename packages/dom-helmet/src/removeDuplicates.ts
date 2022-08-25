export const removeElement = (element: Element) => element.remove();

export function removeDuplicatesBySelector(falseElement: Element, target: Element, selector: string) {
    if (falseElement.querySelector(selector)) {
        target.querySelectorAll(selector).forEach(removeElement);
    }
}

export function removeDuplicatesBySelectorAndAttribute(
    falseElement: Element,
    target: Element,
    selector: string,
    attribute: string
) {
    const originalElements = target.querySelectorAll(selector);
    falseElement.querySelectorAll(selector).forEach((newElement) => {
        const newValue = newElement.getAttribute(attribute);
        if (newValue) {
            originalElements.forEach((oldLink) => {
                if (oldLink.getAttribute(attribute) === newValue) oldLink.remove();
            });
        }
    });
}

export function removeDuplicatesBySelectorAndTextContent(falseElement: Element, target: Element, selector: string) {
    const originalElements = target.querySelectorAll(selector);
    falseElement.querySelectorAll(selector).forEach((newElement) => {
        const newValue = newElement.textContent;
        if (newValue) {
            originalElements.forEach((oldLink) => {
                if (oldLink.textContent === newValue) oldLink.remove();
            });
        }
    });
}
