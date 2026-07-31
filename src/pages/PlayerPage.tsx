import { useEffect, useState } from "react";
import MoviePlayer from "../components/MoviePlayer";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`
    }
}


const PlayerPage = () => {
    const { movieId }  = useParams()
   
    useEffect(() => {
        const container = document.getElementById("kinobd");
        console.log("container on cleanup:", container);
        const script = document.createElement("script");
        script.src = "//kinobd.net/js/player_.js";
        // script.async = true

        document.body.appendChild(script)

        return () => {
            script.remove()

            if (container) {
                container.innerHTML = ""
            }
        }
    }, [movieId])

    const [errorMessage, setErrorMessage] = useState('');
    const [movieImdb, setMovieImdb] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchMovies = async () => {

        setIsLoading(true);
        setErrorMessage('')

        try {
            const endpoint = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;

            const response = await fetch(endpoint, API_OPTIONS);

            if (!response.ok) {
                throw new Error("Failed fatching");
            }

            const data = await response.json()

            if (data.Response === "false") {
                setErrorMessage(data.error || "Error fetch");
                setMovieImdb([])
                return
            }

            setMovieImdb(data.imdb_id)
            console.log(data)
        }
        catch(error) {
            console.error(`Fetch Error: ${error}`)
            setErrorMessage(`Error at fetching movie. Try again later`)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchMovies()
    }, [])

    return (
        <>
            {isLoading ? (
                <p className="loading-text">Loading...</p>
            ) : errorMessage ? (
                <p className="error-text">{errorMessage}</p>
            ) : (
                <>
                    <MoviePlayer movieImdbId={movieImdb} />
                    <BackButton isLink={true} linkPath={`/movie/${movieId}/`}/>
                </>
            )}
            
        </>
    )
}

export default PlayerPage;