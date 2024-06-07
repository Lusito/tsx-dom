import { replaceWithChildren } from "./replaceWithChildren";
import { transferBody } from "./transferBody";
import { transferHead } from "./transferHead";
import { transferHtml } from "./transferHtml";
import { transferPortal } from "./transferPortal";

export type HelmetOptions = {
    html: HTMLHtmlElement;
    head: HTMLHeadElement;
    body: HTMLBodyElement;
};

/**
 * This is a helper similar to "react-helmet".
 *
 * @param elements An object containing the elements required.
 */
export function domHelmet({ html, head, body }: HelmetOptions) {
    html.querySelectorAll("html").forEach((element) => transferHtml(element, html));
    body.querySelectorAll("body").forEach((falseBody) => transferBody(falseBody, body));
    body.querySelectorAll("head").forEach((falseHead) => transferHead(falseHead, head));
    body.querySelectorAll("helmet-portal").forEach((portal) => {
        // Transfer to target if it exists
        const to = portal.getAttribute("to");
        const target = to && body.querySelector(`helmet-destination[id=${to}]`);
        if (target) transferPortal(portal, target);
    });
    // If some portal was not resolved above, replace it with its children now
    body.querySelectorAll("helmet-portal").forEach(replaceWithChildren);
    body.querySelectorAll("helmet-destination").forEach(replaceWithChildren);
}
