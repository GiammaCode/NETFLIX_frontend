import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { getProfile, updateProfile, deleteProfile } from "../services/useService.js";

const ProfileSettings = () => {
    const { userId } = useParams(); // Ottieni l'ID del film dalla rotta
    const { profileId } = useParams(); // Ottieni l'ID del film dalla rotta  const navigate = useNavigate();
    const [profileData, setProfileData] = useState({
        nickname: '',
        profileImage: ''
    });

    const profileImages = [
        "../../public/sfondo1.png",
        "../../public/sfondo2.png",
        "../../public/sfondo3.png"
    ];

    // Carica i dati iniziali del profilo
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profile = await getProfile(userId, profileId); // Ottieni i dati del profilo
                setProfileData({
                    nickname: profile.nickname,
                    profileImage: profile.profileImage
                });
            } catch (error) {
                console.error("Error fetching profile data:", error);
                alert("Unable to load profile data.");
            }
        };

        fetchProfile();
    }, [userId, profileId]);

    // Gestisce le modifiche del form
    const handleChange = (field, value) => {
        setProfileData((prev) => ({
            ...prev,
            [field]: value
        }));
    };

    // Aggiorna il profilo
    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            await updateProfile(userId, profileId, profileData); // Invio dati aggiornati al backend
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Profile update failed.");
        }
    };

    // Elimina il profilo
    const handleDeleteProfile = async () => {
        if (window.confirm("Are you sure you want to delete this profile?")) {
            try {
                await deleteProfile(userId, profileId); // Chiama l'API per eliminare il profilo
                alert("Profile deleted successfully!");
                navigate(`/users/${userId}`); // Torna alla pagina degli utenti
            } catch (error) {
                console.error("Error deleting profile:", error);
                alert("Profile deletion failed.");
            }
        }
    };

    return (
        <div className="profile-settings-container">
            <h1 className="text-center">Profile Settings</h1>
            <form onSubmit={handleUpdateProfile} className="profile-settings-form">
                <div className="form-group">
                    <label htmlFor="nickname">Nickname</label>
                    <input
                        type="text"
                        id="nickname"
                        className="form-control"
                        placeholder="Enter new nickname"
                        value={profileData.nickname}
                        onChange={(e) => handleChange("nickname", e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Choose a Profile Picture</label>
                    <div className="profile-images">
                        {profileImages.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Image${index + 1}`}
                                className={`profile-image ${
                                    profileData.profileImage === image ? "selected" : ""
                                }`}
                                onClick={() => handleChange("profileImage", image)}
                            />
                        ))}
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block">
                    Save Changes
                </button>
            </form>

            <button
                className="btn btn-danger btn-block mt-3"
                onClick={handleDeleteProfile}
            >
                Delete Profile
            </button>
        </div>
    );
};

export default ProfileSettings;
