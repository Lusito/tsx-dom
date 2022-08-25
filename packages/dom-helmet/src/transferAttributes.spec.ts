import { prepareDom, document } from "../testUtils";
import { transferAttributes } from "./transferAttributes";

describe("transferAttributes", () => {
    it("transfers all attributes to the original", () => {
        const body = document.createElement("body");
        const el = prepareDom(`
            <body id="id-value"></body>
            <body class="class-value"></body>
        `);
        el.querySelectorAll("body").forEach(element => transferAttributes(element, body));

        expect(body.getAttribute("id")).toBe("id-value");
        expect(body.className).toBe("class-value");
    });

    it("appends all style and class attributes", () => {
        const body = document.createElement("body");
        body.className = "class-value-1";
        body.setAttribute("style", "color: red;");
        const el = prepareDom(`
            <body style="color: green" class="class-value-2"></body>
            <body style="color: blue;" class="class-value-3"></body>
        `);
        el.querySelectorAll("body").forEach(element => transferAttributes(element, body));

        expect(body.className).toBe("class-value-1 class-value-2 class-value-3");
        expect(body.getAttribute("style")).toBe("color: red;color: green;color: blue;");
    });
});
