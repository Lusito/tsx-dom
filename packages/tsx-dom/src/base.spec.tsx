/* eslint-disable @typescript-eslint/no-explicit-any */
import { fakeDoc, asFakeNode } from "../testUtils";
import ".";

describe("Basic tests", () => {
    beforeEach(() => fakeDoc.reset());

    it("should return the element from document.createElement", () => {
        const t = asFakeNode(<div></div>);
        expect(t).toEqual(fakeDoc.nodes[0]);
        expect(t.element).toBe(true);
        t.element && expect(t.tag).toBe("div");
    });

    it("should set all attributes correctly", () => {
        const t = asFakeNode(<td contentEditable={true} colSpan={1337} title="foo bar"></td>);
        expect(t.element).toBe(true);
        t.element &&
            expect(t.attributes).toEqual({ contentEditable: "contentEditable", colSpan: "1337", title: "foo bar" });
    });

    it("should not set falsy attributes except 0 or the empty string", () => {
        const t = asFakeNode(<td contentEditable={false} colSpan={0} title={undefined} data-empty-string=""></td>);
        expect(t.element).toBe(true);
        t.element && expect(t.attributes).toEqual({ colSpan: "0", "data-empty-string": "" });
    });

    it("should attach event listeners", () => {
        const onClick = () => 0;
        const onBlur = () => 0;
        const t = asFakeNode(<div onClick={onClick} onBlur={onBlur}></div>);
        expect(t.element).toBe(true);
        t.element &&
            expect(t.eventListeners).toEqual([
                { name: "click", value: onClick, useCapture: false },
                { name: "blur", value: onBlur, useCapture: false },
            ]);
    });

    it("should attach event listeners with useCapture", () => {
        const onClick = () => 0;
        const onBlur = () => 0;
        const t = asFakeNode(<div onClickCapture={onClick} onBlurCapture={onBlur}></div>);
        expect(t.element).toBe(true);
        t.element &&
            expect(t.eventListeners).toEqual([
                { name: "click", value: onClick, useCapture: true },
                { name: "blur", value: onBlur, useCapture: true },
            ]);
    });

    it("should append children as given, while ignoring falsy values except 0", () => {
        const a = <div></div>;
        const b = <div></div>;
        const c = <div></div>;
        const d = <div></div>;
        const e = <div></div>;
        const list = [c, d, e];
        const value = 1234;
        const t = asFakeNode(
            <div>
                {false}
                {a}
                {""}
                {b}
                {null}
                text
                {undefined}
                {0}
                {value}
                {list}
            </div>,
        );
        expect(t.element).toBe(true);
        t.element &&
            expect(t.children).toEqual([
                a,
                b,
                { element: false, text: "text" },
                { element: false, text: "0" },
                { element: false, text: value.toString() },
                c,
                d,
                e,
            ]);
    });

    it("should warn about unknown child types", () => {
        const { warn } = console;
        try {
            const warns: any[] = [];
            console.warn = (...args: any[]) => {
                warns.push(args);
            };
            const type = {} as any;
            const t = asFakeNode(<div>{type}</div>);
            expect(t.element).toBe(true);
            t.element && expect(t.children).toHaveLength(0);
            expect(warns).toEqual([["Unknown type to append: ", type]]);
        } finally {
            console.warn = warn;
        }
    });

    it("should support nested arrays", () => {
        const a = ["foo", <div></div>];
        const b = <div></div>;
        const c = [<div></div>, [<div></div>, <div></div>, "bar"]] as any;
        const d = <div></div>;
        const e = <div></div>;
        const value = 1234;
        const list = [d, e, value];
        const t = asFakeNode(
            <div>
                {a}
                {b}
                {c}
                {list}
            </div>,
        );
        expect(t.element).toBe(true);
        t.element &&
            expect(t.children).toEqual([
                { element: false, text: "foo" },
                a[1],
                b,
                c[0],
                c[1][0],
                c[1][1],
                { element: false, text: "bar" },
                d,
                e,
                { element: false, text: value.toString() },
            ]);
    });

    describe("with style passed as object", () => {
        it("should set only the styles which are already on the style object", () => {
            const style = {
                border: "1",
                height: "2",
                background: "3",
                color: "4",
            };
            const t = asFakeNode(<div style={style}></div>);
            expect(t.element).toBe(true);
            t.element && expect(t.style).toEqual({ border: "1", height: "2", background: "3" });
        });
    });

    describe("with style passed as string", () => {
        it("should leave the style attribute untouched", () => {
            const t = asFakeNode(<div style="border: 1px solid black;"></div>);
            expect(t.element).toBe(true);
            t.element && expect(t.style).toEqual({ border: "", height: "", background: "" });
        });
    });
});
