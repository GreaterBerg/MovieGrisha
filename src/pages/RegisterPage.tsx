import './AuthorizationPage.css'
import React, { useState } from "react";
import { Link } from "react-router-dom";


const RegisterPage = () => {
    const [username, setUsername] = useState('')

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault()
    }    

    return (
        <div className="container">
            <h1 className="logo">The Movie Tracker</h1>
            <form onSubmit={handleSubmit} className="form">
                <input type="text" placeholder="Username" onChange={(e) => {setUsername(e.target.value)}} />
                <input type="email" placeholder="Email Address" />
                <input type="password" placeholder="Password" />
                <input type="password" placeholder="Confirm Password" />

                <button type="submit">Login</button>
                <Link to={"/login"}>Login, if you already have an account</Link>
            </form>
        </div>
    )
}

export default RegisterPage;