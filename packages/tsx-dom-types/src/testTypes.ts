import { ClassType } from "./classnames";
import { Simplify } from "./types";
import { CSSProperties } from "./HTMLElementAttributes";

export type Expect<T extends true> = T;
export type Equal<TX, TY> = (<T>() => T extends TX ? 1 : 2) extends <T>() => T extends TY ? 1 : 2 ? true : false;
export type IsEmptyObject<T> = keyof T extends [any] ? true : false;

// The following code ensures, that we don't accidentally get inferred types, which are unwanted or incorrect.
export type IsValidType<TKey, TType> =
    // Handle class type separately
    TKey extends "class"
        ? Equal<TType, ClassType>
        : // Handle style type separately
          TKey extends "style"
          ? Equal<TType, string | CSSProperties | undefined>
          : // Everything else must be a simple type
            Equal<Exclude<TType, string | number | boolean | undefined>, never>;

/** @returns never if TCheck is true */
export type NoKeyIf<TCheck, TKey> = TCheck extends true ? never : TKey;

export type GetInvalidAttributes<T> = {
    [TKey in keyof T as NoKeyIf<IsValidType<TKey, T[TKey]>, TKey>]: T[TKey];
};

export type IsValidProps<T> = IsEmptyObject<GetInvalidAttributes<T>>;

export type GetElementsWithInvalidAttributes<T> = {
    [TKey in keyof T as NoKeyIf<IsValidProps<T[TKey]>, TKey>]: Simplify<GetInvalidAttributes<T[TKey]>>;
};
