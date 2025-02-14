/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-classes-per-file */

export interface FakeEventListener {
    name: string;
    value: (...args: unknown[]) => unknown;
    useCapture: boolean;
}

export class FakeTextNode {
    public readonly element = false as const;

    public readonly text: string;

    constructor(text: string) {
        this.text = text;
    }
}

export class FakeElementNode {
    public readonly element = true as const;

    public readonly attributes: { [s: string]: string } = {};

    public readonly eventListeners: FakeEventListener[] = [];

    public readonly children: FakeNode[] = [];

    public readonly style = {
        border: "",
        height: "",
        background: "",
    };

    public readonly tag: string;

    constructor(tag: string) {
        this.tag = tag;
    }

    public setAttribute(key: string, value: string) {
        this.attributes[key] = value;
    }

    public addEventListener(name: string, value: (...args: unknown[]) => unknown, useCapture: boolean) {
        this.eventListeners.push({ name, value, useCapture });
    }

    public appendChild(child: FakeNode) {
        this.children.push(child);
    }
}

export type FakeNode = FakeElementNode | FakeTextNode;

globalThis.Element = FakeElementNode as any;

export class FakeDocument {
    public nodes: FakeNode[] = [];

    public createTextNode(text: string) {
        const node = new FakeTextNode(text);
        this.nodes.push(node);
        return node;
    }

    public createElement(tag: string) {
        const node = new FakeElementNode(tag);
        this.nodes.push(node);
        return node;
    }

    public reset() {
        this.nodes.length = 0;
    }
}

export const fakeDoc = new FakeDocument();

export const asFakeNode = (v: JSX.Element) => v as unknown as FakeNode;

globalThis.document = fakeDoc as any;
