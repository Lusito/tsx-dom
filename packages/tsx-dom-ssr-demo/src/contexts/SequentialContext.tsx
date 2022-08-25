import { BaseProps, createContext } from "tsx-dom-ssr";

// See SequentialPage for an explanation on what this is for.

export type SequentialContextValue = {
    start: () => Promise<() => void>;
};
export const SequentialContext = createContext<SequentialContextValue>({ description: "Sequential Context" });

function createSequentialContextValue(): SequentialContextValue {
    let active = 0;
    const pending: Array<() => void> = [];
    return {
        start(): Promise<() => void> {
            let done = false;
            const end = () => {
                if (!done) {
                    done = true;
                    active--;
                    pending.shift()?.();
                }
            };
            if (active) {
                return new Promise((resolve) => {
                    pending.push(() => resolve(end));
                });
            }
            active++;
            return Promise.resolve(end);
        },
    };
}

export function SequentialContextProvider({ children }: BaseProps) {
    return <SequentialContext.Provider value={createSequentialContextValue()}>{children}</SequentialContext.Provider>;
}
