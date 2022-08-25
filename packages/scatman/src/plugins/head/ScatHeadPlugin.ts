import type { Scatman } from "../../Scatman";
import { getCurrentUrl } from "../../utils/urlUtils";
import { ScatPlugin } from "../../ScatPlugin";

type Options = {
    persistTags: boolean | string | ((element: Element) => boolean);
};
const defaultOptions: Options = {
    persistTags: false,
};

export class ScatHeadPlugin implements ScatPlugin {
    private scatman: Scatman;

    private options: Options;

    constructor(scatman: Scatman, options: Partial<Options> = {}) {
        this.scatman = scatman;
        this.options = { ...defaultOptions, ...options };
    }

    mount() {
        this.scatman.events.contentReplaced.on(this.onContentReplaced);
    }

    unmount() {
        this.scatman.events.contentReplaced.off(this.onContentReplaced);
    }

    private onContentReplaced = () => {
        const page = this.scatman.cache.get(getCurrentUrl());
        if (!page) {
            console.warn("Page did not exist in cache: ", getCurrentUrl());
            return;
        }

        const nextDocument = page.document;
        this.getHeadAndReplace(nextDocument);
        this.updateHtmlLangAttribute(nextDocument);
    };

    private getHeadAndReplace(nextDocument: Document) {
        const oldTags = Array.from(document.head.children);
        const newTags = Array.from(nextDocument.head.children);

        const { head } = document;
        const addTags = newTags.filter((newTag) => !oldTags.some((oldTag) => oldTag.outerHTML === newTag.outerHTML));
        const removeTags = oldTags.filter(
            (oldTag) =>
                !this.isPersistentTag(oldTag) && !newTags.some((newTag) => oldTag.outerHTML === newTag.outerHTML)
        );

        removeTags.forEach((tag) => tag.remove());
        // fixme: insert at correct position
        addTags.forEach((tag) => head.appendChild(tag.cloneNode(true)));
    }

    private updateHtmlLangAttribute(nextDocument: Document) {
        const html = document.documentElement;
        const newLang = nextDocument.documentElement.lang;

        if (html.lang !== newLang) {
            html.lang = newLang;
        }
    }

    private isPersistentTag(item: Element) {
        if (item.hasAttribute("data-scatman-persist")) {
            return true;
        }

        const { persistTags } = this.options;
        if (typeof persistTags === "function") {
            return persistTags(item);
        }
        if (typeof persistTags === "string") {
            return item.matches(persistTags);
        }
        return persistTags;
    }
}
