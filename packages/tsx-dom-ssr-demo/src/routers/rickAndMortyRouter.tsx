import { FastifyInstance } from "fastify";

import { respondHTML } from "../utils/renderHTML";
import { CharactersPage } from "../pages/CharactersPage";
import { CharacterPage } from "../pages/CharacterPage";
import { LocationsPage } from "../pages/LocationsPage";
import { LocationPage } from "../pages/LocationPage";
import { EpisodesPage } from "../pages/EpisodesPage";
import { EpisodePage } from "../pages/EpisodePage";
import { HomePage } from "../pages/HomePage";

export async function rickAndMortyRouter(app: FastifyInstance) {
    app.get("/", (req, res) => {
        respondHTML(res, <HomePage />);
    });

    app.get<{ Querystring: { page: string } }>("/characters", (req, res) => {
        respondHTML(res, <CharactersPage currentPage={parseInt(req.query.page || "1")} />);
    });

    app.get<{ Params: { id: string } }>("/character/:id", (req, res) => {
        respondHTML(res, <CharacterPage id={req.params.id} />);
    });

    app.get<{ Querystring: { page: string } }>("/locations", (req, res) => {
        respondHTML(res, <LocationsPage currentPage={parseInt((req.query.page as string) || "1")} />);
    });

    app.get<{ Params: { id: string } }>("/location/:id", (req, res) => {
        respondHTML(res, <LocationPage id={req.params.id} />);
    });

    app.get<{ Querystring: { page: string } }>("/episodes", (req, res) => {
        respondHTML(res, <EpisodesPage currentPage={parseInt((req.query.page as string) || "1")} />);
    });

    app.get<{ Params: { id: string } }>("/episode/:id", (req, res) => {
        respondHTML(res, <EpisodePage id={req.params.id} />);
    });
}
