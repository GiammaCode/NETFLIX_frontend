import api from "./api";

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
