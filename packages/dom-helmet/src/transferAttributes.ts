export function transferAttributes(source: Element, target: Element) {
    const attributes = source.getAttributeNames();
    for (const attribute of attributes) {
        const newValue = source.getAttribute(attribute) ?? "";
        const oldValue = target.getAttribute(attribute);

        if (attribute === "class" && oldValue) {
            // Classes will be appended instead of replaced
            target.setAttribute("class", `${oldValue} ${newValue}`);
        } else if (attribute === "style" && oldValue) {
            // Style will be appended instead of replaced
            const separator = oldValue.endsWith(";") ? "" : ";";
            target.setAttribute("style", `${oldValue}${separator}${newValue}`);
        } else {
            target.setAttribute(attribute, newValue);
        }
    }
}
