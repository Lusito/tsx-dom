/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { prepareDom } from "../testUtils";
import { transferChildren } from "./transferChildren";

describe("transferChildren", () => {
    function createDom() {
        const el = prepareDom(`
        <html>
            <head>
                <title>Initial</title>
                <base href="https://initial.com/">
            </head>
            <body>
                <head>
                    <div>a</div>
                    <div>b</div>
                    <div>c</div>
                </head>
            </body>
        </html>
        `);

        const head = el.querySelector("head");
        const falseHead = el.querySelector("body > head");
        expect(head).toBeTruthy();
        expect(falseHead).toBeTruthy();

        return {
            el,
            head: head!,
            falseHead: falseHead as HTMLHeadElement,
        };
    }

    it("inserts the new nodes into the target node", () => {
        const { head, falseHead } = createDom();

        const falseHeadChildren = Array.from(falseHead.childNodes);
        transferChildren(falseHead, head);

        expect(falseHeadChildren.every((child) => child.parentNode === head)).toBe(true);
    });

    it("does not remove pre-existing elements", () => {
        const { head, falseHead } = createDom();

        const preExisting = Array.from(head.querySelectorAll("*"));
        transferChildren(falseHead, head);

        expect(preExisting.every((child) => child.parentNode === head)).toBe(true);
    });
});
