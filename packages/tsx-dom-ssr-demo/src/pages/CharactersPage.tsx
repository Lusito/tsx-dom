import { Character } from "../components/Character/Character";
import { Pagination } from "../components/Pagination/Pagination";
import { PaginationLayout } from "../layouts/PaginationLayout";
import { RamCharacter } from "../types/ramTypes";
import { fetchRAMPage } from "../utils/fetchUtils";
import { withCss } from "../utils/withCss";
import classes from "./CharactersPage.module.scss";

type CharactersPageProps = {
    currentPage: number;
};

// eslint-disable-next-line func-names
export const CharactersPage = withCss(classes, async function ({ currentPage }: CharactersPageProps) {
    const page = await fetchRAMPage<RamCharacter>("/character", currentPage, { signal: this.abortSignal });

    const pagination = (
        <Pagination
            currentPage={currentPage}
            totalPages={page.info.pages}
            url={(pageNum) => `/characters?page=${pageNum}`}
        />
    );

    return (
        <PaginationLayout title="Characters" pagination={pagination}>
            <div class={classes.charactersPageList}>
                {page.results.map((character) => (
                    <Character character={character} />
                ))}
            </div>
        </PaginationLayout>
    );
});
