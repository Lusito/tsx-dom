/* eslint-disable import/no-duplicates */
import "./elements/PagePicker";

import { PagePickerProps } from "./elements/PagePicker";

type ExtendProps<T> = T & import("tsx-dom-types").SVGAttributes & import("tsx-dom-ssr").HTMLComponentProps;

// eslint-disable-next-line @typescript-eslint/no-namespace
declare module "tsx-dom-ssr" {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface CustomElementsHTML {
        "page-picker": ExtendProps<PagePickerProps>;
    }
}
