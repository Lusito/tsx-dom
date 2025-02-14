import { removeDuplicatesBySelectorAndAttribute } from "./removeDuplicates";
import { transferChildren } from "./transferChildren";

export function transferPortal(portal: Element, root: Element) {
    // Transfer to target if it exists
    const to = portal.getAttribute("to");
    const destination = to && root.querySelector(`helmet-destination[id=${to}]`);
    if (destination) {
        removeDuplicatesBySelectorAndAttribute(portal, destination, "*", "id");

        // Move all children of portal to destination
        transferChildren(portal, destination);

        // Then remove the portal element
        portal.remove();
    } else {
        console.error(`Could not find destination ${JSON.stringify(to)} for helmet-portal!`);
    }
}
