import { ComponentThis } from "tsx-dom-ssr";

import { RamCharacter } from "../../types/ramTypes";
import { fetchRAM } from "../../utils/fetchUtils";

export type CharactersListProps = {
    heading: string;
    urls: string[];
};

export async function CharactersList(this: ComponentThis, { heading, urls }: CharactersListProps) {
    if (!urls.length) return null;

    const ids = urls.map((url) => url.split("/").pop());
    let characters = await fetchRAM<RamCharacter | RamCharacter[]>(`/character/${ids}`, {
        signal: this.abortSignal,
    });
    if (!Array.isArray(characters)) characters = [characters];

    return (
        <>
            <h2>{heading}:</h2>
            <ul>
                {characters.map((resident) => (
                    <li>
                        <a href={`/character/${resident.id}`}>{resident.name}</a>
                    </li>
                ))}
            </ul>
        </>
    );
}
