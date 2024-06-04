/* eslint-disable import/no-extraneous-dependencies */
// @ts-check
const { createScssHandler } = require("@lusito/require-libs");
const { addHook } = require("pirates");

// register esbuild with jsx support
require("esbuild-register/dist/node").register({
    target: `node${process.version.slice(1)}`,
    jsx: "automatic",
    jsxImportSource: "tsx-dom-ssr",
});

async function main() {
    // build custom-elements
    await require("esbuild").build({
        entryPoints: ["./src/custom-elements/index.ts"],
        bundle: true,
        outfile: "dist/custom-elements.js",
        sourcemap: true,
        target: ["es2021", "chrome58", "edge18", "firefox57", "safari11"],
    });

    // setup scss hooks
    addHook(createScssHandler({ style: "expanded" }), { exts: [".css", ".scss"], ignoreNodeModules: false });

    require("./src/main");
}
main();
