import type { Scatman } from "../../Scatman";
import { getCurrentUrl } from "../../utils/urlUtils";
import { ScatPlugin } from "../../ScatPlugin";

type Options = {
    validClass: RegExp;
};

const defaultOptions: Options = {
    validClass: /./,
};

// fixme: more than just body class? all attributes?
export class ScatBodyClassPlugin implements ScatPlugin {
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

        const { validClass } = this.options;

        // remove old classes
        document.body.classList.forEach((className) => {
            if (validClass.test(className)) {
                document.body.classList.remove(className);
            }
        });

        // add new classes
        const classList = page.document.querySelector("body")?.classList;
        classList?.forEach((className) => {
            if (validClass.test(className)) {
                document.body.classList.add(className);
            }
        });
    };
}
