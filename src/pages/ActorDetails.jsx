import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ActorDetails = () => {
    const { actorId } = useParams(); // Ottieni l'ID dell'attore dalla rotta
    const [actor, setActor] = useState(null);
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

        fetchActorDetails();
    }, [actorId]);

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!actor) {
        return <div>Loading...</div>;
    }

    return (
        <div className="actor-details-container">
            <h1>{`${actor.name} ${actor.surname}`}</h1>
            <p><strong>Data di nascita:</strong> {actor.date_of_birth}</p>
            <p><strong>Film:</strong> {actor.films}</p>
        </div>
    );
};

export default ActorDetails;
