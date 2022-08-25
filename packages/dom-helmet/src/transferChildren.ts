export function transferChildren(source: HTMLElement, target: HTMLElement) {
    Array.from(source.childNodes).forEach((node) => target.appendChild(node));
}
