/**
 * License: MIT
 * @author Santo Pfingsten
 * @see https://github.com/Lusito/tsx-dom
 */

import { fakeDoc, FakeNode } from "./fakeDocument";
import { assert } from "chai";
import { h } from "../src";


describe("Basic tests", () => {
    before(() => fakeDoc.reset());

    it("should return the element from document.createElement", () => {
        const t = <div></div> as any as FakeNode;
        assert.equal(t, fakeDoc.nodes[0]);
        assert.isTrue(t.element);
        t.element && assert.equal(t.tag, "div");
    });

    it("should set all attributes correctly", () => {
        const t = <div checked={true} colSpan={1337} title="foo bar"></div> as any as FakeNode;
        assert.isTrue(t.element);
        t.element && assert.deepEqual(t.attributes, { checked: "checked", colSpan: "1337", title: "foo bar" });
    });

    it("should not set falsy attributes, except 0", () => {
        const t = <div checked={false} colSpan={0} title={undefined}></div> as any as FakeNode;
        assert.isTrue(t.element);
        t.element && assert.deepEqual(t.attributes, { colSpan: "0" });
    });

    it("should attach event listeners", () => {
        const onClick = () => 0;
        const onBlur = () => 0;
        const t = <div onClick={onClick} onBlur={onBlur}></div> as any as FakeNode;
        assert.isTrue(t.element);
        t.element && assert.deepEqual(t.eventListeners, [
            { name: "click", value: onClick, useCapture: false },
            { name: "blur", value: onBlur, useCapture: false }
        ]);
    });

    it("should attach event listeners with useCapture", () => {
        const onClick = () => 0;
        const onBlur = () => 0;
        const t = <div onClickCapture={onClick} onBlurCapture={onBlur}></div> as any as FakeNode;
        assert.isTrue(t.element);
        t.element && assert.deepEqual(t.eventListeners, [
            { name: "click", value: onClick, useCapture: true },
            { name: "blur", value: onBlur, useCapture: true }
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
        const t = <div>
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
        </div> as any as FakeNode;
        assert.isTrue(t.element);
        t.element && assert.deepEqual(t.children, [
            a as any as FakeNode,
            b as any as FakeNode,
            { element: false, text: "text" },
            { element: false, text: "0" },
            { element: false, text: value.toString() },
            c as any as FakeNode,
            d as any as FakeNode,
            e as any as FakeNode
        ]);
    });

    it("should warn about unknown child types", () => {
        const warn = console.warn;
        try {
            const warns: any[] = [];
            console.warn = (...args) => { warns.push(args); };
            const type = {} as any;
            const t = <div>{type}</div> as any as FakeNode;
            assert.isTrue(t.element);
            t.element && assert.isEmpty(t.children);
            assert.deepEqual(warns, [
                ["Unknown type to append: ", type]
            ]);
        } finally {
            console.warn = warn;
        }
    });

    context("with style passed as object", () => {
        it("should set only the styles which are already on the style object", () => {
            const style = {
                border: "1",
                height: "2",
                background: "3",
                color: "4"
            };
            const t = <div style={style}></div> as any as FakeNode;
            assert.isTrue(t.element);
            t.element && assert.deepEqual(t.style, { border: "1", height: "2", background: "3" });
        });
    });

    context("with style passed as string", () => {
        it("should leave the style attribute untouched", () => {
            const t = <div style="border: 1px solid black;"></div> as any as FakeNode;
            assert.isTrue(t.element);
            t.element && assert.deepEqual(t.style, { border: "", height: "", background: "" });
        });
    });
});
