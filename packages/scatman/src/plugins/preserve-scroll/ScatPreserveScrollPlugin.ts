import type { Scatman } from "../../Scatman";
import type { ScatPlugin } from "../../ScatPlugin";

type Options = { selector: string; quiet: boolean };

const defaultOptions: Options = {
    selector: ".scatman-preserve-scroll",
    quiet: false,
};

export class ScatPreserveScrollPlugin implements ScatPlugin {
    private scatman: Scatman;

    private options: Options;

    cache: Record<string, { top: number; left: number }> = {};

    constructor(scatman: Scatman, options: Partial<Options> = {}) {
        this.scatman = scatman;
        this.options = { ...defaultOptions, ...options };
    }

    mount() {
        this.scatman.events.willReplaceContent.on(this.getScrolls);
        this.scatman.events.contentReplaced.on(this.applyScrolls);
    }

    unmount() {
        this.scatman.events.willReplaceContent.off(this.getScrolls);
        this.scatman.events.contentReplaced.off(this.applyScrolls);
    }

    getScrolls = () => {
        const elements = document.querySelectorAll(this.options.selector);
        if (!(elements.length > 0)) {
            if (!this.options.quiet)
                console.warn(`There were no elements matching the '${this.options.selector}' selector.`);
            return;
        }
        elements.forEach((element) => {
            if (!element.id || element.id === "") {
                if (!this.options.quiet)
                    console.warn(`An element matching the '${this.options.selector}' selector has no id.`);
                return;
            }
            const { id } = element;
            this.cache[id] = {
                top: element.scrollTop,
                left: element.scrollLeft,
            };
        });
    };

    applyScrolls = () => {
        const elements = document.querySelectorAll(this.options.selector);
        elements.forEach((element) => {
            if (!element.id || element.id === "") {
                if (this.options.quiet !== true)
                    console.warn(`An element matching the '${this.options.selector}' selector has no id.`);
                return;
            }
            const { id } = element;
            if (this.cache[id]) {
                element.scrollTop = this.cache[id].top;
                element.scrollLeft = this.cache[id].left;
            }
        });
    };
}
