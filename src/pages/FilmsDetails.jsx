import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/FilmDetails.css";

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
            <div className="film-cover">
                <img
                    src={film.coverImage || "../../public/default_film_image.png"}
                    alt={film.title}
                    className="film-cover-image"
                />
            </div>
            <div className="film-info">
                <h1 className="film-title">{film.title}</h1>
                <p className="film-description">{film.description}</p>
                <div className="film-metadata">
                    <p><strong>Anno:</strong> {film.release_year}</p>
                    <p><strong>Valutazione:</strong> {film.rating}</p>
                </div>
                <div className="film-cast">
                    <p><strong>Cast:</strong> {film.actors || "Non disponibile"}</p>
                </div>
                <div className="film-genres">
                    <p><strong>Generi:</strong> {film.genre}</p>
                </div>
                <button className="play-button">Play</button>
                <div className="film-actions">
                    <button className="add-to-list">+</button>
                    <button className="download-button">⬇</button>
                </div>
            </div>
        </div>
    );
};

export default FilmDetails;
