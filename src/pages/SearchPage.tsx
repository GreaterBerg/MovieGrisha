import { useState } from 'react'
import MovieCard from '../components/MovieCard';
import './SearchPage.css'
import NavBar from '../components/NavBar';
import { useFetch } from '../hooks/useFetch';
import useDebounce from '../hooks/useDebounce';
import MovieCardSkeleton from '../components/MovieCardSkeleton';
import Footer from '../components/Footer';

const SearchPage = () => {

    const [searchMovie, setSearchMovie] = useState('');

    const debouncedSearchMovie = useDebounce(searchMovie, 500)

    const { errorMessage, isLoading, movieData } = useFetch(debouncedSearchMovie ? `https://api.themoviedb.org/3/search/movie?query=${debouncedSearchMovie}` : `https://api.themoviedb.org/3/trending/movie/day?language=en-US`, "results")

    return (
        <>
            <NavBar isSearch={true}/>
            <div className="search-container">
                <input
                    autoFocus={true}
                    type='text'
                    placeholder='Search'
                    className='search'
                    value={searchMovie}
                    onChange={e => (setSearchMovie(e.target.value))}
                />
            </div>
            <section className="popular">
                {isLoading ? (
                    <div className="popular-list">
                        {Array.from({ length: 20 }).map((i:number) => <MovieCardSkeleton key={i} />)}
                    </div>
                ) : errorMessage ? (
                    <p className="error">{errorMessage}</p>
                ) : (
                    <ul className="popular-list">
                        {movieData.map((movie) => (
                            <MovieCard key={movie.id} title={movie.title} poster={movie.poster_path} id={movie.id}/>
                        ))}
                    </ul>
                )}

            </section>
            <Footer />
        </>
  )
}

export default SearchPage
