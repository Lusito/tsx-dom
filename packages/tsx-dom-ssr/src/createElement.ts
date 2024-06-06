import type { BaseProps, FC, ComponentChildren } from "./types";
import { jsx } from "./jsx-runtime";

export function createElement(
    tag: string | FC,
    props: BaseProps | null,
    ...children: ComponentChildren[]
): ComponentChildren {
    return jsx(tag, { ...props, children });
}

export const h = createElement;
