import { ElementAttributes, HTMLAttributes, HTMLElementAttributes } from "tsx-dom-types";

import { jsx } from "./jsx-runtime";
import { FC, HTMLComponentProps } from "./types";

export type CustomElementConstructor<T extends HTMLElement> = {
    new (...params: any[]): T;
};

export function defineCustomElement<T extends Record<string, any>>(
    name: string,
    constructor: CustomElementConstructor<HTMLElement>,
): FC<T & HTMLComponentProps<HTMLElement> & ElementAttributes<HTMLElement, HTMLAttributes>>;
export function defineCustomElement<T extends Record<string, any>, TName extends keyof HTMLElementTagNameMap>(
    name: string,
    constructor: CustomElementConstructor<HTMLElementTagNameMap[TName]>,
    options: { extends: TName },
): FC<T & HTMLComponentProps<HTMLElementTagNameMap[TName]> & HTMLElementAttributes<TName>>;
export function defineCustomElement(
    name: string,
    constructor: CustomElementConstructor<HTMLElement>,
    options?: ElementDefinitionOptions,
) {
    customElements.define(name, constructor, options);
    return (props: any) => jsx(name, props);
}
