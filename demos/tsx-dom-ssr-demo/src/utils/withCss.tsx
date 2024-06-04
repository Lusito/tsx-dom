import { CssModule } from "@lusito/require-libs";
import { Component } from "tsx-dom-ssr";

// Extend ComponentThis
declare module "tsx-dom-ssr" {
    export interface ComponentThis {
        cssModules: CssModule[];
    }
}

export function withCss<T>(cssModules: CssModule[] | CssModule, factory: Component<T>): Component<T> {
    return function WithCss(props) {
        for (const cssModule of Array.isArray(cssModules) ? cssModules : [cssModules]) {
            if (!this.cssModules.includes(cssModule)) {
                this.cssModules.push(cssModule);
            }
        }
        return factory.call(this, props);
    };
}
