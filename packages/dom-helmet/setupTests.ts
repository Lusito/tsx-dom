/* eslint-disable @typescript-eslint/no-non-null-assertion */
// eslint-disable-next-line import/no-extraneous-dependencies
import { Window } from "happy-dom";
// eslint-disable-next-line import/no-extraneous-dependencies
import { CustomElementProps } from "tsx-dom";

import { HelmetDestinationProps, HelmetPortalProps } from "./src/props";

const window = new Window();
const document = window.document as unknown as Document;

globalThis.document = document;
globalThis.Element = window.Element as any;

declare module "tsx-dom" {
    interface CustomElementsHTML {
        "helmet-portal": CustomElementProps<HelmetPortalProps, null>;
        "helmet-destination": CustomElementProps<HelmetDestinationProps, null>;
    }
}
