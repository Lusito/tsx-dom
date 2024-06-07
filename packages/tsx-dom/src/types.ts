import type { EventAttributes, StyleAttributes, SVGAttributes, HTMLAttributes, ElementAttributes } from "tsx-dom-types";

export type ComponentChild = ComponentChild[] | JSX.Element | string | number | boolean | undefined | null;
export type ComponentChildren = ComponentChild | ComponentChild[];
export interface BaseProps {
    children?: ComponentChildren;
}
export type FC<T = BaseProps> = (props: T) => JSX.Element;
export type ComponentAttributes = {
    [s: string]: string | number | boolean | undefined | null | StyleAttributes | EventListenerOrEventListenerObject;
};

export interface HTMLComponentProps<T extends Element> extends BaseProps {
    dangerouslySetInnerHTML?: string;
    /**
     * This is essentially a reverse "is" attribute.
     * If you specify it, the generated tag will be tsxTag and it will receive an "is" attribute with the tag you specified in your JSX.
     * This is needed because we can't make the is-property associate with the correct component props.
     */
    tsxTag?: keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap;
    ref?: RefType<T>;
}

export type CustomElementProps<TBase, TName extends keyof HTMLElementTagNameMap | null> = TBase &
    (TName extends keyof HTMLElementTagNameMap
        ? JSX.IntrinsicElements[TName]
        : HTMLAttributes & HTMLComponentProps<Element>);

export type SVGAndHTMLElementKeys = keyof SVGElementTagNameMap & keyof HTMLElementTagNameMap;
export type SVGOnlyElementKeys = Exclude<keyof SVGElementTagNameMap, SVGAndHTMLElementKeys>;
export type IntrinsicElementsHTML = {
    [TKey in keyof HTMLElementTagNameMap]?: ElementAttributes<HTMLElementTagNameMap[TKey], HTMLAttributes> &
        HTMLComponentProps<HTMLElementTagNameMap[TKey]> &
        EventAttributes<HTMLElementTagNameMap[TKey]>;
};
export type IntrinsicElementsSVG = {
    [TKey in SVGOnlyElementKeys]?: ElementAttributes<SVGElementTagNameMap[TKey], SVGAttributes> &
        HTMLComponentProps<SVGElementTagNameMap[TKey]> &
        EventAttributes<SVGElementTagNameMap[TKey]>;
};

export type IntrinsicElementsHTMLAndSVG = IntrinsicElementsHTML & IntrinsicElementsSVG;

export interface CustomElementsHTML {}

export type RefType<T> = { current: T | null };
