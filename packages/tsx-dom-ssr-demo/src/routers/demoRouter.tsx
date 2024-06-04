import { FastifyInstance } from "fastify";

import { respondHTML } from "../utils/renderHTML";
import { ProviderDemoPage } from "../pages/ProviderDemoPage";
import { SequentialPage } from "../pages/SequentialPage";

export async function demoRouter(app: FastifyInstance) {
    app.get("/providers", (req, res) => {
        respondHTML(res, <ProviderDemoPage />);
    });

    app.get("/sequential", (req, res) => {
        respondHTML(res, <SequentialPage />);
    });
}
