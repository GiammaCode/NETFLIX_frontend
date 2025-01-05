import React, { useEffect, useState } from "react";
import { getFilms } from "../services/useService";
import "../styles/Components.css";

const Films = () => {
    const [films, setFilms] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFilms = async () => {
            try {
                const data = await getFilms();
                setFilms(data);
            } catch (err) {
                setError("Failed to fetch films");
            }
        };

        fetchFilms();
    }, []);

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="films-container">
            <h1 className="title">All films</h1>
            <div className="films-row">
                {films.map((film) => (
                    <div className="film-card" key={film.filmId}>
                        <img
                            src="../../public/default_film_image.png" // Immagine di default
                            alt={film.title}
                            className="film-poster"
                        />
                        <div className="film-info">
                            <h2>{film.title}</h2>
                            <p>{film.genre} | {film.release_year}</p>
                            <p>
                                A captivating story that explores thrilling adventures and unforgettable moments.
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Films;
