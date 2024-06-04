import { CustomElementProps } from "tsx-dom-ssr";

import { scatman } from "./scatman";

class PagePicker extends HTMLSelectElement {
    onChangeHandler = () => {
        const url = this.getAttribute("url")?.replace("{{PAGE}}", this.value);
        if (url) {
            scatman.goTo(url);
        }
    };

    connectedCallback() {
        this.addEventListener("change", this.onChangeHandler);
    }

    disconnectedCallback() {
        this.removeEventListener("change", this.onChangeHandler);
    }
}

customElements.define("page-picker", PagePicker, { extends: "select" });

export type PagePickerProps = {
    url: string;
};

declare module "tsx-dom-ssr" {
    interface CustomElementsHTML {
        "page-picker": CustomElementProps<PagePickerProps, "select">;
    }
}
