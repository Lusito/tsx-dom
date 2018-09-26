/**
 * License: MIT
 * @author Santo Pfingsten
 * @see https://github.com/Lusito/tsx-dom
 */

import { fakeDoc } from "./fakeDocument";
import { assert } from "chai";
import { h, BaseProps } from "../src";

interface FooProps extends BaseProps {
    text: string;
    num: number;
    bool: boolean;
    none: undefined;
    zero: null;
}

function Foo(props: FooProps) {
    // @ts-ignore
    return props as JSX.Element;
}

function Bar(props: BaseProps) {
    // @ts-ignore
    return props as JSX.Element;
}

describe("Functional component tests", () => {
    before(() => fakeDoc.reset());

    it("should pass all attributes as given", () => {
        const t = <Foo text="one" num={2} bool={true} none={undefined} zero={null} /> as any as FooProps;
        assert.deepEqual(t, { text: "one", num: 2, bool: true, none: undefined, zero: null, children: [] });
    });

    it("should pass all children as given", () => {
        const value = 12;
        const t = <Bar>
            <div></div>
            <b></b>
            text
            {value}
        </Bar> as any as BaseProps;
        assert.deepEqual(t, {
            children: [
                fakeDoc.nodes[0] as any as HTMLElement,
                fakeDoc.nodes[1] as any as HTMLElement,
                "text",
                value
            ]
        });
    });
});
