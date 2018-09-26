/**
 * License: MIT
 * @author Santo Pfingsten
 * @see https://github.com/Lusito/tsx-dom
 */

export interface FakeEventListener {
    name: string;
    value: Function;
    useCapture: boolean;
}

export class FakeTextNode {
    public readonly element: false = false;

    constructor(public readonly text: string) {
    }
}

export class FakeElementNode {
    public readonly element: true = true;
    public readonly attributes: { [s: string]: string } = {};
    public readonly eventListeners: FakeEventListener[] = [];
    public readonly children: FakeNode[] = [];
    constructor(public readonly tag: string) {
    }

    public setAttribute(key: string, value: string) {
        this.attributes[key] = value;
    }

    public addEventListener(name: string, value: Function, useCapture: boolean) {
        this.eventListeners.push({ name, value, useCapture })
    }

    public appendChild(child: FakeNode) {
        this.children.push(child);
    }
}

export type FakeNode = FakeElementNode | FakeTextNode;

// @ts-ignore
global.HTMLElement = FakeElementNode;

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

// @ts-ignore
global.document = fakeDoc;
