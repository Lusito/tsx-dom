import type {
    HTMLEventAttributes,
    PropsForElement,
    SVGEventAttributes,
    SVGElementAttributes,
    HTMLElementAttributes,
    EventHandler,
    ElementAttributeValue,
} from "tsx-dom-types";

export type ComponentChild = ComponentChild[] | JSX.Element | string | number | boolean | undefined | null;
export type ComponentChildren = ComponentChild | ComponentChild[];
export interface BaseProps {
    children?: ComponentChildren;
}
export type FC<T = BaseProps> = (props: T) => JSX.Element;
export type ComponentAttributes = {
    [s: string]: ElementAttributeValue | EventHandler<Element, Event>;
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
        : PropsForElement<HTMLElement> & HTMLComponentProps<Element>);

export type IntrinsicElementsHTML = {
    [TKey in keyof HTMLElementTagNameMap]?: HTMLElementAttributes<TKey> &
        HTMLComponentProps<HTMLElementTagNameMap[TKey]> &
        HTMLEventAttributes<TKey>;
};
export type IntrinsicElementsSVG = {
    [TKey in keyof SVGElementTagNameMap]?: SVGElementAttributes<TKey> &
        HTMLComponentProps<SVGElementTagNameMap[TKey]> &
        SVGEventAttributes<TKey>;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CustomElementsHTML {}

export type RefType<T> = { current: T | null };
