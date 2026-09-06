import type { CSSProperties } from 'react';
import './MovieCard.css';
import { Link } from "react-router-dom";
import { Star } from 'lucide-react';

const MovieCard = ({ title, poster, id, actor='', rating }) => {
    
    const styles: CSSProperties = {
        backgroundColor: 'grey',
        backgroundImage: `url(https://image.tmdb.org/t/p/w500/${poster})`
    }

    return (
        <Link to={`/movie/${id}`} className="movie-card" style={styles}>
            <p className="movie-card-rating">
                <p className="movie-card-rating-text"><Star color="var(--text)" fill="var(--text)" size={16}/> {rating} </p>
            </p>

            { poster===null ? (
                <p className="poster-null">Title: {title}. No poster</p>
            ) : null }
            
            <div  className="movie-card-hover">
                <div>
                        {actor ? (
                            <p className="character-title">Playing : {actor}</p>
                        ) : null}
                        <p className="list-title">{title}</p>

                </div>
            </div>
        </Link>
    )
}

export default MovieCard