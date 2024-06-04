/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { addAbortSignal, ComponentChildren, toDom } from "tsx-dom-ssr";
import { domHelmet } from "dom-helmet";
import { Window } from "happy-dom";
import { CssModule } from "@lusito/require-libs";
import { FastifyReply } from "fastify";

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
        style.innerHTML = cssModule.__CSS;
        head.appendChild(style);
    }

    return `<!DOCTYPE html>${wrapper.innerHTML}`;
}

function replyHTML(reply: FastifyReply, html: string, status = 200) {
    return reply.type("text/html; charset=UTF-8").status(status).send(html);
}

export async function replyComponent(reply: FastifyReply, children: ComponentChildren) {
    try {
        const html = await renderHTML(children);
        replyHTML(reply, html);
    } catch (e) {
        try {
            // Try to render an error page
            const html = await renderHTML(<ErrorPage error={e} />);

            replyHTML(reply, html, e instanceof RequestError ? e.status : 500);
        } catch (e2) {
            console.error("Uncaught exception", e2);
            reply.status(500).send(`Unknown Error ${String(e2)}`);
        }
    }
}
