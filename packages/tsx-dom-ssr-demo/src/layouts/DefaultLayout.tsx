import { BaseProps } from "tsx-dom-ssr";

import { Footer } from "../components/Footer/Footer";
import { Header } from "../components/Header/Header";
import { reloadScript } from "../utils/reloadScript";
import { withCss } from "../utils/withCss";
import classes from "./DefaultLayout.module.scss";
import globalStyles from "./styles.scss";

interface DefaultLayoutProps extends BaseProps {
    title: string;
}

export const DefaultLayout = withCss([classes, globalStyles], ({ children, title }: DefaultLayoutProps) => (
    <html>
        <head>
            <title>{title}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            {reloadScript}
            <script src="/custom-elements.js" defer />
        </head>
        <body class={classes.body}>
            <Header />
            <div class="transition-fade scatman-container">
                <h1>{title}</h1>
                {children}
            </div>
            <p>
                {"Other Demos: "}
                <a href="/demos/providers">Providers</a>, <a href="/demos/sequential">Sequential requests</a>
            </p>
            <Footer />
        </body>
    </html>
));
