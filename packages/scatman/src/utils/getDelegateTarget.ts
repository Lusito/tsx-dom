export function getDelegateTarget(event: Event, selector: string) {
    if (event.target instanceof Element) {
        const delegateTarget = event.target.closest(selector);
        if (delegateTarget instanceof HTMLAnchorElement || delegateTarget instanceof SVGElement) {
            return delegateTarget;
        }
    }
    return null;
}
