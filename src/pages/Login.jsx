import React, { useState } from 'react'; // Import React and useState hook
import { getUser } from "../services/useService.js"; // Import function to fetch users from the service
import { useNavigate } from "react-router-dom"; // Import the hook to navigate between pages

/**
 * Login component allows users to sign in using their email and password.
 * It validates the credentials by comparing them with the data fetched from the backend.
 * On successful login, the user is redirected to their homepage.
 *
 * @component
 */
const Login = () => {
    const [email, setEmail] = useState("luca@pas"); // State to store the email input value
    const [password, setPassword] = useState("pass"); // State to store the password input value
    const [error, setError] = useState(""); // State to store error messages
    const navigate = useNavigate(); // Hook for page navigation

    /**
     * Handle form submission to authenticate the user.
     * It compares the email and password with the data from the backend.
     * If credentials match, the user is redirected to their homepage.
     *
     * @param {Object} e - The event object
     */
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents page reload on form submit

        try {
            // Fetch users data from the backend
            const users = await getUser();

            // Flag to track whether the user is found
            let userFound = false;

            // Check if the provided email and password match any user from the backend
            users.forEach((user) => {
                if (user.email === email && user.password === password) {
                    userFound = true; // User found
                    navigate(`/users/${user.userId}`); // Redirect to user's homepage
                }
            });

            // If no matching user is found, show an error message
            if (userFound) {
                alert("Login successful!");
            } else {
                setError("Invalid credentials."); // Set error message
            }
        } catch (err) {
            console.error("Error during login:", err); // Log the error
            setError("An error occurred during login."); // Show error message
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4" style={{ width: '400px' }}>
                <h1 className="text-center mb-4">Sign In</h1>
                {/* Form submission triggers handleSubmit */}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} // Update email state
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} // Update password state
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-danger w-100">
                        Sign In
                    </button>
                </form>
                {/* If an error message exists, show it */}
                {error && <p className="text-danger mt-3">{error}</p>}
            </div>
        </div>
    );
};

export default Login;
