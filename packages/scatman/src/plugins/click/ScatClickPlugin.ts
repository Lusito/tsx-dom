import type { Scatman } from "../../Scatman";
import { getDelegateTarget } from "../../utils/getDelegateTarget";
import { unpackLink, getCurrentUrl } from "../../utils/urlUtils";
import { ScatPlugin } from "../../ScatPlugin";

export class ScatClickPlugin implements ScatPlugin {
    private scatman: Scatman;

    constructor(scatman: Scatman) {
        this.scatman = scatman;
    }

    mount() {
        document.addEventListener("click", this.linkClickHandler);
        window.addEventListener("popstate", this.popStateHandler);
    }

    unmount() {
        document.removeEventListener("click", this.linkClickHandler);
        window.removeEventListener("popstate", this.popStateHandler);
    }

    private linkClickHandler = (event: MouseEvent) => {
        if (event.button !== 0) return;

        const delegateTarget = getDelegateTarget(event, this.scatman.options.linkSelector);
        if (!delegateTarget) return;

        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
            // open in new tab (do nothing)
            this.scatman.events.openPageInNewTab.emit(event);
            return;
        }

        this.scatman.events.clickLink.emit(event);
        event.preventDefault();

        const { url, hash } = unpackLink(delegateTarget);
        const fromUrl = getCurrentUrl();
        if (url !== fromUrl) {
            // get custom transition from data
            const customTransition = delegateTarget.getAttribute("data-scatman-transition");

            // load page
            // eslint-disable-next-line dot-notation
            this.scatman["loadPage"]({ fromUrl, url, hash, customTransition });
            return;
        }

        if (hash) {
            // eslint-disable-next-line dot-notation
            this.scatman["pushHistory"](url + hash);
            this.scatman.events.samePageWithHash.emit(event);
        } else {
            this.scatman.events.samePage.emit(event);
        }
    };

    private popStateHandler = (event: PopStateEvent) => {
        if (this.scatman.options.skipPopStateHandling(event)) {
            return;
        }

        const { hash, url } = unpackLink(event.state ? event.state.url : getCurrentUrl());

        // eslint-disable-next-line dot-notation
        this.scatman["loadPage"]({ fromUrl: "", url, hash, popstate: event });
    };
}
