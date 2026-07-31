import MovieCard from "../components/MovieCard";
import NavBar from "../components/NavBar";
import './HomePage.css'
import { useFetch } from "../hooks/useFetch.js";
import Footer from "../components/Footer";
import MovieCardSkeleton from "../components/MovieCardSkeleton.js";

const HomePage = () => {

    const { errorMessage, isLoading, movieData } = useFetch("https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1", "results")

    const { errorMessage: errorTopRated, isLoading: loadingTopRated, movieData: topRatedData } = useFetch("https://api.themoviedb.org/3/movie/top_rated?page=2", "results")
    
    const { errorMessage: upcomingError, isLoading: upcomingLoading, movieData: upcomingData } = useFetch(`https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1`, 'results')

    return (
        <>
            <NavBar />
            <section className="upcoming-section">
                <h2 style={{margin: "1rem"}}>Upcoming Movies</h2>
                <div className="upcoming">
                        {upcomingLoading ? (
                            <div className="upcoming-list">
                                {Array.from({ length: 10 }).map((i:number) => <MovieCardSkeleton key={i} />)}
                            </div>
                        ) : upcomingError ? (
                            <p className="error-text">{errorTopRated}</p>
                        ) : (
                            <div className="upcoming-list">
                                {upcomingData.map((movie) => {
                                    return (<MovieCard key={movie.id} poster={movie.poster_path} title={movie.title} id={movie.id}/>) 
                                }
                                )}
                            </div>
                        )}
                        {upcomingLoading ? (
                            null
                        ) : upcomingError ? (
                            null
                        ) : (
                            <div aria-hidden className="upcoming-list">
                                {upcomingData.map((movie) => {
                                    return (<MovieCard key={movie.id} poster={movie.poster_path} title={movie.title} id={movie.id}/>) 
                                }
                                )}
                            </div>
                        )}
                </div>
            </section>
            <section className="top-rated">
                <h2 style={{margin: '1rem'}}>Top Rated Movies</h2>
                {loadingTopRated ? (
                    <ul className="section-list">
                        {Array.from({ length: 20 }).map((i:number) => <MovieCardSkeleton key={i} />)}
                    </ul>
                ) : errorTopRated ? (
                    <p className="error-text">{errorTopRated}</p>
                ) : (
                    <ul className="section-list top-rated-list">
                        {topRatedData.map((movie) => {
                            return (<MovieCard key={movie.id} poster={movie.poster_path} title={movie.title} id={movie.id}/>) 
                        }
                        )}
                    </ul>
                )}
            </section>
            <section className="now-playing">
                <h2 style={{margin: '1rem'}}>Now Playing in Theatres</h2>
                {isLoading ? (
                    <ul className="section-list">
                        {Array.from({ length: 20 }).map((i:number) => <MovieCardSkeleton key={i} />)}
                    </ul>
                ) : errorMessage ? (
                    <p className="error-text">{errorMessage}</p>
                ) : (
                    <ul className="section-list now-playing-list">
                        {movieData.map((movie) => {
                            return (<MovieCard key={movie.id} poster={movie.poster_path} title={movie.title} id={movie.id}/>) 
                        }
                        )}
                    </ul>
                )}
            </section>
            <Footer />
        </>
    )
}

export default HomePage