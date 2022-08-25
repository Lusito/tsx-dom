export interface Link {
    path: string;
    hash: string;
    url: string;
}

export type LinkSource = HTMLAnchorElement | SVGElement | string;

const prefixSlash = (value: string) => (value.startsWith("/") ? value : `/${value}`);

export function unpackLink(linkSource: LinkSource): Link {
    let data: HTMLAnchorElement | URL;
    if (linkSource instanceof HTMLAnchorElement) {
        data = linkSource;
    } else {
        const href = typeof linkSource === "string" ? linkSource : linkSource.getAttribute("href");
        if (!href) {
            return {
                path: "/",
                hash: "",
                url: "/",
            };
        }

        data = new URL(href, "http://ignore.me");
    }

    return {
        path: prefixSlash(data.pathname),
        hash: data.hash,
        url: prefixSlash(`${data.pathname}${data.search}`),
    };
}

export const getCurrentUrl = () => window.location.pathname + window.location.search;
