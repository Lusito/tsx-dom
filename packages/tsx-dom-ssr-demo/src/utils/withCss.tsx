import { Component } from "tsx-dom-ssr";

export function withCss<T>(cssModule: CssModule, factory: Component<T>): Component<T> {
    return function WithCss(props) {
        if (!this.cssModules.includes(cssModule)) {
            this.cssModules.push(cssModule);
        }
        return factory.call(this, props);
    };
}
