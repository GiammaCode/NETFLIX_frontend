import React, { useState, useEffect } from "react";
import {getProfiles} from "../services/useService.js";
import {useNavigate, useParams} from "react-router-dom";
import "../styles/Profile.css"
function ProfileSelection() {
    const { userId } = useParams(); // Ottieni l'ID del film dalla rotta
    const [profiles, setProfiles] = useState([]); // Stato per i profili
    const [error, setError] = useState("");
    const navigate = useNavigate(); // Per il reindirizzamento

    // Recupera i profili quando il componente viene caricato
    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const fetchedProfiles = await getProfiles(userId);
                setProfiles(fetchedProfiles);
            } catch (err) {
                setError("Errore durante il recupero dei profili.");
            }
        };

        fetchProfiles();
    }, [userId]);

    const handleProfileClick = (profileId) => {
        alert(`Profilo selezionato: ${profileId}`);
        // Puoi aggiungere la logica per salvare il profilo selezionato
        // o reindirizzare a un'altra schermata
        navigate(`/users/${userId}/profiles/${profileId}/Home`); // Redirezione esempio
    };

    return (
        <div className="profile-selection">
            <h1 className="text-center text-light">Who's watching?</h1>
            {error && <p className="error">{error}</p>}
            <div className="profiles-container d-flex justify-content-center flex-wrap">
                {profiles.map((profile) => (
                    <div
                        key={profile.profileId}
                        className="profile-card text-center"
                        onClick={() => handleProfileClick(profile.nickname)}
                    >
                        <img
                            src={profile.profileImage}
                            className="profile-avatar"
                        />
                        <h3 className="text-light">{profile.nickname}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProfileSelection;
