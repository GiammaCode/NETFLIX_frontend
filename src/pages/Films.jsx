import React, {useEffect, useState} from "react";
import {getFilms} from "../services/useService";
import "../styles/Films.css";
import {useNavigate, useParams} from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

const Films = () => {
    const [films, setFilms] = useState([]);
    const { userId } = useParams(); // Ottieni l'ID del film dalla rotta
    const { profileId } = useParams(); // Ottieni l'ID del film dalla rotta
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Per il reindirizzamento

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
        <div>
            <Navbar/>
            <div className="films-container">
                <h1 className="title">Films</h1>
                <div className="films-row">
                    {films.map((film) => (
                        <div
                            className="film-card"
                            key={film.filmId}
                            onClick={() => navigate(`/users/${userId}/profiles/${profileId}/films/${film.filmId}`)}
                        >
                            <img
                                src={film.image_path}
                                alt={film.title}
                                className="film-poster"
                            />
                            <div className="film-info">
                                <h2>{film.title}</h2>
                                <p>{film.genre} | {film.release_year}</p>
                                <p>
                                    {film.description.length > 100
                                        ? `${film.description.substring(0, 100)}...`
                                        : film.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Films;
