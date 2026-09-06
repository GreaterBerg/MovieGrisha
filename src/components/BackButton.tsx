import { useNavigate } from "react-router-dom"
import './BackButton.css'
import { ArrowLeft } from "lucide-react"

const BackButton = ({ isLink=false, linkPath='' }) => {
    const navigate = useNavigate()
    return (
        <>
            { isLink ? (
                <a href={linkPath} className="back-button"> <ArrowLeft />Go back</a>
            ) : (
                <button onClick={() => navigate(-1)} className="back-button"><ArrowLeft />Go back</button>
            )}
        </>
    )
}

export default BackButton