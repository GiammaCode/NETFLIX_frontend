import React, { useEffect, useState } from "react";
import { getFilms } from "../services/useService";

const Films = () => {
    const [films, setFilms] = useState([]); // Stato per memorizzare i film
    const [error, setError] = useState(null); // Stato per eventuali errori

    useEffect(() => {
        const fetchFilms = async () => {
            try {
                const data = await getFilms(); // Chiamata alla funzione getFilms
                setFilms(data); // Salva i film nello stato
            } catch (err) {
                setError("Failed to fetch films"); // Gestione errori
            }
        };

        fetchFilms(); // Richiama i film al caricamento della pagina
    }, []);

    if (error) {
        return <div>Error: {error}</div>; // Mostra l'errore, se presente
    }

    return (
        <div>
            <h1>Films</h1>
            <ul>
                {films.map((film) => (
                    <li key={film.filmId}>
                        <strong>{film.title}</strong> ({film.release_year}) - {film.genre}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Films;
