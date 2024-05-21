import React from "react"
import "./Home.css"
import { Link } from "react-router-dom";

export default function Home() {

    return (
        <>
            <div className="home">
                <img className="blacksmith-bg" src="blacksmith-bg.jpg" alt=""/>
                <title className="songsmith-title">Songsmith</title>
                <h1 className="songsmith-subtitle">Forge breathtaking collections of songs.</h1>
                <Link className="login-button" to="/login">
                    Login
                </Link>
                
            </div>
        </>
    )
}