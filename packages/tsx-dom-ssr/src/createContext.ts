import type { ComponentThis, BaseProps } from "./types";
import { internalComponent, InternalComponent } from "./internal";
import { toDom } from "./domUtils";

export type ContextProviderProps<T = unknown> = BaseProps & { value: T };
export type ContextProvider<T = unknown> = InternalComponent<ContextProviderProps<T>>;
export type Context<T = unknown> = {
    Provider: ContextProvider<T>;
    for(componentThis: ComponentThis): T;
};

export type CreateContextOptions<T> = {
    fallback?: T;
    description?: string;
};

export function createContext<T>(options: CreateContextOptions<T>): Context<T> {
    const type = Symbol(options.description);

    return {
        Provider: internalComponent(
            (props: ContextProviderProps<T>) => (document, thisArg) =>
                toDom(document, props.children, {
                    ...thisArg,
                    [type]: props.value,
                })
        ),
        for(componentThis) {
            if (type in componentThis) {
                return componentThis[type] as T;
            }

            if (options.fallback === undefined) {
                throw new Error(`Could not find Provider for "${String(type)}" and no fallback was configured!`);
            }

            return options.fallback;
        },
    };
}
