export type EventHandler<T> = [T] extends [never] ? () => void : (detail: T) => void;

export type EventManager<T> = {
    emit: EventHandler<T>;
    on(listener: EventHandler<T>): void;
    off(listener?: EventHandler<T>): void;
};

export function createEventManager<T = never>(name: string) {
    const listeners = new Set<EventHandler<T>>();
    return {
        emit(detail: T) {
            for (const listener of listeners) {
                try {
                    listener(detail);
                } catch (error) {
                    console.error(error);
                }
            }

            // trigger event on document with prefix "scatman:"
            document.dispatchEvent(new CustomEvent(`scatman:${name}`, { detail }));
        },

        on(listener: EventHandler<T>) {
            listeners.add(listener);
        },

        off(listener?: EventHandler<T>) {
            if (!listener) {
                listeners.clear();
            } else if (!listeners.delete(listener)) {
                console.warn(`Handler for event '${name}' no found.`);
            }
        },
    } as EventManager<T>;
}

export function eventManagerMapOff<T>(map: Record<string, EventManager<T>>) {
    Object.keys(map).forEach((keys) => map[keys].off());
}
