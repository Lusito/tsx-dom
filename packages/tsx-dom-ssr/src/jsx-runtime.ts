import type { BaseProps, FC, VNode } from "./types";
import { internalComponent } from "./internal";

export const Fragment = internalComponent<BaseProps>((props, thisArg, next) => next(props.children, thisArg));

export const jsx = (tag: string | FC, props: BaseProps): VNode => ({ tag, props });

export { jsx as jsxs, jsx as jsxDEV };
