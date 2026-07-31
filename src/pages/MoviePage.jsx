import { Link, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import './MoviePage.css';
import { useFetch } from "../hooks/useFetch";
import Footer from "../components/Footer"

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
            {/* <div className="main-container">
                <div className="title-score-container">
                    <div className="title-genres">
                        {isLoading ? null : (
                            <p className="title-date">{movieData.release_date?.slice(0,4)}</p>)}

                        <h1 className="title-movie">{movieData.title}</h1>
                        { isLoading ? (
                            <p className="loading-text">loading...</p>
                        ) : errorMessage ? (
                            <p className="error-text">{errorMessage}</p>
                        ) : (
                            <ul className="genres-container">
                                {movieData.genres?.map( (genre) => (
                                    <p className="genre" key={genre.id}>{genre.name}</p>
                                ))}
                            </ul>
                        ) }

                    </div>
                    <span className="title-score"><span className="score">{movieData.vote_average}</span> /10</span>
                </div>
                <div className="movie-details-container">
                        <div className="movie-poster" style={styles}>{null}</div>
                        <div className="more-details-container">
                            <div className="overview-movie">
                                <div className="director-container">
                                    <p className="side-title">Director:</p>
                                    {crewLoading ? (
                                        <p className="loading-text" style={{margin: '1rem', marginTop: '0'}}>Loading...</p>
                                    ) : crewErrorMessage ? (
                                        <p className="error-text">{crewErrorMessage}</p>
                                    ) : 
                                        crew?.map((dude) => {
                                            if (dude.job === "Director") {
                                                return (
                                                    <p key={dude.id} className="director">{dude.name}</p>
                                                )
                                            }
                                        }
                                    )}
                                </div>
                                <p className="tagline">{movieData.tagline}</p>
                                <p className="side-title">About the Movie</p>
                                <p className="overview">{movieData.overview}</p>
                            </div>
                            <div className="crew-container">
                                <div className="actors-container">
                                    <p className="side-title">Actors:</p>
                                    {crewLoading ? (
                                        <p className="loading-text" style={{margin: '1rem', marginTop: '0'}}>Loading...</p>
                                    ) : crewErrorMessage ? (
                                        <p className="error-text">{crewErrorMessage}</p>
                                    ) : (
                                        cast?.slice(0,5).map((dude) => (
                                            <Link to={`/actor/${dude.id}`} className="Link">
                                                <span key={dude.id} className="actor">{dude.name} <span className="actor-character">{dude.character}</span></span>
                                            </Link>
                                        ))
                                    )}
                                </div>
                                <div className="companies-container">
                                    <p className="side-title">Production:</p>
                                    { isLoading ? (
                                        <p className="loading-text">loading...</p>
                                    ) : errorMessage ? (
                                        <p className="error-text">{errorMessage}</p>
                                    ) : (movieData.production_companies?.slice(0,5).map( (company) => (
                                            <p className="company" key={company.id}>{company.name}</p>
                                        ))) 
                                    }
                                </div>
                            </div>
                            <div className="buttons-container">
                                <Link to={`/movie/${movieId}/player`} className="movie-btn">Watch</Link>
                                <Link to={`/movie/${movieId}/images`} className="movie-btn">Images</Link>
                            </div>
                        </div>
                </div>
            </div> */}
            <div className="page-container">
                <div className="all-overview-container">
                    <div className="second-info-container">
                        <div className="trailer-container sharp" style={styleTrailer}>
                            {/* <p className="trailer-btn">Play Trailer</p> */}
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

                                    <span>{movieData.vote_average}<span>/10</span></span>
                                    
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
                                {/* <div className="bubble-container time borderer sharp">
                                    <p className="runtime">{movieData.runtime}</p>
                                    <p className="upcase">minutes runtime</p>
                                </div> */}
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