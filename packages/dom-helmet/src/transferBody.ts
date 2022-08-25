import { transferAttributes } from "./transferAttributes";
import { transferChildren } from "./transferChildren";

export function transferBody(falseElement: HTMLBodyElement, target: HTMLBodyElement) {
    // Transfer attributes
    transferAttributes(falseElement, target);

    // Move all children of head elements in the body to the main head
    transferChildren(falseElement, target);

    // Then remove the false element
    falseElement.remove();
}
