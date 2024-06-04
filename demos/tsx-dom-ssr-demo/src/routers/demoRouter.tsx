import { FastifyInstance } from "fastify";

import { replyComponent } from "../utils/replyComponent";
import { ProviderDemoPage } from "../pages/ProviderDemoPage";
import { SequentialPage } from "../pages/SequentialPage";

export async function demoRouter(app: FastifyInstance) {
    app.get("/providers", (req, reply) => replyComponent(reply, <ProviderDemoPage />));
    app.get("/sequential", (req, reply) => replyComponent(reply, <SequentialPage />));
}
