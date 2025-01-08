import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/Navbar.css";
import { getProfile } from "../services/useService.js";

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [profileImage, setProfileImage] = useState(""); // Stato per immagine del profilo
    const { userId } = useParams(); // Ottieni l'ID dell'utente dalla rotta
    const { profileId } = useParams(); // Ottieni l'ID del profilo dalla rotta

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profileData = await getProfile(userId, profileId);
                if (profileData && profileData.profileImage) {
                    setProfileImage(profileData.profileImage); // Imposta l'immagine del profilo
                }
            } catch (error) {
                console.error("Errore nel recupero del profilo:", error);
            }
        };

        fetchProfile();
    }, [userId, profileId]); // L'effetto si attiva quando userId o profileId cambia

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
                    <span className="navbar-disabled">Series</span>
                </li>
                <li>
                    <Link to={`/users/${userId}/profiles/${profileId}/films`}>Films</Link>
                </li>
                <li>
                    <span className="navbar-disabled">News & Popular</span>
                </li>
                <li>
                    <span className="navbar-disabled">My List</span>
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
                            src={profileImage}
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
