import React, { useState } from "react";
import "../styles/CreateProfile.css"; // Custom styling for the CreateProfile component
import { postProfile, postUser } from "../services/useService.js"; // Functions to send data to the backend
import { useNavigate, useParams } from "react-router-dom"; // Hooks for navigation and accessing route parameters

/**
 * CreateProfile component allows users to create a new profile by entering a nickname
 * and selecting a profile picture. Upon successful creation, it sends the data to the backend
 * and navigates to the newly created profile's home page.
 *
 * @component
 * @param {function} onSubmit - Callback function to handle the submission.
 */
function CreateProfile({ onSubmit }) {
    const { userId } = useParams(); // Retrieves userId from the URL
    const { profileId } = useParams(); // Retrieves profileId from the URL
    const navigate = useNavigate(); // Hook for navigating to different routes

    // State for form data, initialized with userId and profileId, and default profile image
    const [formData, setFormData] = useState({
        profileId: parseInt(profileId, 10), // Profile ID extracted from URL
        userId: parseInt(userId, 10), // User ID extracted from URL
        profileImage: '/sfondo3.png', // Default profile image
        nickname: '' // Initially empty nickname field
    });

    // List of available profile images
    const profileImages = [
        "/sfondo1.png", // First image option
        "/sfondo2.png", // Second image option
        "/sfondo3.png"  // Third image option (default selected)
    ];

    /**
     * Handles form field changes by updating the corresponding state.
     *
     * @param {string} field - The field name to update (either "nickname" or "profileImage").
     * @param {string} value - The new value to set for the specified field.
     */
    const handleChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value, // Update the state with the new field value
        }));
    };

    /**
     * Handles form submission. It validates the form data, then sends the profile creation request to the backend.
     * If successful, navigates to the created profile's home page.
     *
     * @param {object} e - The event object from the form submission.
     */
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents the default form submission behavior
        const { nickname, profileImage } = formData; // Extracts form data

        if (nickname && profileImage) { // Checks if nickname and profileImage are provided
            try {
                await postProfile(userId, formData); // Sends the form data to the backend
                alert('Profile created!'); // Displays a success message
                navigate(`/users/${userId}/profiles/${profileId}/Home`); // Navigates to the profile's home page
            } catch (error) {
                alert('Profile creation failed!'); // Displays an error message if the profile creation fails
            }
        } else {
            alert("Please fill in all fields."); // Prompts the user to complete the form if required fields are missing
        }
    };

    return (
        <div className="create-profile-container">
            <h1 className="text-center">Create Your Profile</h1>
            <form onSubmit={handleSubmit} className="create-profile-form">
                {/* Nickname input field */}
                <div className="form-group">
                    <label htmlFor="nickname">Nickname</label>
                    <input
                        type="text"
                        id="nickname"
                        className="form-control"
                        placeholder="Enter your nickname"
                        value={formData.nickname}
                        onChange={(e) => handleChange("nickname", e.target.value)} // Updates nickname state
                        required // Ensures the nickname field is filled
                    />
                </div>

                {/* Profile image selection */}
                <div className="form-group">
                    <label>Choose a Profile Picture</label>
                    <div className="profile-images">
                        {profileImages.map((image, index) => (
                            <img
                                key={index} // Use index as key since profile images are static
                                src={image}
                                alt={`Image${index + 1}`}
                                className={`profile-image ${
                                    formData.profileImage === image ? "selected" : ""
                                }`} // Adds 'selected' class if this image is chosen
                                onClick={() => handleChange("profileImage", image)} // Sets the selected image
                            />
                        ))}
                    </div>
                </div>

                {/* Submit button */}
                <button type="submit" className="btn btn-primary btn-block">
                    Create Profile
                </button>
            </form>
        </div>
    );
}

export default CreateProfile;
