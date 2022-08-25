import { createContext } from "tsx-dom-ssr";

export const SomeNumber = createContext({ fallback: 10, description: "Some Number Context" });
