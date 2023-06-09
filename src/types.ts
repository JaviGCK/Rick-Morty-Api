export type Character = {
    id: number,
    name: string,
    status: string,
    species: string,
    type: string,
    gender: string,
    origin: location,
    location: location,
    image: string,
    episode: string[],
    url: string,
    created: string,
}

export type CharacterLocation = {
    id: number,
    name: string,
    type: string,
    dimension: string,
    residents: string[],
    url: string,
    created: string
}

export type Episode = {
    id: number,
    name: string,
    air_date: string,
    episode: string,
    characters: string[],
    url: string,
    created: string,
}

export type location = {
    name: string,
    url: string,
}

export type Episodes = {
    info: Info,
    results: Episode[]
}

export type Info = {
    count: number,
    pages: number,
    next: string | null,
    prev: string | null
}