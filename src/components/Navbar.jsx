import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/Navbar.css";
import { getProfile } from "../services/useService.js";

/**
 * Navbar component that displays a navigation bar for a streaming service like Netflix.
 * It includes links to different sections of the app (e.g., Home, Films) and a search bar.
 * The profile image is fetched from an API and displayed in the account section.
 *
 * @component
 */
const Navbar = () => {
    // State for the search query and profile image
    const [searchQuery, setSearchQuery] = useState("");
    const [profileImage, setProfileImage] = useState(""); // State for storing the profile image URL

    // Using useParams to get the dynamic userId and profileId from the URL params
    const { userId } = useParams(); // Get the userId from the route parameters
    const { profileId } = useParams(); // Get the profileId from the route parameters

    /**
     * useEffect hook that fetches the profile data when the userId or profileId changes.
     * It retrieves the profile image from an API (using getProfile service) and sets it to state.
     */
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // Fetching the profile data using the userId and profileId
                const profileData = await getProfile(userId, profileId);
                if (profileData && profileData.profileImage) {
                    // If profileImage exists, set it to the state
                    setProfileImage(profileData.profileImage);
                }
            } catch (error) {
                // If there's an error fetching the profile, log it
                console.error("Error fetching profile:", error);
            }
        };

        fetchProfile(); // Trigger the function to fetch the profile
    }, [userId, profileId]); // Dependency array: the effect runs whenever userId or profileId changes

    /**
     * Handles the submission of the search form.
     * It prevents the default form submission and resets the search input.
     * @param {Event} event - The submit event from the search form.
     */
    const handleSearchSubmit = (event) => {
        event.preventDefault(); // Prevent the page from reloading when the form is submitted
        console.log("Searching for:", searchQuery); // You can replace this with your search logic
        setSearchQuery(""); // Reset the search input after submission
    };

    return (
        <nav className="navbar">
            {/* Netflix Logo Link */}
            <div className="navbar-logo">
                {/* Link to Home page */}
                <Link to={`/users/${userId}/profiles/${profileId}/Home`}>
                    <img
                        src="/logo_netflix.png"
                        alt="Netflix Logo"
                        className="logo"
                    />
                </Link>
            </div>

            {/* Navigation Links */}
            <ul className="navbar-links">
                <li>
                    <Link to={`/users/${userId}/profiles/${profileId}/Home`}>Home</Link>
                </li>
                <li>
                    <span className="navbar-disabled">Series</span>
                </li>
                <li>
                    <Link to={`/users/${userId}/profiles/${profileId}/films`}>Films</Link>
                </li>
                <li>
                    <span className="navbar-disabled">News & Popular</span>
                </li>
                <li>
                    <span className="navbar-disabled">My List</span>
                </li>
            </ul>

            {/* Search Bar and Account Icons */}
            <div className="navbar-icons">
                {/* Search Form */}
                <form className="navbar-search" onSubmit={handleSearchSubmit}>
                    <input
                        type="text"
                        placeholder="Search"
                        className="search-input"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} // Updates searchQuery state on input change
                    />
                </form>

                {/* Right-side icons (Profile and Notifications) */}
                <div className="navbar-icons-right">
                    {/* Link to Profile Settings page */}
                    <Link to={`/users/${userId}/profiles/${profileId}/profileSettings`}>
                        <img
                            src={profileImage} // Dynamic profile image fetched from API
                            alt="Account"
                            className="account-icon"
                        />
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
