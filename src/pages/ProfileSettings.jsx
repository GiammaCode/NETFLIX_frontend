import React, { useEffect, useState } from 'react'; // Import React and useState, useEffect hooks
import { useNavigate, useParams } from "react-router-dom"; // Import hooks for navigation and route parameters
import { getProfile, putProfile, deleteProfile } from "../services/useService.js"; // Import service functions
import "../styles/ProfileSettings.css"; // Import the associated CSS file
import Navbar from "../components/Navbar.jsx"; // Import the Navbar component

/**
 * ProfileSettings component allows users to view and update their profile settings, including changing the nickname
 * and profile picture. Users can also delete their profile or log out from the application.
 *
 * @component
 */
const ProfileSettings = () => {
    const { userId } = useParams(); // Get the user ID from the route parameters
    const { profileId } = useParams(); // Get the profile ID from the route parameters
    const navigate = useNavigate(); // Hook for navigation
    const [profileData, setProfileData] = useState({
        nickname: '', // Initial state for nickname
        profileImage: '' // Initial state for profile image
    });

    // List of available profile images
    const profileImages = [
        "/sfondo1.png",
        "/sfondo2.png",
        "/sfondo3.png"
    ];

    /**
     * Fetch the profile data from the backend when the component is mounted.
     */
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profile = await getProfile(userId, profileId); // Get the profile data from the backend
                setProfileData({
                    nickname: profile.nickname,
                    profileImage: profile.profileImage
                });
            } catch (error) {
                console.error("Error fetching profile data:", error); // Log the error to the console
                alert("Unable to load profile data."); // Show an alert if fetching fails
            }
        };

        fetchProfile(); // Call the function to fetch profile data
    }, [userId, profileId]); // Dependencies: fetch profile whenever userId or profileId changes

    /**
     * Handle changes to the form fields (nickname, profile image).
     *
     * @param {string} field - The field name (either 'nickname' or 'profileImage').
     * @param {string} value - The new value to update the field with.
     */
    const handleChange = (field, value) => {
        setProfileData((prev) => ({
            ...prev,
            [field]: value // Update the corresponding field in the profileData state
        }));
    };

    /**
     * Handle updating the profile. This function is called when the form is submitted.
     * It sends the updated profile data to the backend.
     *
     * @param {Object} e - The event object
     */
    const handleUpdateProfile = async (e) => {
        e.preventDefault(); // Prevent form submission from refreshing the page
        try {
            await putProfile(userId, profileId, profileData); // Update profile in the backend
            alert("Profile updated successfully!"); // Show success message
        } catch (error) {
            console.error("Error updating profile:", error); // Log any errors
            alert("Profile update failed."); // Show error message if the update fails
        }
    };

    /**
     * Handle deleting the profile. This function is called when the user clicks the delete button.
     *
     * Prompts the user for confirmation before proceeding.
     */
    const handleDeleteProfile = async () => {
        if (window.confirm("Are you sure you want to delete this profile?")) {
            try {
                await deleteProfile(userId, profileId); // Call the backend to delete the profile
                alert("Profile deleted successfully!"); // Show success message
                navigate(`/users/${userId}`); // Redirect to the user's homepage after deletion
            } catch (error) {
                console.error("Error deleting profile:", error); // Log any errors
                alert("Profile deletion failed."); // Show error message if deletion fails
            }
        }
    };

    /**
     * Handle logging the user out. This function is called when the logout button is clicked.
     * Removes any authentication token and redirects the user to the login page.
     */
    const handleLogout = () => {
        localStorage.removeItem("authToken"); // Remove the auth token from localStorage
        alert("You have been logged out!"); // Show a logout success message
        navigate("/"); // Navigate to the login page
    };

    return (
        <div>
            <Navbar /> {/* Render the Navbar component */}
            <div className="profile-settings-container">
                <h1 className="text-center">Profile Settings</h1>
                <form onSubmit={handleUpdateProfile} className="profile-settings-form">
                    {/* Nickname input field */}
                    <div className="form-group">
                        <label htmlFor="nickname">Nickname</label>
                        <input
                            type="text"
                            id="nickname"
                            className="form-control"
                            placeholder="Enter new nickname"
                            value={profileData.nickname}
                            onChange={(e) => handleChange("nickname", e.target.value)} // Update nickname state
                            required
                        />
                    </div>

                    {/* Profile image selection */}
                    <div className="form-group">
                        <label>Choose a Profile Picture</label>
                        <div className="profile-images">
                            {profileImages.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Image${index + 1}`}
                                    className={`profile-image ${profileData.profileImage === image ? "selected" : ""}`}
                                    onClick={() => handleChange("profileImage", image)} // Set the selected profile image
                                />
                            ))}
                        </div>
                    </div>

                    {/* Save changes button */}
                    <button type="submit" className="btn btn-primary btn-block">
                        Save Changes
                    </button>
                </form>

                {/* Delete profile button */}
                <button
                    className="btn btn-danger btn-block mt-5"
                    onClick={handleDeleteProfile}
                >
                    Delete Profile
                </button>

                {/* Logout button */}
                <button
                    className="btn btn-info btn-block mt-5 mx-3"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default ProfileSettings;
