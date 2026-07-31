import { useState } from "react";
import './AuthorizationPage.css'
import { Link } from "react-router-dom";

const LoginPage = () => {
    
    const [username, setUsername] = useState('')

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault()
    }

    return (
        <div className="container">
            <h1 className="logo">The Movie Tracker</h1>
            <form onSubmit={handleSubmit} className="form">
                <input type="text" placeholder="Username" onChange={(e) => {setUsername(e.target.value)}} />
                <input type="password" placeholder="Password" />
                <button type="submit">Login</button>
                <Link to={"/signup"}>SignUp, if you don't have an account</Link>
            </form>
            <Link to={"/"}>MainPage</Link>
        </div>
    )
}

export default LoginPage;