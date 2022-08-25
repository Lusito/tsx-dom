export type RamNameAndUrl = {
    name: string;
    url: string;
};

export type RamCharacter = {
    id: number;
    name: string;
    status: "Alive" | "Dead" | "unknown";
    species: string;
    type: string;
    gender: "Female" | "Male" | "Genderless" | "unknown";
    origin: RamNameAndUrl;
    location: RamNameAndUrl;
    image: string;
    episode: string[];
    url: string;
    created: string;
};

export type RamLocation = {
    id: number;
    name: string;
    type: string;
    dimension: string;
    residents: string[];
    url: string;
    created: string;
};

export type RamEpisode = {
    id: number;
    name: string;
    air_date: string;
    episode: string;
    characters: string[];
    url: string;
    created: string;
};

export type RamPageInfo = {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
};

export type RamPage<T> = {
    info: RamPageInfo;
    results: T[];
};
