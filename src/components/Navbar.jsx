import React, { useState } from "react";
import {Link, useParams} from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const { userId } = useParams(); // Ottieni l'ID del film dalla rotta
    const { profileId } = useParams(); // Ottieni l'ID del film dalla rotta

    const handleSearchSubmit = (event) => {
        event.preventDefault(); // Previene il ricaricamento della pagina
        console.log("Ricerca per:", searchQuery); // Puoi sostituirlo con il tuo metodo di ricerca
        setSearchQuery(""); // Resetta il campo di input
    };

    return (
        <nav className="navbar">
            {/* Logo Netflix */}
            <div className="navbar-logo">
                <Link to={`/users/${userId}/profiles/${profileId}/Home`}>
                    <img
                        src="/logo_netflix.png"
                        alt="Netflix Logo"
                        className="logo"
                    />
                </Link>
            </div>

            {/* Collegamenti */}
            <ul className="navbar-links">
                <li>
                    <Link to={`/users/${userId}/profiles/${profileId}/Home`}>Home</Link>
                </li>
                <li>
                    <Link to={`/users/${userId}/profiles/${profileId}/series`}>Series</Link>
                </li>
                <li>
                    <Link to={`/users/${userId}/profiles/${profileId}/films`}>Films</Link>
                </li>
                <li>
                    <Link to={`/users/${userId}/profiles/${profileId}/new-popular`}>News & Popular</Link>
                </li>
                <li>
                    <Link to={`/users/${userId}/profiles/${profileId}/My-list`}>My list</Link>
                </li>
            </ul>

            {/* Barra di ricerca */}
            <div className="navbar-icons">
                <form className="navbar-search" onSubmit={handleSearchSubmit}>
                    <input
                        type="text"
                        placeholder="Cerca"
                        className="search-input"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </form>

                {/* Icone notifiche e account */}
                <div className="navbar-icons-right">
                    <Link to={`/users/${userId}/profiles/${profileId}/profileSettings`}>
                        <img
                            src="/Profile-default.png"
                            alt="Account"
                            className="account-icon"
                        />
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
