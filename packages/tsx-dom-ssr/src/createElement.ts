import type { BaseProps, Component, ComponentChildren } from "./types";
import { jsx } from "./jsx-runtime";

export function createElement(
    tag: string | Component,
    props: BaseProps | null,
    ...children: ComponentChildren[]
): ComponentChildren {
    return jsx(tag, { ...props, children });
}

export const h = createElement;
