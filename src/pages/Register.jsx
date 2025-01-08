import React, { useEffect, useState } from 'react'; // Import React and useState, useEffect hooks
import { postUser, getUser } from "../services/useService.js"; // Import functions to interact with the backend
import { useNavigate } from "react-router-dom"; // Import the hook for navigation

/**
 * Register component allows new users to register by providing personal details.
 * It dynamically generates a userId based on the highest existing userId from the database,
 * then sends the data to the backend for account creation.
 *
 * @component
 */
const Register = () => {
    const navigate = useNavigate(); // Hook for navigation
    const [maxId, setMaxId] = useState(0); // State to store the maximum userId
    const [formData, setFormData] = useState({
        userId: 0, // Initially set to 0, will be updated dynamically
        name: 'giammo',
        surname: 'gianmarini',
        password: 'mare',
        email: 'mare@pascara',
        date_of_birth: '', // User's date of birth
        paymentMethod: '', // User's chosen payment method
        profiles: '1' // Default profiles count
    });

    // Fetches users and calculates the maximum userId on component mount
    useEffect(() => {
        const fetchMaxId = async () => {
            try {
                const users = await getUser(); // Fetch users from the backend
                const maxUserId = users.length > 0
                    ? Math.max(...users.map((user) => user.userId)) // Find the highest userId
                    : 0; // If no users, set maxId to 0
                setMaxId(maxUserId); // Update the state with the calculated maxId
            } catch (error) {
                console.error("Error fetching users:", error); // Log any error that occurs during fetching
                alert("Unable to fetch user data.");
            }
        };

        fetchMaxId(); // Call the function to fetch users
    }, []); // This effect runs once when the component mounts

    // Updates formData with the new maxId whenever it changes
    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            userId: maxId + 1, // Increment maxId by 1 for the new user
        }));
    }, [maxId]); // Runs when maxId is updated

    /**
     * Handles changes to the form fields and updates the formData state.
     *
     * @param {Object} e - The event object for the input field change
     */
    const handleInputChange = (e) => {
        const { name, value } = e.target; // Destructure the name and value from the event target
        setFormData((prev) => ({ ...prev, [name]: value })); // Update formData with the new value for the given field
    };

    /**
     * Handles form submission and attempts to register the user by sending formData to the backend.
     *
     * @param {Object} e - The event object for the form submission
     */
    const handleRegister = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        console.log('Registration:', formData); // Log the form data for debugging

        try {
            await postUser(formData); // Send the form data to the backend to create the user
            alert('Registration successful!'); // Show a success message
            navigate(`/users/${formData.userId}`); // Redirect to the newly created user's profile page
        } catch (error) {
            console.error("Error during registration:", error); // Log any errors during registration
            alert('Registration failed!'); // Show an error message if registration fails
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4" style={{ width: '400px' }}>
                <h1 className="text-center mb-4">Sign Up</h1>
                {/* Form for registering a new user */}
                <form onSubmit={handleRegister}>
                    {/* First Name input field */}
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-control"
                            value={formData.name}
                            onChange={handleInputChange} // Calls handleInputChange to update the state
                            required
                        />
                    </div>
                    {/* Last Name input field */}
                    <div className="mb-3">
                        <label htmlFor="surname" className="form-label">
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="surname"
                            name="surname"
                            className="form-control"
                            value={formData.surname}
                            onChange={handleInputChange} // Calls handleInputChange to update the state
                            required
                        />
                    </div>
                    {/* Email input field */}
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            value={formData.email}
                            onChange={handleInputChange} // Calls handleInputChange to update the state
                            required
                        />
                    </div>
                    {/* Password input field */}
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-control"
                            value={formData.password}
                            onChange={handleInputChange} // Calls handleInputChange to update the state
                            required
                        />
                    </div>
                    {/* Date of Birth input field */}
                    <div className="mb-3">
                        <label htmlFor="date_of_birth" className="form-label">
                            Birth Date
                        </label>
                        <input
                            type="date"
                            id="date_of_birth"
                            name="date_of_birth"
                            className="form-control"
                            value={formData.date_of_birth}
                            onChange={handleInputChange} // Calls handleInputChange to update the state
                            required
                        />
                    </div>
                    {/* Payment Method select field */}
                    <div className="mb-3">
                        <label htmlFor="paymentMethod" className="form-label">
                            Payment Method
                        </label>
                        <select
                            id="paymentMethod"
                            name="paymentMethod"
                            className="form-select"
                            value={formData.paymentMethod}
                            onChange={handleInputChange} // Calls handleInputChange to update the state
                            required
                        >
                            <option value="">Select Payment Method</option>
                            <option value="Credit Card">Credit Card</option>
                            <option value="PayPal">PayPal</option>
                            <option value="Bank Transfer">Bank Transfer</option>
                        </select>
                    </div>
                    {/* Submit button */}
                    <button type="submit" className="btn btn-danger w-100">
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
