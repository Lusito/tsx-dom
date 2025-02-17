import type {
    PropsForElement,
    HTMLElementAttributes,
    SVGElementAttributes,
    ElementAttributeValue,
} from "tsx-dom-types";

export type VNode = (
    document: Document,
    thisArg: ComponentThis,
) => Promise<HTMLElement | SVGElement | DocumentFragment | Text>;

export interface BaseProps {
    children?: ComponentChildren;
}

export interface HTMLComponentProps extends BaseProps {
    dangerouslySetInnerHTML?: string;
    /**
     * This is essentially a reverse "is" attribute.
     * If you specify it, the generated tag will be tsxTag and it will receive an "is" attribute with the tag you specified in your JSX.
     * This is needed because we can't make the is-property associate with the correct component props.
     */
    tsxTag?: keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap;
}

export type CustomElementProps<TBase, TName extends keyof HTMLElementTagNameMap | null> = TBase &
    (TName extends keyof HTMLElementTagNameMap
        ? JSX.IntrinsicElements[TName]
        : PropsForElement<HTMLElement> & HTMLComponentProps);

export interface ComponentThis {
    abortSignal: AbortSignal;
    withAbortSignal<T>(promise: Promise<T>): Promise<T>;
    [s: symbol]: unknown;
}

export type FC<T = BaseProps> = (this: ComponentThis, props: T) => ComponentChildren;
export type ComponentAttributes = Record<string, ElementAttributeValue>;

export type ComponentChild = VNode | string | number | false | undefined | null;
export type ComponentChildren = ComponentChild | ComponentChildren[] | Promise<ComponentChild | ComponentChildren[]>;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CustomElementsHTML {}

export type SVGAndHTMLElementKeys = keyof SVGElementTagNameMap & keyof HTMLElementTagNameMap;
export type SVGOnlyElementKeys = Exclude<keyof SVGElementTagNameMap, SVGAndHTMLElementKeys>;
export type IntrinsicElementsHTML = {
    [TKey in keyof HTMLElementTagNameMap]?: HTMLElementAttributes<TKey> & HTMLComponentProps;
};
export type IntrinsicElementsSVG = {
    [TKey in SVGOnlyElementKeys]?: SVGElementAttributes<TKey> & HTMLComponentProps;
};
