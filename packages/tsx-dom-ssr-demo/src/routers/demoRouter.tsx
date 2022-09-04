import express from "express";

import { respondHTML } from "../utils/renderHTML";
import { ProviderDemoPage } from "../pages/ProviderDemoPage";
import { SequentialPage } from "../pages/SequentialPage";

export const demoRouter = express.Router();

demoRouter.get("/demos/providers", (req, res) => {
    respondHTML(res, <ProviderDemoPage />);
});

demoRouter.get("/demos/sequential", (req, res) => {
    respondHTML(res, <SequentialPage />);
});
