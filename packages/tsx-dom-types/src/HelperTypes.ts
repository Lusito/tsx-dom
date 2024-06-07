import { HTMLAttributes, HTMLTagFixes } from "./HTMLAttributes";
import { SVGAttributes } from "./SVGAttributes";

type SpecialKeys<T extends Element> = T extends HTMLLabelElement | HTMLOutputElement
    ? "for" | "class" | "is"
    : "class" | "is";

/** Figure out which of the attributes exist for a specific element */
export type ElementAttributes<TElement extends Element, TAttributes extends HTMLAttributes | SVGAttributes> = {
    [TKey in (keyof TElement & keyof TAttributes) | SpecialKeys<TElement>]?: TAttributes[TKey];
};

type PropertiesOfFix<TFixes, TName> = TName extends keyof TFixes ? TFixes[TName] : unknown;

/** Figure out which of the HTML attributes exist for a specific element */
export type HTMLElementAttributes<TName extends keyof HTMLElementTagNameMap> = ElementAttributes<
    HTMLElementTagNameMap[TName],
    HTMLAttributes
> &
    PropertiesOfFix<HTMLTagFixes, TName>;

/** Figure out which of the SVG attributes exist for a specific element */
export type SVGElementAttributes<TName extends keyof SVGElementTagNameMap> = ElementAttributes<
    SVGElementTagNameMap[TName],
    SVGAttributes
>;
