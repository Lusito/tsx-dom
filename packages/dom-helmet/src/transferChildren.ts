export function transferChildren(source: Element, target: Element) {
    Array.from(source.childNodes).forEach((node) => target.appendChild(node));
}
