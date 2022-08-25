import { RamEpisode } from "../../types/ramTypes";
import { withCss } from "../../utils/withCss";
import classes from "./Episode.module.scss";

export type EpisodeProps = {
    episode: RamEpisode;
};

export const Episode = withCss(classes, ({ episode }: EpisodeProps) => (
    <div class={classes.episode}>
        {episode.episode}: <a href={`/episode/${episode.id}`}>{episode.name}</a> (Aired {episode.air_date})
    </div>
));
