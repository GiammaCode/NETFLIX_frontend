import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"; // Hooks for handling route parameters and links
import "../styles/FilmDetails.css"; // Custom styling for the FilmDetails component
import Navbar from "../components/Navbar.jsx"; // Navbar component for the film details page
import {getRecommendedFilms, getViewedFilms, postRecommendedFilms} from "../services/useService.js"; // Service for posting recommended films
import {postViewFilms} from "../services/useService.js";
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
                const response = await fetch(`http://content-service:8080/films/${filmId}`); // Fetch film data
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
                const response = await fetch(`http://content-service:8080/films/${filmId}/actors`); // Fetch actors associated with the film
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

    const handlePlay = async () => {
        const randomNumber = Math.floor(Math.random() * 100) + 1; // Genera un numero casuale tra 1 e 100
        const userData = {
            filmId: parseInt(filmId,10),
            userId: parseInt(userId, 10),
            profileId: parseInt(profileId, 10),
            timesOFTheFilm: randomNumber // Aggiungi il numero casuale all'oggetto
        };

        try {
            const viewedList = await getViewedFilms(userId, profileId);

            // Check if the film is already in the viewed list
            const isAlreadyViewed = viewedList.some((view) => view.filmId === parseInt(filmId,10)
            );

            if (!isAlreadyViewed) {
                await postViewFilms(userId, profileId, userData); // Call the API
                alert("The film is start now is in the view list."); // Messaggio di errore

            }else {
                alert("The film is start but was already in the view list."); // Messaggio di errore
            }

        } catch (err) {
            console.error("Failed to start film:", err); // Log in caso di errore
            alert("Error starting the film."); // Messaggio di errore
        }
    };

    /**
     * Handles adding the film to the recommended list by calling postRecommendedFilms.
     */
    const handleAddToRecommendeds = async () => {
        const userData = {
            filmId: parseInt(filmId, 10),
            userId: parseInt(userId, 10),
            profileId: parseInt(profileId, 10)
        };        try {
            const viewedList = await getRecommendedFilms(userId, profileId);

            // Check if the film is already in the viewed list
            const isAlreadyViewed = viewedList.some((view) => view.filmId === parseInt(filmId,10)
            );

            if (!isAlreadyViewed) {
                await postRecommendedFilms(userId, profileId, userData); // Call the API
                alert("Film added to recommendeds successfully!"); // Display success message

            }else {
                alert("Film already in the recommendeds!"); // Display success message

            }
        } catch (err) {
            console.error("Failed to add film to recommendeds:", err);
            alert("Error adding film to recommendeds."); // Display error message
        }
    };


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
                    <button className="play-button" onClick={handlePlay}>Play</button>
                    <div className="film-actions">
                        <button className="add-to-recommendeds" onClick={handleAddToRecommendeds}>+</button> {/* Button to add film to list */}
                        <button className="download-button">⬇</button> {/* Button to download the film */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilmDetails;
