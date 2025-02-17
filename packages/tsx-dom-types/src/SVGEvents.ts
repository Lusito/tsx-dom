import { EventHandler } from "./types";

export type SVGCommonEventAttributes<T extends EventTarget> = {
    // Image Events
    onLoad?: EventHandler<T, Event>;
    onError?: EventHandler<T, ErrorEvent>;

    // Details Events
    onToggle?: EventHandler<T, Event>;

    // Focus Events
    onFocus?: EventHandler<T, FocusEvent>;

    // Form Events
    onChange?: EventHandler<T, Event>;
    onInput?: EventHandler<T, Event>;
    onSubmit?: EventHandler<T, SubmitEvent>;
    onInvalid?: EventHandler<T, Event>;
    onReset?: EventHandler<T, Event>;

    // Keyboard Events
    onKeyDown?: EventHandler<T, KeyboardEvent>;
    onKeyPress?: EventHandler<T, KeyboardEvent>;
    onKeyUp?: EventHandler<T, KeyboardEvent>;

    // Media Events
    onCanPlay?: EventHandler<T, Event>;
    onCanPlayThrough?: EventHandler<T, Event>;
    onDurationChange?: EventHandler<T, Event>;
    onEmptied?: EventHandler<T, Event>;
    onEnded?: EventHandler<T, Event>;
    onLoadedData?: EventHandler<T, Event>;
    onLoadedMetadata?: EventHandler<T, Event>;
    onLoadStart?: EventHandler<T, Event>;
    onPause?: EventHandler<T, Event>;
    onPlay?: EventHandler<T, Event>;
    onPlaying?: EventHandler<T, Event>;
    onProgress?: EventHandler<T, ProgressEvent>;
    onRateChange?: EventHandler<T, Event>;
    onSeeked?: EventHandler<T, Event>;
    onSeeking?: EventHandler<T, Event>;
    onStalled?: EventHandler<T, Event>;
    onSuspend?: EventHandler<T, Event>;
    onTimeUpdate?: EventHandler<T, Event>;
    onVolumeChange?: EventHandler<T, Event>;
    onWaiting?: EventHandler<T, Event>;

    // Mouse Events
    onClick?: EventHandler<T, MouseEvent>;
    onDblClick?: EventHandler<T, MouseEvent>;
    onDrag?: EventHandler<T, DragEvent>;
    onDragEnd?: EventHandler<T, DragEvent>;
    onDragEnter?: EventHandler<T, DragEvent>;
    onDragExit?: EventHandler<T, Event>;
    onDragLeave?: EventHandler<T, DragEvent>;
    onDragOver?: EventHandler<T, DragEvent>;
    onDragStart?: EventHandler<T, DragEvent>;
    onDrop?: EventHandler<T, DragEvent>;
    onMouseDown?: EventHandler<T, MouseEvent>;
    onMouseEnter?: EventHandler<T, MouseEvent>;
    onMouseLeave?: EventHandler<T, MouseEvent>;
    onMouseMove?: EventHandler<T, MouseEvent>;
    onMouseOut?: EventHandler<T, MouseEvent>;
    onMouseOver?: EventHandler<T, MouseEvent>;
    onMouseUp?: EventHandler<T, MouseEvent>;
    onMouseWheel?: EventHandler<T, WheelEvent>;

    // Selection Events
    onSelect?: EventHandler<T, Event>;

    // UI Events
    onScroll?: EventHandler<T, Event>;
    onResize?: EventHandler<T, UIEvent>;
    onCueChange?: EventHandler<T, Event>;
    onCancel?: EventHandler<T, Event>;

    // Dialog Events
    onClose?: EventHandler<T, Event>;
    onShow?: EventHandler<T, Event>;
};

export type SVGClipboardEventAttributes<T extends EventTarget> = {
    onCopy?: EventHandler<T, ClipboardEvent>;
    onCut?: EventHandler<T, ClipboardEvent>;
    onPaste?: EventHandler<T, ClipboardEvent>;
};

export interface SVGTimeEvent extends Event {
    readonly view: WindowProxy;
    readonly detail: number;
}

export type SVGAnimationEventAttributes<T extends EventTarget> = {
    onBegin?: EventHandler<T, SVGTimeEvent>;
    onEnd?: EventHandler<T, SVGTimeEvent>;
    onRepeat?: EventHandler<T, SVGTimeEvent>;
};

export type SVGFocusInOutEventAttributes<T extends EventTarget> = {
    onFocusIn?: EventHandler<T, FocusEvent>;
    onFocusOut?: EventHandler<T, FocusEvent>;
};

export type SVGSVGEventAttributes = {
    onAbort?: EventHandler<SVGSVGElement, UIEvent>;
    onUnload?: EventHandler<SVGSVGElement, Event>;
};

export type SVGElementEventAttributesMap = {
    animate: SVGCommonEventAttributes<SVGAnimateElement> &
        SVGClipboardEventAttributes<SVGAnimateElement> &
        SVGAnimationEventAttributes<SVGAnimateElement>;
    animateMotion: SVGCommonEventAttributes<SVGAnimateMotionElement> &
        SVGClipboardEventAttributes<SVGAnimateMotionElement> &
        SVGAnimationEventAttributes<SVGAnimateMotionElement>;
    animateTransform: SVGCommonEventAttributes<SVGAnimateTransformElement> &
        SVGClipboardEventAttributes<SVGAnimateTransformElement> &
        SVGAnimationEventAttributes<SVGAnimateTransformElement>;
    // fixme: clash with html
    a: SVGCommonEventAttributes<SVGAElement> &
        SVGClipboardEventAttributes<SVGAElement> &
        SVGFocusInOutEventAttributes<SVGAElement>;
    // fixme: clash with html
    audio: SVGCommonEventAttributes<HTMLAudioElement> &
        SVGClipboardEventAttributes<HTMLAudioElement> &
        SVGFocusInOutEventAttributes<HTMLAudioElement>;
    // fixme: clash with html
    canvas: SVGCommonEventAttributes<HTMLCanvasElement> &
        SVGClipboardEventAttributes<HTMLCanvasElement> &
        SVGFocusInOutEventAttributes<HTMLCanvasElement>;
    circle: SVGCommonEventAttributes<SVGCircleElement> &
        SVGClipboardEventAttributes<SVGCircleElement> &
        SVGFocusInOutEventAttributes<SVGCircleElement>;
    ellipse: SVGCommonEventAttributes<SVGEllipseElement> &
        SVGClipboardEventAttributes<SVGEllipseElement> &
        SVGFocusInOutEventAttributes<SVGEllipseElement>;
    foreignObject: SVGCommonEventAttributes<SVGForeignObjectElement> &
        SVGClipboardEventAttributes<SVGForeignObjectElement> &
        SVGFocusInOutEventAttributes<SVGForeignObjectElement>;
    g: SVGCommonEventAttributes<SVGGElement> &
        SVGClipboardEventAttributes<SVGGElement> &
        SVGFocusInOutEventAttributes<SVGGElement>;
    // fixme: clash with html
    iframe: SVGCommonEventAttributes<HTMLIFrameElement> &
        SVGClipboardEventAttributes<HTMLIFrameElement> &
        SVGFocusInOutEventAttributes<HTMLIFrameElement>;
    image: SVGCommonEventAttributes<SVGImageElement> &
        SVGClipboardEventAttributes<SVGImageElement> &
        SVGFocusInOutEventAttributes<SVGImageElement>;
    line: SVGCommonEventAttributes<SVGLineElement> &
        SVGClipboardEventAttributes<SVGLineElement> &
        SVGFocusInOutEventAttributes<SVGLineElement>;
    path: SVGCommonEventAttributes<SVGPathElement> &
        SVGClipboardEventAttributes<SVGPathElement> &
        SVGFocusInOutEventAttributes<SVGPathElement>;
    polygon: SVGCommonEventAttributes<SVGPolygonElement> &
        SVGClipboardEventAttributes<SVGPolygonElement> &
        SVGFocusInOutEventAttributes<SVGPolygonElement>;
    polyline: SVGCommonEventAttributes<SVGPolylineElement> &
        SVGClipboardEventAttributes<SVGPolylineElement> &
        SVGFocusInOutEventAttributes<SVGPolylineElement>;
    rect: SVGCommonEventAttributes<SVGRectElement> &
        SVGClipboardEventAttributes<SVGRectElement> &
        SVGFocusInOutEventAttributes<SVGRectElement>;
    svg: SVGSVGEventAttributes &
        SVGCommonEventAttributes<SVGSVGElement> &
        SVGClipboardEventAttributes<SVGSVGElement> &
        SVGFocusInOutEventAttributes<SVGSVGElement>;
    switch: SVGCommonEventAttributes<SVGSwitchElement> &
        SVGClipboardEventAttributes<SVGSwitchElement> &
        SVGFocusInOutEventAttributes<SVGSwitchElement>;
    symbol: SVGCommonEventAttributes<SVGSymbolElement> &
        SVGClipboardEventAttributes<SVGSymbolElement> &
        SVGFocusInOutEventAttributes<SVGSymbolElement>;
    text: SVGCommonEventAttributes<SVGTextElement> &
        SVGClipboardEventAttributes<SVGTextElement> &
        SVGFocusInOutEventAttributes<SVGTextElement>;
    textPath: SVGCommonEventAttributes<SVGTextPathElement> &
        SVGClipboardEventAttributes<SVGTextPathElement> &
        SVGFocusInOutEventAttributes<SVGTextPathElement>;
    tspan: SVGCommonEventAttributes<SVGTSpanElement> &
        SVGClipboardEventAttributes<SVGTSpanElement> &
        SVGFocusInOutEventAttributes<SVGTSpanElement>;
    use: SVGCommonEventAttributes<SVGUseElement> &
        SVGClipboardEventAttributes<SVGUseElement> &
        SVGFocusInOutEventAttributes<SVGUseElement>;
    // fixme: clash with html
    video: SVGCommonEventAttributes<HTMLVideoElement> &
        SVGClipboardEventAttributes<HTMLVideoElement> &
        SVGFocusInOutEventAttributes<HTMLVideoElement>;
    view: SVGCommonEventAttributes<SVGViewElement> & SVGClipboardEventAttributes<SVGViewElement>;
    set: SVGCommonEventAttributes<SVGSetElement> &
        SVGClipboardEventAttributes<SVGSetElement> &
        SVGAnimationEventAttributes<SVGSetElement>;
    defs: SVGCommonEventAttributes<SVGDefsElement> &
        SVGClipboardEventAttributes<SVGDefsElement> &
        SVGFocusInOutEventAttributes<SVGDefsElement>;
    desc: SVGCommonEventAttributes<SVGDescElement> & SVGClipboardEventAttributes<SVGDescElement>;
    linearGradient: SVGCommonEventAttributes<SVGLinearGradientElement> &
        SVGClipboardEventAttributes<SVGLinearGradientElement>;
    marker: SVGCommonEventAttributes<SVGMarkerElement> & SVGClipboardEventAttributes<SVGMarkerElement>;
    metadata: SVGCommonEventAttributes<SVGMetadataElement> & SVGClipboardEventAttributes<SVGMetadataElement>;
    mpath: SVGCommonEventAttributes<SVGMPathElement> & SVGClipboardEventAttributes<SVGMPathElement>;
    pattern: SVGCommonEventAttributes<SVGPatternElement>;
    radialGradient: SVGCommonEventAttributes<SVGRadialGradientElement> &
        SVGClipboardEventAttributes<SVGRadialGradientElement>;
    script: SVGCommonEventAttributes<SVGScriptElement> & SVGClipboardEventAttributes<SVGScriptElement>;
    stop: SVGCommonEventAttributes<SVGStopElement> & SVGClipboardEventAttributes<SVGStopElement>;
    // fixme: clash with html
    style: SVGCommonEventAttributes<SVGStyleElement> & SVGClipboardEventAttributes<SVGStyleElement>;
    // fixme: clash with html
    title: SVGCommonEventAttributes<SVGTitleElement> & SVGClipboardEventAttributes<SVGTitleElement>;
};

export type SVGEventAttributes<T> = T extends keyof SVGElementEventAttributesMap
    ? SVGElementEventAttributesMap[T]
    : unknown;
