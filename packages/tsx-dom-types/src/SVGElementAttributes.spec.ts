import { SVGElementAttributeNamesMap } from "./SVGElementAttributes";
import { Equal, Expect, GetElementsWithInvalidAttributes, IsEmptyObject } from "./testTypes";

type SVGElementAttributeNamesMapPartial = {
    [TKey in keyof SVGElementAttributeNamesMap]: Partial<SVGElementAttributeNamesMap[TKey]>;
};

type ElementsWithInvalidAttributes = GetElementsWithInvalidAttributes<SVGElementAttributeNamesMapPartial>;

// Inspect the ElementsWithInvalidAttributes type if this fails to see which attributes are any or unknown
export type Success = Expect<Equal<IsEmptyObject<ElementsWithInvalidAttributes>, true>>;

// Satisfy jest
test("ensure types are correct", () => {});
