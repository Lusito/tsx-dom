/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { prepareDom } from "../testUtils";
import { transferPortal } from "./transferPortal";

describe("replaceWithChildren", () => {
    function createDom() {
        const el = prepareDom(`
        <html>
            <body>
                <div>before</div>
                <helmet-destination>
                    <div id="x">x</div>
                    <div>existing</div>
                </helmet-destination>
                <div>after</div>
                <helmet-portal>
                    <div>a</div>
                    <div>b</div>
                    <div>c</div>
                    <div id="x">new-x</div>
                </helmet-portal>
            </body>
        </html>
        `);

        const body = el.querySelector("body");
        expect(body).toBeTruthy();

        return body!;
    }

    it("inserts the children of the portal into the destination and removes the portal", () => {
        const body = createDom();

        const portal = body.querySelector("helmet-portal")!;
        expect(portal).toBeTruthy();
        const destination = body.querySelector("helmet-destination")!;
        expect(destination).toBeTruthy();
        transferPortal(portal, destination);

        const ordered = Array.from(body.querySelectorAll("div")).map((e) => e.textContent);
        expect(ordered).toEqual(["before", "existing", "a", "b", "c", "new-x", "after"]);
        expect(portal.parentElement).toBeNull();
        expect(destination.parentElement).not.toBeNull();
    });
});
