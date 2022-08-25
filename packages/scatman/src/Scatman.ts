import { getPageDataFromHtml, PageData } from "./utils/pageData";
import { ScatAnimationPlugin, ScatPlugin } from "./ScatPlugin";
import { unpackLink, getCurrentUrl } from "./utils/urlUtils";
import { createEventManager, eventManagerMapOff } from "./utils/EventManager";
import { ScatClickPlugin } from "./plugins/click/ScatClickPlugin";

type Options = {
    linkSelector: string;
    cache: boolean;
    activateScripts: boolean;
    containers: string;
    requestHeaders: Record<string, string>;
    skipPopStateHandling(event: PopStateEvent): boolean;
};

// default options
const defaultOptions: Options = {
    linkSelector: `a[href^="${window.location.origin}"]:not([data-no-scatman]), a[href^="/"]:not([data-no-scatman]), a[href^="#"]:not([data-no-scatman])`,
    cache: true,
    activateScripts: true,
    containers: ".scatman-container",
    requestHeaders: {
        "X-Requested-With": "scatman",
        Accept: "text/html, application/xhtml+xml",
    },
    skipPopStateHandling(event) {
        return event.state?.source !== "scatman";
    },
};

type PreloadData = {
    promise: Promise<PageData>;
    url: string;
};

type Cache = {
    get(url: string): PageData | undefined;
    set(url: string, page: PageData): void;
    clear(): void;
};
const noop = () => undefined;
const noopCache = {
    get: noop,
    set: noop,
    clear: noop,
};

export type ScatPageLoadEvent = {
    fromUrl: string;
    url: string;
    hash: string;
    customTransition?: string | null;
    popstate?: PopStateEvent;
};

export class Scatman {
    readonly cache: Cache;

    readonly options: Options;

    private readonly preloading = new Map<string, PreloadData>();

    private plugins: ScatPlugin[] = [];

    private animationPlugin?: ScatAnimationPlugin;

    readonly events = {
        animationInDone: createEventManager("animationInDone"),
        animationInStart: createEventManager("animationInStart"),
        animationOutDone: createEventManager("animationOutDone"),
        animationOutStart: createEventManager("animationOutStart"),
        animationSkipped: createEventManager("animationSkipped"),
        clickLink: createEventManager<MouseEvent>("clickLink"),
        contentReplaced: createEventManager<ScatPageLoadEvent>("contentReplaced"),
        disabled: createEventManager("disabled"),
        enabled: createEventManager("enabled"),
        openPageInNewTab: createEventManager<MouseEvent>("openPageInNewTab"),
        pagePreloaded: createEventManager("pagePreloaded"),
        pageLoaded: createEventManager<ScatPageLoadEvent>("pageLoaded"),
        pageRetrievedFromCache: createEventManager("pageRetrievedFromCache"),
        pageView: createEventManager<ScatPageLoadEvent | undefined>("pageView"),
        samePage: createEventManager<MouseEvent>("samePage"),
        samePageWithHash: createEventManager<MouseEvent>("samePageWithHash"),
        serverError: createEventManager("serverError"),
        transitionStart: createEventManager<ScatPageLoadEvent>("transitionStart"),
        transitionEnd: createEventManager<ScatPageLoadEvent>("transitionEnd"),
        willReplaceContent: createEventManager<ScatPageLoadEvent>("willReplaceContent"),
    };

    constructor(options: Partial<Options> = {}) {
        this.options = { ...defaultOptions, ...options };

        this.cache = this.options.cache ? new Map() : noopCache;
    }

    init() {
        if (this.plugins.length) {
            throw new Error("Scatman is already initialized");
        }

        this.use(new ScatClickPlugin(this));

        // initial save to cache
        const url = getCurrentUrl();
        const page = getPageDataFromHtml(url, document.documentElement.outerHTML, this.options.containers);
        if (!page) throw new Error("Failed getting page from document");
        this.cache.set(page.url, page);

        // modify initial history record
        this.replaceHistory(window.location.href);

        // trigger enabled event
        this.events.enabled.emit();

        // trigger page view event
        this.events.pageView.emit(undefined);
    }

    destroy() {
        this.cache.clear();

        // unmount plugins
        this.plugins.forEach((plugin) => plugin.unmount());
        this.plugins.length = 0;

        this.events.disabled.emit();

        // remove event handlers
        eventManagerMapOff(this.events);
    }

    use(...plugins: ScatPlugin[]) {
        this.plugins.concat(plugins);
        for (const plugin of plugins) {
            if ("animateOut" in plugin && "animateIn" in plugin) {
                this.animationPlugin = plugin as ScatAnimationPlugin;
            }
            plugin.mount();
        }
    }

    async getPageData(url: string, response: Response) {
        // this method can be replaced in case other content than html is expected to be received from server
        const html = await response.text();
        return getPageDataFromHtml(url, html, this.options.containers);
    }

    async renderPage(page: PageData, event: ScatPageLoadEvent) {
        const { popstate } = event;
        // replace state in case the url was redirected
        const { path } = unpackLink(page.url);
        if (window.location.pathname !== path) {
            if (!popstate) {
                this.pushHistory(path);
            }

            // save new record for redirected url
            this.cache.set(path, page.cloneWithUrl(path));
        } else if (!popstate) {
            this.pushHistory(page.url + event.hash);
        }

        this.events.willReplaceContent.emit(event);

        // replace blocks
        this.replaceContainers(page);
        if (this.options.activateScripts) {
            this.activateScripts();
        }

        // set title
        document.title = page.title;

        this.events.contentReplaced.emit(event);
        this.events.pageView.emit(event);

        if (this.animationPlugin && !popstate) {
            this.events.animationInStart.emit();
            await this.animationPlugin.animateIn(event);
            this.events.animationInDone.emit();
        }
        this.events.transitionEnd.emit(event);
    }

    private replaceContainers(page: PageData) {
        const targets = Array.from(document.body.querySelectorAll(this.options.containers));
        if (targets.length !== page.blocks.length) {
            throw new Error("Received page is invalid.");
        }
        for (let i = 0; i < targets.length; i++) {
            targets[i].outerHTML = page.blocks[i];
        }
    }

    private activateScripts() {
        Array.from(document.body.querySelectorAll(this.options.containers))
            .flatMap((e) => Array.from(e.querySelectorAll("script")))
            .forEach((oldScript) => {
                const newScript = document.createElement("script");
                Array.from(oldScript.attributes).forEach((attr) => newScript.setAttribute(attr.name, attr.value));
                newScript.appendChild(document.createTextNode(oldScript.innerHTML));
                oldScript.replaceWith(newScript);
            });
    }

    private async doPreloadPage(url: string) {
        const response = await fetch(url, { headers: this.options.requestHeaders });

        if (response.status === 500) {
            this.events.serverError.emit();
            throw new Error("Server Error");
        }

        // get page data
        const page = await this.getPageData(url, response);

        this.cache.set(url, page);
        this.events.pagePreloaded.emit();

        return page;
    }

    preloadPage(url: string) {
        const cachedPage = this.cache.get(url);
        if (cachedPage) return cachedPage;

        const preloading = this.preloading.get(url);
        if (preloading) return preloading.promise;

        const promise = this.doPreloadPage(url);
        const entry = {
            promise: promise.finally(() => {
                this.preloading.delete(url);
            }),
            url,
        };
        this.preloading.set(url, entry);
        return entry.promise;
    }

    private pushHistory(url: string) {
        window.history.pushState({ url, source: "scatman" }, "", url);
    }

    private replaceHistory(url: string) {
        window.history.replaceState({ url, source: "scatman" }, "", url);
    }

    goTo(href: string, customTransition?: string) {
        const { hash, url } = unpackLink(href);
        this.loadPage({ fromUrl: getCurrentUrl(), url, hash, customTransition });
    }

    private async loadPage(event: ScatPageLoadEvent) {
        this.events.transitionStart.emit(event);

        let animateOutPromise = Promise.resolve();
        if (this.animationPlugin) {
            if (event.popstate) {
                this.events.animationSkipped.emit();
            } else {
                this.events.animationOutStart.emit();
                animateOutPromise = this.animationPlugin.animateOut(event);
                this.events.animationOutDone.emit();
            }
        }

        try {
            // start/skip loading of page
            let page = this.cache.get(event.url);
            if (page) {
                this.events.pageRetrievedFromCache.emit();
            } else {
                const preloading = this.preloading.get(event.url);
                if (preloading) {
                    page = await preloading.promise;
                } else {
                    page = await this.preloadPage(event.url);
                    this.events.pageLoaded.emit(event);
                }
            }

            await animateOutPromise;

            await this.renderPage(page, event);
            const focusElement = document.querySelector("[autofocus]");
            if (focusElement instanceof HTMLElement) {
                requestAnimationFrame(() => {
                    focusElement.focus();
                });
            }
        } catch (error) {
            console.error("Error loading page: ", error);

            // An error happened, try to make it load manually
            window.location.href = event.url;
        }
    }
}
