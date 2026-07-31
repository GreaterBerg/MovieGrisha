
interface movieCast {
    "id": number,
    "name": string,
    "cast_id": number,
    "character": string,
}

interface movieCrew {
    "id": number,
    "name": string,
    "job": string
}

interface genres {
    "id": number,
    "name": string
}

interface productionCompanies {
    "id": number,
    "logo_path": string,
    "name": string,
    "origin_country": string
}

export interface MovieDetails {
    "title": string,
    "budget": number,
    "genres": genres[],
    "homepage": string | null,
    "imdb_id": string,
    "origin_country": string[],
    "production_companies": productionCompanies[],
    "revenue": number,
    "runtime": number,
    "status": string,

    "cast": movieCast[],

    "crew": movieCrew[]
}