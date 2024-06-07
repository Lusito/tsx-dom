export function replaceWithChildren(element: Element) {
    const parent = element.parentElement;
    if (parent) {
        Array.from(element.childNodes).forEach((child) => parent.insertBefore(child, element));
        element.remove();
    } else {
        console.warn("Missing parent element when replacing element with its children");
    }
}
