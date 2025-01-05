import axios from "axios";

// Configurazione base di Axios
const api = axios.create({
    baseURL: "http://localhost:8080", // Modifica l'URL in base al tuo backend
});

export default api;



