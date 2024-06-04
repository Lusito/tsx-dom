import { App } from "./components/App";

if (process.env.NODE_ENV !== "production") {
    new EventSource("/esbuild").addEventListener("change", () => window.location.reload());
}

const root = <App />;
document.body.appendChild(root);
