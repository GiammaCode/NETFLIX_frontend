import React from 'react'; // Import React library
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for programmatic navigation

/**
 * Welcome component renders a welcome screen with options for the user to either sign in or sign up.
 * It provides buttons to navigate to the login and registration pages.
 *
 * @component
 */
const Welcome = () => {
    const navigate = useNavigate(); // Hook for navigation

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="text-center">
                {/* Main heading */}
                <h1 className="mb-4">Welcome to Netflix</h1>
                {/* Subtitle */}
                <p className="lead mb-4">Enjoy unlimited films, TV shows, and more.</p>
                <div>
                    {/* Sign In button */}
                    <button
                        className="btn btn-danger btn-lg me-3"
                        onClick={() => navigate('/login')} // Navigate to login page when clicked
                    >
                        Sign In
                    </button>
                    {/* Sign Up button */}
                    <button
                        className="btn btn-outline-danger btn-lg"
                        onClick={() => navigate('/register')} // Navigate to register page when clicked
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Welcome;
