import { useParams } from "react-router-dom"
import { useFetch } from "../hooks/useFetch.js"
import ActorCard from "../components/ActorCard.js"
import MovieCard from "../components/MovieCard.js"
import BackButton from "../components/BackButton.js"
import NavBar from "../components/NavBar.js"

const ActorPage = () => {
    
    const { actorId } = useParams()

    const {errorMessage: detailsError, isLoading: detailsLoading, movieData: detailsData } = useFetch(`https://api.themoviedb.org/3/person/${actorId}`)
    const {errorMessage: moviesError, isLoading: MoviesLoading, movieData: MoviesData} = useFetch(`https://api.themoviedb.org/3/person/${actorId}/movie_credits`, "cast");
    
    return (
        <div className="actor-page-container">
            <NavBar/>
            <BackButton />
            <ActorCard name={detailsData.name} biography={detailsData.biography} poster={detailsData.profile_path} />
            <section className="actor-movies-section">
                <h2 style={{margin: "1rem"}}>Played In:</h2>
                {MoviesLoading ? (
                    <p className="loading-text" style={{margin: '1rem', marginTop: '0'}}>Loading...</p>
                ) : moviesError ? (
                    <p className="error-text">{moviesError}</p>
                ) : (
                    <ul className="section-list">
                        {MoviesData.map((movie) => {
                            return (<MovieCard key={movie.id} poster={movie.poster_path} title={movie.title} id={movie.id} actor={movie.character}/>) 
                        }
                        )}
                    </ul>
                )}
            </section>
        </div>
    )
}

export default ActorPage