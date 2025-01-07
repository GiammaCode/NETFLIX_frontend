import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/Films.css";

const FilmDetails = () => {
    const { filmId } = useParams(); // Ottieni l'ID del film dalla rotta
    const [film, setFilm] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFilmDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8080/films/${filmId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch film details");
                }
                const data = await response.json();
                setFilm(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchFilmDetails();
    }, [filmId]);

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!film) {
        return <div>Loading...</div>; // Mostra un caricamento se i dati non sono ancora arrivati
    }

    return (
        <div className="film-details-container">
            <div className="film-poster">
                <img src={film.poster || "../../public/default_film_image.png"} alt={film.title} />
            </div>
            <div className="film-info">
                <h1>{film.title}</h1>
                <p>{film.description}</p>
                <p><strong>Genre:</strong> {film.genre}</p>
                <p><strong>Release Year:</strong> {film.release_year}</p>
                <p><strong>Actors:</strong> da aggiungere </p>
                <button className="play-button">Play</button>
            </div>
        </div>
    );
};

export default FilmDetails;
