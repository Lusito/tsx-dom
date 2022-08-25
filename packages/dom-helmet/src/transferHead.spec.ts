/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { prepareDom } from "../testUtils";
import { transferHead } from "./transferHead";

describe("transferHead", () => {
    function createDom() {
        const uniqueItems = `
            <meta name="unique" content="1">
            <meta http-equiv="unique" content="1">
            <link rel="stylesheet" href="unique.css">
            <script src="unique.js"></script>
            <meta id="unique">
            <style>.unique{}</style>
        `;
        const duplicateItems = uniqueItems.replace(/unique/g, "duplicate");
        const newItems = uniqueItems.replace(/unique/g, "new");
        const el = prepareDom(`
        <html>
            <head>
                <title>Initial</title>
                <base href="https://initial.com/">

                <meta charset="utf-8">
                
                ${uniqueItems}
                ${duplicateItems}
            </head>
            <body>
                <head>
                    <title>Override</title>
                    <base href="https://override.com/">

                    <meta charset="utf-16">
                    ${duplicateItems}
                    ${newItems}
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

    it("inserts the new nodes into the original head", () => {
        const { head, falseHead } = createDom();

        const falseHeadChildren = Array.from(falseHead.childNodes);
        transferHead(falseHead, head);

        expect(falseHeadChildren.every((child) => child.parentNode === head)).toBe(true);
    });

    it("does not remove elements that are not in the false head", () => {
        const { head, falseHead } = createDom();

        const unique = Array.from(head.querySelectorAll("*")).filter((v) => v.outerHTML.includes("unique"));
        transferHead(falseHead, head);

        expect(unique.every((child) => child.parentNode === head)).toBe(true);
    });

    it("removes elements that are in the false head", () => {
        const { head, falseHead } = createDom();

        const notUnique = Array.from(head.querySelectorAll("*")).filter((v) => !v.outerHTML.includes("unique"));
        transferHead(falseHead, head);

        expect(notUnique.filter((child) => child.parentNode !== null)).toHaveLength(0);
    });

    it("removes false head after completion", () => {
        const { head, falseHead } = createDom();

        transferHead(falseHead, head);

        expect(falseHead.parentNode).toBeNull();
    });
});
