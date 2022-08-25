import type { BaseProps } from "./types";
import { internalComponent } from "./internal";

export const Fragment = internalComponent((props: BaseProps) => props.children);
