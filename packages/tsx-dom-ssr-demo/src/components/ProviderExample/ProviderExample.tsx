import { ComponentThis } from "tsx-dom-ssr";

import { SomeNumber } from "../../contexts/SomeNumber";

export function ProviderExample(this: ComponentThis) {
    const num = SomeNumber.for(this);
    return <div>{num}</div>;
}
