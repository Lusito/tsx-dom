import NodeCache from "node-cache";

import { RequestError } from "../errors/RequestError";
import type { RamPage } from "../types/ramTypes";

type StatusListener<T> = { resolve: (value: T) => void; reject: (value: unknown) => void };
type StatusProgress<T> = { status: "progress"; listeners: Array<StatusListener<T>> };
type StatusSuccess<T> = { status: "success"; value: T };
type StatusError = { status: "error"; error: unknown };
type CacheEntry<T> = StatusProgress<T> | StatusSuccess<T> | StatusError;

const statusProgress = <T>(listeners: Array<StatusListener<T>>): StatusProgress<T> => ({
    status: "progress",
    listeners,
});
const statusSuccess = <T>(value: T): StatusSuccess<T> => ({ status: "success", value });
const statusError = (error: unknown): StatusError => ({ status: "error", error });

const cache = new NodeCache({
    stdTTL: 5 * 60, // 5 Minutes
    checkperiod: 60,
});

async function fetchJsonUncached(url: string, init: RequestInit) {
    const response = await fetch(url, init);
    if (response.status > 300) throw new RequestError(response.status, `Failed getting ${url}`);

    return response.json();
}

export async function fetchJson<T>(url: string, init: RequestInit): Promise<T> {
    const entry: CacheEntry<T> | undefined = cache.get(url);
    if (entry) {
        if (entry.status === "success") return entry.value;
        if (entry.status === "error") throw entry.error;

        return new Promise((resolve, reject) => {
            entry.listeners.push({ resolve, reject });
        });
    }

    const listeners: Array<StatusListener<T>> = [];
    try {
        cache.set(url, statusProgress(listeners));

        const value = await fetchJsonUncached(url, init);
        cache.set(url, statusSuccess(value));
        listeners.forEach(({ resolve }) => resolve(value));

        return value;
    } catch (error) {
        listeners.forEach(({ reject }) => reject(error));
        cache.set(url, statusError(error), 20); // shorter TTL for errors
        throw error;
    }
}

export function fetchRAM<T>(path: string, init: RequestInit) {
    return fetchJson<T>(`https://rickandmortyapi.com/api${path}`, init);
}

export function fetchRAMPage<T>(path: string, page: number, init: RequestInit) {
    return fetchJson<RamPage<T>>(`https://rickandmortyapi.com/api${path}?page=${page}`, init);
}
