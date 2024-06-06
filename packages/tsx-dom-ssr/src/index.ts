import type { ComponentChildren, CustomElementsHTML, IntrinsicElementsHTML, IntrinsicElementsSVG } from "./types";

export * from "./createContext";
export * from "./createElement";
export * from "./domUtils";
export * from "./jsx-runtime";
export * from "./ErrorBoundary";
export * from "./types";

export interface TsxConfig {
    [s: string]: boolean;
}

// Returns TIF if T is specified as true in TsxConfig, otherwise TELSE
type IfTsxConfig<T extends string, TIF, TELSE> = TsxConfig[T] extends false ? TELSE : TIF;

type IntrinsicElementsCombined = IfTsxConfig<"html", IntrinsicElementsHTML, unknown> &
    IfTsxConfig<"svg", IntrinsicElementsSVG, unknown>;

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
        interface IntrinsicElements extends IntrinsicElementsCombined, CustomElementsHTML {}
    }
}
