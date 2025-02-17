// Generated from https://html.spec.whatwg.org/, then manually adjusted with information from MDN or w3schools

import { Simplify } from "./types";
import { ClassType } from "./classnames";

/** This is essentially CSSStyleDeclaration but without methods, readonly properties and the index signature. */
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

/**
 * Attributes common to all elements
 */
export type GlobalPropsExtra = {
    accessKey: string;
    autoFocus: boolean;
    autoCapitalize: "none" | "off" | "sentences" | "on" | "words" | "characters";
    autoCorrect: "" | "on" | "off";
    class: ClassType;
    contentEditable: "true" | "false" | "plaintext-only";
    dir: "ltr" | "rtl" | "auto";
    draggable: "" | "true" | "false";
    enterKeyHint: "enter" | "done" | "go" | "next" | "previous" | "search" | "send";
    exportParts: string;
    hidden: "" | "hidden" | "until-found";
    id: string;
    inert: boolean;
    inputMode: "none" | "text" | "decimal" | "numeric" | "tel" | "search" | "email" | "url";
    is: string;
    itemId: string;
    itemProp: string;
    itemRef: string;
    itemScope: string;
    itemType: string;
    lang: string;
    nonce: string;
    parts: string;
    popover: "auto" | "manual";
    role: string;
    slot: string;
    spellCheck: "" | "true" | "false";
    style: string | CSSProperties;
    tabIndex: number;
    title: string;
    translate: "" | "yes" | "no";
    writingSuggestions: "" | "true" | "false";
};

/**
 * A helper to get all possible props for the specified HTML element.
 * Keys specified in TKeys will be picked from TElement, which has the added benefit of also picking the jsdoc comment.
 *
 * @param TElement The interface for the element being described
 * @param TKeys The keys for this specific element to pick for props (aside from global attributes). Pass never or leave out if no other keys.
 * @param TExtra Extra properties to add for this specific element, which can't be inferred from TElement type via TKeys
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type PropsForElement<TElement extends Element, TKeys extends keyof TElement = never, TExtra = {}> = Simplify<
    Partial<Pick<TElement, TKeys> & GlobalPropsExtra & TExtra>
>;

// FIXME: aria attributes?

export type EncType = "application/x-www-form-urlencoded" | "multipart/form-data" | "text/plain";
export type FormMethod = "post" | "get" | "dialog";
export type CrossOrigin = "" | "anonymous" | "use-credentials";
export type Preload = "none" | "metadata" | "auto" | "";

export type HTMLElementAttributeNamesMap = {
    /** Hyperlink */
    a: PropsForElement<
        HTMLAnchorElement,
        "href" | "target" | "download" | "ping" | "rel" | "hreflang" | "type",
        {
            referrerPolicy: ReferrerPolicy;
        }
    >;
    /** Abbreviation */
    abbr: PropsForElement<HTMLElement>;
    /** Contact information for a page or article element */
    address: PropsForElement<HTMLElement>;
    /** Hyperlink or dead area on an image map */
    area: PropsForElement<
        HTMLAreaElement,
        "alt" | "coords" | "href" | "target" | "download" | "ping" | "rel",
        {
            referrerPolicy: ReferrerPolicy;
            shape: "rect" | "circle" | "poly" | "default";
        }
    >;
    /** Self-contained syndicatable or reusable composition */
    article: PropsForElement<HTMLElement>;
    /** Sidebar for tangentially related content */
    aside: PropsForElement<HTMLElement>;
    /** Audio player */
    audio: PropsForElement<
        HTMLAudioElement,
        "src" | "autoplay" | "loop" | "muted" | "controls",
        {
            crossOrigin: CrossOrigin;
            preload: Preload;
        }
    >;
    /** Keywords */
    b: PropsForElement<HTMLElement>;
    /** Base URL and default target navigable for hyperlinks and forms */
    base: PropsForElement<HTMLBaseElement, "href" | "target">;
    /** Text directionality isolation */
    bdi: PropsForElement<HTMLElement>;
    /** Text directionality formatting */
    bdo: PropsForElement<HTMLElement>;
    /** A section quoted from another source */
    blockquote: PropsForElement<HTMLQuoteElement, "cite">;
    /** Document body */
    body: PropsForElement<HTMLBodyElement>;
    /** Line break, e.g. in poem or postal address */
    br: PropsForElement<HTMLBRElement>;
    /** Button control */
    button: PropsForElement<
        HTMLButtonElement,
        "disabled" | "formAction" | "formNoValidate" | "formTarget" | "name" | "value",
        {
            popoverTarget: string;
            popoverTargetAction: "hide" | "show" | "toggle";
            form: string;
            formEncType: EncType;
            formMethod: FormMethod;
            type: "submit" | "reset" | "button";
        }
    >;
    /** Scriptable bitmap canvas */
    canvas: PropsForElement<HTMLCanvasElement, "width" | "height">;
    /** Table caption */
    caption: PropsForElement<HTMLTableCaptionElement>;
    /** Title of a work */
    cite: PropsForElement<HTMLElement>;
    /** Computer code */
    code: PropsForElement<HTMLElement>;
    /** Table column */
    col: PropsForElement<HTMLTableColElement, "span">;
    /** Group of columns in a table */
    colgroup: PropsForElement<HTMLTableColElement, "span">;
    /** Machine-readable equivalent */
    data: PropsForElement<HTMLDataElement, "value">;
    /** Container for options for combo box control */
    datalist: PropsForElement<HTMLDataListElement>;
    /** Content for corresponding dt element(s) */
    dd: PropsForElement<HTMLElement>;
    /** A removal from the document */
    del: PropsForElement<HTMLModElement, "cite" | "dateTime">;
    /** Disclosure control for hiding details */
    details: PropsForElement<HTMLDetailsElement, "name" | "open">;
    /** Defining instance */
    dfn: PropsForElement<HTMLElement>;
    /** Dialog box or window */
    dialog: PropsForElement<HTMLDialogElement, "open">;
    /** Generic flow container, or container for name-value groups in dl elements */
    div: PropsForElement<HTMLDivElement>;
    /** Association list consisting of zero or more name-value groups */
    dl: PropsForElement<HTMLDListElement>;
    /** Legend for corresponding dd element(s) */
    dt: PropsForElement<HTMLElement>;
    /** Stress emphasis */
    em: PropsForElement<HTMLElement>;
    /** Plugin */
    embed: PropsForElement<HTMLEmbedElement, "src" | "type" | "width" | "height">;
    /** Group of form controls */
    fieldset: PropsForElement<HTMLFieldSetElement, "disabled" | "name", { form: string }>;
    /** Caption for figure */
    figcaption: PropsForElement<HTMLElement>;
    /** Figure with optional caption */
    figure: PropsForElement<HTMLElement>;
    /** Footer for a page or section */
    footer: PropsForElement<HTMLElement>;
    /** User-submittable form */
    form: PropsForElement<
        HTMLFormElement,
        "action" | "autocomplete" | "name" | "noValidate" | "rel" | "target" | "acceptCharset",
        {
            enctype: EncType;
            method: FormMethod;
        }
    >;
    /** Heading */
    h1: PropsForElement<HTMLHeadingElement>;
    /** Heading */
    h2: PropsForElement<HTMLHeadingElement>;
    /** Heading */
    h3: PropsForElement<HTMLHeadingElement>;
    /** Heading */
    h4: PropsForElement<HTMLHeadingElement>;
    /** Heading */
    h5: PropsForElement<HTMLHeadingElement>;
    /** Heading */
    h6: PropsForElement<HTMLHeadingElement>;
    /** Container for document metadata */
    head: PropsForElement<HTMLHeadElement>;
    /** Introductory or navigational aids for a page or section */
    header: PropsForElement<HTMLElement>;
    /** Heading container */
    hgroup: PropsForElement<HTMLElement>;
    /** Thematic break */
    hr: PropsForElement<HTMLHRElement>;
    /** Root element */
    html: PropsForElement<HTMLHtmlElement, never, { manifest: string }>;
    /** Alternate voice */
    i: PropsForElement<HTMLElement>;
    /** Child navigable */
    iframe: PropsForElement<
        HTMLIFrameElement,
        "src" | "srcdoc" | "name" | "allow" | "allowFullscreen" | "width" | "height" | "loading",
        {
            sandbox: string;
            referrerPolicy: ReferrerPolicy;
        }
    >;
    /** Image */
    img: PropsForElement<
        HTMLImageElement,
        "alt" | "src" | "srcset" | "sizes" | "useMap" | "isMap" | "width" | "height" | "decoding" | "loading",
        {
            crossOrigin: CrossOrigin;
            fetchPriority: RequestPriority;
            referrerPolicy: ReferrerPolicy;
        }
    >;
    /** Form control */
    input: PropsForElement<
        HTMLInputElement,
        | "accept"
        | "alt"
        | "autocomplete"
        | "checked"
        | "dirName"
        | "disabled"
        | "formAction"
        | "formNoValidate"
        | "formTarget"
        | "height"
        | "max"
        | "maxLength"
        | "min"
        | "minLength"
        | "multiple"
        | "name"
        | "pattern"
        | "placeholder"
        | "readOnly"
        | "required"
        | "size"
        | "src"
        | "step"
        | "value"
        | "width",
        {
            popoverTarget: string;
            popoverTargetAction: "hide" | "show" | "toggle";
            list: string;
            form: string;
            formEnctype: EncType;
            formMethod: FormMethod;
            type:
                | "button"
                | "checkbox"
                | "color"
                | "date"
                | "datetime-local"
                | "email"
                | "file"
                | "hidden"
                | "image"
                | "month"
                | "number"
                | "password"
                | "radio"
                | "range"
                | "reset"
                | "search"
                | "submit"
                | "tel"
                | "text"
                | "time"
                | "url"
                | "week";
        }
    >;
    /** An addition to the document */
    ins: PropsForElement<HTMLModElement, "cite" | "dateTime">;
    /** User input */
    kbd: PropsForElement<HTMLElement>;
    /** Caption for a form control */
    label: PropsForElement<HTMLLabelElement, never, { for: string }>;
    /** Caption for fieldset */
    legend: PropsForElement<HTMLLegendElement>;
    /** List item */
    li: PropsForElement<HTMLLIElement, "value">;
    /** Link metadata */
    link: PropsForElement<
        HTMLLinkElement,
        | "href"
        | "rel"
        | "as"
        | "media"
        | "hreflang"
        | "type"
        | "sizes"
        | "imageSrcset"
        | "imageSizes"
        | "integrity"
        | "disabled",
        {
            blocking: string;
            color: string;
            sizes: string;
            crossOrigin: CrossOrigin;
            fetchPriority: RequestPriority;
            referrerPolicy: ReferrerPolicy;
        }
    >;
    /** Container for the dominant contents of the document */
    main: PropsForElement<HTMLElement>;
    /** Image map */
    map: PropsForElement<HTMLMapElement, "name">;
    /** Highlight */
    mark: PropsForElement<HTMLElement>;
    /** Menu of commands */
    menu: PropsForElement<HTMLMenuElement>;
    /** Text metadata */
    meta: PropsForElement<HTMLMetaElement, "name" | "content" | "media" | "httpEquiv", { charset: string }>;
    /** Gauge */
    meter: PropsForElement<HTMLMeterElement, "value" | "min" | "max" | "low" | "high" | "optimum">;
    /** Section with navigational links */
    nav: PropsForElement<HTMLElement>;
    /** Fallback content for script */
    noscript: PropsForElement<HTMLElement>;
    /** Image, child navigable, or plugin */
    object: PropsForElement<HTMLObjectElement, "data" | "type" | "name" | "width" | "height", { form: string }>;
    /** Ordered list */
    ol: PropsForElement<
        HTMLOListElement,
        "reversed" | "start",
        {
            type: "a" | "A" | "i" | "I" | "1";
        }
    >;
    /** Group of options in a list box */
    optgroup: PropsForElement<HTMLOptGroupElement, "disabled" | "label">;
    /** Option in a list box or combo box control */
    option: PropsForElement<HTMLOptionElement, "disabled" | "label" | "selected" | "value">;
    /** Calculated output value */
    output: PropsForElement<
        HTMLOutputElement,
        never,
        {
            for: string;
            form: string;
            name: string;
        }
    >;
    /** Paragraph */
    p: PropsForElement<HTMLParagraphElement>;
    /** Image */
    picture: PropsForElement<HTMLPictureElement>;
    /** Block of preformatted text */
    pre: PropsForElement<HTMLPreElement>;
    /** Progress bar */
    progress: PropsForElement<HTMLProgressElement, "value" | "max">;
    /** Quotation */
    q: PropsForElement<HTMLQuoteElement, "cite">;
    /** Parenthesis for ruby annotation text */
    rp: PropsForElement<HTMLElement>;
    /** Ruby annotation text */
    rt: PropsForElement<HTMLElement>;
    /** Ruby annotation(s) */
    ruby: PropsForElement<HTMLElement>;
    /** Inaccurate text */
    s: PropsForElement<HTMLElement>;
    /** Computer output */
    samp: PropsForElement<HTMLElement>;
    /** Embedded script */
    script: PropsForElement<
        HTMLScriptElement,
        "src" | "type" | "noModule" | "async" | "defer" | "integrity",
        {
            blocking: string;
            crossOrigin: CrossOrigin;
            fetchPriority: RequestPriority;
            referrerPolicy: ReferrerPolicy;
        }
    >;
    /** Container for search controls */
    search: PropsForElement<HTMLElement>;
    /** Generic document or application section */
    section: PropsForElement<HTMLElement>;
    /** List box control */
    select: PropsForElement<
        HTMLSelectElement,
        "autocomplete" | "disabled" | "multiple" | "name" | "required" | "size",
        { form: string }
    >;
    /** Shadow tree slot */
    slot: PropsForElement<HTMLSlotElement, "name">;
    /** Side comment */
    small: PropsForElement<HTMLElement>;
    /** Image source for img or media source for video or audio */
    source: PropsForElement<HTMLSourceElement, "type" | "media" | "src" | "srcset" | "sizes" | "width" | "height">;
    /** Generic phrasing container */
    span: PropsForElement<HTMLSpanElement>;
    /** Importance */
    strong: PropsForElement<HTMLElement>;
    /** Embedded styling information */
    style: PropsForElement<HTMLStyleElement, never, { media: string; blocking: string }>;
    /** Subscript */
    sub: PropsForElement<HTMLElement>;
    /** Caption for details */
    summary: PropsForElement<HTMLElement>;
    /** Superscript */
    sup: PropsForElement<HTMLElement>;
    /** Table */
    table: PropsForElement<HTMLTableElement>;
    /** Group of rows in a table */
    tbody: PropsForElement<HTMLTableSectionElement>;
    /** Table cell */
    td: PropsForElement<HTMLTableCellElement, "colSpan" | "rowSpan" | "headers">;
    /** Template */
    template: PropsForElement<
        HTMLTemplateElement,
        "shadowRootClonable" | "shadowRootDelegatesFocus" | "shadowRootSerializable",
        { shadowRootMode: "open" | "closed" }
    >;
    /** Multiline text controls */
    textarea: PropsForElement<
        HTMLTextAreaElement,
        | "autocomplete"
        | "cols"
        | "dirName"
        | "disabled"
        | "maxLength"
        | "minLength"
        | "name"
        | "placeholder"
        | "readOnly"
        | "required"
        | "rows",
        {
            form: string;
            wrap: "hard" | "soft" | "off";
        }
    >;
    /** Group of footer rows in a table */
    tfoot: PropsForElement<HTMLTableSectionElement>;
    /** Table header cell */
    th: PropsForElement<
        HTMLTableCellElement,
        "colSpan" | "rowSpan" | "headers" | "abbr",
        {
            scope: "row" | "col" | "rowgroup" | "colgroup";
        }
    >;
    /** Group of heading rows in a table */
    thead: PropsForElement<HTMLTableSectionElement>;
    /** Machine-readable equivalent of date- or time-related data */
    time: PropsForElement<HTMLTimeElement, "dateTime">;
    /** Document title */
    title: PropsForElement<HTMLTitleElement>;
    /** Table row */
    tr: PropsForElement<HTMLTableRowElement>;
    /** Timed text track */
    track: PropsForElement<HTMLTrackElement, "default" | "kind" | "label" | "src" | "srclang">;
    /** Unarticulated annotation */
    u: PropsForElement<HTMLElement>;
    /** List */
    ul: PropsForElement<HTMLUListElement>;
    /** Variable */
    var: PropsForElement<HTMLElement>;
    /** Video player */
    video: PropsForElement<
        HTMLVideoElement,
        "src" | "poster" | "autoplay" | "playsInline" | "loop" | "muted" | "controls" | "width" | "height",
        {
            crossOrigin: CrossOrigin;
            preload: Preload;
        }
    >;
    /** Line breaking opportunity */
    wbr: PropsForElement<HTMLElement>;
};

export type HTMLElementAttributes<T> = T extends keyof HTMLElementAttributeNamesMap
    ? HTMLElementAttributeNamesMap[T]
    : unknown;
