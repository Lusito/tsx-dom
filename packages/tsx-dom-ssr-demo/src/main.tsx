import express from "express";
import fs from "fs";
import compression from "compression";

import { respondHTML } from "./utils/renderHTML";
import { DemoPage } from "./pages/DemoPage";
import { ramRouter } from "./routers/ramRouter";
import { SequentialPage } from "./pages/SequentialPage";

const app = express();
app.use(compression());
const port = 3000;

if (process.env.NODE_ENV !== "production") {
    // SSE hot reload:
    const startupTime = Date.now();
    app.get("/hot-sse", (req, res) => {
        res.status(200).set({ connection: "keep-alive", "content-type": "text/event-stream" });
        res.write(`data: ${startupTime}\n\n`);
        res.flush();
    });
}

app.get("/", (req, res) => respondHTML(res, <DemoPage />));

app.get("/sequential", (req, res) => respondHTML(res, <SequentialPage />));

app.get("/custom-elements.js", async (req, res) => {
    let filePath = "./dist/packages/tsx-dom-ssr-demo-elements/main.esm.js";
    if (!fs.existsSync(filePath)) {
        filePath = filePath.replace(/\.esm\.js$/, ".js");
    }
    res.sendFile(filePath, { root: process.cwd() });
});

app.use(ramRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

// Extend ComponentThis
declare module "tsx-dom-ssr" {
    export interface ComponentThis {
        cssModules: CssModule[];
    }
}
