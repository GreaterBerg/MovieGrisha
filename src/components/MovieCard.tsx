import type { CSSProperties } from 'react';
import './MovieCard.css';
import { Link } from "react-router-dom";

const MovieCard = ({ title, poster, id, actor='' }) => {
    
    const styles: CSSProperties = {
        backgroundColor: 'grey',
        backgroundImage: `url(https://image.tmdb.org/t/p/w500/${poster})`
    }

    return (
        <div className="movie-card" style={styles}>
            { poster===null ? (
                <p className="poster-null">Title: {title}. No poster</p>
            ) : null }
            
            <Link to={`/movie/${id}`} className="movie-card-hover">
                <div>
                        {actor ? (
                            <p className="character-title">Playing : {actor}</p>
                        ) : null}
                        <p className="list-title">{title}</p>

                </div>
            </Link>
        </div>
    )
}

export default MovieCard