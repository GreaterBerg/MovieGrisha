import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import './MovieImages.css'
import BackButton from "../components/BackButton";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`
    }
}

const MovieImages = () => {
    const { movieId } = useParams()

    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [backdrops, setBackdrops] = useState([]);
    const [posters, setPosters] = useState([])

    const fetchMovies = async () => {

        setIsLoading(true);
        setErrorMessage('')

        try {
            const endpoint = `https://api.themoviedb.org/3/movie/${movieId}/images`;

            const response = await fetch(endpoint, API_OPTIONS);

            if (!response.ok) {
                throw new Error("Failed fatching");
            }

            const data = await response.json()

            if (data.Response === "false") {
                setErrorMessage(data.error || "Error fetch");
                setBackdrops([])
                setPosters([])
                return
            }

            setBackdrops(data.backdrops)
            setPosters(data.posters)
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
            <NavBar />
            <BackButton />
            <h3 className="front-text">Backdrops</h3>
            { isLoading ? (
                <p className="loading-text">Loading...</p>
            ) : errorMessage ? (
                <p className="error-text">Error at loading Images. Try again</p>
            ) : (
                <ul className="list-images">
                    {backdrops.map((pic) => (
                        <img key={pic.file_path} src={`https://image.tmdb.org/t/p/w500/${pic.file_path}`} alt={`backdrop ${pic.aspect_ratio}`} width={300} className="movie-image" />
                    ))}
                </ul>
            )}
            <h3 className="front-text">Posters</h3>
            { isLoading ? (
                <p className="loading-text">Loading...</p>
            ) : errorMessage ? (
                <p className="error-text">Error at loading Images. Try again</p>
            ) : (
                <ul className="list-images">
                    {posters.map((pic) => (
                        <img key={pic.file_path} src={`https://image.tmdb.org/t/p/w500/${pic.file_path}`} alt={`backdrop ${pic.aspect_ratio}`} width={300} className="movie-image" />
                    ))}
                </ul>
            )}
        </>
    )
}

export default MovieImages