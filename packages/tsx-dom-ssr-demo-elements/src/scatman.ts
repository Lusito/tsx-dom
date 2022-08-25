import {
    Scatman,
    ScatA11yPlugin,
    ScatBodyClassPlugin,
    ScatCssPlugin,
    ScatHeadPlugin,
    ScatPreloadPlugin,
    ScatProgressPlugin,
    ScatScrollPlugin,
} from "scatman";

export const scatman = new Scatman();
document.addEventListener("DOMContentLoaded", () => {
    scatman.init();
    scatman.use(
        new ScatCssPlugin(scatman),
        new ScatHeadPlugin(scatman),
        new ScatBodyClassPlugin(scatman),
        new ScatScrollPlugin(scatman),
        new ScatProgressPlugin(scatman),
        new ScatPreloadPlugin(scatman),
        new ScatA11yPlugin(scatman)
    );
});
