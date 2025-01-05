import React from "react";
import { Link } from "react-router-dom";
import "../styles/Components.css";

const Navbar = () => {
    return (
        <nav className="navbar">
            {/* Logo Netflix */}
            <div className="navbar-logo">
                <Link to="/">
                    <img
                        src="../../public/logo_netflix.png" // Logo Netflix
                        alt="Netflix Logo"
                        className="logo"
                    />
                </Link>
            </div>

            {/* Collegamenti */}
            <ul className="navbar-links">
                <li>
                    <Link to="/films">Films</Link>
                </li>
            </ul>

            {/* Barra di ricerca */}
            <div className="navbar-search">
                <input
                    type="text"
                    placeholder="Search"
                    className="search-input"
                />
                <button className="search-button">🔍</button>
            </div>

            {/* Bottone My Account */}
            <div className="navbar-account">
                <Link to="/profile">
                    <button className="account-button">My Account</button>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
