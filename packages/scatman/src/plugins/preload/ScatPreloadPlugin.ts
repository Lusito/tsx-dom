import type { Scatman } from "../../Scatman";
import { LinkSource, unpackLink } from "../../utils/urlUtils";
import { ScatPlugin } from "../../ScatPlugin";
import { getDelegateTarget } from "../../utils/getDelegateTarget";
import { createEventManager, eventManagerMapOff } from "../../utils/EventManager";

export class ScatPreloadPlugin implements ScatPlugin {
    private scatman: Scatman;

    private readonly events = {
        hoverLink: createEventManager<MouseEvent>("hoverLink"),
    };

    constructor(scatman: Scatman) {
        this.scatman = scatman;
    }

    mount() {
        // register mouseover handler
        document.body.addEventListener("mouseover", this.onMouseover);

        // initial preload of page form links with [data-scatman-preload]
        this.preloadPages();

        // do the same on every content replace
        this.scatman.events.contentReplaced.on(this.onContentReplaced);
    }

    unmount() {
        eventManagerMapOff(this.events);

        document.body.removeEventListener("mouseover", this.onMouseover);

        this.scatman.events.contentReplaced.off(this.onContentReplaced);
    }

    private onContentReplaced = () => {
        this.preloadPages();
    };

    private onMouseover = (event: MouseEvent) => {
        const { scatman } = this;
        const delegateTarget = getDelegateTarget(event, scatman.options.linkSelector);
        if (!delegateTarget) return;

        this.events.hoverLink.emit(event);

        this.preloadPage(delegateTarget);
    };

    private async preloadPage(linkSource: LinkSource) {
        await this.scatman.preloadPage(unpackLink(linkSource).url);
    }

    private preloadPages() {
        document.querySelectorAll("[data-scatman-preload]").forEach((element) => {
            const href = element.getAttribute("href");
            if (href) this.preloadPage(href);
        });
    }
}
