import type { CSSProperties } from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
    const styles: CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
    
    return (
        <div style={styles}>
            <h2>404 Page Not Found</h2>
            <Link to={"/"}>
                <button>Go Home</button>
            </Link>
        </div>
    )
}

export default NotFoundPage;