import { HTMLAttributes } from "./HTMLAttributes";

export interface SVGAttributes extends HTMLAttributes {
    accumulate?: "none" | "sum";
    additive?: "replace" | "sum";
    amplitude?: number | string;
    attributeName?: string;
    attributeType?: string;
    baseFrequency?: number | string;
    baseProfile?: number | string;
    begin?: number | string;
    by?: number | string;
    calcMode?: number | string;
    clipPath?: string;
    clipPathUnits?: number | string;
    cursor?: number | string;
    cx?: number | string;
    cy?: number | string;
    d?: string;
    dur?: number | string;
    dx?: number | string;
    dy?: number | string;
    edgeMode?: number | string;
    end?: number | string;
    exponent?: number | string;
    externalResourcesRequired?: number | string;
    fill?: string;
    filter?: string;
    filterUnits?: number | string;
    from?: number | string;
    fx?: number | string;
    fy?: number | string;
    gradientTransform?: string;
    gradientUnits?: string;
    in2?: number | string;
    in?: string;
    intercept?: number | string;
    k1?: number | string;
    k2?: number | string;
    k3?: number | string;
    k4?: number | string;
    keyPoints?: number | string;
    keySplines?: number | string;
    keyTimes?: number | string;
    lengthAdjust?: number | string;
    lightingColor?: number | string;
    limitingConeAngle?: number | string;
    markerHeight?: number | string;
    markerMid?: string;
    markerStart?: string;
    markerUnits?: number | string;
    markerWidth?: number | string;
    mask?: string;
    maskContentUnits?: number | string;
    maskUnits?: number | string;
    mode?: number | string;
    numOctaves?: number | string;
    offset?: number | string;
    operator?: number | string;
    orient?: number | string;
    patternContentUnits?: string;
    patternTransform?: number | string;
    patternUnits?: string;
    points?: string;
    preserveAspectRatio?: string;
    primitiveUnits?: number | string;
    r?: number | string;
    radius?: number | string;
    refX?: number | string;
    refY?: number | string;
    repeatCount?: number | string;
    repeatDur?: number | string;
    requiredExtensions?: number | string;
    requiredFeatures?: number | string;
    restart?: number | string;
    result?: string;
    rotate?: number | string;
    rx?: number | string;
    ry?: number | string;
    scale?: number | string;
    seed?: number | string;
    slope?: number | string;
    spacing?: number | string;
    spreadMethod?: string;
    startOffset?: number | string;
    stdDeviation?: number | string;
    stitchTiles?: number | string;
    stroke?: string;
    systemLanguage?: number | string;
    tableValues?: number | string;
    textLength?: number | string;
    to?: number | string;
    transform?: string;
    values?: string;
    version?: string;
    viewBox?: string;
    viewTarget?: number | string;
    x1?: number | string;
    x2?: number | string;
    x?: number | string;
    xChannelSelector?: string;
    xmlns?: string;
    y1?: number | string;
    y2?: number | string;
    y?: number | string;
    yChannelSelector?: string;
}
