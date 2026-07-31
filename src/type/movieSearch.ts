import type { MovieResults } from "./movieResults";

export interface MovieSearch {
    "dates": Object,
    "page": number,
    "results" : MovieResults[],
    "total_pages": number,
    "total_results": number,
}