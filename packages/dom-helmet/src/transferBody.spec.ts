/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { prepareDom } from "../testUtils";
import { transferBody } from "./transferBody";

describe("transferBody", () => {
    function createDom() {
        const el = prepareDom(`
        <html>
            <body>
                <div>a</div>
                <div>b</div>
                <div>c</div>
                <body>
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                </body>
            </body>
        </html>
        `);

        const body = el.querySelector("body");
        const falseBody = el.querySelector("body > body");
        expect(body).toBeTruthy();
        expect(falseBody).toBeTruthy();

        return {
            el,
            body: body!,
            falseBody: falseBody as HTMLBodyElement,
        };
    }

    it("inserts the new nodes into the original body", () => {
        const { body, falseBody } = createDom();

        const falseBodyChildren = Array.from(falseBody.childNodes);
        transferBody(falseBody, body);

        expect(falseBodyChildren.every((child) => child.parentNode === body)).toBe(true);
    });

    it("does not remove pre-existing elements", () => {
        const { body, falseBody } = createDom();

        const preExisting = Array.from(body.querySelectorAll("div"));
        transferBody(falseBody, body);

        expect(preExisting.every((child) => child.parentNode === body)).toBe(true);
    });

    it("removes false body after completion", () => {
        const { body, falseBody } = createDom();

        transferBody(falseBody, body);

        expect(falseBody.parentNode).toBeNull();
    });
});
