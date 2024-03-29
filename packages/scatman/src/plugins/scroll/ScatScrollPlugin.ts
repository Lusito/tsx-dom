import type { Scatman, ScatPageLoadEvent } from "../../Scatman";
import type { ScatPlugin } from "../../ScatPlugin";
import { getDelegateTarget } from "../../utils/getDelegateTarget";
import { unpackLink } from "../../utils/urlUtils";

type Options = {
    doScrollingRightAway: boolean;
    behavior?: ScrollBehavior;
};

const defaultOptions: Options = {
    doScrollingRightAway: false,
    behavior: undefined,
};

export class ScatScrollPlugin implements ScatPlugin {
    private scatman: Scatman;

    private options: Options;

    constructor(scatman: Scatman, options: Partial<Options> = {}) {
        this.scatman = scatman;
        this.options = { ...defaultOptions, ...options };
    }

    mount() {
        // scroll to the top of the page
        this.scatman.events.samePage.on(this.onSamePage);

        // scroll to referenced element on the same page
        this.scatman.events.samePageWithHash.on(this.onSamePageWithHash);

        // scroll to the referenced element
        this.scatman.events.transitionStart.on(this.onTransitionStart);

        // scroll to the referenced element when it's in the page (after render)
        this.scatman.events.contentReplaced.on(this.onContentReplaced);
    }

    unmount() {
        this.scatman.events.samePage.off(this.onSamePage);
        this.scatman.events.samePageWithHash.off(this.onSamePageWithHash);
        this.scatman.events.transitionStart.off(this.onTransitionStart);
        this.scatman.events.contentReplaced.off(this.onContentReplaced);

        window.history.scrollRestoration = "auto";
    }

    private resetScroll() {
        this.scrollTo(0, window);
        document.querySelectorAll(".scatman-scroll-area").forEach((element) => this.scrollTo(0, element));
    }

    private scrollTo(top: number, element: Window | Element) {
        element.scrollTo({ left: 0, top, behavior: this.options.behavior });
    }

    private scrollToHash(hash: string) {
        const name = hash.slice(1);
        let element: Element | undefined | null = document.getElementById(name);
        if (!element) {
            element = Array.from(document.querySelectorAll("a[name]")).find((a) => a.getAttribute("name") === name);
        }

        if (element) {
            const scrollContainer = element.closest(".scatman-scroll-area");
            const { top } = element.getBoundingClientRect();

            if (!scrollContainer) {
                return this.scrollTo(top + window.pageYOffset, window);
            }

            const { top: parentTop } = scrollContainer.getBoundingClientRect();
            const relativeTop = top - parentTop;

            return this.scrollTo(relativeTop + scrollContainer.scrollTop, scrollContainer);
        }

        console.warn(`Element ${hash} not found`);
        this.scrollTo(0, window);
    }

    private onSamePage = () => this.resetScroll();

    private onSamePageWithHash = (event: MouseEvent) => {
        if (!event) return;
        const delegateTarget = getDelegateTarget(event, this.scatman.options.linkSelector);
        if (!delegateTarget) return;

        this.scrollToHash(unpackLink(delegateTarget).hash);
    };

    private onTransitionStart = (event: ScatPageLoadEvent) => {
        if (this.options.doScrollingRightAway && !event.hash) {
            this.doScrolling(event);
        }
    };

    private onContentReplaced = (event: ScatPageLoadEvent) => {
        if (!this.options.doScrollingRightAway || event.hash) {
            this.doScrolling(event);
        }
    };

    private doScrolling({ popstate, hash }: ScatPageLoadEvent) {
        if (!popstate) {
            if (hash) this.scrollToHash(hash);
            else this.resetScroll();
        }
    }
}
