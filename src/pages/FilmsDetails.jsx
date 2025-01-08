import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import "../styles/FilmDetails.css";
import Navbar from "../components/Navbar.jsx";

const FilmDetails = () => {
    const {filmId} = useParams(); // Ottieni l'ID del film dalla rotta
    const [film, setFilm] = useState(null);
    const [actors, setActors] = useState([]); // Stato per gli attori
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


        const fetchActors = async () => {
            try {
                const response = await fetch(`http://localhost:8080/films/${filmId}/actors`);
                if (!response.ok) {
                    throw new Error("Failed to fetch actors");
                }
                const data = await response.json();
                // Salva ID, nome e cognome degli attori
                setActors(
                    data.actors.map(actor => ({
                        id: actor.actorId,
                        name: `${actor.name.trim()} ${actor.surname.trim()}`,
                    }))
                );
            } catch (err) {
                setError(err.message);
            }
        };

        fetchActors()
        fetchFilmDetails();
    }, [filmId]);

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!film) {
        return <div>Loading...</div>; // Mostra un caricamento se i dati non sono ancora arrivati
    }

    return (
        <div>
            <Navbar/>
            <div className="film-details-container">
                <div className="film-cover">
                    <img
                        src={film.image_path || "../../public/default_film_image.png"}
                        alt={film.title}
                        className="film-cover-image"
                    />
                </div>
                <div className="film-info">
                    <h1 className="film-title">{film.title}</h1>
                    <p className="film-description">{film.description}</p>
                    <div className="film-metadata">
                        <p><strong>Year of release:</strong> {film.release_year}</p>
                        <p><strong>Rating:</strong> {film.rating}</p>
                    </div>
                    <div className="film-cast">
                        <p><strong>Cast:</strong></p>
                        <ul>
                            {actors.length > 0
                                ? actors.map(actor => (
                                    <li key={actor.id}>
                                        <Link to={`/actors/${actor.id}`}>{actor.name}</Link>
                                    </li>
                                ))
                                : "Non disponibile"}
                        </ul>
                    </div>
                    <div className="film-genres">
                        <p><strong>Film genre:</strong> {film.genre}</p>
                    </div>
                    <button className="play-button">Play</button>
                    <div className="film-actions">
                        <button className="add-to-list">+</button>
                        <button className="download-button">⬇</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilmDetails;
