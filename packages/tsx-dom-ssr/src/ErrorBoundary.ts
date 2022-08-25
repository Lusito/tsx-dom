import type { ComponentChildren, ComponentThis } from "./types";
import { internalComponent } from "./internal";
import { toDom } from "./domUtils";

export type ErrorBoundaryProps = {
    render: () => ComponentChildren;
    fallback: (props: { error: unknown }) => ComponentChildren;
    /** @returns false if this boundary should skip the error and let the next boundary handle it */
    accept?: (error: unknown) => boolean;
};

export const ErrorBoundary = internalComponent((props: ErrorBoundaryProps) => async (document, thisArg) => {
    const abortController = new AbortController();
    // Connect to parent AbortSignal
    const abort = () => {
        !abortController.signal.aborted && abortController.abort();
    };
    thisArg.abortSignal.addEventListener("abort", abort);

    try {
        const children = await props.render();

        return toDom(document, children, addAbortSignal(thisArg, abortController));
    } catch (error) {
        abort();

        if (props.accept && !props.accept(error)) {
            throw error;
        }

        const children = await props.fallback({ error });

        return toDom(document, children, thisArg);
    }
});

// Fixme: Experimental idea to support cancel parallel requests when one of the requests fails within an error-boundary.
// Fixme: The only other alternative to support early bailout like above would be to use generator functions.
// Generators seem like the perfect fit, but they are not widely used. Async/await is more approachable.
// If generators will be used, keep async functions or replace them entirely with generators?
export function addAbortSignal<T>(
    thisArg: T,
    abortController: AbortController
): T & Pick<ComponentThis, "abortSignal" | "withAbortSignal"> {
    const abortSignal = abortController.signal;

    return {
        ...thisArg,
        abortSignal,
        withAbortSignal(promise) {
            return new Promise((resolve, reject) => {
                const bail = () => reject();
                abortSignal.addEventListener("abort", bail);
                promise
                    .then((value) => {
                        if (!abortSignal.aborted) {
                            abortSignal.removeEventListener("abort", bail);
                            resolve(value as never);
                        }
                    })
                    .catch((error) => {
                        if (!abortSignal.aborted) {
                            abortSignal.removeEventListener("abort", bail);
                            abortController.abort();
                            reject(error);
                        }
                    });
            });
        },
    };
}
