import express from "express";
import compression from "compression";

import { ramRouter } from "./routers/ramRouter";
import { demoRouter } from "./routers/demoRouter";

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

app.get("/custom-elements.js", (req, res) => {
    res.sendFile("./dist/custom-elements.js", { root: process.cwd() });
});

app.use(ramRouter);
app.use(demoRouter);

app.listen(port, () => {
    console.log(`---------------------------------------`);
    console.log(`🚀 running at: http://localhost:${port}`);
    console.log(`---------------------------------------`);
});
