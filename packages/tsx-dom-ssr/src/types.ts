import type { ElementAttributes, HTMLAttributes, SVGAttributes, StyleAttributes } from "tsx-dom-types";

export type VNode = (
    document: Document,
    thisArg: ComponentThis,
) => Promise<HTMLElement | SVGElement | DocumentFragment | Text>;

export interface BaseProps {
    children?: ComponentChildren;
}

export interface HTMLComponentProps extends BaseProps {
    dangerouslySetInnerHTML?: string;
    tsxTag?: keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap;
}

export type CustomElementProps<TBase, TName extends keyof HTMLElementTagNameMap | null> = TBase &
    (TName extends keyof HTMLElementTagNameMap ? JSX.IntrinsicElements[TName] : HTMLAttributes & HTMLComponentProps);

export interface ComponentThis {
    abortSignal: AbortSignal;
    withAbortSignal<T>(promise: Promise<T>): Promise<T>;
    [s: symbol]: unknown;
}

export type FC<T = BaseProps> = (this: ComponentThis, props: T) => ComponentChildren;
export type ComponentAttributes = {
    [s: string]: string | number | boolean | StyleAttributes;
};

export type ComponentChild = VNode | string | number | false | undefined | null;
export type ComponentChildren = ComponentChild | ComponentChildren[] | Promise<ComponentChild | ComponentChildren[]>;

export interface CustomElementsHTML {}

export type SVGAndHTMLElementKeys = keyof SVGElementTagNameMap & keyof HTMLElementTagNameMap;
export type SVGOnlyElementKeys = Exclude<keyof SVGElementTagNameMap, SVGAndHTMLElementKeys>;
export type IntrinsicElementsHTML = {
    [TKey in keyof HTMLElementTagNameMap]?: ElementAttributes<HTMLElementTagNameMap[TKey], HTMLAttributes> &
        HTMLComponentProps;
};
export type IntrinsicElementsSVG = {
    [TKey in SVGOnlyElementKeys]?: ElementAttributes<SVGElementTagNameMap[TKey], SVGAttributes> & HTMLComponentProps;
};
