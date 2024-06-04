import { ComponentThis } from "tsx-dom-ssr";

import { SomeNumber } from "../../contexts/SomeNumber";

export function ProviderExample(this: ComponentThis) {
    const num = SomeNumber.for(this);
    return (
        <div>
            <p>This example shows how you can avoid prop-drilling by using a provider.</p>
            <p>The received value is: {num}</p>
        </div>
    );
}
