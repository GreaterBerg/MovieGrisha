import { Link, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import './MoviePage.css';
import { useFetch } from "../hooks/useFetch";

const MoviePage = () => {
    const { movieId } = useParams()

    const { errorMessage, isLoading, movieData } = useFetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, "")

    const { errorMessage: crewErrorMessage, isLoading: crewLoading, movieData: crewData } = useFetch(`https://api.themoviedb.org/3/movie/${movieId}/credits`, "")
    
    const { errorMessage: imageErrorMessage, isLoading: imageLoading, movieData: imageData } = useFetch(`https://api.themoviedb.org/3/movie/${movieId}/images`, 'backdrops')

    const { errorMessage: errorVideo, isLoading: loadingVideo, movieData: videoData } = useFetch(`https://api.themoviedb.org/3/movie/${movieId}/videos`, "results")

    let cast, crew
    if (!crewLoading) {
        cast = crewData.cast
        crew = crewData.crew
    }

    const styleTrailer = {
        backgroundImage : `url(https://image.tmdb.org/t/p/w500/${movieData.backdrop_path})`,
    }
    const styleMovie = {
        backgroundImage : `url(https://image.tmdb.org/t/p/original/${imageData[2]?.file_path})`,
    }

    const director = crew?.find((dude) => dude.job === "Director")
    const trailer = videoData?.find((video) => video.type === "Trailer")
    const officialTrailer = videoData?.find((video) => video.type === "Trailer" && video.official) 

    return (
        <>
            <NavBar />
            <div className="page-container">
                <div className="all-overview-container">
                    <div className="second-info-container">
                        <div className="trailer-container sharp" style={styleTrailer}>
                            { officialTrailer ? (
                                <a href={`https://www.youtube.com/watch?v=${officialTrailer.key}`} className="sharp trailer-btn" target="_blank">Play Trailer</a>
                            ) : trailer ? (
                                <a href={`https://www.youtube.com/watch?v=${trailer.key}`} className="sharp trailer-btn" target="_blank">Play Trailer</a>
                            ) : (
                                <p className="trailer-btn sharp">This Film doesn't have a Trailer</p>
                            ) }
                        </div>
                        <div className="rating-container">
                            <div className="rating-bubble bubble sharp">
                                <p className="rating">{movieData.vote_average === 0 ? (<p>not rated</p>) : (

                                    <span>{movieData.vote_average.toFixed(1)}<span>/10</span></span>
                                    
                                ) }</p>
                            </div>
                            <div className="year-bubble bubble sharp">
                                <p className="year">{movieData.release_date?.slice(0,4)}</p>
                            </div>
                        </div>
                    </div>
                    <div className="first-info-container sharp">
                        <div className="about-container">
                            <p className="about upcase title">about film</p>
                            <p className="film-title">{movieData.title}</p>
                            <p className="overview">{movieData.overview}</p>    
                        </div>
                        <div className="crew-container">
                            <div className="starring">
                                <p className="upcase">starring</p>
                                {crewLoading ? (
                                    <p className="loading-text" style={{margin: '1rem', marginTop: '0'}}>Loading...</p>
                                ) : crewErrorMessage ? (
                                    <p className="error-text">{crewErrorMessage}</p>
                                ) : (
                                    cast?.slice(0,5).map((dude) => (
                                        <div className="actors-container">          
                                            <Link key={dude.id}  to={`/actor/${dude.id}`} className="Link">
                                                <span key={dude.id}  className="actor">{dude.name}</span>
                                            </Link>
                                        </div>
                                    ))
                                )}
                            </div>
                            <div className="time-director-container">
                                {director && (
                                    <Link to={`/director/${director.id}`} className="bubble-container director-container borderer sharp">
                                        <img className="director-image" src={`https://image.tmdb.org/t/p/w500/${director.profile_path}`} alt="director" aria-label="director image" />
                                        <p className="upcase">director:</p>
                                        <p className="director upcase">{director.name}</p>
                                    </Link>)}
                                
                            </div>
                        </div> 
                        <div className="other-container">
                        
                        </div>
                               
                    </div>                
                </div>
                <Link to={`/movie/${movieId}/player`} className="backdrop-container sharp" style={styleMovie}>
                    <p className="watch sharp">Watch Online</p>
                </Link>
            </div>
        </>
    )
}

export default MoviePage