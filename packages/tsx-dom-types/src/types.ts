export type Simplify<T> = { [KeyType in keyof T]: T[KeyType] } & {};

export type EventHandler<TTarget extends EventTarget, TEvent extends Event> = AddEventListenerOptions &
    ((this: TTarget, ev: Omit<TEvent, "currentTarget"> & { readonly currentTarget: TTarget }) => void);
