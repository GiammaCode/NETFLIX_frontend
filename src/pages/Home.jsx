import React, { useEffect, useState } from "react";
import { getFilms } from "../services/useService"; // Importing the function to fetch films from the backend
import { useNavigate } from "react-router-dom"; // Importing the hook for navigation
import Navbar from "../components/Navbar.jsx"; // Importing Navbar component

/**
 * Films component displays a list of films fetched from the backend.
 * Each film is shown as a card with a title, genre, release year, and a default description.
 * Clicking on a film navigates to its detailed page.
 *
 * @component
 */
const Films = () => {
    const [films, setFilms] = useState([]); // State to store the list of films
    const [error, setError] = useState(null); // State to store error messages
    const navigate = useNavigate(); // Hook for navigation to other pages

    // Fetch the list of films when the component is mounted
    useEffect(() => {
        const fetchFilms = async () => {
            try {
                const data = await getFilms(); // Fetch the list of films
                setFilms(data); // Store the films in the state
            } catch (err) {
                setError("Failed to fetch films"); // Handle errors by setting an error message
            }
        };

        fetchFilms(); // Call the function to fetch the films
    }, []); // Empty dependency array to run this effect only once when the component mounts

    // If there's an error, display it
    if (error) {
        return <div className="error">{error}</div>; // Display the error message if fetch failed
    }

    return (
        <div>
            <Navbar /> {/* Render the Navbar component */}
            <div className="films-container">
                <h1 className="title">All films</h1> {/* Title for the films list */}
                <div className="films-row">
                    {films.map((film) => (
                        <div
                            className="film-card" // Class for styling each film card
                            key={film.filmId} // Unique key for each film card
                            onClick={() => navigate(`/films/${film.filmId}`)} // Navigate to the film details page when clicked
                        >
                            <img
                                src="../../public/default_film_image.png" // Default image for the film (placeholder image)
                                alt={film.title} // Alt text for the image
                                className="film-poster" // Styling class for the film poster image
                            />
                            <div className="film-info">
                                <h2>{film.title}</h2> {/* Film title */}
                                <p>{film.genre} | {film.release_year}</p> {/* Film genre and release year */}
                                <p>
                                    A captivating story that explores thrilling adventures and unforgettable moments.
                                </p> {/* Default film description */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Films;
