import { withCss } from "../../utils/withCss";
import classes from "./Footer.module.scss";

export const Footer = withCss(classes, () => (
    <div class={classes.footer}>
        {"Powered by "}
        <a href="https://github.com/Lusito/tsx-dom" target="_blank" rel="noopener noreferrer">
            tsx-dom-ssr
        </a>
        {" and "}
        <a href="https://rickandmortyapi.com/" target="_blank" rel="noopener noreferrer">
            The Rick and Morty API
        </a>
    </div>
));
