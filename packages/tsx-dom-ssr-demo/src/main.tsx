import fastify from "fastify";
import fastifyStatic from "@fastify/static";
import { join } from "path";

import { rickAndMortyRouter } from "./routers/rickAndMortyRouter";
import { demoRouter } from "./routers/demoRouter";

const app = fastify();
const port = 3000;

if (process.env.NODE_ENV !== "production") {
    // SSE hot reload:
    const startupTime = Date.now();
    app.get("/hot-sse", (req, reply) => {
        reply.status(200);
        reply.raw.setHeader("connection", "keep-alive");
        reply.raw.setHeader("content-type", "text/event-stream");
        reply.raw.write(`data: ${startupTime}\n\n`);
    });
}

app.register(fastifyStatic, {
    root: join(process.cwd(), "dist"),
    prefix: "/",
});

app.register(rickAndMortyRouter);
app.register(demoRouter, { prefix: "/demos"});

const start = async () => {
    try {
        await app.listen({ port: 3000 });
        console.log(`---------------------------------------`);
        console.log(`🚀 running at: http://localhost:${port}`);
        console.log(`---------------------------------------`);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};
start();
