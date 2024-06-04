import { jsx } from "./jsx-runtime";

export function defineCustomElement<T extends Record<string, any>>(
    name: string,
    constructor: CustomElementConstructor,
    options?: ElementDefinitionOptions,
) {
    customElements.define(name, constructor, options);
    return (props: T) => jsx(name, props);
}
