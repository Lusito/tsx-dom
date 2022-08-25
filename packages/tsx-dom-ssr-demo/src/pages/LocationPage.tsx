import { ComponentThis } from "tsx-dom-ssr";

import { CharactersList } from "../components/CharactersList/CharactersList";
import { Location } from "../components/Location/Location";
import { DefaultLayout } from "../layouts/DefaultLayout";
import { RamCharacter, RamLocation } from "../types/ramTypes";
import { fetchRAM } from "../utils/fetchUtils";

export type LocationPageProps = {
    id: string;
};

export async function LocationPage(this: ComponentThis, { id }: LocationPageProps) {
    const location = await fetchRAM<RamLocation>(`/location/${id}`, { signal: this.abortSignal });
    const residentIds = location.residents.map((resident) => resident.split("/").pop());
    let residents = await fetchRAM<RamCharacter | RamCharacter[]>(`/character/${residentIds}`, {
        signal: this.abortSignal,
    });
    if (!Array.isArray(residents)) residents = [residents];

    return (
        <DefaultLayout title={`Location: ${location.name}`}>
            <Location location={location} />

            <CharactersList heading="Residents" urls={location.residents} />
        </DefaultLayout>
    );
}
