import {
    removeDuplicatesBySelector,
    removeDuplicatesBySelectorAndAttribute,
    removeDuplicatesBySelectorAndTextContent,
} from "./removeDuplicates";
import { transferChildren } from "./transferChildren";

export function transferHead(falseElement: HTMLHeadElement, target: HTMLHeadElement) {
    // If title, base or meta[charset] are present, they will replace old instances completely.
    removeDuplicatesBySelector(falseElement, target, "title");
    removeDuplicatesBySelector(falseElement, target, "base");
    removeDuplicatesBySelector(falseElement, target, "meta[charset]");

    removeDuplicatesBySelectorAndAttribute(falseElement, target, "meta", "name");
    removeDuplicatesBySelectorAndAttribute(falseElement, target, "meta", "http-equiv");
    removeDuplicatesBySelectorAndAttribute(falseElement, target, "link", "href");
    removeDuplicatesBySelectorAndAttribute(falseElement, target, "script", "src");
    removeDuplicatesBySelectorAndAttribute(falseElement, target, "*", "id");
    removeDuplicatesBySelectorAndTextContent(falseElement, target, "style");

    // Move all children of head elements in the body to the main head
    transferChildren(falseElement, target);

    // Then remove the false element
    falseElement.remove();
}
