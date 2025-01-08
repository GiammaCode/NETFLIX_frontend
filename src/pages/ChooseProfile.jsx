import React, { useState, useEffect } from "react";
import {getProfiles} from "../services/useService.js";
import {useNavigate, useParams} from "react-router-dom";
import "../styles/Profile.css"
import Counter from "../components/Counter.jsx";

const counterInstance = new Counter(); // Istanza condivisa della classe Counter

function ProfileSelection() {
    const { userId } = useParams(); // Ottieni l'ID del film dalla rotta
    const [profiles, setProfiles] = useState([]); // Stato per i profili
    const [error, setError] = useState("");
    const navigate = useNavigate(); // Per il reindirizzamento
    const [currentCount, setCurrentCount] = useState(counterInstance.getCount());

    // Trova il profileId più alto


    // Recupera i profili quando il componente viene caricato
    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const fetchedProfiles = await getProfiles(userId);

                setProfiles(fetchedProfiles);
            } catch (err) {
                setError("Error during the charging profiles ")
            }
        };

        fetchProfiles();
    }, [userId]);



    const handleProfileClick = (profileId) => {
        if (profileId === "add-new") {
            const maxProfileId = profiles.length > 0
                ? Math.max(...profiles.map((profile) => profile.profileId))
                : 0; // Aggiorna lo stato con il nuovo valore
            navigate(`/users/${userId}/profiles/${maxProfileId+1}/createProfiles`)
        }else {alert(`Profile selected: ${profileId}`);
        // Puoi aggiungere la logica per salvare il profilo selezionato
        // o reindirizzare a un'altra schermata
        navigate(`/users/${userId}/profiles/${profileId}/Home`); // Redirezione esempio
    }};

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
                <div
                    className="profile-card text-center"
                    onClick={() => handleProfileClick("add-new")}
                >
                    <img
                        src="https://via.placeholder.com/150?text=Add+New"
                        alt="Add New"
                        className="profile-avatar"
                    />
                    <h3 className="text-light">Add Profile</h3>
                </div>
            </div>
        </div>
    );
}

export default ProfileSelection;
