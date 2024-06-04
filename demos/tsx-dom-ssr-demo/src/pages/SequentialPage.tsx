import { ComponentThis } from "tsx-dom-ssr";

import { SequentialContext, SequentialContextProvider } from "../contexts/SequentialContext";
import { DefaultLayout } from "../layouts/DefaultLayout";

// This example shows how to make sure components start their work when the previous one has finished rather than in parallel.
// This can be useful in certain scenarios. For example:
// Imagine you have a news-website, which shows lists of teasers (previews for articles).
// Each list may only contain teasers, which have not been already been shown.
// It's also important to finish the lists from top to bottom, since the newest article teasers should be shown at the top of the page.
// In order to do that, the first list needs to do its query, register used ids and then let the next list do its query (while ignoring the used ids).

type SequentialProps = {
    id: number;
    delay: number;
};

export async function Sequential(this: ComponentThis, { id, delay }: SequentialProps) {
    const sequential = SequentialContext.for(this);
    const next = await sequential.start();
    try {
        const beginTime = Date.now();
        await new Promise((resolve) => {
            setTimeout(resolve, delay);
        });
        next();

        return (
            <div>
                {id}: {beginTime}-{Date.now()}
            </div>
        );
    } finally {
        // double-tap in case it wasn't called (a second call will be ignored)
        next();
    }
}

export function SequentialPage() {
    return (
        <DefaultLayout title="Sequential">
            <SequentialContextProvider>
                <Sequential id={1} delay={500} />
                <Sequential id={2} delay={200} />
                <Sequential id={3} delay={100} />
            </SequentialContextProvider>
        </DefaultLayout>
    );
}
