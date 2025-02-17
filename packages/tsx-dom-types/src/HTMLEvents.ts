import { EventHandler } from "./types";

export type HTMLBodyEventAttributes = {
    // Print Events
    onAfterPrint?: EventHandler<HTMLBodyElement, Event>;
    onBeforePrint?: EventHandler<HTMLBodyElement, Event>;

    // Sensor Events
    onDeviceMotion?: EventHandler<HTMLBodyElement, DeviceMotionEvent>;
    onDeviceOrientation?: EventHandler<HTMLBodyElement, DeviceOrientationEvent>;

    // Gamepad Events
    onGamepadConnected?: EventHandler<HTMLBodyElement, GamepadEvent>;
    onGamepadDisconnected?: EventHandler<HTMLBodyElement, GamepadEvent>;

    // History Events
    onHashChange?: EventHandler<HTMLBodyElement, HashChangeEvent>;
    onPopState?: EventHandler<HTMLBodyElement, PopStateEvent>;
    onPageHide?: EventHandler<HTMLBodyElement, PageTransitionEvent>;
    onPageShow?: EventHandler<HTMLBodyElement, PageTransitionEvent>;

    // Language Events
    onLanguageChange?: EventHandler<HTMLBodyElement, Event>;

    // Message Events
    onMessage?: EventHandler<HTMLBodyElement, MessageEvent>;
    onMessageError?: EventHandler<HTMLBodyElement, MessageEvent>;

    // Network Access Events
    onOffline?: EventHandler<HTMLBodyElement, Event>;
    onOnline?: EventHandler<HTMLBodyElement, Event>;

    // Error Events
    onRejectionHandled?: EventHandler<HTMLBodyElement, PromiseRejectionEvent>;
    onUnhandledRejection?: EventHandler<HTMLBodyElement, PromiseRejectionEvent>;

    // Storage Events
    onStorage?: EventHandler<HTMLBodyElement, StorageEvent>;

    // State Events
    onBeforeUnload?: EventHandler<HTMLBodyElement, BeforeUnloadEvent>;
    onUnload?: EventHandler<HTMLBodyElement, Event>;
};

export type HTMLNonBodyEventNames = "blur" | "error" | "focus" | "load" | "resize" | "scroll";

export type HTMLMediaEventAttributes = {
    onEncrypted?: EventHandler<HTMLMediaElement, Event>;
};

export type HTMLCanvasEventAttributes = {
    onContextLost?: EventHandler<HTMLCanvasElement, Event>;
    onContextRestored?: EventHandler<HTMLCanvasElement, Event>;
};

export type HTMLCommonEventAttributes<T extends EventTarget> = {
    // Image Events
    onLoad?: EventHandler<T, Event>;
    onError?: EventHandler<T, ErrorEvent>;

    // Clipboard Events
    onCopy?: EventHandler<T, ClipboardEvent>;
    onCut?: EventHandler<T, ClipboardEvent>;
    onPaste?: EventHandler<T, ClipboardEvent>;

    // Composition Events
    onCompositionEnd?: EventHandler<T, CompositionEvent>;
    onCompositionStart?: EventHandler<T, CompositionEvent>;
    onCompositionUpdate?: EventHandler<T, CompositionEvent>;

    // Details Events
    onToggle?: EventHandler<T, Event>;

    // Focus Events
    onFocus?: EventHandler<T, FocusEvent>;
    onFocusIn?: EventHandler<T, FocusEvent>;
    onFocusOut?: EventHandler<T, FocusEvent>;
    onBlur?: EventHandler<T, FocusEvent>;

    // Form Events
    onChange?: EventHandler<T, Event>;
    onInput?: EventHandler<T, Event>;
    onBeforeInput?: EventHandler<T, InputEvent>;
    onSearch?: EventHandler<T, Event>;
    onSubmit?: EventHandler<T, SubmitEvent>;
    onInvalid?: EventHandler<T, Event>;
    onReset?: EventHandler<T, Event>;
    onFormdata?: EventHandler<T, FormDataEvent>;

    // Keyboard Events
    onKeyDown?: EventHandler<T, KeyboardEvent>;
    onKeyPress?: EventHandler<T, KeyboardEvent>;
    onKeyUp?: EventHandler<T, KeyboardEvent>;

    // Media Events
    onAbort?: EventHandler<T, UIEvent>;
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
    onContextMenu?: EventHandler<T, MouseEvent>;
    onDblClick?: EventHandler<T, MouseEvent>;
    onAuxClick?: EventHandler<T, MouseEvent>;
    onDrag?: EventHandler<T, DragEvent>;
    onDragEnd?: EventHandler<T, DragEvent>;
    onDragEnter?: EventHandler<T, DragEvent>;
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

    // Selection Events
    onSelect?: EventHandler<T, Event>;
    onSelectionchange?: EventHandler<T, Event>;
    onSelectStart?: EventHandler<T, Event>;
    onBeforeToggle?: EventHandler<T, Event>;

    // Touch Events
    onTouchCancel?: EventHandler<T, TouchEvent>;
    onTouchEnd?: EventHandler<T, TouchEvent>;
    onTouchMove?: EventHandler<T, TouchEvent>;
    onTouchStart?: EventHandler<T, TouchEvent>;

    // Pointer Events
    onPointerOver?: EventHandler<T, PointerEvent>;
    onPointerEnter?: EventHandler<T, PointerEvent>;
    onPointerDown?: EventHandler<T, PointerEvent>;
    onPointerMove?: EventHandler<T, PointerEvent>;
    onPointerUp?: EventHandler<T, PointerEvent>;
    onPointerCancel?: EventHandler<T, PointerEvent>;
    onPointerOut?: EventHandler<T, PointerEvent>;
    onPointerLeave?: EventHandler<T, PointerEvent>;
    onGotPointerCapture?: EventHandler<T, PointerEvent>;
    onLostPointerCapture?: EventHandler<T, PointerEvent>;

    // UI Events
    onScroll?: EventHandler<T, Event>;
    onScrollEnd?: EventHandler<T, Event>;
    onResize?: EventHandler<T, UIEvent>;
    onFullscreenChange?: EventHandler<T, Event>;
    onFullscreenError?: EventHandler<T, Event>;
    onCueChange?: EventHandler<T, Event>;

    // Wheel Events
    onWheel?: EventHandler<T, WheelEvent>;

    // Animation Events
    onAnimationStart?: EventHandler<T, AnimationEvent>;
    onAnimationEnd?: EventHandler<T, AnimationEvent>;
    onAnimationIteration?: EventHandler<T, AnimationEvent>;
    onAnimationCancel?: EventHandler<T, AnimationEvent>;

    // Transition Events
    onTransitionCancel?: EventHandler<T, TransitionEvent>;
    onTransitionEnd?: EventHandler<T, TransitionEvent>;
    onTransitionRun?: EventHandler<T, TransitionEvent>;
    onTransitionStart?: EventHandler<T, TransitionEvent>;

    // Dialog Events
    onCancel?: EventHandler<T, Event>;
    onClose?: EventHandler<T, Event>;

    // Slot Events
    onSlotChange?: EventHandler<T, Event>;

    // Error Events
    onSecurityPolicyViolation?: EventHandler<T, SecurityPolicyViolationEvent>;
};

type HTMLSpecialEventAttributesMap = {
    body: Omit<HTMLCommonEventAttributes<HTMLBodyElement>, HTMLNonBodyEventNames> & HTMLBodyEventAttributes;
    media: HTMLCommonEventAttributes<HTMLMediaElement> & HTMLMediaEventAttributes;
    canvas: HTMLCommonEventAttributes<HTMLCanvasElement> & HTMLCanvasEventAttributes;
};

export type HTMLEventAttributes<T extends keyof HTMLElementTagNameMap> = T extends keyof HTMLSpecialEventAttributesMap
    ? HTMLSpecialEventAttributesMap[T]
    : HTMLCommonEventAttributes<HTMLElementTagNameMap[T]>;
