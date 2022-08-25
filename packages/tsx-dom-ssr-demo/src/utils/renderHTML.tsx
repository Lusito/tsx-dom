/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { addAbortSignal, ComponentChildren, toDom } from "tsx-dom-ssr";
import { domHelmet } from "dom-helmet";
import { Window } from "happy-dom";
import { Response } from "express";

import { RequestError } from "../errors/RequestError";
import { ErrorPage } from "../pages/ErrorPage";

const window = new Window();
const document = window.document as unknown as Document;

export async function renderHTML(children: ComponentChildren) {
    const cssModules: CssModule[] = [];
    const abortController = new AbortController();

    let dom: DocumentFragment;
    try {
        dom = await toDom(document, children, addAbortSignal({ cssModules }, abortController));
    } catch (e) {
        if (!abortController.signal.aborted) abortController.abort();
        throw e;
    }

    // Since the dom might be a fragment or just a text node, we need a wrapper to render it
    const wrapper = document.createElement("div");
    wrapper.appendChild(dom);

    if (
        wrapper.childNodes.length !== 1 ||
        wrapper.childNodes[0].nodeType !== 1 ||
        (wrapper.childNodes[0] as Element).tagName !== "HTML"
    ) {
        throw new Error("Expected one html node at the root level");
    }

    const head = wrapper.querySelector("html > head") as HTMLHeadElement;
    domHelmet({
        html: wrapper.querySelector("html")!,
        head,
        body: wrapper.querySelector("html > body")!,
    });

    for (const cssModule of cssModules) {
        const style = document.createElement("style");
        // eslint-disable-next-line no-underscore-dangle
        style.innerHTML = cssModule._getCss();
        head.appendChild(style);
    }

    return `<!DOCTYPE html>${wrapper.innerHTML}`;
}

export async function respondHTML(res: Response, children: ComponentChildren) {
    try {
        const html = await renderHTML(children);
        res.send(html);
    } catch (e) {
        try {
            // Try to render an error page
            const html = await renderHTML(<ErrorPage error={e} />);

            res.status(e instanceof RequestError ? e.status : 500).send(html);
        } catch (e2) {
            console.error("Uncaught exception", e2);
            res.status(500).send(`Unknown Error ${String(e2)}`);
        }
    }
}
