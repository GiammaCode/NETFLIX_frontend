import api from "./api"; // Import the base API instance for general requests (e.g., films).
import userApi from "./userAPI.js"; // Import the user-specific API instance for user and profile management.

/**
 * Fetches all films from the backend.
 * @returns {Promise<Array>} A promise that resolves to an array of films.
 * @throws Will throw an error if the API call fails.
 */
export const getFilms = async () => {
    try {
        const response = await api.get("/films/"); // Make GET request to fetch all films.
        return response.data; // Return the film data obtained from the backend.
    } catch (error) {
        console.error("Error fetching films:", error);
        throw error; // Rethrow the error to be handled in the component.
    }
};

/**
 * Fetches all users from the backend.
 * @returns {Promise<Array>} A promise that resolves to an array of users.
 * @throws Will throw an error if the API call fails.
 */
export const getUser = async () => {
    try {
        const response = await userApi.get("/users/"); // Make GET request to fetch all users.
        return response.data; // Return the user data obtained from the backend.
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error; // Rethrow the error to be handled in the component.
    }
};

/**
 * Sends a POST request to create a new user in the backend.
 * @param {Object} userData - The data of the new user to be created.
 * @returns {Promise<Object>} A promise that resolves to the newly created user data.
 * @throws Will throw an error if the API call fails.
 */
export const postUser = async (userData) => {
    try {
        const response = await userApi.post("/users/", userData); // Make POST request to create a new user.
        return response.data; // Return the created user data.
    } catch (error) {
        console.error("Error creating user:", error);
        throw error; // Rethrow the error to be handled in the component.
    }
};

/**
 * Fetches profiles for a specific user by userId.
 * @param {number} userID - The ID of the user whose profiles are to be fetched.
 * @returns {Promise<Array>} A promise that resolves to an array of profiles for the given user.
 * @throws Will throw an error if the API call fails.
 */
export const getProfiles = async (userID) => {
    try {
        const response = await userApi.get(`/users/${userID}/profiles`); // Make GET request to fetch user profiles.
        return response.data; // Return the profiles data obtained from the backend.
    } catch (error) {
        console.error("Error fetching profiles:", error);
        throw error; // Rethrow the error to be handled in the component.
    }
};

/**
 * Sends a POST request to create a new profile for a specific user.
 * @param {number} userID - The ID of the user who owns the profile.
 * @param {Object} userData - The data of the new profile to be created.
 * @returns {Promise<Object>} A promise that resolves to the newly created profile data.
 * @throws Will throw an error if the API call fails.
 */
export const postProfile = async (userID, userData) => {
    try {
        const response = await userApi.post(`/users/${userID}/profiles`, userData); // Make POST request to create a new profile.
        return response.data; // Return the created profile data.
    } catch (error) {
        console.error("Error creating profile:", error);
        throw error; // Rethrow the error to be handled in the component.
    }
};

/**
 * Fetches a specific profile for a user by userId and profileId.
 * @param {number} userID - The ID of the user who owns the profile.
 * @param {number} profileID - The ID of the profile to be fetched.
 * @returns {Promise<Object>} A promise that resolves to the profile data.
 * @throws Will throw an error if the API call fails.
 */
export const getProfile = async (userID, profileID) => {
    try {
        const response = await userApi.get(`/users/${userID}/profiles/${profileID}`); // Make GET request to fetch specific profile data.
        return response.data; // Return the profile data obtained from the backend.
    } catch (error) {
        console.error("Error fetching profile:", error);
        throw error; // Rethrow the error to be handled in the component.
    }
};

/**
 * Sends a PUT request to update a specific profile for a user.
 * @param {number} userID - The ID of the user who owns the profile.
 * @param {number} profileID - The ID of the profile to be updated.
 * @param {Object} profileData - The updated profile data to be sent to the backend.
 * @returns {Promise<Object>} A promise that resolves to the updated profile data.
 * @throws Will throw an error if the API call fails.
 */
export const putProfile = async (userID, profileID, profileData) => {
    try {
        const response = await userApi.put(`/users/${userID}/profiles/${profileID}`, profileData); // Make PUT request to update profile data.
        return response.data; // Return the updated profile data.
    } catch (error) {
        console.error("Error updating profile:", error);
        throw error; // Rethrow the error to be handled in the component.
    }
};

/**
 * Sends a DELETE request to delete a specific profile for a user.
 * @param {number} userID - The ID of the user who owns the profile.
 * @param {number} profileID - The ID of the profile to be deleted.
 * @returns {Promise<Object>} A promise that resolves to the response data from the delete operation.
 * @throws Will throw an error if the API call fails.
 */
export const deleteProfile = async (userID, profileID) => {
    try {
        const response = await userApi.delete(`/users/${userID}/profiles/${profileID}`); // Make DELETE request to delete the profile.
        return response.data; // Return the response data from the delete operation.
    } catch (error) {
        console.error("Error deleting profile:", error);
        throw error; // Rethrow the error to be handled in the component.
    }
};
