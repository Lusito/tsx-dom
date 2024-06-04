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
            console.log("connected");
            this.textContent = "I could use a little social interaction.";
            const activeColor = this.getAttribute("activeColor");
            if (activeColor) {
                this.setAttribute("style", `--active-color: ${activeColor}`);
            }

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

        setIntersecting(intersecting: boolean) {
            // Prevent initial execution
            if (intersecting === this.classList.contains("active")) return;

            console.log("intersecting", intersecting);
            this.classList.toggle("active", intersecting);
            this.setText(intersecting ? "I'LL HUNT YOU DOWN AND GUT YOU LIKE A FISH!" : "I'm all toasty inside.");
        }
    },
);
