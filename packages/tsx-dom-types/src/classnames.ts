export type ClassRecord = Record<string, null | undefined | boolean>;
export type ClassEntry = string | null | undefined | false | ClassRecord;
export type ClassType = ClassEntry | ClassEntry[];

const classListFromObject = (record: ClassRecord) => Object.entries(record).map(([key, value]) => value && key);

const isTruthy = <T>(v: T | null | undefined | false): v is T => !!v;
const isUnique = <T>(v: T, i: number, a: readonly T[]) => a.indexOf(v) === i;

const emptyArray = [] as const;

function classnamesToArray(value: ClassType): readonly string[] {
    if (!value) return emptyArray;
    if (typeof value === "string") return [value];

    if (Array.isArray(value)) return value.flatMap(classnamesToArray).filter(isTruthy);

    return classListFromObject(value).filter(isTruthy);
}

export function classnames(value: ClassType): string | undefined {
    const list = classnamesToArray(value).filter(isUnique);
    return list.length > 0 ? list.join(" ") : undefined;
}
