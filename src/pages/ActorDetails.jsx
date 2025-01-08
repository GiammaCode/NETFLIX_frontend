import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/ActorDetails.css";
import Navbar from "../components/Navbar.jsx"; // Custom Navbar component for navigation

/**
 * ActorDetails component displays detailed information about a specific actor, including their personal details and the films they have been in.
 * It fetches actor information and the list of films the actor has starred in from an API, and displays them in a styled layout.
 * The component also handles loading states and errors that may occur during data fetching.
 *
 * @component
 */
const ActorDetails = () => {
    // Extracts the actorId from the URL parameters
    const { actorId } = useParams(); // Retrieves the actor's ID from the URL
    const [actor, setActor] = useState(null); // State to store actor details
    const [films, setFilms] = useState([]); // State to store list of films
    const [error, setError] = useState(null); // State to store error messages if fetching fails

    /**
     * useEffect hook that fetches the actor's details and films when the component mounts or when actorId changes.
     * The hook triggers two asynchronous functions to fetch actor details and their films.
     */
    useEffect(() => {
        const fetchActorDetails = async () => {
            try {
                // Fetch actor details using actorId
                const response = await fetch(`http://localhost:8080/actors/${actorId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch actor details");
                }
                const data = await response.json();
                setActor(data); // Store actor data in state
            } catch (err) {
                setError(err.message); // Set error if fetching fails
            }
        };

        const fetchFilmsByActor = async () => {
            try {
                // Fetch films related to the actor
                const response = await fetch(`http://localhost:8080/actors/${actorId}/films`);
                if (!response.ok) {
                    throw new Error("Failed to fetch films by actor");
                }
                const data = await response.json();
                setFilms(data.films); // Store the list of films in state
            } catch (err) {
                setError(err.message); // Set error if fetching fails
            }
        };

        fetchActorDetails(); // Fetch actor details
        fetchFilmsByActor(); // Fetch films by actor
    }, [actorId]); // The hook will rerun if the actorId changes

    /**
     * Conditional rendering:
     * - If there's an error, display the error message.
     * - If the actor data is not loaded, display "Loading...".
     * - Otherwise, render the actor details and their films.
     */
    if (error) {
        return <div className="error">{error}</div>; // Show error message if any
    }

    if (!actor) {
        return <div>Loading...</div>; // Show loading message if actor data is not yet fetched
    }

    return (
        <div>
            <Navbar /> {/* Renders the Navbar component for navigation */}
            <div className="actor-details-container">
                {/* Actor's Header (Name and Image) */}
                <div className="actor-header">
                    <img
                        src="/actor_default.png" // Default image for actor (fallback image)
                        alt={`${actor.name} ${actor.surname}`}
                        className="actor-image"
                    />
                    <h1>{`${actor.name} ${actor.surname}`}</h1>
                </div>

                {/* Actor's Personal Details */}
                <div>
                    <p><strong>Date of birth:</strong> {actor.date_of_birth}</p>
                </div>

                {/* Actor's Films Section */}
                <div className="actor-films">
                    <h2>Films</h2>
                    {films.length > 0 ? (
                        <ul>
                            {/* List of films the actor has starred in */}
                            {films.map((film) => (
                                <li key={film.filmId} className="film-item">
                                    <img
                                        src={film.image_path || "../../public/default_film_image.png"} // Fallback image for films
                                        alt={film.title}
                                        className="film-image"
                                    />
                                    <div className="film-details">
                                        <h3>{film.title}</h3>
                                        <p>{film.description}</p>
                                        <p><strong>Genre:</strong> {film.genre}</p>
                                        <p><strong>Years of release:</strong> {film.release_year}</p>
                                        <p><strong>Rating:</strong> {film.rating}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>There are no movies available</p> // Message when no films are available
                    )}
                </div>
            </div>
        </div>
    );
};

export default ActorDetails;
