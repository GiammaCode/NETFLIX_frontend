import React, { useEffect, useState } from "react";
import { getFilms } from "../services/useService"; // Function to fetch films data
import "../styles/Films.css"; // Custom styling for the Films component
import { useNavigate, useParams } from "react-router-dom"; // Hooks for navigation and accessing route parameters
import Navbar from "../components/Navbar.jsx"; // Import the Navbar component for the films page

/**
 * Films component displays a list of films fetched from the backend.
 * Each film is displayed as a card with an image, title, genre, release year, and a short description.
 * Clicking on a film card navigates to the detailed page for that film.
 *
 * @component
 */
const Films = () => {
    const [films, setFilms] = useState([]); // State to store the list of films
    const { userId } = useParams(); // Retrieves userId from the URL
    const { profileId } = useParams(); // Retrieves profileId from the URL
    const [error, setError] = useState(null); // State to store error messages (if any)
    const navigate = useNavigate(); // Hook for navigating to different routes

    // Fetch films from the backend when the component is mounted
    useEffect(() => {
        const fetchFilms = async () => {
            try {
                const data = await getFilms(); // Fetch films data from the backend
                setFilms(data); // Store the fetched films in the state
            } catch (err) {
                setError("Failed to fetch films"); // Handle error if fetching fails
            }
        };

        fetchFilms(); // Call the function to fetch films data
    }, []); // Empty dependency array ensures this effect runs only once, when the component mounts

    // If an error occurred while fetching films, display an error message
    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div>
            <Navbar /> {/* Render the Navbar component */}
            <div className="films-container">
                <h1 className="title">Films</h1> {/* Page title */}
                <div className="films-row">
                    {films.map((film) => (
                        // Render a film card for each film in the films list
                        <div
                            className="film-card"
                            key={film.filmId}
                            onClick={() => navigate(`/users/${userId}/profiles/${profileId}/films/${film.filmId}`)} // Navigate to the film details page on click
                        >
                            <img
                                src={film.image_path} // Film poster image
                                alt={film.title} // Film title as alt text for accessibility
                                className="film-poster" // Apply styling to the poster image
                            />
                            <div className="film-info">
                                <h2>{film.title}</h2> {/* Film title */}
                                <p>{film.genre} | {film.release_year}</p> {/* Film genre and release year */}
                                <p>
                                    {film.description.length > 100
                                        ? `${film.description.substring(0, 100)}...` // Show a truncated description if it exceeds 100 characters
                                        : film.description}
                                </p> {/* Film description */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Films;
