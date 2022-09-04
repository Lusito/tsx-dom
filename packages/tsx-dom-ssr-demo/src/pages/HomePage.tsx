import { ComponentThis } from "tsx-dom-ssr";

import { Character } from "../components/Character/Character";
import { DefaultLayout } from "../layouts/DefaultLayout";
import { RamCharacter } from "../types/ramTypes";
import { fetchRAM } from "../utils/fetchUtils";
import { withCss } from "../utils/withCss";
import classes from "./HomePage.module.scss";

// eslint-disable-next-line func-names
export const HomePage = withCss(classes, async function (this: ComponentThis) {
    const characters = await fetchRAM<RamCharacter[]>("/character/1,2,3", { signal: this.abortSignal });

    return (
        <DefaultLayout title="Homepage">
            <div class={classes.homePageList}>
                {characters.map((character) => (
                    <Character character={character} />
                ))}
            </div>
        </DefaultLayout>
    );
});
