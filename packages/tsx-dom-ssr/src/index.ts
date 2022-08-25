import type { ComponentChildren, CustomElementsHTML, IntrinsicElementsHTMLAndSVG } from "./types";

export * from "./createContext";
export * from "./createElement";
export * from "./domUtils";
export * from "./jsx-runtime";
export * from "./ErrorBoundary";
export * from "./types";

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace JSX {
        // Return type of jsx syntax
        type Element = ComponentChildren;

        // The property name to use
        interface ElementAttributesProperty {
            props: unknown;
        }

        // The children name to use
        interface ElementChildrenAttribute {
            children: ComponentChildren;
        }

        // The available string tags
        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        interface IntrinsicElements extends IntrinsicElementsHTMLAndSVG, CustomElementsHTML {}
    }
}
