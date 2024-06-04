import { App } from "./components/App";

new EventSource("/esbuild").addEventListener("change", () => window.location.reload());

const root = <App />;
document.body.appendChild(root);
