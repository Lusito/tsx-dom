/** CSSStyleDeclaration contains methods, readonly properties and an index signature, which we all need to filter out. */
export type CSSProperties = Partial<
    Pick<
        CSSStyleDeclaration,
        {
            [K in keyof CSSStyleDeclaration]: K extends string
                ? CSSStyleDeclaration[K] extends string
                    ? K
                    : never
                : never;
        }[keyof CSSStyleDeclaration]
    >
>;

// For convenience, so that no classnames utility function needs to be used.
export type ClassRecord = Record<string, null | undefined | boolean>;
export type ClassEntry = string | null | undefined | false | ClassRecord;
export type ClassType = ClassEntry | ClassEntry[];

/**
 * Some tags properties can't be inferred correctly.
 * To fix these properties, this manual override is defined.
 * Since it's an interface, users can even override them from outside.
 */
export interface HTMLTagFixes {
    meta: {
        charset?: string;
        property?: string;
    };
}

export interface HTMLAttributes {
    // Standard HTML Attributes
    accept?: string;
    acceptCharset?: string;
    accessKey?: string;
    action?: string;
    allow?: string;
    allowFullscreen?: boolean;
    alt?: string;
    as?: string;
    async?: boolean;
    autocomplete?: string;
    autofocus?: boolean;
    autoplay?: boolean;
    capture?: boolean | string;
    cellPadding?: number | string;
    cellSpacing?: number | string;
    charset?: string;
    checked?: boolean;
    class?: ClassType;
    cols?: number;
    colSpan?: number;
    content?: string;
    contentEditable?: boolean;
    controls?: boolean;
    coords?: string;
    crossOrigin?: string;
    data?: string;
    dateTime?: string;
    default?: boolean;
    defer?: boolean;
    dir?: "auto" | "rtl" | "ltr";
    disabled?: boolean;
    disableRemotePlayback?: boolean;
    download?: string;
    decoding?: "sync" | "async" | "auto";
    draggable?: boolean;
    enctype?: string;
    enterKeyHint?: "enter" | "done" | "go" | "next" | "previous" | "search" | "send";
    form?: string;
    formAction?: string;
    formEnctype?: string;
    formMethod?: string;
    formNoValidate?: boolean;
    formTarget?: string;
    frameBorder?: number | string;
    headers?: string;
    height?: number | string;
    hidden?: boolean;
    high?: number;
    href?: string;
    hreflang?: string;
    for?: string;
    htmlFor?: string;
    httpEquiv?: string;
    id?: string;
    inputMode?: string;
    integrity?: string;
    is?: string;
    kind?: string;
    label?: string;
    lang?: string;
    list?: string;
    loading?: "eager" | "lazy";
    loop?: boolean;
    low?: number;
    marginHeight?: number;
    marginWidth?: number;
    max?: number | string;
    maxLength?: number;
    media?: string;
    method?: string;
    min?: number | string;
    minLength?: number;
    multiple?: boolean;
    muted?: boolean;
    name?: string;
    nonce?: string;
    noValidate?: boolean;
    open?: boolean;
    optimum?: number;
    pattern?: string;
    ping?: string;
    placeholder?: string;
    playsInline?: boolean;
    poster?: string;
    preload?: string;
    readOnly?: boolean;
    referrerPolicy?:
        | "no-referrer"
        | "no-referrer-when-downgrade"
        | "origin"
        | "origin-when-cross-origin"
        | "same-origin"
        | "strict-origin"
        | "strict-origin-when-cross-origin"
        | "unsafe-url";
    rel?: string;
    required?: boolean;
    role?: string;
    rows?: number;
    rowSpan?: number;
    sandbox?: string;
    scope?: string;
    scrolling?: string;
    selected?: boolean;
    shape?: string;
    size?: number;
    sizes?: string;
    slot?: string;
    span?: number;
    spellcheck?: boolean;
    src?: string;
    srcdoc?: string;
    srclang?: string;
    srcset?: string;
    start?: number;
    step?: number | string;
    style?: string | CSSProperties;
    summary?: string;
    tabIndex?: number;
    target?: string;
    title?: string;
    type?: string;
    useMap?: string;
    value?: string | string[] | number;
    volume?: string | number;
    width?: number | string;
    wrap?: string;
}
