/* eslint-disable @typescript-eslint/no-non-null-assertion */
// eslint-disable-next-line import/no-extraneous-dependencies
import { Window } from "happy-dom";

import { addAbortSignal, ComponentChildren, renderToDom, renderToString } from ".";

const window = new Window();
const document = window.document as unknown as Document;

export async function renderHTMLViaDom(children: ComponentChildren) {
    const abortController = new AbortController();

    let dom: DocumentFragment;
    try {
        dom = await renderToDom(document, children, addAbortSignal({}, abortController));
    } catch (e) {
        if (!abortController.signal.aborted) abortController.abort();
        throw e;
    }

    // Since the dom might be a fragment or just a text node, we need a wrapper to render it
    const wrapper = document.createElement("div");
    wrapper.appendChild(dom);

    return wrapper.innerHTML;
}

export async function renderHTMLViaString(children: ComponentChildren) {
    const abortController = new AbortController();

    try {
        return await renderToString(children, addAbortSignal({}, abortController));
    } catch (e) {
        if (!abortController.signal.aborted) abortController.abort();
        throw e;
    }
}

export function html(strings: TemplateStringsArray, ...values: string[]) {
    return strings
        .map((s, i) => (i === strings.length - 1 ? s : `${s}${values[i]}`))
        .join("")
        .replace(/\s*\n\s*/g, " ")
        .replace(/\s*>\s*/g, ">")
        .trim();
}
