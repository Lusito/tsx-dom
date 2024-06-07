import { removeDuplicatesBySelectorAndAttribute } from "./removeDuplicates";
import { transferChildren } from "./transferChildren";

export function transferPortal(portal: Element, destination: Element) {
    removeDuplicatesBySelectorAndAttribute(portal, destination, "*", "id");

    // Move all children of portal to destination
    transferChildren(portal, destination);

    // Then remove the portal element
    portal.remove();
}
