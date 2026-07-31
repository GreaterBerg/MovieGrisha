import { useNavigate } from "react-router-dom"
import './BackButton.css'

const BackButton = ({ isLink=false, linkPath='' }) => {
    const navigate = useNavigate()
    return (
        <>
            { isLink ? (
                <a href={linkPath} className="back-button sharp">Back</a>
            ) : (
                <button onClick={() => navigate(-1)} className="back-button sharp" >Back</button>
            )}
        </>
    )
}

export default BackButton