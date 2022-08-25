/* eslint-disable @typescript-eslint/no-non-null-assertion */
// eslint-disable-next-line import/no-extraneous-dependencies
import { Window } from "happy-dom";

const window = new Window();
export const document = window.document as unknown as Document;

export function prepareDom(html: string) {
    const element = document.createElement("div");
    element.innerHTML = html;

    return element;
}
