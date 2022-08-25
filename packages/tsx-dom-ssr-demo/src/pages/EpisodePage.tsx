import { ComponentThis } from "tsx-dom-ssr";

import { CharactersList } from "../components/CharactersList/CharactersList";
import { Episode } from "../components/Episode/Episode";
import { DefaultLayout } from "../layouts/DefaultLayout";
import { RamEpisode } from "../types/ramTypes";
import { fetchRAM } from "../utils/fetchUtils";

export type EpisodePageProps = {
    id: string;
};

export async function EpisodePage(this: ComponentThis, { id }: EpisodePageProps) {
    const episode = await fetchRAM<RamEpisode>(`/episode/${id}`, { signal: this.abortSignal });

    return (
        <DefaultLayout title={`Episode: ${episode.name}`}>
            <Episode episode={episode} />

            <CharactersList heading="Characters" urls={episode.characters} />
        </DefaultLayout>
    );
}
