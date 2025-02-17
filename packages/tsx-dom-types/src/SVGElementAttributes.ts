// Generated from https://html.spec.whatwg.org/, then manually adjusted with information from MDN or w3schools

import { ClassType } from "./classnames";
import { CrossOrigin, CSSProperties } from "./HTMLElementAttributes";

// FIXME: case differences compared to HTML attributes of the same name. like tabIndex.
// Changing it to camelCase might cause issues here though (when using xmlns), so leave it for SVG?

type CSSUnit = "cm" | "mm" | "in" | "px" | "pt" | "pc" | "em" | "ex" | "ch" | "rem" | "vw" | "vh" | "vmin" | "vmax";
type Percentage = `${number}%`;
type SVGLength = `${number}${CSSUnit}`;
type LengthPercentage = SVGLength | Percentage;
type SVGAngle = `${number}${"deg" | "rad" | "grad" | ""}` | number;

type ClockValue = FullClockValue | PartialClockValue | TimecountValue;
type Fraction = `.${number}` | "";
type FullClockValue = `${number}:${number}:${number}${Fraction}`;
type PartialClockValue = `${number}:${number}${Fraction}`;
type TimecountValue = `${number}${Fraction}${Metric}`;
type Metric = "h" | "min" | "s" | "ms" | "";
type BlendMode =
    | "normal"
    | "multiply"
    | "screen"
    | "overlay"
    | "darken"
    | "lighten"
    | "color-dodge"
    | "color-burn"
    | "hard-light"
    | "soft-light"
    | "difference"
    | "exclusion"
    | "hue"
    | "saturation"
    | "color"
    | "luminosity";
type CoordinateUnit = "userSpaceOnUse" | "objectBoundingBox";

type SVGElementPresentationAttributes = {
    "alignment-baseline":
        | "auto"
        | "baseline"
        | "before-edge"
        | "text-before-edge"
        | "middle"
        | "central"
        | "after-edge"
        | "text-after-edge"
        | "ideographic"
        | "alphabetic"
        | "hanging"
        | "mathematical";
    clip: string;
    "clip-path": string;
    "clip-rule": string;
    color: string;
    "color-interpolation": "auto" | "sRGB" | "linearRGB";
    "color-interpolation-filters": string;
    "color-rendering": "auto" | "optimizeSpeed" | "optimizeQuality";
    cursor: string;
    direction: "ltr" | "rtl";
    display:
        | "inline"
        | "block"
        | "list-item"
        | "run-in"
        | "compact"
        | "marker"
        | "table"
        | "inline-table"
        | "table-row-group"
        | "table-header-group"
        | "table-footer-group"
        | "table-row"
        | "table-column-group"
        | "table-column"
        | "table-cell"
        | "table-caption"
        | "none";
    "dominant-baseline":
        | "auto"
        | "use-script"
        | "no-change"
        | "reset-size"
        | "ideographic"
        | "alphabetic"
        | "hanging"
        | "mathematical"
        | "central"
        | "middle"
        | "text-after-edge"
        | "text-before-edge";
    fill: string;
    "fill-opacity": number;
    "fill-rule": "nonzero" | "evenodd";
    filter: string;
    "flood-color": string;
    "flood-opacity": string;
    "font-family": string;
    "font-size": string;
    "font-size-adjust": string;
    "font-stretch": string;
    "font-style": string;
    "font-variant": "normal" | "small-caps";
    "font-weight": string;
    "glyph-orientation-horizontal": SVGAngle;
    "glyph-orientation-vertical": "auto" | SVGAngle;
    "image-rendering": "auto" | "optimizeSpeed" | "optimizeQuality";
    "baseline-shift": "baseline" | "sub" | "super" | LengthPercentage;
    "lighting-color": string;
    "line-height": "normal" | LengthPercentage;
    "marker-end": string;
    "marker-mid": string;
    "marker-start": string;
    mask: string;
    opacity: number;
    overflow: "visible" | "hidden" | "scroll" | "auto";
    "paint-order": "normal" | "fill" | "stroke" | "markers";
    "pointer-events":
        | "bounding-box"
        | "visiblePainted"
        | "visibleFill"
        | "visibleStroke"
        | "visible"
        | "painted"
        | "fill"
        | "stroke"
        | "all"
        | "none";
    "shape-rendering": "auto" | "optimizeSpeed" | "crispEdges" | "geometricPrecision";
    "stop-color": string;
    "stop-opacity": number;
    stroke: string;
    "stroke-dasharray": string;
    "stroke-dashoffset": Percentage;
    "stroke-linecap": "butt" | "round" | "square";
    "stroke-linejoin": "miter" | "round" | "bevel";
    "stroke-miterlimit": number;
    "stroke-opacity": number;
    "stroke-width": LengthPercentage;
    "text-anchor": "start" | "middle" | "end";
    "text-decoration": "none" | "underline" | "overline" | "line-through" | "blink";
    "text-rendering": "auto" | "optimizeSpeed" | "optimizeLegibility" | "geometricPrecision";
    transform: string;
    "unicode-bidi": string;
    "vector-effect": "non-scaling-stroke" | "none";
    visibility: "visible" | "hidden" | "collapse";
    "white-space": "normal" | "pre" | "nowrap" | "pre-wrap" | "pre-line";
    "word-spacing": string;
    "writing-mode": "lr-tb" | "rl-tb" | "tb-rl" | "lr" | "rl" | "tb";
    "letter-spacing": string;
};

type SVGElementCommonAttributes = SVGElementPresentationAttributes & {
    class: ClassType;
    id: string;
    lang: string;
    style: string | CSSProperties;
    tabindex: string;
    "xml:space": string;
};

type SVGElementAriaAttributes = {
    "aria-activedescendant": string;
    "aria-atomic": string;
    "aria-autocomplete": string;
    "aria-busy": string;
    "aria-checked": string;
    "aria-colcount": string;
    "aria-colindex": string;
    "aria-colspan": string;
    "aria-controls": string;
    "aria-current": string;
    "aria-describedby": string;
    "aria-details": string;
    "aria-disabled": string;
    "aria-dropeffect": string;
    "aria-errormessage": string;
    "aria-expanded": string;
    "aria-flowto": string;
    "aria-grabbed": string;
    "aria-haspopup": string;
    "aria-hidden": string;
    "aria-invalid": string;
    "aria-keyshortcuts": string;
    "aria-label": string;
    "aria-labelledby": string;
    "aria-level": string;
    "aria-live": string;
    "aria-modal": string;
    "aria-multiline": string;
    "aria-multiselectable": string;
    "aria-orientation": string;
    "aria-owns": string;
    "aria-placeholder": string;
    "aria-posinset": string;
    "aria-pressed": string;
    "aria-readonly": string;
    "aria-relevant": string;
    "aria-required": string;
    "aria-roledescription": string;
    "aria-rowcount": string;
    "aria-rowindex": string;
    "aria-rowspan": string;
    "aria-selected": string;
    "aria-setsize": string;
    "aria-sort": string;
    "aria-valuemax": string;
    "aria-valuemin": string;
    "aria-valuenow": string;
    "aria-valuetext": string;
};

type SVGElementBoundsAttributes = {
    height: "auto" | LengthPercentage;
    width: "auto" | LengthPercentage;
    x: LengthPercentage;
    y: LengthPercentage;
};

type SVGElementCommonAnimateAttributes = {
    accumulate: "none" | "sum";
    additive: "replace" | "sum";
    begin: string;
    by: string;
    calcMode: "discrete" | "linear" | "paced" | "spline";
    dur: ClockValue | "media" | "indefinite";
    end: string;
    from: string;
    href: string;
    keySplines: string;
    keyTimes: string;
    max: ClockValue;
    min: ClockValue;
    repeatCount: number | "indefinite";
    repeatDur: ClockValue | "indefinite";
    requiredExtensions: string;
    restart: "always" | "whenNotActive" | "never";
    systemLanguage: string;
    to: string;
    values: string;
};

type SVGElementFeFuncAttributes = {
    amplitude: number;
    exponent: number;
    intercept: number;
    offset: number;
    slope: number;
    tableValues: string;
    type: "identity" | "table" | "discrete" | "linear" | "gamma";
};

// FIXME: seems to be problematic CPU wise
export type SVGElementAttributeNamesMap = {
    animate: SVGElementCommonAttributes &
        SVGElementCommonAnimateAttributes & {
            attributeName: string;
        };
    animateMotion: SVGElementCommonAttributes &
        SVGElementCommonAnimateAttributes & {
            keyPoints: string;
            origin: string;
            path: string;
            rotate: "auto" | "auto-reverse" | number;
        };
    animateTransform: SVGElementCommonAttributes &
        SVGElementCommonAnimateAttributes & {
            attributeName: string;
            type: "translate" | "scale" | "rotate" | "skewX" | "skewY";
        };
    feFuncA: SVGElementCommonAttributes & SVGElementFeFuncAttributes;
    feFuncB: SVGElementCommonAttributes & SVGElementFeFuncAttributes;
    feFuncG: SVGElementCommonAttributes & SVGElementFeFuncAttributes;
    feFuncR: SVGElementCommonAttributes & SVGElementFeFuncAttributes;
    // fixme: clash with html
    a: SVGElementCommonAttributes &
        SVGElementAriaAttributes & {
            download: string;
            href: string;
            hreflang: string;
            ping: string;
            referrerpolicy: ReferrerPolicy;
            rel: string;
            requiredExtensions: string;
            role: string;
            systemLanguage: string;
            target: string;
            type: string;
        };
    // fixme: clash with html
    audio: SVGElementCommonAttributes &
        SVGElementAriaAttributes & {
            requiredExtensions: string;
            role: string;
            systemLanguage: string;
        };
    // fixme: clash with html
    canvas: SVGElementCommonAttributes &
        SVGElementAriaAttributes & {
            preserveAspectRatio: string;
            requiredExtensions: string;
            role: string;
            systemLanguage: string;
        };
    circle: SVGElementCommonAttributes &
        SVGElementAriaAttributes & {
            cx: LengthPercentage;
            cy: LengthPercentage;
            pathLength: number;
            r: SVGLength | LengthPercentage;
            requiredExtensions: string;
            role: string;
            systemLanguage: string;
        };
    discard: SVGElementCommonAttributes &
        SVGElementAriaAttributes & {
            href: string;
            requiredExtensions: string;
            role: string;
            systemLanguage: string;
        };
    ellipse: SVGElementCommonAttributes &
        SVGElementAriaAttributes & {
            cx: LengthPercentage;
            cy: LengthPercentage;
            pathLength: number;
            requiredExtensions: string;
            role: string;
            rx: SVGLength | Percentage | "auto";
            ry: SVGLength | Percentage | "auto";
            systemLanguage: string;
        };
    foreignObject: SVGElementCommonAttributes &
        SVGElementAriaAttributes &
        SVGElementBoundsAttributes & {
            requiredExtensions: string;
            role: string;
            systemLanguage: string;
        };
    g: SVGElementCommonAttributes &
        SVGElementAriaAttributes & {
            requiredExtensions: string;
            role: string;
            systemLanguage: string;
        };
    // fixme: clash with html
    iframe: SVGElementCommonAttributes &
        SVGElementAriaAttributes & {
            requiredExtensions: string;
            role: string;
            systemLanguage: string;
        };
    image: SVGElementCommonAttributes &
        SVGElementAriaAttributes &
        SVGElementBoundsAttributes & {
            crossorigin: CrossOrigin;
            href: string;
            preserveAspectRatio: string;
            requiredExtensions: string;
            role: string;
            systemLanguage: string;
        };
    line: SVGElementCommonAttributes &
        SVGElementAriaAttributes & {
            pathLength: number;
            requiredExtensions: string;
            role: string;
            systemLanguage: string;
            x1: SVGLength | LengthPercentage | number;
            x2: SVGLength | LengthPercentage | number;
            y1: SVGLength | LengthPercentage | number;
            y2: SVGLength | LengthPercentage | number;
        };
    path: SVGElementCommonAttributes &
        SVGElementAriaAttributes & {
            d: string;
            pathLength: number;
            requiredExtensions: string;
            role: string;
            systemLanguage: string;
        };
    polygon: SVGElementCommonAttributes &
        SVGElementAriaAttributes & {
            pathLength: number;
            points: string;
            requiredExtensions: string;
            role: string;
            systemLanguage: string;
        };
    polyline: SVGElementCommonAttributes &
        SVGElementAriaAttributes & {
            pathLength: number;
            points: string;
            requiredExtensions: string;
            role: string;
            systemLanguage: string;
        };
    rect: SVGElementCommonAttributes &
        SVGElementAriaAttributes &
        SVGElementBoundsAttributes & {
            pathLength: number;
            requiredExtensions: string;
            role: string;
            systemLanguage: string;
        };
    svg: SVGElementCommonAttributes &
        SVGElementAriaAttributes & {
            playbackorder: "forwardonly" | "all";
            preserveAspectRatio: string;
            requiredExtensions: string;
            role: string;
            systemLanguage: string;
            timelinebegin: "loadend" | "loadbegin";
            transform: string;
            viewBox: string;
            xmlns: string;
            zoomAndPan: "disable" | "magnify";
        };
    switch: SVGElementCommonAttributes &
        SVGElementAriaAttributes & {
            requiredExtensions: string;
            role: string;
            systemLanguage: string;
        };
    symbol: SVGElementCommonAttributes &
        SVGElementAriaAttributes &
        SVGElementBoundsAttributes & {
            preserveAspectRatio: string;
            refX: LengthPercentage | "left" | "center" | "right";
            refY: LengthPercentage | "left" | "center" | "right";
            role: string;
            viewBox: string;
        };
    text: SVGElementCommonAttributes &
        SVGElementAriaAttributes & {
            dx: string;
            dy: string;
            lengthAdjust: "spacing" | "spacingAndGlyphs";
            requiredExtensions: string;
            role: string;
            rotate: "auto" | "auto-reverse" | number;
            systemLanguage: string;
            textLength: string;
            x: string;
            y: string;
        };
    textPath: SVGElementCommonAttributes &
        SVGElementAriaAttributes & {
            href: string;
            lengthAdjust: "spacing" | "spacingAndGlyphs";
            method: "align" | "stretch";
            path: string;
            requiredExtensions: string;
            role: string;
            side: "left" | "right";
            spacing: "auto" | "exact";
            startOffset: LengthPercentage | number;
            systemLanguage: string;
            textLength: string;
        };
    tspan: SVGElementCommonAttributes &
        SVGElementAriaAttributes & {
            dx: string;
            dy: string;
            lengthAdjust: "spacing" | "spacingAndGlyphs";
            requiredExtensions: string;
            role: string;
            rotate: "auto" | "auto-reverse" | number;
            systemLanguage: string;
            textLength: string;
            x: string;
            y: string;
        };
    use: SVGElementCommonAttributes &
        SVGElementAriaAttributes &
        SVGElementBoundsAttributes & {
            href: string;
            requiredExtensions: string;
            role: string;
            systemLanguage: string;
        };
    // fixme: clash with html
    video: SVGElementCommonAttributes &
        SVGElementAriaAttributes & {
            requiredExtensions: string;
            role: string;
            systemLanguage: string;
        };
    view: SVGElementCommonAttributes &
        SVGElementAriaAttributes & {
            preserveAspectRatio: string;
            role: string;
            viewBox: string;
            zoomAndPan: "disable" | "magnify";
        };
    set: SVGElementCommonAttributes & {
        attributeName: string;
        dur: ClockValue | "media" | "indefinite";
        end: string;
        href: string;
        max: ClockValue;
        min: ClockValue;
        repeatCount: number | "indefinite";
        repeatDur: ClockValue | "indefinite";
        requiredExtensions: string;
        restart: "always" | "whenNotActive" | "never";
        systemLanguage: string;
        to: string;
    };
    feDistantLight: SVGElementCommonAttributes & {
        azimuth: number;
        elevation: number;
    };
    feTurbulence: SVGElementCommonAttributes &
        SVGElementBoundsAttributes & {
            baseFrequency: number;
            numOctaves: number;
            result: string;
            seed: number;
            stitchTiles: "noStitch" | "stitch";
            type: "fractalNoise" | "turbulence";
        };
    feConvolveMatrix: SVGElementCommonAttributes &
        SVGElementBoundsAttributes & {
            bias: number;
            divisor: number;
            edgeMode: "duplicate" | "wrap" | "none";
            in: string;
            kernelMatrix: string;
            kernelUnitLength: number;
            order: number;
            preserveAlpha: "true" | "false";
            result: string;
            targetX: number;
            targetY: number;
        };
    clipPath: SVGElementCommonAttributes & {
        clipPathUnits: CoordinateUnit;
        requiredExtensions: string;
        systemLanguage: string;
    };
    defs: SVGElementCommonAttributes;
    desc: SVGElementCommonAttributes;
    feBlend: SVGElementCommonAttributes &
        SVGElementBoundsAttributes & {
            in: string;
            in2: string;
            mode: BlendMode;
            result: string;
        };
    feColorMatrix: SVGElementCommonAttributes &
        SVGElementBoundsAttributes & {
            in: string;
            result: string;
            type: "matrix" | "saturate" | "hueRotate" | "luminanceToAlpha";
            values: string;
        };
    feComponentTransfer: SVGElementCommonAttributes &
        SVGElementBoundsAttributes & {
            in: string;
            result: string;
        };
    feComposite: SVGElementCommonAttributes &
        SVGElementBoundsAttributes & {
            in: string;
            in2: string;
            k1: number;
            k2: number;
            k3: number;
            k4: number;
            operator: "over" | "in" | "out" | "atop" | "xor" | "lighter" | "arithmetic";
            result: string;
        };
    feDiffuseLighting: SVGElementCommonAttributes &
        SVGElementBoundsAttributes & {
            diffuseConstant: number;
            in: string;
            kernelUnitLength: number;
            result: string;
            surfaceScale: number;
        };
    feDisplacementMap: SVGElementCommonAttributes &
        SVGElementBoundsAttributes & {
            in: string;
            in2: string;
            result: string;
            scale: number;
            xChannelSelector: "R" | "G" | "B" | "A";
            yChannelSelector: "R" | "G" | "B" | "A";
        };
    feDropShadow: SVGElementCommonAttributes &
        SVGElementBoundsAttributes & {
            dx: number;
            dy: number;
            in: string;
            result: string;
            stdDeviation: number;
        };
    feFlood: SVGElementCommonAttributes &
        SVGElementBoundsAttributes & {
            result: string;
        };
    feGaussianBlur: SVGElementCommonAttributes &
        SVGElementBoundsAttributes & {
            edgeMode: "duplicate" | "wrap" | "none";
            in: string;
            result: string;
            stdDeviation: number;
        };
    feImage: SVGElementCommonAttributes &
        SVGElementBoundsAttributes & {
            crossorigin: CrossOrigin;
            href: string;
            preserveAspectRatio: string;
            result: string;
        };
    feMerge: SVGElementCommonAttributes &
        SVGElementBoundsAttributes & {
            result: string;
        };
    feMergeNode: SVGElementCommonAttributes & {
        in: string;
    };
    feMorphology: SVGElementCommonAttributes &
        SVGElementBoundsAttributes & {
            in: string;
            operator: "erode" | "dilate";
            radius: number;
            result: string;
        };
    feOffset: SVGElementCommonAttributes &
        SVGElementBoundsAttributes & {
            dx: number;
            dy: number;
            in: string;
            result: string;
        };
    fePointLight: SVGElementCommonAttributes & {
        x: number;
        y: number;
        z: number;
    };
    feSpecularLighting: SVGElementCommonAttributes &
        SVGElementBoundsAttributes & {
            in: string;
            kernelUnitLength: number;
            result: string;
            specularConstant: number;
            specularExponent: number;
            surfaceScale: number;
        };
    feSpotLight: SVGElementCommonAttributes & {
        limitingConeAngle: number;
        pointsAtX: number;
        pointsAtY: number;
        pointsAtZ: number;
        specularExponent: number;
        x: number;
        y: number;
        z: number;
    };
    feTile: SVGElementCommonAttributes &
        SVGElementBoundsAttributes & {
            in: string;
            result: string;
        };
    filter: SVGElementCommonAttributes &
        SVGElementBoundsAttributes & {
            filterUnits: CoordinateUnit;
            primitiveUnits: CoordinateUnit;
        };
    linearGradient: Exclude<SVGElementCommonAttributes, "transform"> & {
        gradientTransform: string;
        gradientUnits: CoordinateUnit;
        href: string;
        spreadMethod: "pad" | "reflect" | "repeat";
        x1: SVGLength;
        x2: SVGLength;
        y1: SVGLength;
        y2: SVGLength;
    };
    marker: SVGElementCommonAttributes & {
        markerHeight: LengthPercentage | number;
        markerUnits: "userSpaceOnUse" | "strokeWidth";
        markerWidth: LengthPercentage | number;
        orient: "auto" | "auto-start-reverse" | SVGAngle | number;
        preserveAspectRatio: string;
        refX: LengthPercentage | number | "left" | "center" | "right";
        refY: LengthPercentage | number | "left" | "center" | "right";
        viewBox: string;
    };
    mask: SVGElementCommonAttributes &
        SVGElementBoundsAttributes & {
            maskContentUnits: CoordinateUnit;
            maskUnits: CoordinateUnit;
            requiredExtensions: string;
            systemLanguage: string;
        };
    metadata: SVGElementCommonAttributes;
    mpath: SVGElementCommonAttributes & { href: string };
    pattern: Exclude<SVGElementCommonAttributes, "transform"> &
        SVGElementBoundsAttributes & {
            href: string;
            patternContentUnits: CoordinateUnit;
            patternTransform: string;
            patternUnits: CoordinateUnit;
            preserveAspectRatio: string;
            viewBox: string;
        };
    radialGradient: Exclude<SVGElementCommonAttributes, "transform"> & {
        cx: SVGLength;
        cy: SVGLength;
        fr: SVGLength;
        fx: SVGLength;
        fy: SVGLength;
        gradientTransform: string;
        gradientUnits: CoordinateUnit;
        href: string;
        r: SVGLength;
        spreadMethod: "pad" | "reflect" | "repeat";
    };
    script: SVGElementCommonAttributes & {
        crossorigin: CrossOrigin;
        href: string;
        type: string;
    };
    stop: SVGElementCommonAttributes & {
        offset: number;
    };
    // fixme: clash with html
    style: SVGElementCommonAttributes & {
        media: string;
        title: string;
        type: string;
    };
    // fixme: clash with html
    title: SVGElementCommonAttributes;
};

export type SVGElementAttributes<T> = T extends keyof SVGElementAttributeNamesMap
    ? Partial<SVGElementAttributeNamesMap[T]>
    : unknown;
