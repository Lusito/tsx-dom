import { withCss } from "../../utils/withCss";
import classes from "./Header.module.scss";

export const Header = withCss(classes, () => (
    <div class={classes.header}>
        <div class={classes.headerTitle}>Rick and Morty Database</div>
        <a href="/characters">Characters</a>
        <a href="/locations">Locations</a>
        <a href="/episodes">Episodes</a>
    </div>
));
