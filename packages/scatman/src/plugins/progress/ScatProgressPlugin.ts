import type { Scatman } from "../../Scatman";
import type { ScatPlugin } from "../../ScatPlugin";
import { ProgressBar } from "./ProgressBar";

type Options = {
    container: string;
    className: string;
    background: string;
    transition: number;
    delay: number;
    hideImmediately: boolean;
};

const defaultOptions = {
    container: "body",
    className: "scatman-progress-bar",
    background: "red",
    transition: 300,
    delay: 300,
    hideImmediately: true,
};

export class ScatProgressPlugin implements ScatPlugin {
    private scatman: Scatman;

    private options: Options;

    private showProgressBarTimeout?: number;

    private hideProgressBarTimeout?: number;

    private progressBar: ProgressBar;

    constructor(scatman: Scatman, options: Partial<Options> = {}) {
        this.scatman = scatman;
        this.options = { ...defaultOptions, ...options };

        let container = document.querySelector(this.options.container);
        if (!container) {
            console.warn(
                `Could not find container for progress bar using "${this.options.container}". Using body instead`
            );
            container = document.body;
        }

        this.progressBar = new ProgressBar({
            className: this.options.className,
            transition: this.options.transition,
            background: this.options.background,
            container,
        });
    }

    mount() {
        this.scatman.events.transitionStart.on(this.start);
        this.scatman.events.contentReplaced.on(this.stop);
    }

    unmount() {
        this.scatman.events.transitionStart.off(this.start);
        this.scatman.events.contentReplaced.off(this.stop);
    }

    private start = () => {
        this.progressBar.setValue(0);
        this.showProgressBarAfterDelay();
    };

    private stop = () => {
        this.progressBar.setValue(1);
        if (this.options.hideImmediately) {
            this.hideProgressBar();
        } else {
            this.finishAnimationAndHideProgressBar();
        }

        window.clearTimeout(this.showProgressBarTimeout);
        delete this.showProgressBarTimeout;
    };

    private showProgressBar = () => {
        window.clearTimeout(this.hideProgressBarTimeout);
        delete this.hideProgressBarTimeout;
        this.progressBar.show();
    };

    private showProgressBarAfterDelay() {
        this.showProgressBarTimeout = window.setTimeout(this.showProgressBar, this.options.delay);
    }

    private hideProgressBar = () => {
        this.progressBar.hide();
    };

    private finishAnimationAndHideProgressBar() {
        this.hideProgressBarTimeout = window.setTimeout(this.hideProgressBar, this.options.transition);
    }
}
