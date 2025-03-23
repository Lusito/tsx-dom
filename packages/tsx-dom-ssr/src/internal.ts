import type { BaseProps, FC, ComponentChildren, ComponentThis } from "./types";

export type TsxInternalFn<TProps> = <TNextResult>(
    props: TProps,
    thisArg: ComponentThis,
    next: (children: ComponentChildren, thisArg: ComponentThis) => TNextResult | Promise<TNextResult>,
) => TNextResult | Promise<TNextResult>;

export type InternalComponent<T = BaseProps> = FC<T> & {
    __tsxInternal: TsxInternalFn<T>;
};

export function internalComponent<T>(fn: TsxInternalFn<T>): FC<T> {
    return Object.assign(() => null, { __tsxInternal: fn });
}

export const isInternalComponent = (tag: FC<BaseProps> | InternalComponent): tag is InternalComponent =>
    "__tsxInternal" in tag;
