import React, { useState } from "react";
import "../styles/CreateProfile.css"; // Stile personalizzato
import {postProfile, postUser} from "../services/useService.js";
import {useNavigate, useParams} from "react-router-dom";

function CreateProfile({ onSubmit }) {
    const { userId } = useParams(); // Ottieni l'ID del film dalla rotta
    const { profileId } = useParams(); // Ottieni l'ID del film dalla rotta
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        profileId: parseInt(profileId, 10),
        userId: parseInt(userId,10),
        profileImage:'../../public/sfondo3.png',
        nickname:''
    });


    const profileImages = [
        "../../public/sfondo1.png",
        "../../public/sfondo2.png",
        "../../public/sfondo3.png"
    ];

    const handleChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {nickname, profileImage} = formData;
        if (nickname && profileImage) {
            try {
                await postProfile(userId, formData)
                // Invia i dati al backend
                alert('Profile created!');
                navigate(`/users/${userId}/profiles/${profileId}/Home`)
            } catch (error) {
                //console.error("Error during registration:", error);
                alert('Profile creation failed!');
            }
        } else {
            alert("Please fill in all fields.");
        }
    };

    return (
        <div className="create-profile-container">
            <h1 className="text-center">Create Your Profile</h1>
            <form onSubmit={handleSubmit} className="create-profile-form">
                <div className="form-group">
                    <label htmlFor="nickname">Nickname</label>
                    <input
                        type="text"
                        id="nickname"
                        className="form-control"
                        placeholder="Enter your nickname"
                        value={formData.nickname}
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
                                src= "../../public/sfondo1.png"
                                alt={`Image${index + 1}`}
                                className={`profile-image ${
                                    formData.profileImage === image ? "selected" : ""
                                }`}
                                onClick={() => handleChange("profileImage", image)}
                            />
                        ))}
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block">
                    Create Profile
                </button>
            </form>
        </div>
    );
}

export default CreateProfile;
