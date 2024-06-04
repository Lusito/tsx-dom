import { defineCustomElement } from "tsx-dom";

type MyCustomElementProps = {
    activeColor: string;
};

export const MyCustomElement = defineCustomElement<MyCustomElementProps>(
    "my-custom-element",
    class extends HTMLElement {
        observer?: IntersectionObserver;

        timeout?: ReturnType<typeof setTimeout>;

        connectedCallback() {
            this.textContent = "Just minding my own business..";
            console.log("connected");

            this.observer = new IntersectionObserver(([entry]) => this.setIntersecting(entry.isIntersecting));
            this.observer.observe(this);
        }

        disconnectedCallback() {
            this.observer?.disconnect();
        }

        setText(text: string) {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                this.textContent = text;
            }, 1000);
        }

        setIntersecting(active: boolean) {
            // Prevent initial execution
            if (active === this.classList.contains("active")) return;

            console.log("intersecting", active);
            this.classList.toggle("active", active);
            const activeColor = this.getAttribute("activeColor");
            if (activeColor && active) {
                this.style.background = activeColor;
                this.setText("Stop watching me you pervert!");
            } else {
                this.style.background = "";
                this.setText("Oh, good, you're gone!");
            }
        }
    },
);
