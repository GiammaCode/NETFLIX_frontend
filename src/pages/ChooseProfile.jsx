import React, { useState, useEffect } from "react";
import { getProfiles } from "../services/useService.js";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/Profile.css";

/**
 * ProfileSelection component allows the user to choose from existing profiles or add a new one.
 * It fetches the list of profiles associated with a specific user and displays them in a selection grid.
 * If the user clicks on a profile, it navigates to the corresponding home screen for that profile.
 * If the user clicks on "Add Profile," it navigates to the profile creation page.
 *
 * @component
 */
function ProfileSelection() {
    // Extracts userId from the URL parameters to fetch profiles for that specific user
    const { userId } = useParams(); // Retrieves userId from the route
    const [profiles, setProfiles] = useState([]); // State to store profiles fetched from the API
    const [error, setError] = useState(""); // State to store any error messages
    const navigate = useNavigate(); // Hook for navigating to different routes

    /**
     * useEffect hook that fetches the profiles when the component mounts or when userId changes.
     * It triggers the `fetchProfiles` function to get profiles associated with the current user.
     */
    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                // Fetch profiles for the specific user using the userId
                const fetchedProfiles = await getProfiles(userId);
                setProfiles(fetchedProfiles); // Store the fetched profiles in state
            } catch (err) {
                setError("Error during the loading of profiles"); // Set error state if fetching fails
            }
        };

        fetchProfiles(); // Trigger the fetching of profiles
    }, [userId]); // Dependency array: effect will rerun if userId changes

    /**
     * handleProfileClick handles the click on a profile card. If the "add-new" profile card is clicked,
     * it calculates the next profileId and navigates to the profile creation page. Otherwise, it navigates
     * to the home screen for the selected profile.
     *
     * @param {string} profileId - The profileId of the clicked profile
     */
    const handleProfileClick = (profileId) => {
        if (profileId === "add-new") {
            // Calculate the next available profileId by getting the highest profileId and adding 1
            const maxProfileId = profiles.length > 0
                ? Math.max(...profiles.map((profile) => profile.profileId)) // Get the max profileId from profiles
                : 0;
            // Navigate to the profile creation page with the next profileId
            navigate(`/users/${userId}/profiles/${maxProfileId + 1}/createProfiles`);
        } else {
            // If a profile is clicked, navigate to the home page of the selected profile
            alert(`Profile selected: ${profileId}`);
            // You can add logic here to save the selected profile or redirect to a different screen
            navigate(`/users/${userId}/profiles/${profileId}/Home`); // Example redirection
        }
    };

    return (
        <div className="profile-selection">
            <h1 className="text-center text-light">Who's watching?</h1>
            {error && <p className="error">{error}</p>} {/* Display error if it occurs */}
            <div className="profiles-container d-flex justify-content-center flex-wrap">
                {/* Display each profile in a profile card */}
                {profiles.map((profile) => (
                    <div
                        key={profile.profileId}
                        className="profile-card text-center"
                        onClick={() => handleProfileClick(profile.profileId)} // Trigger profile selection
                    >
                        <img
                            src={profile.profileImage} // Profile image for the profile
                            className="profile-avatar"
                            alt={profile.nickname}
                        />
                        <h3 className="text-light">{profile.nickname}</h3> {/* Display profile nickname */}
                    </div>
                ))}
                {/* "Add New Profile" card */}
                <div
                    className="profile-card text-center"
                    onClick={() => handleProfileClick("add-new")} // Trigger add new profile navigation
                >
                    <img
                        src="/newProfile.png" // Placeholder image for adding a new profile
                        alt="Add New"
                        className="profile-avatar"
                    />
                    <h3 className="text-light">Add Profile</h3> {/* Add profile label */}
                </div>
            </div>
        </div>
    );
}

export default ProfileSelection;
