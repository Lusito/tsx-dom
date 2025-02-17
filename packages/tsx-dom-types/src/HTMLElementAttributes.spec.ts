import { HTMLElementAttributeNamesMap } from "./HTMLElementAttributes";
import { Equal, Expect, GetElementsWithInvalidAttributes, IsEmptyObject } from "./testTypes";

type ElementsWithInvalidAttributes = GetElementsWithInvalidAttributes<HTMLElementAttributeNamesMap>;

// Inspect the ElementsWithInvalidAttributes type if this fails to see which attributes are any or unknown
export type Success = Expect<Equal<IsEmptyObject<ElementsWithInvalidAttributes>, true>>;

// Satisfy jest
test("ensure types are correct", () => {});
