import { FC, NPFC } from "./types";

let defaultNamespace: string | undefined;

export const setDefaultNamespace = (ns: string | undefined) => {
    defaultNamespace = ns;
};

const namespaceStack: string[] = [];

export const pushNamespace = (ns: string) => {
    namespaceStack.push(ns);
};

export const popNamespace = () => {
    namespaceStack.pop();
};

export const clearNamespaceStack = () => {
    namespaceStack.length = 0;
};

export const getCurrentNamespace = () =>
    namespaceStack.length > 0 ? namespaceStack[namespaceStack.length - 1] : defaultNamespace;

export type XmlNsProps = {
    namespace: string;
    render: () => JSX.Element;
};

export const XmlNs = ({ namespace, render }: XmlNsProps) => {
    try {
        pushNamespace(namespace);
        return render();
    } finally {
        popNamespace();
    }
};

export function withNamespace(namespace: string, Component: NPFC): NPFC;
export function withNamespace<T>(namespace: string, Component: FC<T>): FC<T>;
export function withNamespace<T>(namespace: string, Component: FC<T> | NPFC) {
    return (props: T) => {
        try {
            pushNamespace(namespace);
            return <Component {...props} />;
        } finally {
            popNamespace();
        }
    };
}
