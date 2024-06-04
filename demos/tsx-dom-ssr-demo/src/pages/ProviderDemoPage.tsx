import { ErrorBoundary } from "tsx-dom-ssr";

import { ProviderExample } from "../components/ProviderExample/ProviderExample";
import { SomeNumber } from "../contexts/SomeNumber";
import { RequestError } from "../errors/RequestError";
import { DefaultLayout } from "../layouts/DefaultLayout";

export function ProviderDemoPage() {
    return (
        <DefaultLayout title="Providers">
            <SomeNumber.Provider value={20}>
                <ProviderExample />
                <ErrorBoundary
                    render={() => (
                        <ErrorBoundary
                            render={() => <div />}
                            fallback={({ error }) => <h2>Error 1: {String(error)}</h2>}
                            accept={(error) => !(error instanceof RequestError)}
                        />
                    )}
                    fallback={({ error }) => <h2>Error 2: {String(error)}</h2>}
                />
            </SomeNumber.Provider>
        </DefaultLayout>
    );
}
