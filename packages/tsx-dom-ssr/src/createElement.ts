import type { BaseProps, FC, ComponentChildren, VNode } from "./types";

export const createElement = (tag: string | FC, props: BaseProps | null, ...children: ComponentChildren[]): VNode => ({
    tag,
    props: { ...props, children },
});

export const h = createElement;
