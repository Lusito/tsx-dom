/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { prepareDom } from "../testUtils";
import {
    removeDuplicatesBySelector,
    removeDuplicatesBySelectorAndAttribute,
    removeDuplicatesBySelectorAndTextContent,
} from "./removeDuplicates";

describe("removeDuplicatesBySelector", () => {
    it("removes elements if they exist in the false head", () => {
        const el = prepareDom(`
        <html>
          <head><title>hello</title></head>
          <body>
              <head>
                  <title>Overwrite</title>
              </head>
          </body>
        </html>
        `);
        const head = el.querySelector("html > head")!;
        const falseHead = el.querySelector("body > head")!;
        removeDuplicatesBySelector(falseHead, head, "title");

        expect(head.querySelector("title")).toBeFalsy();
        expect(falseHead.querySelector("title")).toBeTruthy();
    });

    it("does not removes elements if they do not exist in the false head", () => {
        const el = prepareDom(`
        <html>
          <head><title>hello</title></head>
          <body>
              <head></head>
          </body>
        </html>
        `);
        const head = el.querySelector("html > head")!;
        const falseHead = el.querySelector("body > head")!;
        removeDuplicatesBySelector(falseHead, head, "title");

        expect(head.querySelector("title")).toBeTruthy();
    });
});

describe("removeDuplicatesBySelectorAndAttribute", () => {
    it("removes elements if they exist in the false head with the same attribute value", () => {
        const el = prepareDom(`
        <html>
          <head><meta name="description" content="Initial"></head>
          <body>
              <head>
                <meta name="description" content="Override">
              </head>
          </body>
        </html>
        `);
        const head = el.querySelector("html > head")!;
        const falseHead = el.querySelector("body > head")!;
        removeDuplicatesBySelectorAndAttribute(falseHead, head, "meta", "name");

        expect(head.querySelector("meta")).toBeFalsy();
        expect(falseHead.querySelector("meta")).toBeTruthy();
    });

    it("does not remove elements if they do not exist in the false head", () => {
        const el = prepareDom(`
        <html>
          <head><meta name="description" content="Initial"></head>
          <body>
              <head></head>
          </body>
        </html>
        `);
        const head = el.querySelector("html > head")!;
        const falseHead = el.querySelector("body > head")!;
        removeDuplicatesBySelectorAndAttribute(falseHead, head, "meta", "name");

        expect(head.querySelector("meta")).toBeTruthy();
    });

    it("does not remove elements if they exist in the false head with a different attribute value", () => {
        const el = prepareDom(`
        <html>
          <head><meta name="description" content="Initial"></head>
          <body>
              <head>
                <meta name="keywords" content="Override">
              </head>
          </body>
        </html>
        `);
        const head = el.querySelector("html > head")!;
        const falseHead = el.querySelector("body > head")!;
        removeDuplicatesBySelectorAndAttribute(falseHead, head, "meta", "name");

        expect(head.querySelector("meta")).toBeTruthy();
    });
});

describe("removeDuplicatesBySelectorAndTextContent", () => {
    it("removes elements if they exist in the false head with the same textContent", () => {
        const el = prepareDom(`
        <html>
          <head><style>initial</style></head>
          <body>
              <head>
                <style>initial</style>
              </head>
          </body>
        </html>
        `);
        const head = el.querySelector("html > head")!;
        const falseHead = el.querySelector("body > head")!;
        removeDuplicatesBySelectorAndTextContent(falseHead, head, "style");

        expect(head.querySelector("style")).toBeFalsy();
        expect(falseHead.querySelector("style")).toBeTruthy();
    });

    it("does not remove elements if they do not exist in the false head", () => {
        const el = prepareDom(`
        <html>
          <head><style>initial</style></head>
          <body>
              <head></head>
          </body>
        </html>
        `);
        const head = el.querySelector("html > head")!;
        const falseHead = el.querySelector("body > head")!;
        removeDuplicatesBySelectorAndTextContent(falseHead, head, "style");

        expect(head.querySelector("style")).toBeTruthy();
    });

    it("does not remove elements if they exist in the false head with a different textContent", () => {
        const el = prepareDom(`
        <html>
          <head><style>initial</style></head>
          <body>
              <head>
                <style>additional</style>
              </head>
          </body>
        </html>
        `);
        const head = el.querySelector("html > head")!;
        const falseHead = el.querySelector("body > head")!;
        removeDuplicatesBySelectorAndTextContent(falseHead, head, "style");

        expect(head.querySelector("style")).toBeTruthy();
    });
});
