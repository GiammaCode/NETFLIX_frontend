import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/ActorDetails.css"; // Crea uno stile personalizzato per questo componente

const ActorDetails = () => {
    const { actorId } = useParams(); // Ottieni l'ID dell'attore dalla rotta
    const [actor, setActor] = useState(null);
    const [films, setFilms] = useState([]); // Stato per i film
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchActorDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8080/actors/${actorId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch actor details");
                }
                const data = await response.json();
                setActor(data);
            } catch (err) {
                setError(err.message);
            }
        };

        const fetchFilmsByActor = async () => {
            try {
                const response = await fetch(`http://localhost:8080/actors/${actorId}/films`);
                if (!response.ok) {
                    throw new Error("Failed to fetch films by actor");
                }
                const data = await response.json();
                setFilms(data.films); // Salva l'elenco dei film
            } catch (err) {
                setError(err.message);
            }
        };

        fetchActorDetails();
        fetchFilmsByActor();
    }, [actorId]);

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!actor) {
        return <div>Loading...</div>; // Mostra un caricamento se i dati non sono ancora arrivati
    }

    return (
        <div className="actor-details-container">
            <div className="actor-header">
                <img
                    src="../../public/actor_default.png" // Immagine di default
                    alt={`${actor.name} ${actor.surname}`}
                    className="actor-image"
                />
                <h1>{`${actor.name} ${actor.surname}`}</h1>
                <p><strong>Data di nascita:</strong> {actor.date_of_birth}</p>
            </div>
            <div className="actor-films">
                <h2>Film</h2>
                {films.length > 0 ? (
                    <ul>
                        {films.map((film) => (
                            <li key={film.filmId} className="film-item">
                                <img
                                    src={film.image_path || "../../public/default_film_image.png"} // Immagine del film
                                    alt={film.title}
                                    className="film-image"
                                />
                                <div className="film-details">
                                    <h3>{film.title}</h3>
                                    <p>{film.description}</p>
                                    <p><strong>Genere:</strong> {film.genre}</p>
                                    <p><strong>Anno:</strong> {film.release_year}</p>
                                    <p><strong>Valutazione:</strong> {film.rating}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Non ci sono film disponibili.</p>
                )}
            </div>
        </div>
    );
};

export default ActorDetails;
