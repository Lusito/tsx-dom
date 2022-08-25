import { transferAttributes } from "./transferAttributes";

export function transferHtml(falseElement: HTMLHtmlElement, target: HTMLHtmlElement) {
    if (falseElement.childNodes.length) {
        throw new Error("False html elements may not contain children");
    }

    // Transfer attributes
    transferAttributes(falseElement, target);

    // Then remove the false element
    falseElement.remove();
}
