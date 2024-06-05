import type { EventAttributes, StyleAttributes, SVGAttributes, HTMLAttributes } from "tsx-dom-types";

export type ComponentChild = ComponentChild[] | JSX.Element | string | number | boolean | undefined | null;
export type ComponentChildren = ComponentChild | ComponentChild[];
export interface BaseProps {
    children?: ComponentChildren;
}
export type Component = (props: BaseProps) => JSX.Element;
export type ComponentAttributes = {
    [s: string]: string | number | boolean | undefined | null | StyleAttributes | EventListenerOrEventListenerObject;
};

export interface HTMLComponentProps<T> extends BaseProps {
    dangerouslySetInnerHTML?: string;
    ref?: RefType<T>;
}

export type CustomElementProps<T, TBase extends keyof JSX.IntrinsicElements> = T & JSX.IntrinsicElements[TBase];

export type SVGAndHTMLElementKeys = keyof SVGElementTagNameMap & keyof HTMLElementTagNameMap;
export type SVGOnlyElementKeys = Exclude<keyof SVGElementTagNameMap, SVGAndHTMLElementKeys>;
export type IntrinsicElementsHTML = {
    [TKey in keyof HTMLElementTagNameMap]?: HTMLAttributes &
        HTMLComponentProps<HTMLElementTagNameMap[TKey]> &
        EventAttributes<HTMLElementTagNameMap[TKey]>;
};
export type IntrinsicElementsSVG = {
    [TKey in SVGOnlyElementKeys]?: SVGAttributes &
        HTMLComponentProps<SVGElementTagNameMap[TKey]> &
        EventAttributes<SVGElementTagNameMap[TKey]>;
};

export type IntrinsicElementsHTMLAndSVG = IntrinsicElementsHTML & IntrinsicElementsSVG;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CustomElementsHTML {}

export type RefType<T> = { current: T | null };
