import express from "express";

import { respondHTML } from "../utils/renderHTML";
import { CharactersPage } from "../pages/CharactersPage";
import { CharacterPage } from "../pages/CharacterPage";
import { LocationsPage } from "../pages/LocationsPage";
import { LocationPage } from "../pages/LocationPage";
import { EpisodesPage } from "../pages/EpisodesPage";
import { EpisodePage } from "../pages/EpisodePage";

export const ramRouter = express.Router();

ramRouter.get("/characters", (req, res) =>
    respondHTML(res, <CharactersPage currentPage={parseInt((req.query.page as string) || "1")} />)
);

ramRouter.get("/character/:id", (req, res) => respondHTML(res, <CharacterPage id={req.params.id} />));

ramRouter.get("/locations", (req, res) =>
    respondHTML(res, <LocationsPage currentPage={parseInt((req.query.page as string) || "1")} />)
);

ramRouter.get("/location/:id", (req, res) => respondHTML(res, <LocationPage id={req.params.id} />));

ramRouter.get("/episodes", (req, res) =>
    respondHTML(res, <EpisodesPage currentPage={parseInt((req.query.page as string) || "1")} />)
);

ramRouter.get("/episode/:id", (req, res) => respondHTML(res, <EpisodePage id={req.params.id} />));
