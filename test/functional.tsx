/**
 * License: MIT
 * @author Santo Pfingsten
 * @see https://github.com/Lusito/tsx-dom
 */

import { assert } from "chai";

import { fakeDoc, FakeNode } from "./fakeDocument";
import { h, BaseProps } from "../src";

interface FooProps extends BaseProps {
    text: string;
    num: number;
    bool: boolean;
    none: undefined;
    zero: null;
}

function Foo(props: FooProps) {
    return props as unknown as JSX.Element;
}

function Bar(props: BaseProps) {
    return props as unknown as JSX.Element;
}

function FooBar(props: BaseProps) {
    // Merely to make sure that the type checker works correctly when including both an element and props.children.
    return (
        <div>
            <div></div>
            {props.children}
        </div>
    );
}

describe("Functional component tests", () => {
    before(() => fakeDoc.reset());

    it("should pass all attributes as given", () => {
        const t = (<Foo text="one" num={2} bool={true} none={undefined} zero={null} />) as any as FooProps;
        assert.deepEqual(t, { text: "one", num: 2, bool: true, none: undefined, zero: null, children: [] });
    });

    it("should pass all children as given", () => {
        const value = 12;
        const t = (
            <Bar>
                <div></div>
                <b></b>
                text
                {value}
            </Bar>
        ) as any as BaseProps;
        assert.deepEqual(t, {
            children: [fakeDoc.nodes[0] as any as HTMLElement, fakeDoc.nodes[1] as any as HTMLElement, "text", value],
        });
    });

    it("should allow appending multiple divs and props.children", () => {
        const t = (
            <FooBar>
                <div></div>
                <b></b>
            </FooBar>
        ) as any as FakeNode;
        assert.isTrue(t.element);
    });
});
