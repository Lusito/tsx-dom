import type { ScatPageLoadEvent } from ".";

export interface ScatPlugin {
    /**
     * this is mount method rewritten by class extending
     * and is executed when scatman is enabled with plugin
     */
    mount(): void;

    /**
     * this is unmount method rewritten by class extending
     * and is executed when scatman with plugin is disabled
     */
    unmount(): void;
}

export interface ScatAnimationPlugin extends ScatPlugin {
    animateOut(data: ScatPageLoadEvent): Promise<void>;
    animateIn(data: ScatPageLoadEvent): Promise<void>;
}
