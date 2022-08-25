type Options = {
    container: Element;
    className: string;
    background: string;
    transition: number;
};

export class ProgressBar {
    private options: Options;

    private minValue = 0.1;

    private stylesheetElement: HTMLStyleElement;

    private progressElement: HTMLDivElement;

    private hiding = false;

    private trickleInterval?: number;

    private value = 0;

    private visible = false;

    constructor(options: Options) {
        this.options = options;

        this.stylesheetElement = this.createStylesheetElement();
        this.progressElement = this.createProgressElement();
    }

    private getDefaultCSS() {
        const { className, transition: animationDuration, background } = this.options;
        return `
			.${className} {
				position: fixed;
				display: block;
				top: 0;
				left: 0;
				height: 3px;
				background: ${background};
				z-index: 9999;
				transition:
                    width ${animationDuration}ms ease-out,
                    opacity ${animationDuration / 2}ms ${animationDuration / 2}ms ease-in;
                    transform: translate3d(0, 0, 0);
			}
    `;
    }

    show() {
        if (!this.visible) {
            this.visible = true;
            document.head.insertBefore(this.stylesheetElement, document.head.firstChild);
            this.insertProgressElement();
            this.startTrickling();
        }
    }

    hide() {
        if (this.visible && !this.hiding) {
            this.hiding = true;
            this.fadeProgressElement(() => {
                this.progressElement.remove();
                this.stopTrickling();
                this.visible = false;
                this.hiding = false;
            });
        }
    }

    setValue(value: number) {
        this.value = Math.min(1, Math.max(this.minValue, value));
        this.refresh();
    }

    private insertProgressElement() {
        this.progressElement.style.width = "0";
        this.progressElement.style.opacity = "1";
        document.body.insertBefore(this.progressElement, document.body.firstChild);
        this.refresh();
    }

    private fadeProgressElement(callback: () => void) {
        this.progressElement.style.opacity = "0";
        setTimeout(callback, this.options.transition * 1.5);
    }

    private startTrickling() {
        if (!this.trickleInterval) {
            this.trickleInterval = window.setInterval(this.trickle, this.options.transition);
        }
    }

    private stopTrickling() {
        window.clearInterval(this.trickleInterval);
        delete this.trickleInterval;
    }

    private trickle = () => {
        const advance = (Math.random() * 3) / 100;
        this.setValue(this.value + advance);
        if (this.value === 1) {
            this.stopTrickling();
        }
    };

    private refresh() {
        requestAnimationFrame(() => {
            this.progressElement.style.width = `${10 + this.value * 90}%`;
        });
    }

    private createStylesheetElement() {
        const element = document.createElement("style");
        element.setAttribute("data-progressbar-styles", "");
        element.setAttribute("data-scatman-persist", "true");
        element.innerHTML = this.getDefaultCSS();
        return element;
    }

    private createProgressElement() {
        const element = document.createElement("div");
        element.className = this.options.className;
        return element;
    }
}
