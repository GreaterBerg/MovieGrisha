import type { CSSProperties } from "react"
import './ActorCard.css'

const ActorCard = ({name, biography, poster}) => {

    const styles: CSSProperties = {
        backgroundColor: 'grey',
        backgroundImage: `url(https://image.tmdb.org/t/p/w500/${poster})`
    }
    
    return (
        <div className="actor-card-container">
            <div className="actor-card" style={styles}>
                { poster===null ? (
                    <p className="poster-null">Title: {name}. No Image</p>
                ) : null }
            </div>
            <div className="biography-container">
                <h2 className="actor-name">{name}</h2>
                <p className="biography">{biography}</p>
            </div>
        </div>
    )
}

export default ActorCard