import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"; // Hooks for handling route parameters and links
import "../styles/FilmDetails.css"; // Custom styling for the FilmDetails component
import Navbar from "../components/Navbar.jsx"; // Navbar component for the film details page

/**
 * FilmDetails component displays detailed information about a specific film.
 * It includes the film's title, description, release year, rating, genres, cast, and actions.
 * It also allows the user to navigate to actor details or perform actions like adding the film to a list or downloading.
 *
 * @component
 */
const FilmDetails = () => {
    const { filmId } = useParams(); // Retrieves filmId from the URL
    const [film, setFilm] = useState(null); // State for storing film data
    const { userId } = useParams(); // Retrieves userId from the URL
    const { profileId } = useParams(); // Retrieves profileId from the URL
    const [actors, setActors] = useState([]); // State for storing the list of actors
    const [error, setError] = useState(null); // State for storing any error message

    // Fetch film details and actors information when the component is mounted
    useEffect(() => {
        const fetchFilmDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8080/films/${filmId}`); // Fetch film data
                if (!response.ok) {
                    throw new Error("Failed to fetch film details");
                }
                const data = await response.json(); // Parse the response into JSON
                setFilm(data); // Store the film data in state
            } catch (err) {
                setError(err.message); // Handle errors
            }
        };

        const fetchActors = async () => {
            try {
                const response = await fetch(`http://localhost:8080/films/${filmId}/actors`); // Fetch actors associated with the film
                if (!response.ok) {
                    throw new Error("Failed to fetch actors");
                }
                const data = await response.json(); // Parse the actors' data into JSON
                // Save the actors' ID, name, and surname
                setActors(
                    data.actors.map(actor => ({
                        id: actor.actorId,
                        name: `${actor.name.trim()} ${actor.surname.trim()}`, // Concatenate first and last name
                    }))
                );
            } catch (err) {
                setError(err.message); // Handle errors
            }
        };

        fetchActors(); // Fetch actors data
        fetchFilmDetails(); // Fetch film details data
    }, [filmId]); // Effect depends on the filmId (re-fetches if filmId changes)

    // If there's an error, display it
    if (error) {
        return <div className="error">{error}</div>;
    }

    // Show a loading message while the film data is being fetched
    if (!film) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Navbar /> {/* Render the Navbar component */}
            <div className="film-details-container">
                <div className="film-cover">
                    <img
                        src={film.image_path || "/Film-default.png"} // Display film cover image, or a default one if unavailable
                        alt={film.title} // Use film title as alt text for accessibility
                        className="film-cover-image"
                    />
                </div>
                <div className="film-info">
                    <h1 className="film-title">{film.title}</h1> {/* Film title */}
                    <p className="film-description">{film.description}</p> {/* Film description */}
                    <div className="film-metadata">
                        <p><strong>Year of release:</strong> {film.release_year}</p> {/* Film release year */}
                        <p><strong>Rating:</strong> {film.rating}</p> {/* Film rating */}
                    </div>
                    <div className="film-cast">
                        <p><strong>Cast:</strong></p>
                        <ul>
                            {actors.length > 0
                                ? actors.map(actor => (
                                    // Render a list of actors as links to their respective details pages
                                    <li key={actor.id}>
                                        <Link to={`/users/${userId}/profiles/${profileId}/films/${film.filmId}/actors/${actor.id}`}>{actor.name}</Link>
                                    </li>
                                ))
                                : "Non disponibile"} {/* If no actors are available, display a message */}
                        </ul>
                    </div>
                    <div className="film-genres">
                        <p><strong>Film genre:</strong> {film.genre}</p> {/* Film genre */}
                    </div>
                    <button className="play-button">Play</button> {/* Button to play the film */}
                    <div className="film-actions">
                        <button className="add-to-list">+</button> {/* Button to add film to list */}
                        <button className="download-button">⬇</button> {/* Button to download the film */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilmDetails;
