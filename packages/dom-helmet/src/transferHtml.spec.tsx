/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { prepareDom } from "../testUtils";
import { transferHtml } from "./transferHtml";

describe("transferHtml", () => {
    function createDom() {
        const el = prepareDom(
            <html data-c="old" data-d="keep">
                <body>
                    <html data-a="1" data-b="2" data-c="3"></html>
                </body>
            </html>,
        );

        const html = el.querySelector("html");
        const falseHtml = el.querySelector("body > html");
        expect(html).toBeTruthy();
        expect(falseHtml).toBeTruthy();

        return {
            el,
            html: html!,
            falseHtml: falseHtml as HTMLHtmlElement,
        };
    }

    it("transfers the attributes to the new html", () => {
        const { html, falseHtml } = createDom();

        transferHtml(falseHtml, html);

        expect(Object.keys(html.dataset).sort()).toEqual(["a", "b", "c", "d"]);
        expect(html.dataset.a).toBe("1");
        expect(html.dataset.b).toBe("2");
        expect(html.dataset.c).toBe("3");
        expect(html.dataset.d).toBe("keep");
    });

    it("removes false html tag after completion", () => {
        const { html, falseHtml } = createDom();

        transferHtml(falseHtml, html);

        expect(falseHtml.parentNode).toBeNull();
    });

    it("throws an exception if the false html tag contains children", () => {
        const el = prepareDom(
            <html data-c="old" data-d="keep">
                <body>
                    <html data-a="1" data-b="2" data-c="3">
                        ?
                    </html>
                </body>
            </html>,
        );

        const html = el.querySelector("html") as HTMLHtmlElement;
        const falseHtml = el.querySelector("body > html") as HTMLHtmlElement;
        expect(html).toBeTruthy();
        expect(falseHtml).toBeTruthy();

        expect(() => transferHtml(falseHtml, html)).toThrow();
    });
});
