import { classnames } from "./classnames";

describe("classnames", () => {
    it("should return undefined for empty classes", () => {
        expect(classnames(undefined)).toBeUndefined();
        expect(classnames(false)).toBeUndefined();
        expect(classnames(null)).toBeUndefined();
        expect(classnames("")).toBeUndefined();
        expect(classnames([])).toBeUndefined();
        expect(classnames({})).toBeUndefined();
    });

    it("should return reduced classes", () => {
        expect(classnames({ foo: true, bar: false, hello: true, world: undefined, foobar: null })).toBe("foo hello");
        expect(
            classnames([
                "foo",
                "",
                "hello",
                { foo: true, bar: false, hello: true, world: undefined, foobar: null },
                "foo",
                "hello",
                { foo: true, bar: false, hello: true, world: undefined, foobar: null },
                null,
                undefined,
                false,
            ]),
        ).toBe("foo hello");
    });
});
