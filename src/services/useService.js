import api from "./api";
import userApi from "./userAPI.js";



// Funzione per ottenere tutti i film
export const getFilms = async () => {
    try {
        const response = await api.get("/films/"); // Assicurati che "/films" sia il percorso corretto nel backend
        return response.data; // Restituisci i dati ottenuti
    } catch (error) {
        console.error("Error fetching films:", error);
        throw error; // Rilancia l'errore per gestirlo nel componente
    }
};

export const getUser = async () => {
    try {
        const response = await userApi.get("/users/"); // Assicurati che "/films" sia il percorso corretto nel backend
        return response.data; // Restituisci i dati ottenuti
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error; // Rilancia l'errore per gestirlo nel componente
    }
};

export const postUser = async (userData) => {
    try {
        // "userData" è l'oggetto che desideri inviare al backend
        const response = await userApi.post("/users/", userData); // POST request
        return response.data; // Restituisci i dati ottenuti, ad esempio l'utente creato
    } catch (error) {
        console.error("Error creating user:", error);
        throw error; // Rilancia l'errore per gestirlo nel componente
    }
};
