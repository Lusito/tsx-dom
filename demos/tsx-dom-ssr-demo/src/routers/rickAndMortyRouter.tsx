import { FastifyInstance } from "fastify";

import { replyComponent } from "../utils/replyComponent";
import { CharactersPage } from "../pages/CharactersPage";
import { CharacterPage } from "../pages/CharacterPage";
import { LocationsPage } from "../pages/LocationsPage";
import { LocationPage } from "../pages/LocationPage";
import { EpisodesPage } from "../pages/EpisodesPage";
import { EpisodePage } from "../pages/EpisodePage";
import { HomePage } from "../pages/HomePage";

export async function rickAndMortyRouter(app: FastifyInstance) {
    app.get("/", (req, reply) => replyComponent(reply, <HomePage />));

    app.get<{ Querystring: { page: string } }>("/characters", (req, reply) =>
        replyComponent(reply, <CharactersPage currentPage={parseInt(req.query.page || "1")} />),
    );

    app.get<{ Params: { id: string } }>("/character/:id", (req, reply) =>
        replyComponent(reply, <CharacterPage id={req.params.id} />),
    );

    app.get<{ Querystring: { page: string } }>("/locations", (req, reply) =>
        replyComponent(reply, <LocationsPage currentPage={parseInt((req.query.page as string) || "1")} />),
    );

    app.get<{ Params: { id: string } }>("/location/:id", (req, reply) =>
        replyComponent(reply, <LocationPage id={req.params.id} />),
    );

    app.get<{ Querystring: { page: string } }>("/episodes", (req, reply) =>
        replyComponent(reply, <EpisodesPage currentPage={parseInt((req.query.page as string) || "1")} />),
    );

    app.get<{ Params: { id: string } }>("/episode/:id", (req, reply) =>
        replyComponent(reply, <EpisodePage id={req.params.id} />),
    );
}
