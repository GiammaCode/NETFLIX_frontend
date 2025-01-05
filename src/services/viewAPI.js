import axios from "axios";

const viewApi = axios.create({
    baseURL: "http://localhost:8082", // Modifica l'URL in base al tuo backend
});

export default viewApi;