import { HTMLAttributes } from "./HTMLAtributes";
import { SVGAttributes } from "./SVGAttributes";

type SpecialKeys<T extends Element> = T extends HTMLLabelElement | HTMLOutputElement
    ? "for" | "class" | "is"
    : "class" | "is";

/** Figure out which of the attributes exist for a specific element */
export type ElementAttributes<TElement extends Element, TAttributes extends HTMLAttributes | SVGAttributes> = {
    [TKey in (keyof TElement & keyof TAttributes) | SpecialKeys<TElement>]?: TAttributes[TKey];
};
