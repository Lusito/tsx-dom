/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { prepareDom } from "../testUtils";
import { replaceWithChildren } from "./replaceWithChildren";

describe("replaceWithChildren", () => {
    function createDom() {
        const el = prepareDom(
            <html>
                <body>
                    <div>before</div>
                    <helmet-portal>
                        <div>a</div>
                        <div>b</div>
                        <div>c</div>
                    </helmet-portal>
                    <div>after</div>
                </body>
            </html>
        );

        const body = el.querySelector("body");
        expect(body).toBeTruthy();

        return body!;
    }

    it("inserts the children before itself and removes the element itself", () => {
        const body = createDom();

        const portal = body.querySelector("helmet-portal")!;
        expect(portal).toBeTruthy();
        replaceWithChildren(portal);

        const ordered = Array.from(body.querySelectorAll("div")).map((e) => e.textContent);
        expect(ordered).toEqual(["before", "a", "b", "c", "after"]);
        expect(portal.parentElement).toBeNull();
    });
});
