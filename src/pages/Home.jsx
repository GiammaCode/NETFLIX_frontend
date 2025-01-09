import React, { useEffect, useState } from "react";
import {getRecommendedFilms, getViewedFilms} from "../services/useService"; // Import the new service
import { useParams, useNavigate } from "react-router-dom"; // Import hooks for routing
import Navbar from "../components/Navbar.jsx"; // Import Navbar

/**
 * Home component displays viewed films fetched from the backend.
 *
 * @component
 */
const Home = () => {
    const { userId, profileId } = useParams(); // Retrieve userId and profileId from the route
    const [viewedFilms, setViewedFilms] = useState([]); // State for viewed films
    const [recommendedFilms, setRecommendedFilms] = useState([]); // State for viewed films
    const [error, setError] = useState(null); // State for errors
    const navigate = useNavigate(); // Navigation hook

    useEffect(() => {
        const fetchViewedFilms = async () => {
            try {
                const data = await getViewedFilms(userId, profileId); // Fetch viewed films
                setViewedFilms(data); // Update state
            } catch (err) {
                setError("Failed to fetch viewed films"); // Handle errors
            }
        };
        const fetchRecommendedFilms = async () => {
            try {
                const data = await getRecommendedFilms(userId, profileId); // Fetch viewed films
                setRecommendedFilms(data); // Update state
            } catch (err) {
                setError("Failed to fetch recommended films"); // Handle errors
            }
        };

        fetchViewedFilms(); // Fetch films on component mount
        fetchRecommendedFilms()
    }, [userId, profileId]);

    if (error) {
        return <div className="error">{error}</div>; // Show error message
    }

    return (
        <div>
            <Navbar /> {/* Navbar at the top */}
            <div className="home-container">
                <h1 className="title">Continue Watching</h1>
                <div className="films-row">
                    {viewedFilms.length > 0 ? (
                        viewedFilms.map((film) => (
                            <div
                                className="film-card"
                                key={film.filmId}
                                onClick={() => navigate(`/films/${film.filmId}`)}
                            >
                                <img
                                    src={film.filmDetails.image_path || "/default_film_image.png"}
                                    alt={film.filmDetails.title}
                                    className="film-poster"
                                />
                                <div className="film-info">
                                    <h2>{film.filmDetails.title}</h2>
                                    <p>{film.filmDetails.genre} | {film.filmDetails.release_year}</p>
                                    <p>
                                        {film.filmDetails.description.length > 100
                                            ? `${film.filmDetails.description.substring(0, 100)}...`
                                            : film.filmDetails.description}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No films found.</p>
                    )}
                </div>
                <h1 className="title">Recommended for you</h1>
                <div className="films-row">
                    {recommendedFilms.length > 0 ? (
                        recommendedFilms.map((film) => (
                            <div
                                className="film-card"
                                key={film.filmId}
                                onClick={() => navigate(`/films/${film.filmId}`)}
                            >
                                <img
                                    src={film.filmDetails.image_path || "/default_film_image.png"}
                                    alt={film.filmDetails.title}
                                    className="film-poster"
                                />
                                <div className="film-info">
                                    <h2>{film.filmDetails.title}</h2>
                                    <p>{film.filmDetails.genre} | {film.filmDetails.release_year}</p>
                                    <p>
                                        {film.filmDetails.description.length > 100
                                            ? `${film.filmDetails.description.substring(0, 100)}...`
                                            : film.filmDetails.description}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No films found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
