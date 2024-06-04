import { withCss } from "../../utils/withCss";
import classes from "./Header.module.scss";

export const Header = withCss(classes, () => (
    <div class={classes.header}>
        <div class={classes.headerTitle}>
            <a href="/">Rick and Morty Database</a>
        </div>
        <a href="/characters">Characters</a>
        <a href="/locations">Locations</a>
        <a href="/episodes">Episodes</a>
    </div>
));
