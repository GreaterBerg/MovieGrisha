import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`
    },
}

export const useFetch = (path, details='') => {

    const [errorMessage, setErrorMessage] = useState(null);
    const [movieData, setMovieData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchMovies = async () => {

        setIsLoading(true);
        setErrorMessage('')

        try {
            
            const endpoint = path;

            const response = await fetch(endpoint, API_OPTIONS);

            if (!response.ok) {
                throw new Error("Failed fatching");
            }

            const data = await response.json()

            if (data.Response === "false") {
                setErrorMessage(data.error || "Error fetch");
                setMovieData([])
                return
            }

            details ? setMovieData(data[details]) : setMovieData(data);
            details ? console.log(data[details]) : console.log(data);
            
        }
        catch(error) {
            console.error(`Fetch Error: ${error}`)
            setErrorMessage(`Error at fetching movies. Try again later`)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchMovies()
    }, [path])

    return {errorMessage, isLoading, movieData}
}